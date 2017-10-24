import axios from 'axios';

axios.defaults.baseURL = 'https://cs3219.ycholocron.com/';
// axios.defaults.baseURL = 'http://localhost:3020/';

const get = path => axios.get(path).then(response => response.data);

export default {
  getTopStats: ({ count, type, venue }) => get(`venue/${encodeURIComponent(venue)}/${type.toLowerCase()}?top=${count}`),
  getTrendStats: ({ type, venue }) => get(`venue/${encodeURIComponent(venue)}/${type.toLowerCase()}`),
  getCitationWeb: ({ paper, depth }) => get(`paper/${paper}/web-citation?depth=${depth}`),
  getTopVenues: ({ count, year }) => get(`year/${year}/avg-cite?top=${count}`),
};
