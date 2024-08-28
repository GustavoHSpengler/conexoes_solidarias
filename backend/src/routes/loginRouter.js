const { Router } = require('express');
const loginRouter = Router();
const { storeLogin } = require('../controller/loginController')

loginRouter.post('/storeLogin', storeLogin);

module.exports = loginRouter;