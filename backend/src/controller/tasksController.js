const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeTasks(request, response) {
  const { titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes, tipo_criador, criador_id } = request.body;

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
      img_tarefas,
      tipo_criador
  ];

  const query = "INSERT INTO tarefas_plataforma(titulo, descricao, endereco, duracao_estimada, materiais_necessarios, qnt_voluntarios_necessarios, observacoes, img_tarefas, tipo_criador) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(query, params, (err, results) => {
      if (err) {
          return response.status(400).json({
              success: false,
              message: "Ocorreu um problema ao criar a tarefa.",
              sql: err
          });
      }

      const tarefaId = results.insertId;

      let criadorColumn = tipo_criador === 'voluntario' ? 'id_criador_cpf' : 'id_criador_cnpj';
      const insertIdsQuery = `INSERT INTO tarefas_ids (id_tarefa, ${criadorColumn}) VALUES (?, ?)`;
      const insertParams = [tarefaId, criador_id];

      connection.query(insertIdsQuery, insertParams, (err) => {
          if (err) {
              return response.status(400).json({
                  success: false,
                  message: "Ocorreu um problema ao registrar o criador da tarefa.",
                  sql: err
              });
          }

          response.status(201).json({
              success: true,
              message: "Sucesso!",
              tarefaId: tarefaId
          });
      });
  });
}

async function getTasks(req, res) {
  const { tarefaId } = req.params;
  try {
      connection.query(
          'SELECT * FROM tarefas_plataforma',
          [tarefaId],
          (error, results) => {
              if (error) {
                  console.error(error);
                  return res.status(500).json({ message: 'Erro ao recuperar tarefa.' });
              }

              if (results.length === 0) {
                  return res.status(404).json({ message: 'Tarefa não encontrada.' });
              }

              res.status(200).json(results[0]);
          }
      );
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao recuperar tarefa.' });
  }
}

async function joinTasks(req, res) {
  const { tarefaId } = req.params;
  const { usuario_id, tipo_usuario } = req.body; 
  try {
      connection.query(
          'SELECT qnt_voluntarios_necessarios, criador_id, tipo_criador FROM tarefas_plataforma WHERE id = ?',
          [tarefaId],
          async (error, tarefa) => {
              if (error) {
                  console.error(error);
                  return res.status(500).json({ message: 'Erro ao recuperar tarefa.' });
              }

              if (tarefa.length === 0) {
                  return res.status(404).json({ message: 'Tarefa não encontrada.' });
              }

              const criadorId = tarefa[0].criador_id;
              const tipoCriador = tarefa[0].tipo_criador;
              const limiteVoluntarios = tarefa[0].qnt_voluntarios_necessarios;

              if (criadorId === usuario_id && tipoCriador === tipo_usuario) {
                  return res.status(400).json({ message: 'Você não pode participar da própria tarefa.' });
              }

              connection.query(
                  'SELECT COUNT(*) AS total FROM participantes WHERE tarefaId = ?',
                  [tarefaId],
                  async (error, participantes) => {
                      if (error) {
                          console.error(error);
                          return res.status(500).json({ message: 'Erro ao contar participantes.' });
                      }

                      if (participantes[0].total >= limiteVoluntarios) {
                          return res.status(400).json({ message: 'O limite de voluntários já foi atingido.' });
                      }

                      connection.query(
                          'INSERT INTO participantes (tarefaId, usuario_id, tipo_usuario) VALUES (?, ?, ?)',
                          [tarefaId, usuario_id, tipo_usuario],
                          (error) => {
                              if (error) {
                                  console.error(error);
                                  return res.status(500).json({ message: 'Erro ao adicionar participação.' });
                              }

                              return res.status(201).json({ message: 'Participação realizada com sucesso!' });
                          }
                      );
                  }
              );
          }
      );
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao participar da tarefa.' });
  }
}

module.exports = {
    storeTasks,
    getTasks,
    joinTasks,  
};