document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const login = document.getElementById("login").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const user = {
    nome: nome,
    login: login,
    email: email,
    senha: senha,
  };

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Usuário cadastrado com sucesso!");
      document.getElementById("userForm").reset();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao cadastrar o usuário.");
    });
});
