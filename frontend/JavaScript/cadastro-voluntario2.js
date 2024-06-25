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

confirmar.onclick = async function (e) {
    e.preventDefault();

    let dados = localStorage.getItem("dados");
    let habilidades = document.getElementById("habilidades").value;
    let interesses = document.getElementById("interesses").value;
    let nivel_experiencia = document.getElementById("nivel_experiencia").value;
    let imagem_perfil = document.getElementById("imagem_perfil").files[0];

    if (!habilidades || !interesses || !imagem_perfil) {
        alert("Todos os campos precisam ser preenchidos!");
        return
    } else {
        let conteudo = {dados, habilidades, interesses, nivel_experiencia, imagem_perfil};

        try {
            const response = await fetch("http://localhost:3025/api/store/task", {
                method: "POST",
                headers: {"Content-type": "applications/json;charset=UTF-8"},
                body: JSON.stringify(conteudo)
            });

            let content = await response.json();

            if (content.sucess) {
                window.location.pathname = "../frontend/HTML/pagina_inicial.html";
            } else {
                alert("Deu algo errado!");
            }
        } catch (error) {
            console.error("Erro: ", error);
            alert("Deu algo errado!")
        }
    } 
}
