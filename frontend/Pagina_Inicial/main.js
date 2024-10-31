document.addEventListener("DOMContentLoaded", () => {
    getCards();

    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById("nomeUsuario").textContent = `${user.nome || user.nome_responsavel}`;
        document.getElementById("imagemUsuario").src = `http://localhost:3005/${user.img_conta || user.img_logo}`;
    } else {
        window.location.href = "../Login/login.html";
    }
});

const btnNovaTarefa = document.getElementById("btnNovaTarefa");
const overlayForm = document.getElementById("overlayForm");
const fecharModal = document.getElementById("fecharModal");

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

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!document.getElementById("titulo").value && !document.getElementById("descricao").value) {
        alert("Título e descrição são obrigatórios!");
        return;
    }

    const tarefa = new FormData();
    tarefa.append("titulo", document.getElementById("titulo").value);
    tarefa.append("descricao", document.getElementById("descricao").value);
    tarefa.append("endereco", document.getElementById("endereco").value);
    tarefa.append("duracao_estimada", document.getElementById("duracao_estimada").value);
    tarefa.append("materiais_necessarios", document.getElementById("materiais_necessarios").value);
    tarefa.append("qnt_voluntarios_necessarios", document.getElementById("qnt_voluntarios_necessarios").value);
    tarefa.append("observacoes", document.getElementById("observacoes").value);
    
    if (userData.usuario_cpf) {
        tarefa.append("criador_id", userData.usuario_cpf);
        tarefa.append("tipo_criador", 'voluntario');
    } else if (userData.instituicao_cnpj) {
        tarefa.append("criador_id", userData.instituicao_cnpj);
        tarefa.append("tipo_criador", 'instituicao');
    } else {
        alert("Usuário não autenticado corretamente!");
        return;
    }

    const imgFiles = document.getElementById("img_tarefas").files;
    for (let i = 0; i < imgFiles.length; i++) {
        tarefa.append("img_tarefas", imgFiles[i]);
    }

    try {
        const response = await fetch("http://localhost:3005/api/tasks", {
            method: "POST",
            body: tarefa
        });

        if (!response.ok) {
            throw new Error('Erro na criação da tarefa: ' + response.statusText);
        }

        const result = await response.json();
        if (result.success) {
            alert("Tarefa criada com sucesso!");
            this.reset();
            overlayForm.style.display = "none";
            getCards(); 
        } else {
            alert("Erro ao criar tarefa: " + result.message);
        }
    } catch (error) {
        alert("Ocorreu um erro: " + error.message);
    }
});


async function getCards() {
    try {
        const response = await fetch(`http://localhost:3005/api/tasks/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error("Erro ao buscar as tarefas");

        const tarefas = await response.json();

        Object.keys(tarefas).forEach(function(k){
            addCardToPage(tarefas[k]);
        });

    } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
    }
}

function addCardToPage(tarefa) {
    const card = document.createElement("div");
    card.classList.add("cardTarefa");

    let imgHTML = '';
    if (tarefa.img_tarefa) {
        const imagens = JSON.parse(tarefa.img_tarefa);
        imagens.forEach((imgSrc, index) => {
            imgHTML += `<img src="${imgSrc}" alt="Imagem da tarefa ${index + 1}">`;
        });
    }

    card.innerHTML = `
        <h3>${tarefa.titulo}</h3>
        ${imgHTML}
        <p>${tarefa.descricao}</p>
        <button class="expandir">Expandir</button>
        <div class="detalhesTarefa" style="display: none;">
            <p>Endereço: ${tarefa.endereco}</p>
            <p>Duração Estimada: ${tarefa.duracao_estimada}</p>
            <p>Materiais Necessários: ${tarefa.materiais_necessarios}</p>
            <p>Voluntários Necessários: ${tarefa.qnt_voluntarios_necessarios}</p>
            <p>Observações: ${tarefa.observacoes}</p>
            <button class="Participar">Participar</button>
        </div>
    `;

    document.getElementById("listaTarefas").appendChild(card);

    card.querySelector('.expandir').addEventListener("click", () => {
        const detalhes = card.querySelector('.detalhesTarefa');
        detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
    });

    card.querySelector('.Participar').addEventListener("click", async function () {
        const tarefaId = this.getAttribute('data-id');
        const userData = JSON.parse(localStorage.getItem('userData')); 
    
        const response = await fetch(`http://localhost:3005/api/tasks/${tarefaId}/participar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf: userData.usuario_cpf })
        });

        const result = await response.json();
        if (result.success) {
            alert("Você se inscreveu na tarefa com sucesso!");
        } else {
            alert("Erro ao se inscrever na tarefa: " + result.message);
        }
    });
}