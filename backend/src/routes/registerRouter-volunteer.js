const { Router } = require("express");
const routerVolunteer = Router();
const upload = require("../config/multer");
const { storeVolunteers } = require("../controller/registerController-volunteer");

routerVolunteer.post("/storeVolunteers/register", upload.single('img_conta'), storeVolunteers);

module.exports = routerVolunteer;