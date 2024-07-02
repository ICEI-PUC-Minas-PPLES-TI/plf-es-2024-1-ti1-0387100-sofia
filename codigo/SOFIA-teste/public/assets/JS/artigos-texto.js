document.addEventListener("DOMContentLoaded", () => {
  const formularioComentario = document.getElementById("formulario-comentario");
  const entradaComentario = document.getElementById("entrada-comentario");
  const listaComentarios = document.getElementById("lista-comentarios");

  // Função para buscar e exibir comentários
  function buscarComentarios() {
    fetch("http://localhost:3000/comentarios")
      .then((response) => response.json())
      .then((comentarios) => {
        listaComentarios.innerHTML = "";
        comentarios.forEach((comentario) => {
          const elementoComentario = document.createElement("div");
          elementoComentario.className = "comentario";
          elementoComentario.innerHTML = `
            <p>${comentario.texto}</p>
            <div class="botoes-comentario">
              <button class="editar" data-id="${comentario.id}" data-texto="${comentario.texto}">Editar</button>
              <button class="deletar" data-id="${comentario.id}">Deletar</button>
            </div>
          `;
          listaComentarios.appendChild(elementoComentario);
        });

        // Adicionar event listeners para os botões de editar e deletar
        document.querySelectorAll(".editar").forEach((button) => {
          button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const texto = e.target.dataset.texto;
            editarComentario(id, texto);
          });
        });

        document.querySelectorAll(".deletar").forEach((button) => {
          button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            deletarComentario(id);
          });
        });
      });
  }

  // Função para adicionar um novo comentário
  formularioComentario.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = entradaComentario.value.trim();
    if (texto) {
      fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }),
      })
        .then((response) => response.json())
        .then(() => {
          entradaComentario.value = "";
          buscarComentarios();
        });
    }
  });

  // Função para editar um comentário
  function editarComentario(id, texto) {
    const novoTexto = prompt("Editar comentário:", texto);
    if (novoTexto) {
      fetch(`http://localhost:3000/comentarios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto: novoTexto }),
      }).then(() => buscarComentarios());
    }
  }

  // Função para deletar um comentário
  function deletarComentario(id) {
    if (confirm("Você tem certeza que deseja deletar este comentário?")) {
      fetch(`http://localhost:3000/comentarios/${id}`, {
        method: "DELETE",
      }).then(() => buscarComentarios());
    }
  }

  // Buscar comentários inicialmente
  buscarComentarios();
});
