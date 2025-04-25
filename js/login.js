document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const h1 = document.querySelector(".login-wrapper h1");
    const toggleLink = document.getElementById("toggle-mode");
    const recuperarSenhaLink = document.getElementById("recuperar-senha");

    let modoCadastro = false; // começa em modo login

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (modoCadastro) {
            // Cadastro
            if (localStorage.getItem(email)) {
                alert("Este e-mail já está cadastrado!");
            } else {
                localStorage.setItem(email, JSON.stringify({ email, senha }));
                alert("Conta criada com sucesso! Agora faça login.");
                alternarModo(); // volta para login
            }
        } else {
            // Login
            const userData = JSON.parse(localStorage.getItem(email));
            if (userData && userData.senha === senha) {
                // redicionando pra pagina principal:
                window.location.href = "index.html";
            } else {
                alert("E-mail ou senha inválidos.");
            }
        }
    });

    toggleLink.addEventListener("click", function (e) {
        e.preventDefault();
        alternarModo();
    });

    recuperarSenhaLink.addEventListener("click", function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const userData = JSON.parse(localStorage.getItem(email));
        if (userData) {
            alert(`Sua senha é: ${userData.senha}`);
        } else {
            alert("E-mail não encontrado.");
        }
    });

    function alternarModo() {
        modoCadastro = !modoCadastro;
        h1.textContent = modoCadastro ? "Cadastro" : "Login";
        form.querySelector("button").textContent = modoCadastro ? "Cadastrar" : "Entrar";
        toggleLink.textContent = modoCadastro ? "Já tenho conta" : "Criar conta";
    }
});
