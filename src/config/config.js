const dotenv = require('dotenv');
const path = require('path');
// const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    WHETHER_API_URL: process.env.WHETHER_API_URL
};
