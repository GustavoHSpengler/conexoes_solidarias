async function nextPage(event) {
    event.preventDefault();

    const nome_responsavel = document.getElementById("nome_responsavel").value;
    const necessidades_voluntarios = document.getElementById("necessidades_voluntarios").value;
    const requisitos_voluntarios = document.getElementById("requisitos_voluntarios").value;

    if (!nome_responsavel || !necessidades_voluntarios || !requisitos_voluntarios) {
        alert("Todos os campos precisam ser preenchidos!");
        return;
    } else { 
        data_2º = { nome_responsavel, necessidades_voluntarios, requisitos_voluntarios }
        try {
            localStorage.setItem("data", JSON.stringify(data_1º));
            window.location.pathname = "../frontend/Cadastro_Instituicao/cadastro_instituicao2.html";
        } catch (error) {
            console.error("Erro ao redirecionar:", error);
            alert("Erro ao tentar prosseguir para a próxima página.");
        }
    }
}