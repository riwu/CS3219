const { connection, papersCollection } = require('./connection');

async function queryRootPaper(title) {
  const db = await connection;
  const rootPapers = await db
    .collection(papersCollection)
    .aggregate(
      [
        { $match: { title } },
        {
          $project: {
            id: 1, title: 1, inCitations: 1, authors: '$authors.name',
          },
        },
        { $limit: 1 },
      ],
      { allowDiskUse: true },
    )
    .toArray();

  if (rootPapers.length === 0) {
    return null;
  }
  return rootPapers[0];
}

async function queryGraph(rootPaperObjectId, depth) {
  const db = await connection;
  return db.collection(papersCollection)
    .aggregate(
      [
        { $match: { _id: rootPaperObjectId } },
        {
          $graphLookup: {
            from: 'a4papers',
            startWith: '$inCitations',
            connectFromField: 'inCitations',
            connectToField: 'id',
            maxDepth: depth - 1,
            depthField: 'depth',
            as: 'allCited',
          },
        },
        { $project: { _id: 0, allCited: 1 } },
        { $unwind: '$allCited' },
        {
          $project: {
            id: '$allCited.id',
            depth: '$allCited.depth',
            title: '$allCited.title',
            authors: '$allCited.authors.name',
            inCitations: '$allCited.inCitations',
          },
        },
      ],
      { allowDiskUse: true },
    )
    .toArray();
}

module.exports = { queryRootPaper, queryGraph };
