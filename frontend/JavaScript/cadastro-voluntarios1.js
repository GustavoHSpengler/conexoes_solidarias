let continuar = document.getElementById("continuar");

continuar.onclick = async function() {
    window.location.pathname = "/frontend/HTML/cadastro_voluntario2.html";

    // let usuario_cpf = document.getElementById("cpf").value;
    // let nome = document.getElementById("nome").value;
    // let email = document.getElementById("email").value;
    // let senha = document.getElementById("senha").value;
    // let confirmar_senha = document.getElementById("confirmar_senha").value;
    // let telefone = document.getElementById("telefone").value;
    // let data_nascimento = document.getElementById("data_nascimento").value;
    // let endereco = document.getElementById("endereco").value;
    // let dados = { usuario_cpf, nome, email, senha, telefone, data_nascimento, endereco };
    
    // if (!usuario_cpf || !nome || !email || !senha || !confirmar_senha || !telefone || !data_nascimento || !endereco) {
    //     alert("Todos os campos precisam ser preenchidos!");
    //     return;
    // } if (senha !== confirmar_senha) {
    //     alert("As senhas não correspondem. Por favor, tente novamente.");
    //     return;
    // } else {
    //     try {
    //         localStorage.setItem("dados", JSON.stringify(dados));
    //         window.location.pathname = "/frontend/HTML/cadastro_voluntario2.html";
    //     } catch (error) {
    //         console.error("Erro ao redirecionar:", error);
    //         alert("Erro ao tentar prosseguir para a próxima página.");
    //     }
    // }
};