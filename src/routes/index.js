const express = require('express');
const userRoute = require('./user.route');
const cityRoute = require('./city.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/city', cityRoute);

module.exports = router;