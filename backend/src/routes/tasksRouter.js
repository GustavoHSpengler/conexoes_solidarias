const { Router } = require("express");
const taskRouter = Router();
const upload = require("../config/multer");
const { storeTasks, participarTarefa } = require("../controller/tasksController");

/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: Criação das tarefas.
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

taskRouter.post("/tasks", upload.array('img_tarefas'), storeTasks);
taskRouter.post("/tasks/:id", storeTasks);
taskRouter.post("/tasks/:tarefaId/participar", participarTarefa);

module.exports = taskRouter;