const connection = require('../config/db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
    
async function storeInstitutions(request, response) {

    const params = Array(
        request.body.instuicao_cnpj,
        request.body.nome,
        request.body.email,
        bcrypt.hashSync(request.body.senha, 10),
        request.body.telefone,
        request.body.data_abertura,
        request.body.endereco,
        request.body.area_atuacao,
        request.body.nome_responsavel,
        request.body.necessidades_voluntarios,
        request.body.requisitos_voluntarios,
        request.body.certificacoes_afiliacoes,
        request.body.img_logo
    );
        
    const query = "INSERT INTO usuarios_instituicoes(instituicao_cnpj, nome, email, senha, telefone, data_abertura, endereco, area_atuacao, nome_responsavel, necessidades_voluntarios, requisitos_voluntarios, certificações_afiliacoes, img_logo) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";    
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