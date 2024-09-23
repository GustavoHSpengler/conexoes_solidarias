const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const routerVolunteer = require("./routes/registerRouter-volunteer");
const routerInstitutions = require("./routes/registerRouter-institutions");
const loginRouter = require("./routes/loginRouter");
const tasksRouter = require("./routes/tasksRouter");

app.set("port", process.env.PORT || 3306);
app.use(express.json());
const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cors());


app.use('/api', [
    routerVolunteer,
    routerInstitutions,
    loginRouter,
    tasksRouter
]);

module.exports = app;