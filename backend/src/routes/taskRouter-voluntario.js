const { Router } = require("express");
const router = Router();

const { storeVoluntario } = require("../controller/taskController-voluntario");

router.post("/store/task", storeVoluntario);

module.exports = router;