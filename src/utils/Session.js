const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../../models');
const {JWT_SECRET, JWT_EXPIRATION_TIME} = require('../config/config');
const ApiError = require('../utils/ApiError');

const SessionVerificaiton = async (req, res, next) => {
    try {
        const token = req.headers['x-auth'];
        const {id} = jwt.verify(token, JWT_SECRET);
        const {tokenHash} = await models.User.findOne({where: {id}});
        const match = await bcrypt.compare(token, tokenHash);
        if(!match){
            throw new Error();
        }
        req.userId = id;
        next();
    } catch (error) {
        res.status(httpStatus.FORBIDDEN).send();
    }
}

module.exports = {SessionVerificaiton};