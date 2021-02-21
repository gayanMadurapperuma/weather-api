const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {cityService} = require('../services');

const addFavorite = catchAsync( async (req, res) => {
    const {body: {name, isFavorite}, userId} = req;
    const {id} = await cityService.addCity(name);
    const {favorite, created} = await cityService.addFavourite(id, userId, isFavorite);
    if(!created)
        await cityService.updateFavorite(favorite.id, isFavorite);
    res.status(httpStatus.OK).send();
});

const searchCity = catchAsync( async ({body: {cityName}, userId}, res) => {
    const result = await cityService.searchCity(cityName);
    const {id} = await cityService.addCity(cityName);
    await cityService.addRecent(id, userId);
    res.status(httpStatus.OK).send(result);
});

const getCities = catchAsync(async ({userId}, res) => {
    const [favorites, recents] = await Promise.all([cityService.getFavorite(userId), cityService.getRecents(userId)]);
    const [latestWeatherFa, latestWeatherRc] = await Promise.all([cityService.latestWeatherUpdate(favorites, 'favorites'), cityService.latestWeatherUpdate(recents)]);
    const cities = new Set(latestWeatherFa.map(e => e.name));
    const merged = [...latestWeatherFa, ...latestWeatherRc.filter(e => !cities.has(e.name))];
    res.status(httpStatus.OK).send({cities: merged});
})

const getRecents = catchAsync( async ({userId}, res) => {
    const recents = await cityService.getRecents(userId);
    const latestUpdate = await cityService.latestWeatherUpdate(recents);
    res.status(httpStatus.OK).send({latestUpdate});
});

const getFavorites = catchAsync(async ({userId}, res) => {
    const favorites = await cityService.getFavorite(userId);
    const latestWeatherUpdate = await cityService.latestWeatherUpdate(favorites, 'favorites');
    res.status(httpStatus.OK).send({latestUpdate: latestWeatherUpdate});
});

module.exports = {
    addFavorite,
    searchCity,
    getRecents,
    getFavorites,
    getCities
}