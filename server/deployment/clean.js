db.a4papers.aggregate([
  {
    $lookup: {
      from: 'a4papers',
      localField: 'inCitations',
      foreignField: 'id',
      as: 'inCitations',
    },
  },
  { $project: { document: '$$ROOT', inCitations: '$inCitations.id' } },
  { $out: 'a4papers' },
]);

db.a4papers.aggregate([
  {
    $lookup: {
      from: 'a4papers',
      localField: 'outCitations',
      foreignField: 'id',
      as: 'outCitations',
    },
  },
  { $project: { document: '$$ROOT', outCitations: '$outCitations.id' } },
  { $out: 'a4papers' },
]);
