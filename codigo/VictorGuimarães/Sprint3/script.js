document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeMap(data);
            initializeChart(data);
        });

    function initializeMap(regioesDeRisco) {
        // Inicializa o mapa na latitude e longitude de Belo Horizonte
        var map = L.map('map').setView([-19.9227, -43.9451], 13);

        // Adiciona uma camada de mapa do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Função para determinar a cor do marcador com base no risco
        function getMarkerIcon(risco) {
            let iconUrl = '';
            if (risco <= 30) {
                iconUrl = 'images/marker-green.png';
            } else if (risco <= 60) {
                iconUrl = 'images/marker-yellow.png';
            } else {
                iconUrl = 'images/marker-red.png';
            }

            return L.icon({
                iconUrl: iconUrl,
                iconSize: [25, 41], // Tamanho do ícone
                iconAnchor: [12, 41], // Âncora do ícone (ponto onde ele será fixado no mapa)
                popupAnchor: [1, -34], // Âncora do popup
                shadowSize: [41, 41] // Tamanho da sombra
            });
        }

        // Adiciona marcadores para regiões de risco
        regioesDeRisco.forEach(function(regiao) {
            L.marker(regiao.coords, { icon: getMarkerIcon(regiao.risco) }).addTo(map)
                .bindPopup(`${regiao.nome}<br>Risco: ${regiao.risco}`);
        });
    }

    function initializeChart(regioesDeRisco) {
        // Dados para o gráfico extraídos do JSON
        var labels = regioesDeRisco.map(regiao => regiao.nome);
        var data = regioesDeRisco.map(regiao => regiao.risco);

        // Função para determinar a cor da barra com base no risco
        function getBarColor(risco) {
            if (risco <= 30) {
                return 'rgba(0, 255, 0, 0.6)'; // Verde
            } else if (risco <= 60) {
                return 'rgba(255, 255, 0, 0.6)'; // Amarelo
            } else {
                return 'rgba(255, 0, 0, 0.6)'; // Vermelho
            }
        }

        var backgroundColors = data.map(risco => getBarColor(risco));
        var borderColors = data.map(risco => getBarColor(risco).replace('0.6', '1'));

        var ctx = document.getElementById('riskChart').getContext('2d');
        var riskChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Regiões de risco em Belo Horizonte',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Gráfico de barras horizontais
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
