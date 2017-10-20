const express = require('express');
const connection = require('./connection');

const router = express.Router();

// Q1
router.get('/venue/:venue/authors', (req, res, next) => {
  // full path: /venue/:venue/authors?top=n
  // returns name and publication count of top n authors in venue
  res.send({
    john: 15,
    james: 10,
  });

  // to access db:
  // connection.then(conn => conn.query('SELECT * FROM users')).then(rows => console.log(rows))
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
