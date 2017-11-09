const { connection, papersCollection } = require('./connection');

async function queryCitationYearMap(venue, year) {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate([
      { $match: { venue, year } },
      { $project: { venue: 1, year: 1, outCitations: 1 } },
      { $unwind: '$outCitations' },
      {
        $lookup: {
          from: 'a4papers',
          localField: 'outCitations',
          foreignField: 'id',
          as: 'outCitations_docs',
        },
      },
      { $unwind: '$outCitations_docs' },
      { $match: { 'outCitations_docs.year': { $exists: true } } },
      { $project: { cite_year: '$outCitations_docs.year' } },
      {
        $group: {
          _id: '$cite_year', cite_count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, cite_year: '$_id', cite_count: '$cite_count' } },
    ])
    .toArray();
}

module.exports = { queryCitationYearMap };
