const { Router } = require("express");
const routerVolunteer = Router();
const dowload = require("../config/multer");
const { storeVolunteers } = require("../controller/taskController-voluntario");

routerVolunteer.post("/storeVolunteers/task", dowload.single('img_conta'), storeVolunteers);

module.exports = routerVolunteer;