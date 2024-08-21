const connection = require('../config/db');
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authenticateUser(tableName, email, senha) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tableName} WHERE email = ?`;
        const params = [email];

        connection.query(query, params, (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
                bcrypt.compare(senha, results[0].senha, (err, isMatch) => {
                    if (err) return reject(err);
                    if (isMatch) {
                        const id = results[0].id;
                        const token = jwt.sign({ userId: id, tableName }, process.env.JWT_SECRET, { expiresIn: '5m' });
                        resolve({
                            success: true,
                            message: `Sucesso! Usuário conectado.`,
                            data: {
                                ...results[0],
                                token: token
                            }
                        });
                    } else {
                        reject(new Error('Email ou senha está incorreto!'));
                    }
                });
            } else {
                reject(new Error('Não foi possível encontrar o usuário. Verifique o email informado.'));
            }
        });
    });
}

async function storeLogin(request, response) {
    try {
        let responseData;
        try {
            responseData = await authenticateUser('usuarios_voluntarios', request.body.email, request.body.senha);
        } catch (e) {
            if (e.message === 'Não foi possível encontrar o usuário. Verifique o email informado.') {
                responseData = await authenticateUser('usuarios_instituicoes', request.body.email, request.body.senha);
            } else {
                throw e;
            }
        }

        response.status(200).json(responseData);
    } catch (error) {
        response.status(401).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    storeLogin
};