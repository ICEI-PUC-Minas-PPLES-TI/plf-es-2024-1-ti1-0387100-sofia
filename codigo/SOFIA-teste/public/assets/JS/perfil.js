document.addEventListener("DOMContentLoaded", () => {
  const relatosEnvio = document.getElementById("relatos-envio");
  const comentariosEnvio = document.getElementById("comentarios-envio");

  async function fetchReports() {
      try {
          const response = await fetch('http://localhost:3000/reports');
          const reports = await response.json();
          renderReports(reports);
      } catch (error) {
          console.error("Erro ao buscar os relatórios:", error);
      }
  }

  function renderReports(reports) {
      reports.forEach(report => {
          const card = document.createElement('div');
          card.className = 'report-card';
          card.innerHTML = `
              <h3>${report.name} (${report.city})</h3>
              <p>${report.report}</p>
              <button onclick="viewReport('${report.id}')">Ver</button>
              <button onclick="editReport('${report.id}')">Editar</button>
              <button onclick="deleteReport('${report.id}')">Deletar</button>
          `;
          relatosEnvio.appendChild(card);
      });
  }

  window.viewReport = async function(id) {
      try {
          const response = await fetch(`http://localhost:3000/reports/${id}`);
          const report = await response.json();
          alert(`Relatório de ${report.name}:\n\n${report.report}`);
      } catch (error) {
          console.error("Erro ao visualizar o relatório:", error);
      }
  }

  window.editReport = async function(id) {
      try {
          const response = await fetch(`http://localhost:3000/reports/${id}`);
          const report = await response.json();

          const newReportText = prompt("Edite o relatório:", report.report);
          if (newReportText) {
              const updatedReport = {
                  ...report,
                  report: newReportText
              };

              const putResponse = await fetch(`http://localhost:3000/reports/${id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedReport)
              });

              if (putResponse.ok) {
                  alert('Relatório editado com sucesso!');
                  location.reload(); 
              } else {
                  alert('Erro ao editar o relatório!');
              }
          }
      } catch (error) {
          console.error("Erro ao editar o relatório:", error);
      }
  }

  window.deleteReport = async function(id) {
      try {
          const response = await fetch(`http://localhost:3000/reports/${id}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              alert('Relatório deletado com sucesso!');
              location.reload();
          } else {
              alert('Erro ao deletar o relatório!');
          }
      } catch (error) {
          console.error("Erro ao deletar o relatório:", error);
      }
  }

  async function fetchComentarios() {
      try {
          const response = await fetch('http://localhost:3000/comentarios');
          const comentarios = await response.json();
          renderComentarios(comentarios);
      } catch (error) {
          console.error("Erro ao buscar os comentários:", error);
      }
  }

  function renderComentarios(comentarios) {
      comentarios.forEach(comentario => {
          const card = document.createElement('div');
          card.className = 'comment-card';
          card.innerHTML = `
              <p>${comentario.texto}</p>
              <button onclick="viewComentario('${comentario.id}')">Ver</button>
              <button onclick="editComentario('${comentario.id}')">Editar</button>
              <button onclick="deleteComentario('${comentario.id}')">Deletar</button>
          `;
          comentariosEnvio.appendChild(card);
      });
  }

  window.viewComentario = async function(id) {
      try {
          const response = await fetch(`http://localhost:3000/comentarios/${id}`);
          const comentario = await response.json();
          alert(`Comentário:\n\n${comentario.texto}`);
      } catch (error) {
          console.error("Erro ao visualizar o comentário:", error);
      }
  }

  window.editComentario = async function(id) {
      try {
          const response = await fetch(`http://localhost:3000/comentarios/${id}`);
          const comentario = await response.json();

          const newComentarioText = prompt("Edite o comentário:", comentario.texto);
          if (newComentarioText) {
              const updatedComentario = {
                  ...comentario,
                  texto: newComentarioText
              };

              const putResponse = await fetch(`http://localhost:3000/comentarios/${id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedComentario)
              });

              if (putResponse.ok) {
                  alert('Comentário editado com sucesso!');
                  location.reload();
              } else {
                  alert('Erro ao editar o comentário!');
              }
          }
      } catch (error) {
          console.error("Erro ao editar o comentário:", error);
      }
  }

  window.deleteComentario = async function(id) {
      try {
          const response = await fetch(`http://localhost:3000/comentarios/${id}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              alert('Comentário deletado com sucesso!');
              location.reload();
          } else {
              alert('Erro ao deletar o comentário!');
          }
      } catch (error) {
          console.error("Erro ao deletar o comentário:", error);
      }
  }

  fetchReports();
  fetchComentarios();
});