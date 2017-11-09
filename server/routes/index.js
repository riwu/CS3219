const express = require('express');
const _ = require('lodash');
const { connection, papersCollection } = require('../db/connection');
const { queryCitationYearMap } = require('../db/compare');
const { queryRootPaper, queryGraph } = require('../db/web-citation');

const router = express.Router();

// Compare API
router.get('/compare', async (req, res) => {
  // Conference and year may be single value or an array
  const conferences = _.castArray(req.query.conference);
  const years = _.castArray(req.query.year).map(yr => parseInt(yr, 10));

  const { start, end } = req.query;
  const parsedStart = start === undefined ? null : parseInt(start, 10);
  const parsedEnd = end === undefined ? null : parseInt(end, 10);

  const conferenceYearObjs = _(conferences)
    .zip(years)
    .map(pair => ({ conference: pair[0], year: pair[1] }));

  const results = conferenceYearObjs
    .map(({ conference, year }) => queryCitationYearMap(conference, year, parsedStart, parsedEnd))
    .value();

  const formattedResults = _(await Promise.all(results))
    .map(result => _(result).keyBy('cite_year').mapValues('cite_count'))
    .zip(conferenceYearObjs.value())
    .map(result => Object.assign({ citations: result[0] }, result[1]))
    .value();

  res.send(formattedResults);
});

// Citation Web
router.get('/paper/:paper/web-citation', async (req, res) => {
  const title = req.params.paper;
  const { depth } = req.query;
  const parsedDepth = depth === undefined ? 2 : parseInt(depth, 10);

  const rootPaper = await queryRootPaper(title);

  if (rootPaper === null) {
    res.send(404);
    return;
  }

  const webPapers = await queryGraph(rootPaper._id, parsedDepth);
  const results = Object.assign(
    { topId: rootPaper.id, [rootPaper.id]: rootPaper },
    _(webPapers).keyBy('id').value(),
  );
  res.send(results);
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
