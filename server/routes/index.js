const express = require('express');
const connection = require('./connection');

const router = express.Router();

const papersCollection = 'a4papers';

// Q1
router.get('/venue/:venue/authors', (req, res) => {
  // full path: /venue/:venue/authors?top=n
  // returns name and publication count of top n authors in venue
  // in the form of { name: count, ... }
  connection.then((db) => {
    const { venue, top } = req.params;
    const parsedTop = top === undefined ? 10 : parseInt(top, 10);

    const rawResult = db.collection(papersCollection)
      .aggregate([
        { $match: { venue } },
        { $project: { _id: 0, author: '$authors.name' } },
        { $unwind: '$author' },
        { $sortByCount: '$author' },
        { $limit: parsedTop },
      ]);

    rawResult.toArray().then((result) => {
      const response = result
        .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.count }), {});

      res.send(response);
    });
  });
});

// Q2
router.get('/venue/:venue/papers', (req, res) => {
  // full path: /venue/:venue/papers?top=n
  // returns name and citation count of top n papers in venue
  const { venue, top } = req.params;
  const parsedTop = top === undefined ? 5 : parseInt(top, 10);

  connection.then((db) => {
    const rawResult = db.collection(papersCollection)
      .aggregate([
        { $match: { venue } },
        { $project: { _id: 0, title: 1, inCitations: 1 } },
        { $unwind: '$inCitations' },
        { $sortByCount: '$title' },
        { $limit: parsedTop },
      ]);

    rawResult.toArray().then((result) => {
      const response = result
        .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.count }), {});

      res.send(response);
    });
  });
});

// Q3
router.get('/venue/:venue/publications', (req, res) => {
  // full path: /venue/:venue/publications
  // returns publication count in venue across the years
  const { venue } = req.params;

  connection.then((db) => {
    const rawResult = db.collection(papersCollection)
      .aggregate([
        { $match: { venue } },
        { $project: { _id: 0, year: 1 } },
        { $group: { _id: '$year', publications: { $sum: 1 } } },
        { $sort: { year: 1 } },
      ]);

    rawResult.toArray().then((result) => {
      const response = result
        .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.publications }), {});

      res.send(response);
    });
  });
});

// Q4
router.get('/paper/:paper/web-citation', async (req, res) => {
  const title = req.params.paper;
  const db = await connection;

  const rootPaper = await db
    .collection(papersCollection)
    .findOne(
      { title },
      { id: 1, title: 1, inCitations: 1 },
    );

  if (rootPaper === null) {
    res.send(404);
    return;
  }

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
          maxDepth: 1,
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
          inCitations: '$allCited.inCitations',
        },
      },
    ])
    .toArray();

  webPapers.push(rootPaper);
  const results = webPapers
    .reduce((obj, entry) => Object.assign(obj, { [entry.id]: entry }), { topId: rootPaper.id });

  res.send(results);
});


module.exports = router;
