const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const routerVolunteer = require("./routes/taskRouter-voluntario");
const loginRouter = require("./routes/taskRouter-entrar");
const routerInstitutions = require("./routes/taskRouter-instituicao");

app.set("port", process.env.PORT || 3306);
app.use(express.json()); 
app.use(cors());

app.use('/api', [
    routerVolunteer,
    routerInstitutions,
    loginRouter
]);

module.exports = app;