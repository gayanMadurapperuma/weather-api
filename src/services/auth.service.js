const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../models');
const {JWT_SECRET, JWT_EXPIRATION_TIME} = require('../config/config');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const tokenGenerate = (username, id) => {
    return jwt.sign({username, id}, JWT_SECRET, {expiresIn: JWT_EXPIRATION_TIME});
}

const saveToken = async (id, token) => {
    try {
        const tokenHash = await bcrypt.hash(token, 4);
        return await models.User.update({tokenHash}, {
            where: {id}
        });
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

module.exports = {
    tokenGenerate,
    saveToken
}