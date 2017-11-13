const express = require('express');
const _ = require('lodash');
const { queryCitationYearMap } = require('../db/compare');
const { queryRootPaper, queryGraph } = require('../db/web-citation');
const { queryTop } = require('../db/top');
const { queryImpactFactor } = require('../db/impact-factor');
const { queryVenues } = require('../db/venues');
const { queryTitles } = require('../db/titles');

const router = express.Router();

/**
 * Compare API
 *
 * This API compares two difference conferences (or venue) from two years.
 *
 * Each conference is analyzed based on citations made in it's papers. These citations are grouped
 * by the cited paper's year and the total count for each conference year pair is provided for each
 * of the years.
 *
 * Parameters:
 *    URL: None
 *    Query:
 *        - conference: A conference (or venue name) to compare. Multiple values should be specified
 *                      to form an array.
 *        - year: A year for the conference specified. Multiple values should be specified to form
 *                an array. Be sure to specify them in the same order as conference.
 *        - start: The start year (inclusive) for collating citation counts. No limit is set if
 *                 omitted.
 *        - end: The end year (inclusive) for collating citation counts. No limit is set if omitted.
 *    /compare?conference=ArXiv&year=2010&conference=ICSE&year=2011&start=1996&end=1999
 * Returns: A JSON array with yearly citation counts for each conference specified
 *  [
 *    {
 *      citations: {
 *        1996: 1,
 *        1998: 3,
 *        1999: 4,
 *      },
 *      conference: "ArXiv",
 *      year: 2010
 *    },
 *    {
 *      citations: {
 *        1997: 1,
 *        1999: 1
 *    },
 *    conference: "ICSE",
 *    year: 2011
 *    }
 *  ]
 */
router.get('/compare', async (req, res) => {
  // Conference and year may be single value or an array
  const conferences = _.castArray(req.query.conference);
  const years = _.castArray(req.query.year).map(yr => parseInt(yr, 10));

  const { start, end } = req.query;
  const parsedStart = start === undefined ? null : parseInt(start, 10);
  const parsedEnd = end === undefined ? null : parseInt(end, 10);

  const conferenceYearObjs = _(conferences)
    .zip(years)
    .map(pair => ({ conference: pair[0], year: pair[1] }));

  const results = conferenceYearObjs
    .map(({ conference, year }) => queryCitationYearMap(conference, year, parsedStart, parsedEnd))
    .value();

  const formattedResults = _(await Promise.all(results))
    .map(result => _(result).keyBy('cite_year').mapValues('cite_count'))
    .zip(conferenceYearObjs.value())
    .map(result => Object.assign({ citations: result[0] }, result[1]))
    .value();

  res.send(formattedResults);
});

/**
 * Top API
 *
 * This API endpoint returns "top" statistics. There are 3 options for this API.
 *
 * :aggregator is the category to analyze. For example, using "year" as the aggregator
 * will give counts for the metrics grouped by a paper's year.
 *
 * :metric is the thing to count. For example, using "numCitations" will count the number
 * citations within a aggregate group.
 *
 * Filters can be specified in the query parameters. Specifying filters reduces the scope of
 * the search. For example, specifying "year=2010" will only consider papers published in 2010.
 *
 * Parameters:
 *    URL:
 *        - aggregator: The category to group by, can be either of
 *                      ['author', 'venue', 'title', 'year']
 *        - metric: The metric to count with, can be either of
 *                  ['numPapers', 'numCites', 'numCitedBy', 'numAuthors', 'numVenues']
 *    Query:
 *        - n: The number of top entries to return, defaults to 10
 *        - venue: The paper's venue to filter by
 *        - title: The paper's title to filter by
 *        - author: The author's name to filter by
 *  /top/year/numCitedBy?conference=ArXiv
 * Returns: A JSON object mapping aggregator category to count
 *  {
 *    2007: 37590,
 *    2008: 41941
 *  }
 */
router.get('/top/:aggregator/:metric', async (req, res) => {
  const { aggregator, metric } = req.params;
  const {
    n, venue, title, author,
  } = req.query;
  const year = parseInt(req.query.year, 10);
  const parsedN = n === undefined ? 10 : parseInt(n, 10);

  try {
    const results = await queryTop(
      aggregator,
      metric,
      parsedN,
      {
        venue, title, year, author,
      },
    );
    res.send(_.chain(results).keyBy('_id').mapValues('count').value());
  } catch (ex) {
    res.send(404);
  }
});

/**
 * Citation Web API
 *
 * The API to query for a citation web. This API accepts a paper title to use as the "root" paper.
 * Subsequently, each paper citing the root paper is included, and then all papers citing these
 * papers are included and so on. The process occurs in a breadth-first manner.
 *
 * Finally, all papers included are returned in an adjacency list manner, with directed edges
 * pointing out from the root. The "depth" of each paper is also included.
 *
 * Parameters:
 *    URL:
 *        - paper: The title of the paper to use as the root
 *    Query:
 *        - depth: The number of times we find and include papers citing the included papers
 * /paper/Low-density%20parity%20check%20codes%20over%20GF(q)/web-citation?depth=5
 * Return: A JSON object mapping paper id to it's adjacency list information. A "topId" mapping
 *         indicates the root paper's id.
 *  {
 *    topId: "36adf8c327b95bdffe2778bf022e0234d433454a",
 *    36adf8c327b95bdffe2778bf022e0234d433454a: {
 *      id: "36adf8c327b95bdffe2778bf022e0234d433454a",
 *      inCitations: [
 *        "841b2570545a4e9764bdf9e8a96fe3abaa53f9ce",
 *        "9db35e9a16375857fcadcc0d34de8b82985771b4",
 *        ...
 *      ],
 *    },
 *    841b2570545a4e9764bdf9e8a96fe3abaa53f9ce: {
 *      id: "841b2570545a4e9764bdf9e8a96fe3abaa53f9ce",
 *      depth: 1,
 *      inCitations: [...],
 *    },
 *    ...
 *  }
 */
router.get('/paper/:paper/web-citation', async (req, res) => {
  const title = req.params.paper;
  const { depth } = req.query;
  const parsedDepth = depth === undefined ? 2 : parseInt(depth, 10);

  const rootPaper = await queryRootPaper(title);

  if (rootPaper === null) {
    res.send(404);
    return;
  }

  const webPapers = await queryGraph(rootPaper._id, parsedDepth);
  const results = Object.assign(
    { topId: rootPaper.id, [rootPaper.id]: rootPaper },
    _(webPapers).keyBy('id').value(),
  );
  res.send(results);
});

/**
 * Impact Factor API.
 *
 * This API returns the Impact Factor for venues for a given year.
 *
 * Impact Factor based on the definition here: https://en.wikipedia.org/wiki/Impact_factor.
 *
 * Only the top few venues are returned, defaulting to 10.
 *
 * Parameters:
 *    - URL:
 *        - year: The year to analyze impact factor for
 *    - Query:
 *        - top: The number of results to return
 *  /year/2010/impact-factor?top=3
 * Return: A JSON object mapping venue name to impact factor
 *  {
 *    Journal of Cardiovascular Magnetic Resonance: 320,
 *    WSDM: 290,
 *    Annals of GIS: 244
 *  }
 */
router.get('/year/:year/impact-factor', async (req, res) => {
  const { year } = req.params;
  const { top } = req.query;
  const parsedTop = top === undefined ? 10 : parseInt(top, 10);
  const yearInt = parseInt(year, 10);

  const result = await queryImpactFactor(yearInt, parsedTop);
  res.send(_(result).keyBy('_id').mapValues('impactFactor').value());
});

/**
 * Venues API
 *
 * Returns all venues as an array.
 *
 * Parameters: None
 * Returns: An array of all venues
 *  ['ArXiv', ...]
 */
router.get('/venues', async (req, res) => {
  const result = await queryVenues();
  res.send(result.map(venue => venue._id));
});

router.get('/titles', async (req, res) => {
  const result = await queryTitles();
  res.send(result.map(title => title._id));
});

module.exports = router;
