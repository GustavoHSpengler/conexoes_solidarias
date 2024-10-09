const { Router } = require('express');
const loginRouter = Router();
const { storeLogin } = require('../controller/loginController')

/**
 * @swagger
 * /storeLogin:
 *  post:
 *    summary: Fazendo o Login 
 *    responses:
 *      200:  
 *        description: Sucesso!
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object  
 */

loginRouter.post('/storeLogin', storeLogin);

module.exports = loginRouter;