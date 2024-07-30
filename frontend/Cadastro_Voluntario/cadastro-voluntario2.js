async function sendData(event) {
    event.preventDefault();
    
    let data = JSON.parse(localStorage.getItem("dados"));

    let fm = new FormData();

    fm.append("usuario_cpf", data.usuario_cpf)
    fm.append("nome", data.nome)
    fm.append("email", data.email)
    fm.append("senha", data.senha)
    fm.append("data_nascimento", data.data_nascimento)
    fm.append("telefone", data.telefone)
    fm.append("endereco", data.endereco)
    fm.append("habilidades", document.getElementById("habilidades").value)
    fm.append("interesses", document.querySelector('input[name="interesses"]:checked').value);
    fm.append("nivel_experiencia", document.getElementById("nivel_experiencia").value)
    fm.append("img_conta", document.getElementById("img_conta").files[0])

    for (const data of fm.entries()) {
        console.log(`${data[0]} = ${data[1]}`); 
    }
    console.log(fm)
    const formDataObj = {};
    fm.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj)
    console.log(JSON.stringify(formDataObj))

    try {
        const response = await fetch('http://localhost:3005/api/storeVoluntario/task', {
            method: "POST",
            headers: {                
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        });
        
        // let content = await response.json();
        
        // if (content.success) {
        //     window.location.pathname = "..frontend/Pagina_Inicial/pagina_inicial.html";
        // } else {        
        //     alert("Deu algo errado!");       
        // }
    } catch (error) {
        console.error("Erro: ", error);
        alert("Deu algo errado!");
    }
    
}


// let confirmar = document.getElementById("confirmar");

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