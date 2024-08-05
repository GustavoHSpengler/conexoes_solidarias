async function sendData(event) {
    event.preventDefault();
    
    let data = JSON.parse(localStorage.getItem("data"));

    let form = document.getElementById("form");

    let conteudo = new FormData(form);

    conteudo.append("instituicao_cnpj", data.instituicao_cnpj);
    conteudo.append("nome", data.nome);
    conteudo.append("email", data.email);
    conteudo.append("senha", data.senha);
    conteudo.append("data_nascimento", data.data_nascimento);
    conteudo.append("telefone", data.telefone);
    conteudo.append("endereco", data.endereco);
    conteudo.append("area_atuacao", data.area_atuacao);
    conteudo.append("nome_responsavel", data.nome_responsavel);
    conteudo.append("necessidades_voluntarios", data.necessidades_voluntarios);
    conteudo.append("requisitos_voluntarios", data.requisitos_voluntarios);
    conteudo.append("certificados_afiliacoes", document.getElementById("certificados_afiliacoes").value);

    const fileInput = document.getElementById("img_logo");
    if (fileInput.files[0]) {
        const fileName = fileInput.files[0].name;
        conteudo.append("img_logo", fileName);
    }

    if (!certificados_afiliacoes || !img_logo ) {
        alert("Todos os campos precisam ser preenchidos!");
        return
    } 
    

    const formDataObj = {};
    conteudo.forEach((value, key) => (formDataObj[key] = value));

    try {
        const response = await fetch('http://localhost:3005/api/storeVolunteers/task', {
            method: "POST",
            headers: {                
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        });
        
        let content = await response.json();

        if (content.success) {
           window.location.pathname = "/frontend/Entrar/login.html";
        } else {        
           alert("Deu algo errado!");       
        }
    } catch (error) {
        console.error("Erro: ", error);
        alert("Deu algo errado!");
    }
}

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