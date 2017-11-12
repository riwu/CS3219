import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = path => axios.get(path).then(response => response.data);

const encodeQueries = () => arguments.reduce((str, [key, value]) =>
  `${str + key}=${encodeURIComponent(value)}&`, '').slice(0, -1); // remove trailing &


export default {
  getVenues: () => get('venues'),
  getCompare: (conference, year, start, end) => get(`compare?${encodeQueries(conference, year, start, end)}`),

  getTopStats: ({ count, type, venue }) => get(`venue/${encodeURIComponent(venue.trim())}/${type.toLowerCase()}?top=${count}`),
  getTrendStats: ({ type, venue }) => get(`venue/${encodeURIComponent(venue.trim())}/${type.toLowerCase()}`),
  getCitationWeb: ({ paper, depth }) => get(`paper/${encodeURIComponent(paper.trim())}/web-citation?depth=${depth}`),
  getTopVenues: ({ count, year }) => get(`year/${year}/avg-cite?top=${count}`),
};
