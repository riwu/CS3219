import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = path => axios.get(path).then(response => response.data);

const encodeQueries = arr => arr.reduce((str, [key, value]) =>
  `${str + key}=${encodeURIComponent(value)}&`, '').slice(0, -1); // remove trailing &


export default {
  getVenues: () => get('venues'),
  getCompare: (conferences, years, start, end) => get(`compare?${encodeQueries(conferences, years, start, end)}`),
  getTopStats: (params) => {
    const aggregator = {
      Authors: 'author',
      Venues: 'venue',
      Papers: 'title',
      Years: 'year',
    }[params.aggregator];

    const metric = {
      'Number of papers': 'numPapers',
      'Citations made': 'numCites',
      'Times cited': 'numCitedBy',
      'Number of authors': 'numAuthors',
      'Number of venues': 'numVenues',
    }[params.metric];

    const filters = [['n', params.count], ['venue', params.venue], ['author', params.author], ['title', params.paper]]
      .filter(([key, value]) => value.trim() !== '');
    console.log('querying', `top/${aggregator}/${metric}?${encodeQueries(filters)}`);
    return get(`top/${aggregator}/${metric}?${encodeQueries(filters)}`);
  },

  getTrendStats: ({ type, venue }) => get(`venue/${encodeURIComponent(venue.trim())}/${type.toLowerCase()}`),
  getCitationWeb: ({ paper, depth }) => get(`paper/${encodeURIComponent(paper.trim())}/web-citation?depth=${depth}`),
  getTopVenues: ({ count, year }) => get(`year/${year}/avg-cite?top=${count}`),
};
