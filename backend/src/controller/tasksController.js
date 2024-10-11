const connection = require('../config/db');
const dotenv = require('dotenv').config();


async function storeTasks(request, response) {
    const { titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes } = request.body;

    const img_tarefas = request.files ? request.files.map(file => file.path) : [];


    if (img_tarefas.length === 0) {
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
        img_tarefas
    ];

    console.log(params);

    const query = "INSERT INTO tarefas_plataforma(titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes, img_tarefas) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                tarefaId: results.insertId
            });
        } else {
            response.status(400).json({//
                success: false,
                message: "Ocorreu um problema!",
                sql: err
            });
        }
    });
}

module.exports = {
    storeTasks,
    participarTarefa: async function(request, response) {
        const { tarefaId } = request.params;
        response.json({ success: true });
    }
};