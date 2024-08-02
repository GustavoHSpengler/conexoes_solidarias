const connection = require('../config/db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

async function storeVolunteers(request, response) {

    console.log(request.body);
    
    const params = Array(
        request.body.usuario_cpf,
        request.body.nome,
        request.body.email,
        bcrypt.hashSync(request.body.senha, 10),
        request.body.telefone,
        request.body.data_nascimento,
        request.body.endereco,
        request.body.habilidades,
        request.body.interesses,
        request.body.nivel_experiencia,
        request.body.img_conta
    );

    console.log(params);

    const query = "INSERT INTO usuarios_voluntarios(usuario_cpf, nome, email, senha, telefone, data_nascimento, endereco, habilidades, interesses, nivel_experiencia, img_conta) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, params, (err, results) => {
        console.log(err, results);
         if (results) {
             response
                 .status(201)
                 .json({
                     success: true,
                     message: "Sucesso!", 
                     data: results
                 });
         } else {
             response
                 .status(400)
                 .json({
                     success: false,
                     message: "Ocorreu um problema!", 
                     sql: err
                 });
         }
    });
}

module.exports = {
    storeVolunteers
};