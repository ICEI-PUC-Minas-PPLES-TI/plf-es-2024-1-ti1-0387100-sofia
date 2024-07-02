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
      let contarCards = 0;
      cardData.forEach((itemCard) => {
        if (contarCards >= 10) return;
        const itemElemento = document.createElement("div");
        itemElemento.classList.add("item");
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
/* 
  function carregarCategorias() {
    fetch("http://localhost:3000/categorias") // Caminho para o arquivo JSON
            .then(response => response.json())
            .then(data => {
                // Referência à lista de categorias no HTML
                const listaCategorias = document.getElementById("categoria-lista");
     
                // Limpa qualquer conteúdo existente na lista
                listaCategorias.innerHTML = "";
                
                // Adiciona cada categoria como um item da lista
                data.categorias.forEach((categoria) => {
                    const li = document.createElement("li");
                    li.className = "categoria-opcao";
                    li.textContent = categoria.nome; // Obtém a propriedade "nome" do objeto "categoria"
                    listaCategorias.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar categorias:", error);
            });
    }
     
    // Chama a função para carregar as categorias ao carregar a página
    window.onload = carregarCategorias;
 */