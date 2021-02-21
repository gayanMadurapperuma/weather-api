const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const models = require('../../models');
const ApiError = require('../utils/ApiError');

const registerUser = async (payload) => {
    try {
        return await models.User.create(payload);   
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Can not create user');
    }
}

const loginUser = async (username, password) => {
    try {
        const user = await models.User.findOne({username});
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            throw new Error(httpStatus.UNAUTHORIZED, 'Username or password incorrect');
        };
        return user;
    } catch (error) {
        throw new Error(httpStatus.UNAUTHORIZED);
    }
}

module.exports = {
    registerUser,
    loginUser
}