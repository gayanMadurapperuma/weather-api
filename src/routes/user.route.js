const express = require('express');
// const passport = require('passport');
const userController = require('../controllers/user.controller');
// require('../utils/passport');

const router = express.Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;