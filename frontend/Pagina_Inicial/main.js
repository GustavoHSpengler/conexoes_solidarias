document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem('userData');

    if (userData) {
        const user = JSON.parse(userData);
        console.log("Dados do usuário:", user);

        // Exibir o nome do usuário
        document.getElementById("nomeUsuario").textContent = `Bem-vindo, ${user.nome || user.nome_responsavel}`;

        // Verificar o tipo de usuário e definir a imagem correta
        if (user.img_conta) {
            document.getElementById("imagemUsuario").src = `/public/${user.img_conta}`; // Imagem do voluntário
        } else if (user.img_logo) {
            document.getElementById("imagemUsuario").src = `/public/${user.img_logo}`; // Imagem da instituição
        } else {
            console.error("Nenhuma imagem disponível para o usuário.");
        }

    } else {
        // Se não houver dados do usuário, redirecionar para a página de login
        window.location.href = "../Login/login.html";
    }
});

