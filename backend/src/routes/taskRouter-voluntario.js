const { Router } = require("express");
const router = Router();

const { storeVolunteers } = require("../controller/taskController-voluntario");

router.post("/storeVolunteers/task", storeVolunteers);

module.exports = router;