async function nextPage(event) {
    event.preventDefault();

    let dados_instituicoes1 = JSON.parse(localStorage.getItem("dados_instituicoes1"));
    let instituicao_cnpj = dados_instituicoes1.instituicao_cnpj;
    let nome = dados_instituicoes1.nome;
    let email = dados_instituicoes1.email;
    let senha = dados_instituicoes1.senha;
    let telefone = dados_instituicoes1.telefone;
    let data_nascimento = dados_instituicoes1.data_nascimento;
    let endereco = dados_instituicoes1.endereco;
    let area_atuacao = dados_instituicoes1.area_atuacao;
    let nome_responsavel = document.getElementById("nome_responsavel").value;
    let necessidades_voluntarios = document.getElementById("necessidades_voluntarios").value;
    let requisitos_voluntarios = document.getElementById("requisitos_voluntarios").value;

    if (!nome_responsavel || !necessidades_voluntarios || !requisitos_voluntarios) {
        alert("Todos os campos precisam ser preenchidos!");
        return;
    } else { 
        dados_instituicoes2 = { instituicao_cnpj, nome, email, senha, telefone, data_nascimento, endereco, area_atuacao, nome_responsavel, necessidades_voluntarios, requisitos_voluntarios }
        try {
            localStorage.setItem("data", JSON.stringify(dados_instituicoes2));
            window.location.pathname = "../frontend/Cadastro_Instituicao/cadastro_instituicao3.html";
        } catch (error) {
            console.error("Erro ao redirecionar:", error);
            alert("Erro ao tentar prosseguir para a próxima página.");
        }
    }
}