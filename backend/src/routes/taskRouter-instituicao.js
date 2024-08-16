const { Router } = require("express");
const routerInstitutions = Router();
const dowload = require("../config/multer");
const { storeInstitutions } = require("../controller/taskController-instituicao");


routerInstitutions.post("/storeInstitutions/task", dowload.single('img_logo') , storeInstitutions);

module.exports = routerInstitutions;