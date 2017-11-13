const { connection, papersCollection } = require('./connection');

async function queryTitles() {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate([{ $group: { _id: '$title' } }])
    .toArray();
}

module.exports = { queryTitles };
