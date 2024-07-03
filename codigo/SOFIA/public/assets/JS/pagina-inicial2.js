fetch("http://localhost:3000/informativos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {

    //Itens para criar os botões de compartilhamento
    const feed = document.querySelector(".feed");
    let cardData = data;

    //Função para gerar o feed
    function gerarFeed(filteredData) {
      feed.innerHTML = ""; // Limpa o feed antes de adicionar novos itens
      let contarCards = 0;
      filteredData.forEach((itemCard) => {
        if (contarCards >= 10) return;
        const itemElemento = document.createElement("div");
        itemElemento.classList.add("item");
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        const instagramShareURL = `https://www.instagram.com/p/${encodeURIComponent(window.location.href)}`;
        const whatsappShareURL = `https://api.whatsapp.com/send?phone=number&text=${encodeURIComponent(window.location.href)}`;
        
        itemElemento.innerHTML = `
            <h2>${itemCard.titulo}</h2>
            <img src="${itemCard.imagem}" alt="${itemCard.titulo}">
            <p>${itemCard.dataDePublicacao.split("-").reverse().join("/")}</p>
                <div class="social-buttons">
                <a href="${facebookShareURL}" class="social-button" data-share-url="${facebookShareURL}"><img src="../assets/icones/facebook-icon.svg" alt="Compartilhar no Facebook"></a>
                <a href="${instagramShareURL}" class="social-button" data-share-url="${instagramShareURL}"><img src="../assets/icones/instagram-icon.svg" alt="Compartilhar no Instagram"></a>
                <a href="${whatsappShareURL}" class="social-button" data-share-url="${whatsappShareURL}"><img src="../assets/icones/whatsapp-icon.svg" alt="Compartilhar no WhatsApp"></a>
            </div> `;
        itemElemento.addEventListener("click", () => {
          window.location.href = `../pages/artigos.html?id=${itemCard.id}`; // Supondo que você tenha um arquivo detalhes.html para redirecionar
        });
        feed.appendChild(itemElemento);
        contarCards++;
      });

      const socialButtons = document.querySelectorAll(".social-button");
      socialButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation(); // Evita que o clique no botão de compartilhamento redirecione para o artigo
          const shareURL = button.dataset.shareUrl;
          window.open(shareURL, "_blank");
        });
      });
    }

    gerarFeed(cardData);

    // Adicionando funcionalidade de busca
    const searchForm = document.querySelector("#busca form");
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita o comportamento padrão do formulário
      const searchText = event.target.querySelector("input[type='text']").value.toLowerCase();
      const filteredData = cardData.filter((item) =>
        item.titulo.toLowerCase().includes(searchText)
      );
      gerarFeed(filteredData);
    });
  })
  .catch((error) => console.error(error));
