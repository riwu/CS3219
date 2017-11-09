const _ = require('lodash');
const { connection, papersCollection } = require('./connection.js');

const aggregatorSet = new Set(['author', 'venue', 'title', 'year']);
const metricSet = new Set(['numPapers', 'numCites', 'numCitedBy', 'numAuthors', 'numVenues']);
const nonDuplicateMetrics = new Set(['numAuthors', 'numVenues']);

function aggregatorAttribute(aggregator) {
  if (!aggregatorSet.has(aggregator)) {
    throw new Error('Aggregator is invalid!');
  }
  return aggregator === 'author' ? 'authors.name' : aggregator;
}

function metricAttribute(metric) {
  if (!metricSet.has(metric)) {
    throw new Error('Metric is invalid!');
  }

  return ((m) => {
    switch (m) {
      case 'numCites':
        return 'outCitations';
      case 'numCitedBy':
        return 'inCitations';
      case 'numVenues':
        return 'venue';
      case 'numAuthors':
        return 'authors';
      default:
        return null;
    }
  })(metric);
}

function filterStages({
  title, venue, year, author,
}) {
  const topLevelFilters = _.pickBy({ title, venue, year });
  const authorFilter = author === undefined ? {} : { authors: { $elemMatch: { name: author } } };

  return [{ $match: Object.assign(topLevelFilters, authorFilter) }];
}

function aggregatorUnwindStages(aggregator) {
  return aggregator === 'author' ? [{ $unwind: '$authors' }] : [];
}

function metricUnwindStages(metric) {
  const unwindAttr = metricAttribute(metric);
  if (unwindAttr === null) {
    return [];
  }
  return [{ $unwind: `$${unwindAttr}` }];
}

function duplicateEliminationStages(aggregator, metric) {
  const aggregatorAttr = aggregatorAttribute(aggregator);
  if (!nonDuplicateMetrics.has(metric)) {
    return [
      { $project: { _id: { aggregatorAttr: `$${aggregatorAttr}` } } },
    ];
  }
  const metricAttr = metricAttribute(metric);

  return [
    { $project: { key: { aggregatorAttr: `$${aggregatorAttr}`, metricAttr: `$${metricAttr}` } } },
    { $group: { _id: '$key' } },
  ];
}

function aggregatorStages() {
  return [
    { $project: { attr: '$_id.aggregatorAttr' } },
    { $match: { attr: { $nin: [null, ''] } } },
    { $sortByCount: '$attr' },
  ];
}

async function queryTop(aggregator, metric, n = 10, filters = {}) {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate(
      [
        ...filterStages(filters),
        ...aggregatorUnwindStages(aggregator),
        ...metricUnwindStages(metric),
        ...duplicateEliminationStages(aggregator, metric),
        ...aggregatorStages(aggregator),
        { $limit: n },
      ],
      { allowDiskUse: true },
    )
    .toArray();
}

module.exports = { aggregatorSet, metricSet, queryTop };
