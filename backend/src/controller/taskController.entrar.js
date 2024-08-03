const connection = require('../config/db');
const dotenv = require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function storeLogin(request, response) {

    const checkLoginInTable = (tableName) => {
        
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName} WHERE email = ?`;
            const params = [request.body.email];

            console.log(params)
            connection.query(query, params, (err, results) => {
                if (err) return reject(err);

                if (results.length > 0) {
                    bcrypt.compare(request.body.senha, results[0].senha, (err, result) => {
                        if (err) return reject(err);
                        if (result) {
                            const id = results[0].id;
                            const token = jwt.sign({ userId: id, tableName }, process.env.JWT_SECRET, { expiresIn: '5m' });
                            
                            return resolve({
                                success: true,
                                message: `Sucesso! Usuário conectado.`,
                                data: {
                                    ...results[0],
                                    token: token
                                }
                            });
                        }
                        reject(new Error('Email ou senha está incorreto!'));
                    });
                } else {
                    reject(new Error('Não foi possível encontrar o usuário. Verifique o email informado.'));
                }
            });
        });
    };

    try {
        let responseData;
        
        try {
            responseData = await checkLoginInTable('usuarios_voluntarios');
        } catch (e) {
            if (e.message === 'Não foi possível encontrar o usuário. Verifique o email informado.') {
                responseData = await checkLoginInTable('usuarios_instituicoes');
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
}

