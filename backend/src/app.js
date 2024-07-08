const express = require("express");
const dotenv = require("dotenv").config();
const taskRouter_voluntario = require("./routes/taskRouter-voluntario");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(cors());

app.set("port", process.env.PORT || 3025);
app.use("/api", taskRouter_voluntario);

app.listen(app.get("port"), () => {
    console.log(`Server running on port ${app.get("port")}`);
});

module.exports = app;
