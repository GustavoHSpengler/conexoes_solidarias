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

    const fileInput = document.getElementById("img_conta");
    if (fileInput.files[0]) {
        const fileName = fileInput.files[0].name;
        conteudo.append("img_conta", fileName);
    }

    if (!habilidades || !interesses || !img_conta) {
        alert("Todos os campos precisam ser preenchidos!");
        return
    } 
    

    const formDataObj = {};
    conteudo.forEach((value, key) => (formDataObj[key] = value));
    console.log(JSON.stringify(formDataObj));

    try {
        const response = await fetch('http://localhost:3005/api/storeVoluntario/task', {
            method: "POST",
            headers: {                
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        });
        
        let content = await response.json();

        if (content.success) {
           window.location.pathname = "/frontend/Pagina_Inicial/pagina_inicial.html";
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

// confirmar.onclick = async function (event) {
//     event.preventDefault();

//     // let dados = JSON.parse(localStorage.getItem("dados"));
//     let usuario_cpf = dados.usuario_cpf;
//     let nome = dados.nome;
//     let email = dados.email;  
//     let senha = dados.senha;  
//     let telefone = dados.telefone;
//     let data_nascimento = dados.data_nascimento; 
//     let endereco = dados.endereco; 
//     let habilidades = document.getElementById("habilidades").value;
//     let interesses = document.querySelector('input[name="interesses"]:checked').value;
//     let nivel_experiencia = document.getElementById("nivel_experiencia").value;
//     let imagem_perfil = document.getElementById("imagem_perfil").files[0];

//     if (!habilidades || !interesses || !imagem_perfil) {
//         alert("Todos os campos precisam ser preenchidos!");
//         return
//     } else {

//         let conteudo = new FormData();
//         conteudo.append("usuario_cpf", usuario_cpf);
//         conteudo.append("nome", nome);
//         conteudo.append("email", email);
//         conteudo.append("senha", senha);
//         conteudo.append("telefone", telefone);
//         conteudo.append("data_nascimento", data_nascimento);
//         conteudo.append("endereco", endereco);
//         conteudo.append("habilidades", habilidades);
//         conteudo.append("interesses", interesses);
//         conteudo.append("nivel_experiencia", nivel_experiencia);
//         conteudo.append("imagem_perfil", imagem_perfil);
        
//         console.log(conteudo);
        

//         try {
//             const response = await fetch('http://localhost:3005/api/storeVoluntario/task', {
//                 method: "POST",
//                 headers: {"Content-type": "application/json;charset=UTF-8"},
//                 body: JSON.stringify(conteudo)
//             });

//             let content = await response.json();

//             if (content.sucess) {
//                 window.location.pathname = "..frontend/Pagina_Inicial/pagina_inicial.html";
//             } else {
//                 alert("Deu algo errado!");
//             }
//         } catch (error) {
//             console.error("Erro: ", error);
//             alert("Deu algo errado!");
//         }
//     } 
// }