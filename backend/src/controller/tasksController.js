const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeTasks(request, response) {
    const { titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes } = request.body;

    const img_tarefas = request.files ? JSON.stringify(request.files.map(file => file.path)) : [];

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

    const query = "INSERT INTO tarefas_plataforma(titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes, img_tarefas) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                tarefaId: results.insertId
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Ocorreu um problema!",
                sql: err
            });
        }
    });
}

const participarTarefa = async (req, res) => {
    const { tarefaId } = req.params;
    const { usuarioId, tipoUsuario } = req.body; 
    try {
      const tarefa = await db.query(
        'SELECT * FROM tarefas_plataforma WHERE id = ?',
        [tarefaId]
      );
      
      if (tarefa.length === 0) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }
  
      const criadorId = tarefa[0].criador_id;
      const tipoCriador = tarefa[0].tipo_criador;
      const limiteVoluntarios = tarefa[0].qnt_voluntarios_necessarios;
  
      if (criadorId === usuarioId && tipoCriador === tipoUsuario) {
        return res.status(400).json({ message: 'Você não pode participar da própria tarefa.' });
      }
  
      const [participantes] = await db.query(
        'SELECT COUNT(*) AS total FROM participantes WHERE tarefaId = ?',
        [tarefaId]
      );
      
      if (participantes[0].total >= limiteVoluntarios) {
        return res.status(400).json({ message: 'O limite de voluntários já foi atingido.' });
      }
  
      await db.query(
        'INSERT INTO participantes (tarefaId, usuario_id, tipo_usuario) VALUES (?, ?, ?)',
        [tarefaId, usuarioId, tipoUsuario]
      );
  
      return res.status(201).json({ message: 'Participação realizada com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao participar da tarefa.' });
    }
};  


module.exports = {
    storeTasks,
    participarTarefa,  
};