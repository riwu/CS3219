const { connection, papersCollection } = require('./connection');

function computeIntervalMatchStage(start, end, property) {
  if (start === null && end === null) {
    return [{ $match: { [property]: { $exists: true } } }];
  }

  const startFilter = start === null ? {} : { $gte: start };
  const endFilter = end === null ? {} : { $lte: end };

  return [{ $match: { [property]: Object.assign(startFilter, endFilter, { $exists: true }) } }];
}

function computeVenueMatchStage(citeVenue, property) {
  if (citeVenue === null) {
    return [];
  }
  return [{ $match: { [property]: citeVenue } }];
}

async function queryCitationYearMap(venue, year, start, end, citeVenue) {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate(
      [
        { $match: { venue, year } },
        { $project: { venue: 1, year: 1, outCitations: 1 } },
        { $unwind: '$outCitations' },
        {
          $lookup: {
            from: papersCollection,
            localField: 'outCitations',
            foreignField: 'id',
            as: 'outCitations_docs',
          },
        },
        { $unwind: '$outCitations_docs' },
        ...computeIntervalMatchStage(start, end, 'outCitations_docs.year'),
        ...computeVenueMatchStage(citeVenue, 'outCitations_docs.venue'),
        { $project: { cite_year: '$outCitations_docs.year' } },
        {
          $group: {
            _id: '$cite_year', cite_count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, cite_year: '$_id', cite_count: '$cite_count' } },
      ],
      { allowDiskUse: true },
    )
    .toArray();
}

module.exports = { queryCitationYearMap };
