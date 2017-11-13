import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = (path) => {
  console.log('getting', path);
  return axios.get(path).then(response => response.data);
};

const encodeQueries = arr => arr.reduce((str, [key, val]) => {
  const value = typeof val === 'string' ? val.trim() : val;
  if (value === undefined || value === null || value === '') {
    return str;
  }
  return `${str + key}=${encodeURIComponent(value)}&`;
}, '').slice(0, -1);

const mapToArr = (obj, label, sortByValue) => {
  const arr = Object.entries(obj).map(([key, value]) =>
    ({ name: key, [label]: Math.round(value) }));
  if (sortByValue) {
    arr.sort((obj1, obj2) => obj2[label] - obj1[label]); // eslint-disable-line
  }
  return arr;
};

export default {
  getVenues: () => get('venues').then(venues =>
    venues.map(venue => ({ label: venue, value: venue }))),
  getTitles: () => get('titles').then(titles =>
    titles.map(title => ({ label: title, value: title }))),
  getTrendStats: (params) => {
    const conferences = params.conferences
      .filter(([conf, year]) => conf.trim() !== '' && year.trim() !== '');
    const conferenceQuery = conferences.reduce((arr, [conf, year]) => {
      arr.push(['conference', conf]);
      arr.push(['year', year]);
      return arr;
    }, []);
    const queries = [['start', params.startYear], ['end', params.endYear],
      ['filterConference', (params.filterConference || {}).label]];
    const getLabel = (conference, year) => `${conference} (${year})`;
    return get(`compare?${encodeQueries([...conferenceQuery, ...queries])}`).then((data) => {
      const yearMap = data.reduce((obj, fields) => {
        Object.entries(fields.citations).forEach(([year, count]) => {
          const label = getLabel(fields.conference, fields.year);
          obj[year] = { // eslint-disable-line
            ...obj[year],
            [label]: ((obj[year] || {})[label] || 0) + count,
          };
        });
        return obj;
      }, {}); // { [year]: { confLabel: count } }
      console.log('year map', yearMap, conferences);
      return Object.entries(yearMap).reduce((arr, [year, value]) => {
        arr.push({
          name: year,
          ...conferences.reduce((obj, [conf, confYear]) => {
            const label = getLabel(conf, confYear);
            obj[label] = value[label] || 0; // eslint-disable-line
            return obj;
          }, {}),
        });
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

    const filters = [['n', params.count], ['venue', (params.venue || {}).label || ''],
      ['author', params.author], ['title', (params.paper || {}).label || '']];
    return get(`top/${aggregator}/${metric}?${encodeQueries(filters)}`)
      .then(data => mapToArr(data, params.metric, params.aggregator === 'Years'));
  },

  getImpactStats: params => get(`year/${params.year}/impact-factor?top=${params.count}`)
    .then(data => mapToArr(data, 'Impact factor')),
  getCitationWeb: ({ paper, depth }) => get(`paper/${encodeURIComponent(paper.trim())}/web-citation?depth=${depth}`),
};
