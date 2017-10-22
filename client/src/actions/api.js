import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3020/';

const get = path => axios.get(path).then(response => response.data);

export default {
  getTopStats: ({ count, type, venue }) => get(`/venue/${venue}/${type.toLowerCase()}?top=${count}`),
};
