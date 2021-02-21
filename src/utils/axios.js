const axios = require('axios');
const {WHETHER_API_URL} = require('../config/config');

const instance = axios.create({
    baseURL: WHETHER_API_URL,
    timeout: 5000,
});

module.exports = instance;
