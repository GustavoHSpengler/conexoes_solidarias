const connection = require('../config/db');
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function storeLogin(request, response) {
    const query = "SELECT * FROM usuarios_voluntarios WHERE email = ?";
    
    const params = [
        request.body.email
    ];

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: `Erro na consulta ao banco de dados`,
                query: err.sql,
                sqlMessage: err.sqlMessage
            });
        }

        if (results.length > 0) {
            bcrypt.compare(request.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return response.status(401).send({
                        success: false,
                        message: 'Email ou senha está incorreto!'
                    });
                } else if (result) {
                    const id = results[0].id; 
                    const token = jwt.sign({ userId: id }, 'the-super-strong-secret', { expiresIn: '5m' }); 
                    
                    response.status(200).json({
                        success: true,
                        message: `Sucesso! Usuário conectado.`,
                        data: {
                            ...results[0],
                            token: token
                        }
                    });
                } else {
                    return response.status(401).send({
                        success: false,
                        message: 'Email ou senha está incorreto!'
                    });
                }
            });
        } else {
            response.status(400).json({
                success: false,
                message: `Não foi possível encontrar o usuário. Verifique o email informado.`
            });
        }
    });
}

module.exports = {
    storeLogin
}
