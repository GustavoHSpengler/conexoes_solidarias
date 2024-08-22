const connection = require('../config/db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

async function storeInstitutions(request, response) {
    const { instituicao_cnpj, nome, email, telefone, data_abertura, endereco, area_atuacao, nome_responsavel, necessidades_voluntarios, requisitos_voluntarios, certificacoes_afiliacoes } = request.body;
    
    const img_logo = request.file ? request.file.path : null;

    if (!img_logo) {
        return response.status(400).json({
            success: false,
            message: "Imagem de perfil é obrigatória!"
        });
    }

    const senha = bcrypt.hashSync(request.body.senha, 10);

    const params = [
        instituicao_cnpj,
        nome,
        email,
        senha,
        telefone,
        data_abertura,
        endereco,
        area_atuacao,
        nome_responsavel,
        necessidades_voluntarios,
        requisitos_voluntarios,
        certificacoes_afiliacoes,
        img_logo
    ];
    
    const query = "INSERT INTO usuarios_instituicoes(instituicao_cnpj, nome, email, senha, telefone, data_abertura, endereco, area_atuacao, nome_responsavel, necessidades_voluntarios, requisitos_voluntarios, certificacoes_afiliacoes, img_logo) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
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
    storeInstitutions
};