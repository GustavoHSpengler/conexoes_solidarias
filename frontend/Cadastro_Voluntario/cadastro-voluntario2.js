function previewImage(event) {
    let input = event.target;
    let visualizacao = document.getElementById('visualizacao_imagem');

    if (input.files && input.files[0]) {
        let visualizador = new FileReader();

        visualizador.onload = function(e) {
            visualizacao.src = e.target.result;
            visualizacao.style.display = 'block';
        }

        visualizador.readAsDataURL(input.files[0]);
    }
}

async function sendData(event) {
    event.preventDefault();
    
    let data = JSON.parse(localStorage.getItem("dados"));

    let conteudo = new FormData();

    conteudo.append("usuario_cpf", data.usuario_cpf);
    conteudo.append("nome", data.nome);
    conteudo.append("email", data.email);
    conteudo.append("senha", data.senha);
    conteudo.append("data_nascimento", data.data_nascimento);
    conteudo.append("telefone", data.telefone);
    conteudo.append("endereco", data.endereco);
    conteudo.append("habilidades", document.getElementById("habilidades").value);
    conteudo.append("interesses", document.getElementById("interesses").value);
    conteudo.append("nivel_experiencia", document.getElementById("nivel_experiencia").value);
    conteudo.append("img_conta", document.getElementById("img_conta").files[0]);

    if (!habilidades && !interesses && !img_conta) {
        alert("Todos os campos precisam ser preenchidos!");
        return
    } 

    try {
        const response = await fetch('http://localhost:3005/api/storeVolunteers/register', {
            method: "POST",
            body: conteudo
        });
        
        let content = await response.json();

        console.log(content)

        if (content.success) {
            console.log(content)
            window.location.pathname = "./frontend/Entrar/login.html";
        } else {        
           alert("Deu algo errado!");       
        }
    } catch (error) {
        console.error("Erro: ", error);
        alert("Deu algo errado!");
    }
}