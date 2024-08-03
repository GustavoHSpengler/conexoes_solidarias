document.getElementById("cnpj").addEventListener("input", function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); 
    value = value.replace(/(\d{2})(\d)/, "$1.$2"); 
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); 
    value = value.replace(/(\d{3})(\d)/, "$1/$2"); 
    e.target.value = value;
});

async function nextPage(event) {
    event.preventDefault();

    const cnpj    = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
}