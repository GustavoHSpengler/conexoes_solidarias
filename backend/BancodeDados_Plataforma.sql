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
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    img_tarefa VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    duracao_estimada DATETIME NOT NULL,
    materias_necessarios VARCHAR(255) NOT NULL,
    qnt_voluntarios_necessarios INT NOT NULL,
    observacoes VARCHAR(255) NOT NULL
);

CREATE TABLE postagens_plataforma (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	img_postagem VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    paragrafo VARCHAR(255) NOT NULL,
    curtida INT NOT NULL
);

CREATE TABLE mensagens_plataforma (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    paragrafo VARCHAR(255) NOT NULL,
    img_mensagem VARCHAR(255) NOT NULL
);