const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const {PORT} = require('./config/config');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
require('../models');

const app = express();

// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`APP LISTENNING AT PORT ${PORT}`);
})