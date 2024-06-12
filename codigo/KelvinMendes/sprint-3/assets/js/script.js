/* const newsData = [
        "usuarios": [
            {
              "id": 1,
              "login": "admin",
              "senha": "123",
              "nome": "Administrador do Sistema",
              "email": "admin@abc.com"
            },
            {
              "id": 2,
              "login": "user",
              "senha": "123",
              "nome": "Usuario Comum",
              "email": "user@abc.com"
            }
        ],
        "informativos": [
            {
              "id": 1,
              "titulo": "Golpe do Empréstimo Consignado: saiba como se proteger",
              "imagem": "./img/golpe_consignado.png",
              "conteudo": "O Crédito consignado tem servido como isca para criminosos atraírem funcionários públicos, aposentados e pensionistas do INSS. Saiba como identificar esse tipo de golpe e se proteger das ameaças.",
              "categoriaId": 1,
              "dataDePublicacao": "2024-05-19"
            }
          ],
        "categorias": [
            { "id":1, "nome":"Segurança" },
            { "id":2, "nome":"Saúde" },
            { "id":3, "nome":"Educação" },
            { "id":4, "nome":"Economia" }
          ],
        "incidentes": [
            {
              "id": 1,
              "data": "10-01-2024",
              "depoimento": "História do golpe sofrido aqui.",
              "usuarioId": 1,
              "regiaoId": 1
            }
          ],
        "regioes": [
          { "id":1, "regiaoId":1, "nome":"Regional Norte", "coords": [-19.8704, -43.9346], "risco": 30 },
          { "id":1, "regiaoId":2, "nome": "Regional Venda Nova", "coords": [-19.8170, -43.9476], "risco": 50 },
          { "id":1, "regiaoId":3, "nome": "Regional Pampulha", "coords": [-19.8551, -43.9623], "risco": 40 },
          { "id":1, "regiaoId":4, "nome": "Regional Noroeste", "coords": [-19.9061, -43.9779], "risco": 60 },
          { "id":1, "regiaoId":5, "nome": "Regional Centro-Sul", "coords": [-19.9359, -43.9376], "risco": 90 },
          { "id":1, "regiaoId":6, "nome": "Regional Oeste", "coords": [-19.9459, -43.9659], "risco": 80 },
          { "id":1, "regiaoId":7, "nome": "Regional Barreiro", "coords": [-19.9766, -44.0154], "risco": 70 },
          { "id":1, "regiaoId":8, "nome": "Regional Leste", "coords": [-19.9166, -43.9264], "risco": 20 },
          { "id":1, "regiaoId":9, "nome": "Regional Nordeste", "coords": [-19.8956, -43.9054], "risco": 10 },
          { "id":1, "regiaoId":10, "nome": "Regional Oeste", "coords": [-19.9559, -43.9859], "risco": 15 }

        ]
];

const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
const instagramShareURL = `https://www.instagram.com/p/${encodeURIComponent(window.location.href)}`; 
const whatsappShareURL = `https://api.whatsapp.com/send?phone=number&text=${encodeURIComponent(window.location.href)}`;

const newsFeed = document.querySelector('.news-feed');

function generateNewsFeed() {
    newsData.forEach(newsItem => {
        const newsItemElement = document.createElement('div');
        newsItemElement.classList.add('news-item');

        newsItemElement.innerHTML = `
            <h2>${newsItem.title}</h2>
            <img src="${newsItem.image}" alt="${newsItem.title}">
            <p>${newsItem.content}</p>

            <div class="social-buttons">
                <a href="#" class="social-button" data-share-url="${facebookShareURL}">
                    <img src="./img/facebook-icon.png" alt="Compartilhar no Facebook">
                </a>
                <a href="#" class="social-button" data-share-url="${instagramShareURL}">
                    <img src="./img/instagram-icon.png" alt="Compartilhar no Instagram">
                </a>
                <a href="#" class="social-button" data-share-url="${whatsappShareURL}">
                    <img src="./img/whatsapp-icon.png" alt="Compartilhar no WhatsApp">
                </a>
            </div>
        `;
        newsFeed.appendChild(newsItemElement);
    });
}

generateNewsFeed();

const socialButtons = document.querySelectorAll('.social-button');

socialButtons.forEach(button => {
    button.addEventListener('click', () => {
        const shareURL = button.dataset.shareUrl;
        window.open(shareURL, '_blank');
    });
});                                                                                                 */
