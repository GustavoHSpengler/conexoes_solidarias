const { Router } = require("express");
const routerInstitutions = Router();
const { storeInstitutions } = require("../controller/taskController-instituicao");

routerInstitutions.post("/storeInstitutions/task", storeInstitutions);

module.exports = routerInstitutions;