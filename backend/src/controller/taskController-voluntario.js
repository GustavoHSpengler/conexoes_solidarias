const connection = require('../config/db');
const mysql = require('../config/db');
const dotenv = require('dotenv').config();

async function storeVoluntario(request, response) {
    const params = Array(
        request.body.usuario_cpf,
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.telefone,
        request.body.data_nascimento,
        request.body.endereco,
        request.body.habilidades,
        request.body.interesses,
        request.body.nivel_experiencia,
        request.body.img_conta
    );

    const query = "INSERT INTO usuarios_voluntarios(usuario_cpf, nome, email, senha, telefone, data_nascimento, endereco, habilidades, interesses, nivel_experiencia, img_conta) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    connection.query(query, params, (err, results) => {
        if (results){
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso!", 
                    data: results
                })
        }   else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Putz!", 
                    sql: err
                })
        }
    });
}

module.exports = {
    storeVoluntario
}