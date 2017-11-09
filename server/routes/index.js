const express = require('express');
const _ = require('lodash');
const { connection, papersCollection } = require('../db/connection');
const { queryCitationYearMap } = require('../db/compare');

const router = express.Router();

// Compare API
router.get('/compare', async (req, res) => {
  // Conference and year may be single value or an array
  const conferences = _.castArray(req.query.conference);
  const years = _.castArray(req.query.year).map(yr => parseInt(yr, 10));

  const conferenceYearObjs =
    _(conferences)
      .zip(years)
      .map(pair => queryCitationYearMap(pair[0], pair[1]))
      .value();

  const formattedResults = _(await Promise.all(conferenceYearObjs))
    .map(result => _.chain(result).keyBy('cite_year').mapValues('cite_count'))
    .zip(conferenceYearObjs)
    .map(result => Object.assign({ citations: result[0] }, result[1]))
    .value();

  res.send(formattedResults);
});

// Q1
router.get('/venue/:venue/authors', async (req, res) => {
  // full path: /venue/:venue/authors?top=n
  // returns name and publication count of top n authors in venue
  // in the form of { name: count, ... }

  const db = await connection;

  const { venue } = req.params;
  const { top } = req.query;
  const parsedTop = top === undefined ? 10 : parseInt(top, 10);

  const result = await db
    .collection(papersCollection)
    .aggregate([
      { $match: { venue } },
      { $project: { _id: 0, author: '$authors.name' } },
      { $unwind: '$author' },
      { $sortByCount: '$author' },
      { $limit: parsedTop },
    ])
    .toArray();

  const response = result
    .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.count }), {});

  res.send(response);
});

// Q2
router.get('/venue/:venue/papers', async (req, res) => {
  // full path: /venue/:venue/papers?top=n
  // returns name and citation count of top n papers in venue
  const { venue } = req.params;
  const { top } = req.query;
  const parsedTop = top === undefined ? 5 : parseInt(top, 10);

  const db = await connection;

  const result = await db.collection(papersCollection)
    .aggregate([
      { $match: { venue } },
      { $project: { _id: 0, title: 1, inCitations: 1 } },
      { $unwind: '$inCitations' },
      { $sortByCount: '$title' },
      { $limit: parsedTop },
    ])
    .toArray();

  const response = result
    .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.count }), {});

  res.send(response);
});

// Q3
router.get('/venue/:venue/publications', async (req, res) => {
  // full path: /venue/:venue/publications
  // returns publication count in venue across the years
  const { venue } = req.params;

  const db = await connection;

  const result = await db.collection(papersCollection)
    .aggregate([
      { $match: { venue } },
      { $project: { _id: 0, year: 1 } },
      { $group: { _id: '$year', publications: { $sum: 1 } } },
      { $sort: { year: 1 } },
    ])
    .toArray();

  const response = result
    .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.publications }), {});

  res.send(response);
});

// Q4
router.get('/paper/:paper/web-citation', async (req, res) => {
  const title = req.params.paper;
  const { depth } = req.query;
  const parsedDepth = depth === undefined ? 2 : parseInt(depth, 10);

  const db = await connection;

  const rootPapers = await db
    .collection(papersCollection)
    .aggregate([
      { $match: { title } },
      {
        $project: {
          id: 1, title: 1, inCitations: 1, authors: '$authors.name',
        },
      },
      { $limit: 1 },
    ]).toArray();

  if (rootPapers.length === 0) {
    res.send(404);
    return;
  }

  const rootPaper = rootPapers[0];

  const webPapers = await db
    .collection(papersCollection)
    .aggregate([
      { $match: { _id: rootPaper._id } },
      {
        $graphLookup: {
          from: 'a4papers',
          startWith: '$inCitations',
          connectFromField: 'inCitations',
          connectToField: 'id',
          maxDepth: parsedDepth - 1,
          depthField: 'depth',
          as: 'allCited',
        },
      },
      { $project: { _id: 0, allCited: 1 } },
      { $unwind: '$allCited' },
      {
        $project: {
          id: '$allCited.id',
          depth: '$allCited.depth',
          title: '$allCited.title',
          authors: '$allCited.authors.name',
          inCitations: '$allCited.inCitations',
        },
      },
    ])
    .toArray();

  const results = webPapers
    .reduce(
      (obj, entry) => Object.assign(obj, { [entry.id]: entry }),
      { topId: rootPaper.id, [rootPaper.id]: rootPaper },
    );
  res.send(results);
});

// Q5
router.get('/year/:year/avg-cite', async (req, res) => {
  // full path: /year/:year/avg-cite?top=n
  // returns name and publication count of top n authors in venue
  // in the form of { name: count, ... }

  const db = await connection;

  const { year } = req.params;
  const { top } = req.query;
  const parsedTop = top === undefined ? 10 : parseInt(top, 10);
  const yearInt = parseInt(year, 10);

  const result = await db
    .collection(papersCollection)
    .aggregate([
      { $match: { year: yearInt } },
      { $project: { _id: 0, venue: 1, numCites: { $size: '$inCitations' } } },
      { $group: { _id: '$venue', avgCite: { $avg: '$numCites' } } },
      { $sort: { avgCite: -1 } },
      { $limit: parsedTop },
    ])
    .toArray();

  const response = result
    .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.avgCite }), {});

  res.send(response);
});

module.exports = router;
