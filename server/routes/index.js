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
        { $group: { _id: '$author', articles: { $sum: 1 } } },
        { $sort: { articles: -1 } },
        { $limit: parsedTop },
      ]);

    rawResult.toArray().then((result) => {
      const response = result
        .reduce((obj, entry) => Object.assign(obj, { [entry._id]: entry.articles }), {});

      res.send(response);
    });
  });
});

// Q2
router.get('/venue/:venue/papers', (req, res, next) => {
  // full path: /venue/:venue/papers?top=n
  // returns name and citation count of top n papers in venue
  res.send({
    paper1: 15,
    paper2: 10,
  });
});

// Q3
router.get('/venue/:venue/publications', (req, res, next) => {
  // full path: /venue/:venue/publications
  // returns publication count in venue across the years
  res.send({
    2015: 15,
    2016: 14,
  });
});

// Q4
router.get('/paper/:paper/web-citation', (req, res, next) => {
  // adjacency list?
  res.send({
    paper1: ['paper2', 'paper3', 'paper4'],
    paper2: ['paper1', 'paper3'],
    paper3: ['paper1'],
  });
});

module.exports = router;
