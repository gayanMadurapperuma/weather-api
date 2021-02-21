const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const models = require('../../models');
const {JWT_SECRET} = require('../config/config');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : JWT_SECRET
},
async function ({jwtPayload}, done) {
        try {
            const {id} = jwtPayload;
            // const {tokenHash} = await models.User.findByPk(id);
            // const match = await bcrypt.compare(tokenHash, ExtractJWT.fromAuthHeaderAsBearerToken());
            // if(!match){
            //     done('Token hash not match');
            // }
            return done(null, {id})
        } catch (error) {
            return done(error);
        }
    }
))