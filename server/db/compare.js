const { connection, papersCollection } = require('./connection');

function computeIntervalMatchStage(start, end, property) {
  if (start === null && end === null) {
    return { $match: { [property]: { $exists: true } } };
  }

  const startFilter = start === null ? {} : { $gte: start };
  const endFilter = end === null ? {} : { $lte: end };

  return { $match: { [property]: Object.assign(startFilter, endFilter, { $exists: true }) } };
}

async function queryCitationYearMap(venue, year, start, end) {
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
      computeIntervalMatchStage(start, end, 'outCitations_docs.year'),
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
