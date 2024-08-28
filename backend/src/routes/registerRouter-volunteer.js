const { Router } = require("express");
const routerVolunteer = Router();
const dowload = require("../config/multer");
const { storeVolunteers } = require("../controller/registerController-volunteer");

routerVolunteer.post("/storeVolunteers/register", dowload.single('img_conta'), storeVolunteers);

module.exports = routerVolunteer;