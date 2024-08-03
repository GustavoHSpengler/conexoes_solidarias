const { Router } = require('express');
const loginRouter = Router();
const { storeLogin } = require('../controller/taskController.entrar')

loginRouter.post('/storeLogin/login', storeLogin);

module.exports = loginRouter;