const connection = require('../config/db');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const fs = require("fs");
    const path = require("path");

    const uploadPath = path.join(__dirname, "..", "upload")

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}
    
async function storeInstitutions(request, response) {

    if (!request.files) {
        return response.status(400).json({
            sucess: false,
            message: "Você não enviou o arquivo imagem"
        })
    }

    const img = request.files.img_logo;
    const img_logo = Date.now() + path.extname(img.name)

    img.mv(path.join(uploadPath, img_logo), (erro) => {
        if(erro) {
            return response.status(400).json({
                sucess: false,
                message: "Erro ao mover arquivo"
            })
        }

        const params = Array(
            request.body.instuicao_cnpj,
            request.body.nome,
            request.body.email,
            bcrypt.hashSync(request.body.senha, 10),
            request.body.telefone,
            request.body.data_nascimento,
            request.body.endereco,
            request.body.area_atuacao,
            request.body.nome_responsavel,
            request.body.necessidades_voluntarios,
            request.body.requisitos_voluntarios,
            request.body.certificações_afiliacoes,
            img_logo
        );
        const query = "INSERT INTO usuarios_instituicoes(instituicao_cnpj, nome, email, senha, telefone, data_nascimento, endereco, area_atuacao, nome_responsavel, necessidades_voluntarios, requisitos_voluntarios, certificações_afiliacoes, img_logo) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    });
}

module.exports = {
    storeInstitutions
};