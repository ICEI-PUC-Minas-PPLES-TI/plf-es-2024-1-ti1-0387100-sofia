document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/regioes")
    .then((response) => response.json())
    .then((data) => {
      initializeMap(data);
      initializeChart(data);
    });

  function initializeMap(regioesDeRisco) {
    var map = L.map("map").setView([-19.9227, -43.9451], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    function getMarkerIcon(risco) {
      let iconUrl = "";
      if (risco <= 30) {
        iconUrl = "../assets/icones/marker-green.png";
      } else if (risco <= 60) {
        iconUrl = "../assets/icones/marker-yellow.png";
      } else {
        iconUrl = "../assets/icones/marker-red.png";
      }

      return L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
    }

    regioesDeRisco.forEach(function (regiao) {
      L.marker(regiao.coords, { icon: getMarkerIcon(regiao.risco) })
        .addTo(map)
        .bindPopup(`${regiao.nome}<br>Risco: ${regiao.risco}`);
    });
  }

  function initializeChart(regioesDeRisco) {
    var labels = regioesDeRisco.map((regiao) => regiao.nome);
    var data = regioesDeRisco.map((regiao) => regiao.risco);

    function getBarColor(risco) {
      if (risco <= 30) {
        return "rgba(0, 255, 0, 0.6)";
      } else if (risco <= 60) {
        return "rgba(255, 255, 0, 0.6)";
      } else {
        return "rgba(255, 0, 0, 0.6)";
      }
    }

    var backgroundColors = data.map((risco) => getBarColor(risco));
    var borderColors = data.map((risco) =>
      getBarColor(risco).replace("0.6", "1")
    );

    var ctx = document.getElementById("riskChart").getContext("2d");
    var riskChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Regiões de risco em Belo Horizonte",
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
