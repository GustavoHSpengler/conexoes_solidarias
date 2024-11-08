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

document.getElementById("createPostBtn").addEventListener("click", openModal);

function openModal() {
    document.getElementById("postModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("postModal").style.display = "none";
}

function addPost() {
    const postContainer = document.getElementById("postContainer");
    const title = document.getElementById("postTitle").value;
    const message = document.getElementById("postMessage").value;
    const imageInput = document.getElementById("postImage");
    const imageUrl = URL.createObjectURL(imageInput.files[0]);

    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
        <h4>${title}</h4>
        <img src="${imageUrl}" alt="Imagem da postagem">
        <p>${message}</p>
        <div class="post-actions">
            <button onclick="likePost(this)">Curtir <span>0</span></button>
            <button onclick="commentPost(this)">Comentar</button>
        </div>
        <div class="comments"></div>
    `;

    postContainer.prepend(post);
    closeModal();
}

function likePost(button) {
    const likeCount = button.querySelector("span");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function commentPost(button) {
    const commentText = prompt("Digite seu comentário:");
    if (commentText) {
        const commentsDiv = button.parentElement.nextElementSibling;
        const comment = document.createElement("p");
        comment.textContent = commentText;
        commentsDiv.appendChild(comment);
    }
}