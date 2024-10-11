document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem('userData');

    if (userData) {
        const user = JSON.parse(userData);
        console.log("Dados do usuário:", user);

        document.getElementById("nomeUsuario").textContent = `${user.nome || user.nome_responsavel}`;
        
        

        if (user.img_conta) {
            const caminhoCorreto = user.img_conta.replace(/\\/g, '/');
            document.getElementById("imagemUsuario").src = `${window.location.origin}${user.img_conta}`;
        } else if (user.img_logo) {
            const caminhoCorreto = user.img_logo.replace(/\\/g, '/');
            document.getElementById("imagemUsuario").src = `${window.location.origin}${caminhoCorreto}`;
        } else {
            console.error("Nenhuma imagem disponível para o usuário.");
        }

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
    
    const tarefa = new FormData();
    tarefa.append("titulo", document.getElementById("titulo").value);
    tarefa.append("descricao", document.getElementById("descricao").value);
    tarefa.append("endereco", document.getElementById("endereco").value);
    tarefa.append("duracao_estimada", document.getElementById("duracao_estimada").value);
    tarefa.append("materiais_necessarios", document.getElementById("materiais_necessarios").value);
    tarefa.append("qnt_voluntarios_necessarios", document.getElementById("qnt_voluntarios_necessarios").value);
    tarefa.append("observacoes", document.getElementById("observacoes").value);

    const imgFiles = document.getElementById("img_tarefas").files;
    for (let i = 0; i < imgFiles.length; i++) {
        tarefa.append("img_tarefas", imgFiles[i]);
    }

    console.log(tarefa);

    const response = await fetch("http://localhost:3005/api/tasks", {
        method: "POST",
        body: tarefa
    });

    const result = await response.json();
    if (result.success) {
        alert("Tarefa criada com sucesso!");
        addCardToPage(result.tarefaId, tarefa); 
        this.reset();
        overlayForm.style.display = "none"; 
    } else {
        alert("Erro ao criar tarefa: " + result.message);
    }
});

function addCardToPage(tarefaId, tarefa) {
    const card = document.createElement("div");
    card.classList.add("cardTarefa");

    let imgHTML = '';
    tarefa.getAll('img_tarefas').forEach((imgSrc, index) => {
        imgHTML += `<img src="${imgSrc}" alt="Imagem da tarefa ${index + 1}">`;
    });

    card.innerHTML = `
        <h3>${tarefa.get('titulo')}</h3>
        ${imgHTML}
        <p>${tarefa.get('descricao')}</p>
        <button class="btnExpandir">Expandir</button>
        <div class="detalhesTarefa" style="display: none;">
            <p>Endereço: ${tarefa.get('endereco')}</p>
            <p>Duração Estimada: ${tarefa.get('duracao_estimada')}</p>
            <p>Materiais Necessários: ${tarefa.get('materiais_necessarios')}</p>
            <p>Voluntários Necessários: ${tarefa.get('qnt_voluntarios_necessarios')}</p>
            <p>Observações: ${tarefa.get('observacoes')}</p>
            <button class="Participar" data-id="${tarefaId}">Participar</button>
        </div>
    `;

    document.getElementById("listaTarefas").appendChild(card);

    card.querySelector('.btnExpandir').addEventListener("click", () => {
        const detalhes = card.querySelector('.detalhesTarefa');
        detalhes.style.display = detalhes.style.display === "none" ? "block" : "none";
    });

    card.querySelector('.Participar').addEventListener("click", async function () {
        const tarefaId = this.getAttribute('data-id');
        const response = await fetch(`http://localhost:3005/api/tasks`, {
            method: "POST"
        });

        const result = await response.json();
        if (result.success) {
            alert("Você se inscreveu na tarefa com sucesso!");
        } else {
            alert("Erro ao se inscrever na tarefa: " + result.message);
        }
    });
}