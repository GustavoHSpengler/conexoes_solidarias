const { Router } = require("express");
const taskRouter = Router();
const upload = require("../config/multer");
const { storeTasks, getTasks, joinTasks } = require("../controller/tasksController");

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

/**
 * @swagger
 * /tasks/:id:
 *  get:
 *    summary: Recuperar tarefas.
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

/**
 * @swagger
 * /tasks/:tarefaId/participar:
 *  post:
 *    summary: Participar das tarefas.
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
taskRouter.get("/tasks/:id", getTasks);
taskRouter.post("/tasks/:tarefaId/participar", joinTasks);

module.exports = taskRouter;