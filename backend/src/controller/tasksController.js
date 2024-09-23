const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeTasks(request, response) {
    const { titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes } = request.body;

    const img_tarefa = request.file ? request.file.path : null;

    if (!img_tarefa) {
        return response.status(400).json({
            success: false,
            message: "Imagem da tarefa é obrigatória!"
        });
    }

    const params = [
        titulo,
        descricao,
        endereco,
        duracao_estimada,
        materiais_necessarios,
        qnt_voluntarios_necessarios,
        observacoes,
        img_tarefa
    ];

    const query = "INSERT INTO tarefas_plataforma(titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes, img_tarefa) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    
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
    storeTasks
};