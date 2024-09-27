const { Router } = require("express");
const taskRouter = Router();
const upload = require("../config/multer");
const { storeTasks } = require("../controller/tasksController");

taskRouter.post("/tasks", upload.array('img_tarefa'), storeTasks);

module.exports = taskRouter;