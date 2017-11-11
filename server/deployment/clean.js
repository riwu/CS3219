db.a4papers.aggregate([
  {
    $lookup: {
      from: 'a4papers',
      localField: 'inCitations',
      foreignField: 'id',
      as: 'inCitations',
    },
  },
  { $addFields: { inCitations: '$inCitations.id' } },
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
  { $addFields: { outCitations: '$outCitations.id' } },
  { $out: 'a4papers' },
]);
