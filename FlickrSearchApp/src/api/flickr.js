var axios = require('axios');

export default axios.create({
  method: 'get',
  baseURL: 'https://www.flickr.com/services/rest/',
});