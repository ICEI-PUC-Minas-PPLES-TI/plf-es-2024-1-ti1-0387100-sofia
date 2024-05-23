const newsData = [
    {
        id: 1,
        title: "Golpe do Empréstimo Consignado: saiba como se proteger",
        image: "./img/golpe_consignado.png",
        content: "O Crédito consignado tem servido como isca para criminosos atraírem funcionários públicos, aposentados e pensionistas do INSS. Saiba como identificar esse tipo de golpe e se proteger das ameaças.",
        category: "Segurança",
        published_date: "2024-05-19"
    },
    {
        id: 2,
        title: "Golpe da compra falsa no cartão de crédito",
        image: "./img/golpe_compraFalsa.png",
        content: "Você sabe o que fazer em caso de golpe ou fraude no cartão de crédito? Veja como se proteger. A instituição financeira tem o dever de resguardar seu cliente desse tipo de fraude, e caso ocorra ela deverá tomar as devidas providências.",
        category: "Segurança",
        published_date: "2024-05-18"
    },
    {
        id: 3,
        title: "INSS alerta contra golpe da prova de vida",
        image: "./img/inss_alerta.png",
        content: "Instituto Nacional do Seguro Social (INSS) faz novo alerta sobre tentativa de golpe contra aposentados e pensionistas: pessoas mal-intencionadas estão se passando por servidores do instituto e visitam os beneficiários em casa para, supostamente, fazer a comprovação de vida. Eles costumam solicitar fotos, dados e documentos ao cidadão.",
        category: "Segurança",
        published_date: "2024-05-17"
    }
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
});
