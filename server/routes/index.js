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
router.get('/paper/:paper/web-citation', (req, res) => {
  // adjacency list?
  res.send({
    paper1: ['paper2', 'paper3', 'paper4'],
    paper2: ['paper1', 'paper3'],
    paper3: ['paper1'],
  });
});

module.exports = router;
