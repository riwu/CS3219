const { connection, papersCollection } = require('./connection.js');

async function queryImpactFactor(year, n = 10) {
  const db = await connection;
  return db.collection(papersCollection)
    .aggregate([
      { $match: { year: { $in: [year - 1, year - 2] }, venue: { $nin: [null, ''] } } },
      { $project: { _id: 0, venue: 1, numCites: { $size: '$inCitations' } } },
      { $group: { _id: '$venue', citations: { $sum: '$numCites' }, publications: { $sum: 1 } } },
      { $project: { impactFactor: { $divide: ['$citations', '$publications'] } } },
      { $sort: { impactFactor: -1 } },
      { $limit: n },
    ])
    .toArray();
}

module.exports = { queryImpactFactor };
