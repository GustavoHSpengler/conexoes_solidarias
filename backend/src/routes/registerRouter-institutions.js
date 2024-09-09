const { Router } = require("express");
const routerInstitutions = Router();
const upload = require("../config/multer");
const { storeInstitutions } = require("../controller/registerController-institutions");

routerInstitutions.post("/storeInstitutions/register", upload.single('img_logo'), storeInstitutions);

module.exports = routerInstitutions;