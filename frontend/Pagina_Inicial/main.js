const btnNovaTarefa = document.getElementById("btnNovaTarefa");
const overlayForm = document.getElementById("overlayForm");
const fecharModal = document.getElementById("fecharModal");

// document.addEventListener("DOMContentLoaded", () => {
//     const userData = localStorage.getItem('userData');

//     if (userData) {
//         const user = JSON.parse(userData);
//         console.log("Dados do usuário:", user);

//         document.getElementById("nomeUsuario").textContent = `${user.nome || user.nome_responsavel}`;

//         if (user.img_conta) {
//             document.getElementById("imagemUsuario").src = `http://localhost:3005/${user.img_conta}`; 
//         } else if (user.img_logo) {
//             document.getElementById("imagemUsuario").src = `http://localhost:3005/${user.img_logo}`; 
//         } else {
//             console.error("Nenhuma imagem disponível para o usuário.");
//         }

//     } else {
//        window.location.href = "../Login/login.html";
//     }
// });

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

    const imgFiles = document.getElementById("img_tarefas").files;
    for (let i = 0; i < imgFiles.length; i++) {
        conteudo.append("img_tarefas[]", imgFiles[i]);
    }

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

    let imgHTML = '';
    conteudo.getAll('img_tarefas[]').forEach((imgSrc, index) => {
        imgHTML += `<img src="${imgSrc}" alt="Imagem da tarefa ${index + 1}">`;
    });

    card.innerHTML = `
        <h3>${conteudo.get('titulo')}</h3>
        ${imgHTML}
        <p>${conteudo.get('descricao')}</p>
        <button class="btnExpandir">Expandir</button>
        <div class="detalhesTarefa" style="display: none;">
            <p>Endereço: ${conteudo.get('endereco')}</p>
            <p>Duração Estimada: ${conteudo.get('duracao_estimada')}</p>
            <p>Materiais Necessários: ${conteudo.get('materiais_necessarios')}</p>
            <p>Voluntários Necessários: ${conteudo.get('qnt_voluntarios_necessarios')}</p>
            <p>Observações: ${conteudo.get('observacoes')}</p>
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