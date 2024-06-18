const { Router } = require("express");
const router = Router();

const { store } = require("../controller/taskController-voluntario");

router.post("/store/task", store);

module.exports = router;