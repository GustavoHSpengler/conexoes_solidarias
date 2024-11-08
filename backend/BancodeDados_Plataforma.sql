CREATE DATABASE USUARIO_PLATAFORMA;
USE USUARIO_PLATAFORMA;

CREATE TABLE usuarios_voluntarios (
	usuario_cpf VARCHAR(255) PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
	senha VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(255) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    habilidades VARCHAR(255),
    interesses ENUM("Causas Sociais", "Meio Ambiente", "Esportes e Recreação", "Arte e Cultura", "Tecnologia e Inovação", "Animais", "Desenvolvimento Comunitário", "Saúde e Bem-Estar", "Educação", "Assistência Social"),
    nivel_experiencia VARCHAR(255) NOT NULL,
    img_conta VARCHAR(255) NOT NULL
);

CREATE TABLE usuarios_instituicoes (
	instituicao_cnpj VARCHAR(255) PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
	senha VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(255) UNIQUE NOT NULL,
    data_abertura DATE NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    area_atuacao VARCHAR(255) NOT NULL,
    nome_responsavel VARCHAR(255) NOT NULL,
    necessidades_voluntarios VARCHAR(255) NOT NULL,
    requisitos_voluntarios VARCHAR(255) NOT NULL,
    certificacoes_afiliacoes VARCHAR(255) NOT NULL,
    img_logo VARCHAR(255) NOT NULL
);

CREATE TABLE tarefas_plataforma (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    duracao_estimada DATETIME NOT NULL,
    materiais_necessarios VARCHAR(255) NOT NULL,
    qnt_voluntarios_necessarios INT NOT NULL, 
    observacoes TEXT NOT NULL,
    img_tarefas VARCHAR(255) NOT NULL,
    tipo_criador ENUM('voluntario', 'instituicao') NOT NULL
);

CREATE TABLE tarefas_ids (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_tarefa INT NOT NULL,
	id_criador_cpf VARCHAR(255) NULL,
    id_criador_cnpj VARCHAR(255) NULL,
    FOREIGN KEY (id_criador_cpf) REFERENCES usuarios_voluntarios(usuario_cpf) ON DELETE CASCADE,
    FOREIGN KEY (id_criador_cnpj) REFERENCES usuarios_instituicoes(instituicao_cnpj) ON DELETE CASCADE
);

CREATE TABLE participantes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tarefaId INT NOT NULL,
    cpf VARCHAR(255),
    cnpj VARCHAR(255),
    tipo_usuario ENUM('voluntario', 'instituicao') NOT NULL,
    FOREIGN KEY (tarefaId) REFERENCES tarefas_plataforma(id) ON DELETE CASCADE,
    FOREIGN KEY (cpf) REFERENCES usuarios_voluntarios(usuario_cpf) ON DELETE CASCADE,
    FOREIGN KEY (cnpj) REFERENCES usuarios_instituicoes(instituicao_cnpj) ON DELETE CASCADE
);

CREATE TABLE postagens_plataforma (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    img_postagem VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    paragrafo TEXT NOT NULL,
    curtidas INT DEFAULT 0, 
    usuario_cpf VARCHAR(255),
    instituicao_cnpj VARCHAR(255),
    tipo_usuario ENUM('voluntario', 'instituicao') NOT NULL,
    FOREIGN KEY (usuario_cpf) REFERENCES usuarios_voluntarios(usuario_cpf),
    FOREIGN KEY (instituicao_cnpj) REFERENCES usuarios_instituicoes(instituicao_cnpj)
);

CREATE TABLE curtidas (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    postagem_id INT NOT NULL,
    usuario_cpf VARCHAR(255),
    instituicao_cnpj VARCHAR(255),
    tipo_usuario ENUM('voluntario', 'instituicao') NOT NULL,
    data_curtida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postagem_id) REFERENCES postagens_plataforma(id),
    FOREIGN KEY (usuario_cpf) REFERENCES usuarios_voluntarios(usuario_cpf),
    FOREIGN KEY (instituicao_cnpj) REFERENCES usuarios_instituicoes(instituicao_cnpj)
);

CREATE TABLE comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    texto TEXT NOT NULL,
    img_comentario VARCHAR(255) NOT NULL,
    postagens_id INT NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    cnpj VARCHAR(255) NOT NULL,
    FOREIGN KEY (postagens_id) REFERENCES postagens_plataforma(id) ON DELETE CASCADE,
    FOREIGN KEY (cpf) REFERENCES usuarios_voluntarios(usuario_cpf) ON DELETE CASCADE,
    FOREIGN KEY (cnpj) REFERENCES usuarios_instituicoes(instituicao_cnpj) ON DELETE CASCADE
);

CREATE TABLE mensagens_plataforma (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    paragrafo VARCHAR(255) NOT NULL,
    img_mensagem VARCHAR(255) NOT NULL
);