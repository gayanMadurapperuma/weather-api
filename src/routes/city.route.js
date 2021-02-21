const express = require('express');
// const passport = require('passport');
const userController = require('../controllers/city.controller');
const  {SessionVerificaiton} = require('../utils/Session');

const router = express.Router();

router.use(SessionVerificaiton);

router.post('/favorite', userController.addFavorite);

router.post('/search', userController.searchCity);

router.get('/recents', userController.getRecents);

router.get('/favorites', userController.getFavorites);

router.get('/cities', userController.getCities);

module.exports = router;