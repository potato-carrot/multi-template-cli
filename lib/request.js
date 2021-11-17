const { REPO } = require('./config');
const axios = require('axios');

axios.interceptors.response.use((res) => {
  return res.data;
});


async function getTagList() {
  return await axios.get(`https://api.github.com/repos/${REPO}/tags`);
}

module.exports = {
  getTagList,
};
