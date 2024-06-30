//Animacao Inicial
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    // Esconde a tela de carregamento
    document.getElementById("loader").style.display = "none";
    // Mostra o conteúdo da página
    document.getElementById("content").style.display = "block";
  }, 0);
});
