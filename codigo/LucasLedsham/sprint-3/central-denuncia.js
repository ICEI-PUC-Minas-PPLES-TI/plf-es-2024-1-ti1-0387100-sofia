document
  .getElementById("reportForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addReport();
  });

let reports = JSON.parse(localStorage.getItem("reports")) || [];

function addReport() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;
  const report = document.getElementById("report").value;

  const newReport = {
    id: Date.now(),
    name,
    email,
    city,
    report,
  };

  reports.push(newReport);
  localStorage.setItem("reports", JSON.stringify(reports));
  displayReports();
  document.getElementById("reportForm").reset();
}

function displayReports() {
  const reportList = document.getElementById("reportList");
  reportList.innerHTML = "";

  reports.forEach((report) => {
    const reportCard = document.createElement("div");
    reportCard.classList.add("card");
    reportCard.innerHTML = `
          <h3>${report.name} (${report.city})</h3>
          <p>${report.email}</p>
          <p>${report.report}</p>
          <button class="delete" onclick="deleteReport(${report.id})">Deletar</button>
          <button class="edit" onclick="editReport(${report.id})">Editar</button>
          <button class="view" onclick="viewReport(${report.id})">Ver</button>
      `;
    reportList.appendChild(reportCard);
  });
}

function deleteReport(id) {
  reports = reports.filter((report) => report.id !== id);
  localStorage.setItem("reports", JSON.stringify(reports));
  displayReports();
}

function editReport(id) {
  const report = reports.find((report) => report.id === id);
  document.getElementById("name").value = report.name;
  document.getElementById("email").value = report.email;
  document.getElementById("city").value = report.city;
  document.getElementById("report").value = report.report;

  deleteReport(id);
}

function viewReport(id) {
  const report = reports.find((report) => report.id === id);
  alert(
    `Nome: ${report.name}\nEmail: ${report.email}\nCidade: ${report.city}\nRelato: ${report.report}`
  );
}

// Inicializa a exibição dos relatórios ao carregar a página
displayReports();
