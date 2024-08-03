const { Router } = require("express");
const routerVolunteer = Router();

const { storeVolunteers } = require("../controller/taskController-voluntario");

routerVolunteer.post("/storeVolunteers/task", storeVolunteers);

module.exports = routerVolunteer;