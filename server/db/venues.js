const { connection, papersCollection } = require('./connection');

async function queryVenues() {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate([
      { $group: { _id: '$venue' } },
      { $match: { _id: { $nin: [null, ''] } } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
}

module.exports = { queryVenues };
