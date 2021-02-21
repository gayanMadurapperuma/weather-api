const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {userService, authService} = require('../services');

const registerUser = catchAsync( async ({body}, res) => {
    await userService.registerUser(body);
    res.status(httpStatus.CREATED).send();
});

const loginUser = catchAsync(async ({body: {username, password}}, res) => {
    const user = await userService.loginUser(username, password);
    const token = authService.tokenGenerate(user.username, user.id);
    await authService.saveToken(user.id, token);
    res.status(httpStatus.OK).send({user, token});
});

module.exports = {
    registerUser,
    loginUser
}
