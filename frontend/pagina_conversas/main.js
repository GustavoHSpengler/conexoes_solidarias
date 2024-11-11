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

document.getElementById("sendButton").addEventListener("click", sendMessage);

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    if (messageText) {
        addMessage(messageText, "sent"); 

        
        setTimeout(() => {
            addMessage("Oi", "received");
        }, 500);

        messageInput.value = ""; 
    }
}

function addMessage(text, type) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message", type);
    messageContainer.textContent = text;

    const chatMessages = document.getElementById("chatMessages");
    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function createChat() {

}