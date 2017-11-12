const { connection, papersCollection } = require('./connection');

async function queryVenues() {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate([{ $group: { _id: '$venue' } }])
    .toArray();
}

module.exports = { queryVenues };
