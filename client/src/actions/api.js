import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = (path) => {
  console.log('getting', path);
  return axios.get(path).then(response => response.data);
};

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
    return get(`compare?${encodeQueries([...conferences, ...queries])}`).then((data) => {
      const yearMap = data.reduce((obj, fields) => {
        Object.entries(fields.citations).forEach(([year, count]) => {
          const label = `${fields.conference} (${fields.year})`;
          obj[year] = { // eslint-disable-line
            ...obj[year],
            [label]: ((obj[year] || {})[label] || 0) + count,
          };
        });
        return obj;
      }, {}); // { [year]: { confLabel: count } }
      console.log('year map', yearMap);
      return Object.entries(yearMap).reduce((arr, [year, value]) => {
        arr.push({ name: year, ...value });
        return arr;
      }, []); // [ { name: year, confLabel1: count, confLabel2: count, ... }]
    });
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
    return get(`top/${aggregator}/${metric}?${encodeQueries(filters)}`);
  },

  getImpactStats: params => get(`year/${params.year}/impact-factor?top=${params.count}`),
  getCitationWeb: ({ paper, depth }) => get(`paper/${encodeURIComponent(paper.trim())}/web-citation?depth=${depth}`),
};
