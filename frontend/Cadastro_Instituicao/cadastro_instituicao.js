document.getElementById("cnpj").addEventListener("input", function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    value = value.replace(/(\d{2})(\d)/, "$1.$2"); 
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); 
    value = value.replace(/(\d{3})(\d)/, "$1/$2"); 
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2"); 
    e.target.value = value;
});

document.getElementById("telefone").addEventListener("input", function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1)$2"); 
    value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2"); 
    e.target.value = value;
});

async function nextPage(event) {
    event.preventDefault();

    const instituicao_cnpj = document.getElementById("cnpj").value;
    const nome =  document.getElementById("nome").value;
    const email =  document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmar_senha = document.getElementById("confirmar_senha").value;
    const telefone = document.getElementById("telefone").value;
    const data_nascimento = document.getElementById("data_nascimento").value;
    const endereco = document.getElementById("endereco").value;
    const area_atuacao = document.getElementById("area_atuacao").value;

    if (!instituicao_cnpj || !nome || !email || !senha || !confirmar_senha || !telefone || !data_nascimento || !endereco, !area_atuacao) {
        alert("Todos os campos precisam ser preenchidos!");
        return;
    } if (senha !== confirmar_senha) {
        alert("As senhas não correspondem. Por favor, tente novamente.");
        return;
    } else { 
        data_1º = { cnpj, nome, email, senha, telefone, data_nascimento, endereco, area_atuacao }
        try {
            localStorage.setItem("data", JSON.stringify(data_1º));
            window.location.pathname = "../frontend/Cadastro_Instituicao/cadastro_instituicao2.html";
        } catch (error) {
            console.error("Erro ao redirecionar:", error);
            alert("Erro ao tentar prosseguir para a próxima página.");
        }
    }
}