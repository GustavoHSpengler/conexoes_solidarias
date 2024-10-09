const { Router } = require("express");
const routerVolunteer = Router();
const upload = require("../config/multer");
const { storeVolunteers } = require("../controller/registerController-volunteer");

/**
 * @swagger
 * /storeVolunteers/register:
 *  post:
 *    summary: Cadastro das voluntários.
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

routerVolunteer.post("/storeVolunteers/register", upload.single('img_conta'), storeVolunteers);

module.exports = routerVolunteer;