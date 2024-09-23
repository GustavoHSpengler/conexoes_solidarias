const btnNovaTarefa = document.getElementById("btnNovaTarefa");
const overlayForm = document.getElementById("overlayForm");
const fecharModal = document.getElementById("fecharModal");

document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem('userData');

    if (userData) {
        const user = JSON.parse(userData);
        console.log("Dados do usuário:", user);

        document.getElementById("nomeUsuario").textContent = `${user.nome || user.nome_responsavel}`;

        if (user.img_conta) {
            document.getElementById("imagemUsuario").src = `http://localhost:3005/${user.img_conta}`; 
        } else if (user.img_logo) {
            document.getElementById("imagemUsuario").src = `http://localhost:3005/${user.img_logo}`; 
        } else {
            console.error("Nenhuma imagem disponível para o usuário.");
        }

    } else {
       window.location.href = "../Login/login.html";
    }
});

btnNovaTarefa.addEventListener("click", () => {
    overlayForm.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
    overlayForm.style.display = "none"; 
});

overlayForm.addEventListener("click", (event) => {
    if (event.target === overlayForm) {
        overlayForm.style.display = "none"; 
    }
});

document.getElementById("novaTarefaForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const conteudo = new FormData();
    conteudo.append("titulo", document.getElementById("titulo").value);
    conteudo.append("descricao", document.getElementById("descricao").value);
    conteudo.append("endereco", document.getElementById("endereco").value);
    conteudo.append("duracao_estimada", document.getElementById("duracao_estimada").value);
    conteudo.append("materiais_necessarios", document.getElementById("materiais_necessarios").value);
    conteudo.append("qnt_voluntarios_necessarios", document.getElementById("qnt_voluntarios_necessarios").value);
    conteudo.append("observacoes", document.getElementById("observacoes").value);
    conteudo.append("img_tarefa", document.getElementById("img_tarefa").files[0]); 

    const response = await fetch("http://localhost:3005/api/storeTasks", {
        method: "POST",
        body: conteudo
    });

    const result = await response.json();
    if (result.success) {
        alert("Tarefa criada com sucesso!");
        addCardToPage(result.tarefaId, conteudo); 
        this.reset();
        overlayForm.style.display = "none"; 
    } else {
        alert("Erro ao criar tarefa: " + result.message);
    }
});

function addCardToPage(tarefaId, conteudo) {
    const card = document.createElement("div");
    card.classList.add("cardTarefa");

    card.innerHTML = `
        <h3>${conteudo.get('titulo')}</h3>
        <img src="${imgSrc}" alt="Imagem da tarefa">
        <p>${conteudo.get('descricao')}</p>
        <button class="btnExpandir">Expandir</button>
        <div class="detalhesTarefa" style="display: none;">
            <p>Endereço: ${conteudo.get('endereco')}</p>
            <p>Duração Estimada: ${conteudo.get('duracao_estimada')}</p>
            <p>Materiais Necessários: ${conteudo.get('materiais_necessarios')}</p>
            <p>Voluntários Necessários: ${conteudo.get('qnt_voluntarios_necessarios')}</p>
            <p>Observações: ${conteudo.get('observacoes')}</p>
        </div>
    `;

    document.getElementById("listaTarefas").appendChild(card);

    card.querySelector('.btnExpandir').addEventListener("click", () => {
        const detalhes = card.querySelector('.detalhesTarefa');
        detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
    });
}