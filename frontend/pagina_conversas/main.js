document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById("nomeUsuario").textContent = `${user.nome || user.nome_responsavel}`;
        
        if (user.img_conta) {
            const imgElement = document.getElementById("imagemUsuario");
            const imgUrl = `../../backend/${user.img_conta}`;
            imgElement.src = imgUrl;
        } else if (user.img_logo) {
            const imgElement = document.getElementById("imagemUsuario");
            const imgUrl = `../../backend/${user.img_logo}`;  
            imgElement.src = imgUrl;
        }        
    } else {
        window.location.href = "../Login/login.html";
    }
});