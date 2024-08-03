document.getElementById("cpf").addEventListener("input", function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); 
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); 
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
    e.target.value = value;
});

document.getElementById("telefone").addEventListener("input", function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1)$2"); 
    value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2"); 
    e.target.value = value;
});

function nextStep(event) {
    event.preventDefault();

    let usuario_cpf     = document.getElementById("cpf").value;
    let nome            = document.getElementById("nome").value;
    let email           = document.getElementById("email").value;
    let senha           = document.getElementById("senha").value;
    let confirmar_senha = document.getElementById("confirmar_senha").value;
    let telefone        = document.getElementById("telefone").value;
    let data_nascimento = document.getElementById("data_nascimento").value;
    let endereco        = document.getElementById("endereco").value;

    if (!usuario_cpf || !nome || !email || !senha || !confirmar_senha || !telefone || !data_nascimento || !endereco) {
        alert("Todos os campos precisam ser preenchidos!");
        return;
    } if (senha !== confirmar_senha) {
        alert("As senhas não correspondem. Por favor, tente novamente.");
        return;
    } else { 
        let dados = { usuario_cpf, nome, email, senha, telefone, data_nascimento, endereco };
        try {
            localStorage.setItem("dados", JSON.stringify(dados));
            window.location.pathname = "/frontend/Cadastro_Voluntario/cadastro_voluntario2.html";
        } catch (error) {
            console.error("Erro ao redirecionar:", error);
            alert("Erro ao tentar prosseguir para a próxima página.");
        }
    }
}