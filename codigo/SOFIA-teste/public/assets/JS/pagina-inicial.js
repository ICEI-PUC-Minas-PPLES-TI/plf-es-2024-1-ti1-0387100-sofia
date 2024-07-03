document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/informativos")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Itens para criar os botões de categorias
      const buttons = document.querySelectorAll("#categorias-opcoes button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const categoriaId = button.id;
          gerarFeed(categoriaId);
        });
      });

      // Itens para criar o feed
      const feed = document.querySelector(".feed");
      const cardData = data;

      // Função para gerar o feed com base no categoriaId
      function gerarFeed(categoriaId = "todos") {
        // Limpa o feed antes de gerar os novos itens
        feed.innerHTML = "";
        let contarCards = 0;
        cardData.forEach((itemCard) => {
          if (contarCards >= 10) return;
          if (categoriaId === "todos" || itemCard.categoriaId.toString() === categoriaId) {
            const itemElemento = document.createElement("div");
            itemElemento.classList.add("item");
            itemElemento.dataset.categoriaId = itemCard.categoriaId; // Adiciona o ID da categoria como data attribute
            const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`;
            const instagramShareURL = `https://www.instagram.com/p/${encodeURIComponent(
              window.location.href
            )}`;
            const whatsappShareURL = `https://api.whatsapp.com/send?phone=number&text=${encodeURIComponent(
              window.location.href
            )}`;

            itemElemento.innerHTML = `
              <h2>${itemCard.titulo}</h2>
              <img src="${itemCard.imagem}" alt="${itemCard.titulo}">
              <p>${itemCard.dataDePublicacao.split("-").reverse().join("/")}</p>
              <div class="social-buttons">
                <a href="${facebookShareURL}" class="social-button" data-share-url="${facebookShareURL}"><img src="../assets/icones/facebook-icon.svg" alt="Compartilhar no Facebook"></a>
                <a href="${instagramShareURL}" class="social-button" data-share-url="${instagramShareURL}"><img src="../assets/icones/instagram-icon.svg" alt="Compartilhar no Instagram"></a>
                <a href="${whatsappShareURL}" class="social-button" data-share-url="${whatsappShareURL}"><img src="../assets/icones/whatsapp-icon.svg" alt="Compartilhar no WhatsApp"></a>
              </div>
            `;
            itemElemento.addEventListener("click", () => {
              window.location.href = `../pages/artigos.html?id=${itemCard.id}`;
            });
            feed.appendChild(itemElemento);
            contarCards++;
          }
        });

        // Adiciona event listeners aos botões de compartilhamento
        const socialButtons = document.querySelectorAll(".social-button");
        socialButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            event.stopPropagation(); // Evita que o clique no botão redirecione para a página do artigo
            const shareURL = button.dataset.shareUrl;
            window.open(shareURL, "_blank");
          });
        });
      }

      // Gera o feed inicial com todos os itens
      gerarFeed();
    })
    .catch((error) => console.error(error));
  });

  // Adicionando funcionalidade de busca
  const searchForm = document.querySelector("#busca form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    const searchText = event.target.querySelector("input[type='text']").value.toLowerCase();
    const filteredData = cardData.filter((item) =>
      item.titulo.toLowerCase().includes(searchText)
    );
    gerarFeed(filteredData);
    showAllButton.style.display = filteredData.length < cardData.length ? "block" : "none"; // Mostra o botão se a busca filtrar os itens
  });
    // Adicionando funcionalidade para mostrar todos os itens
    showAllButton.addEventListener("click", () => {
      gerarFeed(cardData);
      showAllButton.style.display = "none"; // Esconde o botão após mostrar todos os itens
    });