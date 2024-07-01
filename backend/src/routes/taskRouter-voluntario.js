const { Router } = require("express");
const router = Router();

const { storeVoluntario } = require("../controller/taskController-voluntario");

router.post("/storeVoluntario/task", storeVoluntario);

module.exports = router;