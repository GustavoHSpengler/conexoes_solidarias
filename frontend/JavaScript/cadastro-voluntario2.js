let confirmar = document.getElementById("confirmar");

function previewImage(event) {
    let input = event.target;
    let visualizacao = document.getElementById('visualisacao_imagem');

    if (input.files && input.files[0]) {
        let visualizador = new FileReader();

        visualizador.onload = function(e) {
            visualizacao.src = e.target.result;
            visualizacao.style.display = 'block';
        }

        visualizador.readAsDataURL(input.files[0]);
    }
}

confirmar.onclick = async function (event) {
    event.preventDefault();

    let dados = JSON.parse(localStorage.getItem("dados"));
    let usuario_cpf = dados.usuario_cpf;
    let nome        = dados.nome;
    let email        = dados.nome;
    let senha        = dados.nome;
    let telefone     = dados.nome;
    let data_nascimento = dados.nome;
    let endereco     = dados.nome;
    
    let habilidades = document.getElementById("habilidades").value;
    let interesses = document.querySelector('input[name="interesses"]:checked').value;
    let nivel_experiencia = document.getElementById("nivel_experiencia").value;
    let imagem_perfil = document.getElementById("imagem_perfil").files[0];

    if (!habilidades || !interesses || !imagem_perfil) {
        alert("Todos os campos precisam ser preenchidos!");
        return
    } else {

        let conteudo = new FormData();
        conteudo.append("usuario_cpf", usuario_cpf);
        conteudo.append("nome", nome);
        conteudo.append("email", email);
        conteudo.append("senha", senha);
        conteudo.append("telefone", telefone);
        conteudo.append("data_nascimento", data_nascimento);
        conteudo.append("endereco", endereco);
        conteudo.append("habilidades", habilidades);
        conteudo.append("interesses", interesses);
        conteudo.append("nivel_experiencia", nivel_experiencia);
        conteudo.append("imagem_perfil", imagem_perfil);
        
        
        try {
            const response = await fetch("http://localhost:3025/api/storeVoluntario/task", {
                method: "POST",
                headers: {"Content-type": "applications/json;charset=UTF-8"},
                body: JSON.stringify(conteudo)
            });

            let content = await response.json();

            if (content.sucess) {
                window.location.pathname = "..frontend/HTML/pagina_inicial.html";
            } else {
                alert("Deu algo errado!");
            }
        } catch (error) {
            console.error("Erro: ", error);
            alert("Deu algo errado!");
        }
    } 
}