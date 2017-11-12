import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = path => axios.get(path).then(response => response.data);

const encodeQueries = arr => arr.reduce((str, [key, value]) =>
  `${str + key}=${encodeURIComponent(value)}&`, '').slice(0, -1); // remove trailing &


export default {
  getVenues: () => get('venues'),
  getTrendStats: (params) => {
    const conferences = params.conferences
      .filter(([conf, year]) => conf.trim() !== '' && year.trim() !== '')
      .reduce((arr, [conf, year]) => {
        arr.push(['conference', conf]);
        arr.push(['year', year]);
        return arr;
      }, []);
    const queries = [['start', params.startYear], ['end', params.endYear]];
    console.log('compare query', `compare?${encodeQueries([...conferences, ...queries])}`);
    return get(`compare?${encodeQueries([...conferences, ...queries])}`);
  },
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

  getImpactStats: (params) => {
    console.log('querying', `year/${params.year}/impact-factor?top=${params.count}`);
    return get(`year/${params.year}/impact-factor?top=${params.count}`);
  },
  getCitationWeb: ({ paper, depth }) => get(`paper/${encodeURIComponent(paper.trim())}/web-citation?depth=${depth}`),
};
