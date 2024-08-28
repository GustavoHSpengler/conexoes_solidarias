const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const routerVolunteer = require("./routes/registerRouter-volunteer");
const loginRouter = require("./routes/loginRouter");
const routerInstitutions = require("./routes/registerRouter-institutions");

app.set("port", process.env.PORT || 3306);
app.use(express.json()); 
app.use(cors());

app.use('/api', [
    routerVolunteer,
    routerInstitutions,
    loginRouter
]);

module.exports = app;