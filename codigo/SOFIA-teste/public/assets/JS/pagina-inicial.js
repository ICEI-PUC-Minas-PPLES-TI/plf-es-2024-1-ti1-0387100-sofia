fetch("http://localhost:3000/informativos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    //Itens para criar os botões de compartilhamento
    const socialButtons = document.querySelectorAll(".social-button");
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    const instagramShareURL = `https://www.instagram.com/p/${encodeURIComponent(
      window.location.href
    )}`;
    const whatsappShareURL = `https://api.whatsapp.com/send?phone=number&text=${encodeURIComponent(
      window.location.href
    )}`;

    //Itens para criar o feed
    const feed = document.querySelector(".feed");
    const cardData = data;

    //Função para gerar o feed
    function gerarFeed() {
      cardData.forEach((itemCard) => {
        const itemElemento = document.createElement("div");
        itemElemento.classList.add("item");
        itemElemento.innerHTML = `
            <h2>${itemCard.titulo}</h2>
            <img src="${itemCard.imagem}" alt="${itemCard.titulo}">
            <p>${itemCard.dataDePublicacao.split("-").reverse().join("/")}</p>
                <div class="social-buttons">
                <a href="#" class="social-button" data-share-url="${facebookShareURL}"><img src="../assets/img/facebook-icon.png" alt="Compartilhar no Facebook"></a>
                <a href="#" class="social-button" data-share-url="${instagramShareURL}"><img src="../assets/img/instagram-icon.png" alt="Compartilhar no Instagram"></a>
                <a href="#" class="social-button" data-share-url="${whatsappShareURL}"><img src="../assets/img/whatsapp-icon.png" alt="Compartilhar no WhatsApp"></a>
            </div> `;
        itemElemento.addEventListener("click", () => {
          window.location.href = `../pages/artigos.html?id=${itemCard.id}`; // Supondo que você tenha um arquivo detalhes.html para redirecionar
        });
        feed.appendChild(itemElemento);
      });
    }

    socialButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const shareURL = button.dataset.shareUrl;
        window.open(shareURL, "_blank");
      });
    });

    gerarFeed();
  })
  .catch((error) => console.error(error));
