const express = require("express");
const dotenv = require("dotenv").config();
const cors    = require("cors");

const app = express();

const routerVolunteer = require("./routes/taskRouter-voluntario");
const loginRouter = require("./routes/taskRouter-entrar");

app.set("port", process.env.PORT || 3306);
app.use(express.json()); 
app.use(cors());

app.use('/api', [
    routerVolunteer,
    loginRouter
]);

module.exports = app;