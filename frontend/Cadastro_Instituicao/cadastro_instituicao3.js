async function sendData(event) {
    event.preventDefault();
    
    let dados_instituicoes2 = JSON.parse(localStorage.getItem("dados_instituicoes2"));

    let form = document.getElementById("form");

    let conteudo = new FormData(form);

    conteudo.append("instituicao_cnpj", dados_instituicoes2.instituicao_cnpj);
    conteudo.append("nome", dados_instituicoes2.nome);
    conteudo.append("email", dados_instituicoes2.email);
    conteudo.append("senha", dados_instituicoes2.senha);
    conteudo.append("data_nascimento", dados_instituicoes2.data_nascimento);
    conteudo.append("telefone", dados_instituicoes2.telefone);
    conteudo.append("endereco", dados_instituicoes2.endereco);
    conteudo.append("area_atuacao", dados_instituicoes2.area_atuacao);
    conteudo.append("nome_responsavel", dados_instituicoes2.nome_responsavel);
    conteudo.append("necessidades_voluntarios", dados_instituicoes2.necessidades_voluntarios);
    conteudo.append("requisitos_voluntarios", dados_instituicoes2.requisitos_voluntarios);
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