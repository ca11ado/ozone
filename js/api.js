const URL = 'http://localhost:3009/api';

const API = {
  getMedia: (count = 1) => {
    return fetch(`${URL}/media/${count}`);
  }
};

module.exports = API;