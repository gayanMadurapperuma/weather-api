const httpStatus = require('http-status');
const {QueryTypes} = require('sequelize');
const axios = require('axios');
const models = require('../../models');
const ApiError = require('../utils/ApiError');
const {WEATHER_API_KEY, WHETHER_API_URL} = require('../config/config');
const { sequelize } = require('../../models');
const { NOW } = require('sequelize');

const addCity = async (name) => {
    try {
        const [city] = await models.City.findOrCreate({where: {name}});
        return city;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const addFavourite = async (cityId, userId, isFavorite) => {
    try {
        // const [city] = await models.City.findOrCreate({where: {name}});
        const [favorite, created] = await models.Favorite.findOrCreate({where: {cityId, userId}, defaults: {isFavorite}});
        return {favorite, created};
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const searchCity = async (cityName) => {
    try {
        const {data} = await axios.get(`${WHETHER_API_URL}q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const addRecent = async (cityId, userId) => {
    try {
        const [recent, created] = await models.Recent.findOrCreate({where: {cityId, userId}});
        if(!created){
            await models.sequelize.query(
                    'UPDATE Recents SET updatedAt = NOW() WHERE cityId = :cityId and userId = :userId',
                    {
                        replacements: {cityId, userId},
                        type: QueryTypes.UPDATE
                    }
                );
        }
        return recent;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const updateFavorite = async (id, isFavorite) => {
    try {
        await models.sequelize.query(
            'UPDATE Favorites SET isFavorite = :isFavorite WHERE id = :id',
            {
                replacements: {isFavorite, id},
                type: QueryTypes.UPDATE
            }
        );
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const getRecents = async (userId) => {
    try {
        return await models.Recent.findAll({
            where: {userId},
            attributes: ['id', 'cityId', 'updatedAt'],
            include: [{
                model: models.City,
                attributes: ['name'] 
            }]
        });
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const getFavorite = async (userId) => {
    try {
        return await models.Favorite.findAll({
            where: {userId, isFavorite: true},
            attributes: ['id', 'cityId', 'updatedAt', 'isFavorite'],
            include: [{
                model: models.City,
                attributes: ['name'] 
            }]
        });
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

const latestWeatherUpdate = async (cities, tag = 'recent') => {
    try {
        if(!Array.isArray(cities)){
            throw new Error();
        }
        const latestUpdate = cities.map(async (e) => {
            const {City: {name}, id, updatedAt} = e;
            let isFavorite = false;
            if(tag === 'favorites'){
                isFavorite =  e.isFavorite;
            }
            const weather = await searchCity(name);
            return {
                id,
                tag,
                isFavorite,
                updatedAt,
                name,
                weather,
            };
        });
        return await Promise.all(latestUpdate);
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST);
    }
}

module.exports = {
    addCity,
    addFavourite,
    searchCity,
    updateFavorite,
    addRecent,
    getRecents,
    latestWeatherUpdate,
    getFavorite
}