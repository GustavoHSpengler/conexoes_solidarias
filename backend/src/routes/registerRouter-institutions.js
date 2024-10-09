const { Router } = require("express");
const routerInstitutions = Router();
const upload = require("../config/multer");
const { storeInstitutions } = require("../controller/registerController-institutions");

/**
 * @swagger
 * /storeInstitutions/register:
 *  post:
 *    summary: Cadastro das intituições
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

routerInstitutions.post("/storeInstitutions/register", upload.single('img_logo'), storeInstitutions);

module.exports = routerInstitutions;