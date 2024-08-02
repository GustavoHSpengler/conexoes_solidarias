const express = require("express");
const dotenv = require("dotenv").config();
const taskRouter_voluntario = require("./routes/taskRouter-voluntario");
// const taskRouter_entrar = require("./routes/taskRouter-entrar");
const cors = require("cors");

const app = express();

app.use(express.json()); 
app.use(cors());
app.set("port", process.env.PORT || 3306);

app.use("/api", taskRouter_voluntario);

module.exports = app;