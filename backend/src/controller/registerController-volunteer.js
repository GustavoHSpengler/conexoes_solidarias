const connection = require('../config/db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

async function storeVolunteers(request, response) {
    const { usuario_cpf, nome, email, telefone, data_nascimento, endereco, habilidades, interesses, nivel_experiencia } = request.body;
    
    const img_conta = request.file ? request.file.path : null;

    if (!img_conta) {
        return response.status(400).json({
            success: false,
            message: "Imagem de perfil é obrigatória!"
        });
    }

    const senha = bcrypt.hashSync(request.body.senha, 10);

    const params = [
        usuario_cpf,
        nome,
        email,
        senha,
        telefone,
        data_nascimento,
        endereco,
        habilidades,
        interesses,
        nivel_experiencia,
        img_conta
    ];

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