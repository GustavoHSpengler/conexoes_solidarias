const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

// Configuração da porta
app.set("port", process.env.PORT || 3306);

// Configuração do CORS (especifique a origem do frontend)
app.use(cors({
    origin: 'http://localhost:3000', // Altere para a origem do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Permitir envio de cookies, se necessário
}));

// Middleware para tratar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rotas da API
const routerVolunteer = require("./routes/registerRouter-volunteer");
const routerInstitutions = require("./routes/registerRouter-institutions");
const loginRouter = require("./routes/loginRouter");
const taskRouter = require("./routes/tasksRouter");

app.use('/api', [
    routerVolunteer,
    routerInstitutions,
    loginRouter,
    taskRouter
]);

// Exportar a aplicação
module.exports = app;
