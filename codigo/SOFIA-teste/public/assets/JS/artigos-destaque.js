/* // const apiUrl = 'http://localhost:3000/informativos'; 
//../sprint-2/data/db.json  ||     <p>${itemCard.conteudo}</p>
fetch('../../../data/db.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    function gerarFeed() {
      const informativos = data.informativos;
      const feed = document.querySelector(".feed");
      const cardData = informativos;
      
      cardData.forEach((itemCard) => {
        const itemElemento = document.createElement("div");
        itemElemento.classList.add("item");
        itemElemento.innerHTML = `
            <h2>${itemCard.titulo}</h2>
            <img src="${itemCard.imagem}" alt="${itemCard.titulo}">
            <p>${itemCard.dataDePublicacao.split('-').reverse().join('/')}</p>
            
            <div class="social-buttons">
                <a href="#" class="social-button" data-share-url="${facebookShareURL}">
                    <img src="../public/assets/img/facebook-icon.png" alt="Compartilhar no Facebook">
                </a>
                <a href="#" class="social-button" data-share-url="${instagramShareURL}">
                    <img src="../public/assets/img/instagram-icon.png" alt="Compartilhar no Instagram">
                </a>
                <a href="#" class="social-button" data-share-url="${whatsappShareURL}">
                    <img src="../public/assets/img/whatsapp-icon.png" alt="Compartilhar no WhatsApp">
                </a>
            </div> `;
        feed.appendChild(itemElemento);
      });
    }
    const socialButtons = document.querySelectorAll(".social-button");
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    const instagramShareURL = `https://www.instagram.com/p/${encodeURIComponent(window.location.href)}`;
    const whatsappShareURL = `https://api.whatsapp.com/send?phone=number&text=${encodeURIComponent(window.location.href)}`;
    socialButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const shareURL = button.dataset.shareUrl;
        window.open(shareURL, "_blank");
      });
    });
    gerarFeed();
  })
  .catch((error) => console.error(error));
 */