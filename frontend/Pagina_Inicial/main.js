document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem('userData');

    if (userData) {
        const user = JSON.parse(userData);
        console.log("Dados do usuário:", user);

        document.getElementById("nomeUsuario").textContent = `Bem-vindo, ${user.nome || user.nome_responsavel}`;

        if (user.img_conta) {
            document.getElementById("imagemUsuario").src = `src/public/${user.img_conta}`; 
        } else if (user.img_logo) {
            document.getElementById("imagemUsuario").src = `src/public/${user.img_logo}`; 
        } else {
            console.error("Nenhuma imagem disponível para o usuário.");
        }

    // } else {
        
       // window.location.href = "../Login/login.html";
    }
});

document.getElementById("btnNovaTarefa").addEventListener("click", () => {
    document.getElementById("formTarefa").style.display = "block";
});

document.getElementById("novaTarefaForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("http://localhost:3005/api/tarefas/criarTarefa", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        alert("Tarefa criada com sucesso!");
        addCardToPage(result.tarefaId, formData);
        this.reset(); 
        document.getElementById("formTarefa").style.display = "none";
    } else {
        alert("Erro ao criar tarefa: " + result.message);
    }
});

function addCardToPage(tarefaId, formData) {
    const card = document.createElement("div");
    card.classList.add("cardTarefa");

    card.innerHTML = `
        <h3>${formData.get('titulo')}</h3>
        <img src="/public/${formData.get('img_tarefa').name}" alt="Imagem da tarefa">
        <p>${formData.get('descricao')}</p>
        <button class="btnExpandir">Expandir</button>
        <div class="detalhesTarefa" style="display: none;">
            <p>Endereço: ${formData.get('endereco')}</p>
            <p>Duração Estimada: ${formData.get('duracao_estimada')}</p>
            <p>Materiais Necessários: ${formData.get('materias_necessarios')}</p>
            <p>Voluntários Necessários: ${formData.get('qnt_voluntarios_necessarios')}</p>
            <p>Observações: ${formData.get('observacoes')}</p>
        </div>
    `;

    document.getElementById("listaTarefas").appendChild(card);

    card.querySelector('.btnExpandir').addEventListener("click", () => {
        const detalhes = card.querySelector('.detalhesTarefa');
        detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
    });
}
