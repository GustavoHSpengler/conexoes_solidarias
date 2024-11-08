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
        const query = tarefaId 
            ? 'SELECT * FROM tarefas_plataforma WHERE id = ?' 
            : 'SELECT * FROM tarefas_plataforma'; 

        connection.query(
            query,
            tarefaId ? [tarefaId] : [],
            (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Erro ao recuperar a tarefa.' });
                }

                if (tarefaId && results.length === 0) {
                    return res.status(404).json({ message: 'Tarefa não encontrada.' });
                }

                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao recuperar a tarefa.' });
    }
}

async function joinTasks(req, res) {
    const tarefaId = req.params.tarefaId;
    const { usuario_id, tipo_usuario } = req.body;

    if (tipo_usuario !== 'voluntario') {
        return res.status(400).json({ success: false, message: 'Apenas voluntários podem participar de tarefas.' });
    }

    try {
        const tarefaQuery = `
            SELECT tp.qnt_voluntarios_necessarios, ti.tipo_criador, ti.id_criador_cpf, ti.id_criador_cnpj
            FROM tarefas_plataforma AS tp
            JOIN tarefas_ids AS ti ON tp.id = ti.id_tarefa
            WHERE tp.id = ?
        `;

        connection.query(tarefaQuery, [tarefaId], (error, tarefaResults) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'Erro ao recuperar tarefa.' });
            }

            if (tarefaResults.length === 0) {
                return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
            }

            const tarefa = tarefaResults[0];
            const { tipo_criador, id_criador_cpf, id_criador_cnpj, qnt_voluntarios_necessarios } = tarefa;

            let criadorId = null;
            if (tipo_criador === 'voluntario') {
                criadorId = id_criador_cpf;
            } else if (tipo_criador === 'instituicao') {
                criadorId = id_criador_cnpj;
            }

            if ((tipo_criador === 'voluntario' && criadorId === usuario_id) ||
                (tipo_criador === 'instituicao' && criadorId === usuario_id)) {
                return res.status(400).json({ success: false, message: 'Você não pode participar da própria tarefa.' });
            }

            const contarParticipantesQuery = `
                SELECT COUNT(*) AS total 
                FROM participantes 
                WHERE tarefaId = ?
            `;

            connection.query(contarParticipantesQuery, [tarefaId], (error, countResults) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ success: false, message: 'Erro ao contar participantes.' });
                }

                const totalParticipantes = countResults[0].total;
                if (totalParticipantes >= qnt_voluntarios_necessarios) {
                    return res.status(400).json({ success: false, message: 'O limite de voluntários já foi atingido.' });
                }

                const inserirParticipanteQuery = `
                    INSERT INTO participantes (tarefaId, cpf, tipo_usuario)
                    VALUES (?, ?, ?)
                `;

                connection.query(inserirParticipanteQuery, [tarefaId, usuario_id, tipo_usuario], (error) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ success: false, message: 'Erro ao adicionar participação.' });
                    }

                    return res.status(201).json({ success: true, message: 'Participação realizada com sucesso!' });
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro ao participar da tarefa.' });
    }
}

module.exports = {
    storeTasks,
    getTasks,
    joinTasks,  
};