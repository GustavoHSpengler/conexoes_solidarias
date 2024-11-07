document.addEventListener("DOMContentLoaded", () => {
    getCards();

    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById("nomeUsuario").textContent = `${user.nome || user.nome_responsavel}`;
        console.log(user);
        
        if (user.img_conta) {

            const imgElement = document.getElementById("imagemUsuario");
            const imgUrl = `../../backend/${user.img_conta}`;
            console.log(`Carregando imagem: ${imgUrl}`);
            imgElement.src = imgUrl;
        } else if (user.img_logo) {
            const imgElement = document.getElementById("imagemUsuario");
            const imgUrl = `../../${user.img_logo}`;  
            console.log(`Carregando logo: ${imgUrl}`);
            imgElement.src = imgUrl;
        }        
    } else {
        window.location.href = "../Login/login.html";
    }
});