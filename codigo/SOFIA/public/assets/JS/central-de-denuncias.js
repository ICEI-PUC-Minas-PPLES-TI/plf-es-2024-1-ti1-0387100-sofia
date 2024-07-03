document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reportForm');
  const reportList = document.getElementById('reportList');

  const baseURL = 'http://localhost:3000/reports';

  function loadReports() {
      fetch(baseURL)
          .then(response => response.json())
          .then(reports => {
              reportList.innerHTML = '';
              reports.forEach(report => {
                  const card = createReportCard(report);
                  reportList.appendChild(card);
              });
          });
  }

  function createReportCard(report) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <p><strong>Nome:</strong> ${report.name}</p>
          <p><strong>Email:</strong> ${report.email}</p>
          <p><strong>Cidade:</strong> ${report.city}</p>
          <p><strong>Relato:</strong> ${report.report}</p>
          <button class="edit" data-id="${report.id}">Editar</button>
          <button class="view" data-id="${report.id}">Ver</button>
          <button class="delete" data-id="${report.id}">Deletar</button>
      `;
      card.querySelector('.edit').addEventListener('click', editReport);
      card.querySelector('.view').addEventListener('click', viewReport);
      card.querySelector('.delete').addEventListener('click', deleteReport);
      return card;
  }

  form.addEventListener('submit', submitHandler);

  function submitHandler(event) {
      event.preventDefault();
      const formData = new FormData(form);
      const newReport = {
          name: formData.get('name'),
          email: formData.get('email'),
          city: formData.get('city'),
          report: formData.get('report')
      };

      fetch(baseURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newReport)
      })
      .then(response => response.json())
      .then(() => {
          form.reset();
          loadReports();
      });
  }

  function editReport(event) {
      const id = event.target.dataset.id;
      fetch(`${baseURL}/${id}`)
          .then(response => response.json())
          .then(report => {
              form.name.value = report.name;
              form.email.value = report.email;
              form.city.value = report.city;
              form.report.value = report.report;

              form.querySelector('button[type="submit"]').textContent = 'Salvar';

              form.removeEventListener('submit', submitHandler);
              form.addEventListener('submit', function updateHandler(event) {
                  event.preventDefault();
                  const formData = new FormData(form);
                  const updatedReport = {
                      name: formData.get('name'),
                      email: formData.get('email'),
                      city: formData.get('city'),
                      report: formData.get('report')
                  };

                  fetch(`${baseURL}/${id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(updatedReport)
                  })
                  .then(response => response.json())
                  .then(() => {
                      form.reset();
                      form.querySelector('button[type="submit"]').textContent = 'Enviar'; 
                      form.removeEventListener('submit', updateHandler);
                      form.addEventListener('submit', submitHandler);
                      loadReports();
                  });
              }, { once: true });
          });
  }

  function viewReport(event) {
      const id = event.target.dataset.id;
      fetch(`${baseURL}/${id}`)
          .then(response => response.json())
          .then(report => {
              alert(`Detalhes do Relato:\n\nNome: ${report.name}\nEmail: ${report.email}\nCidade: ${report.city}\nRelato: ${report.report}`);
          });
  }

  function deleteReport(event) {
      const id = event.target.dataset.id;
      fetch(`${baseURL}/${id}`, {
          method: 'DELETE'
      })
      .then(() => loadReports());
  }
  
  loadReports();
});
