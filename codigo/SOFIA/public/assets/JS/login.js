document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    const errorMessage = document.getElementById("error-message");

    fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) => user.login === login && user.senha === senha
        );
        if (user) {
          window.location.href = "./pagina-inicial.html"; // Redireciona para a página principal
        } else {
          errorMessage.textContent = "Usuário ou senha incorretos.";
          errorMessage.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        errorMessage.textContent =
          "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.";
        errorMessage.style.display = "block";
      });
  });
