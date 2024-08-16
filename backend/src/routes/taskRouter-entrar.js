const { Router } = require('express');
const loginRouter = Router();
const { storeLogin } = require('../controller/taskController.entrar')
const upload = require('../config/multer');

loginRouter.post('/storeLogin/login', storeLogin);

module.exports = loginRouter;