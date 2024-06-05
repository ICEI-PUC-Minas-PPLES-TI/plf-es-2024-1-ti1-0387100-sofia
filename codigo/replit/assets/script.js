// SCRIPT CARROSSEL

const rolagens = document.querySelectorAll(".rolagem");

// Verifica se o usuário não prefere redução de movimento
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  adicionarAnimacao();
}

function adicionarAnimacao() {
  rolagens.forEach((rolagem) => {
    rolagem.setAttribute("data-animado", true);

    // Define direção e velocidade
    const direcao = rolagem.getAttribute("data-direcao");
    const velocidade = rolagem.getAttribute("data-velocidade");

    if (direcao === "direita") {
      rolagem.style.setProperty("--direcao-animacao", "reverse");
    } else {
      rolagem.style.setProperty("--direcao-animacao", "forwards");
    }

    if (velocidade === "devagar") {
      rolagem.style.setProperty("--duracao-animacao", "20s");
    }

    const rolagemInterna = rolagem.querySelector(".rolagem__interna");
    const conteudoRolagem = Array.from(rolagemInterna.children);

    conteudoRolagem.forEach((item) => {
      const itemDuplicado = item.cloneNode(true);
      itemDuplicado.setAttribute("aria-hidden", true);
      rolagemInterna.appendChild(itemDuplicado);
    });
  });
}

// ANIMACAO TEXTO VIDEO

const textoItemHeaders = document.querySelectorAll(
  ".texto-item-header"
);

textoItemHeaders.forEach((textoItemHeader) => {
  textoItemHeader.addEventListener("click", () => {
    const currentlyActiveTextoItemHeader = document.querySelector(
      ".texto-item-header.active"
    );
    if (
      currentlyActiveTextoItemHeader &&
      currentlyActiveTextoItemHeader !== textoItemHeader
    ) {
      currentlyActiveTextoItemHeader.classList.toggle("active");
      currentlyActiveTextoItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    textoItemHeader.classList.toggle("active");
    const textoItemBody = textoItemHeader.nextElementSibling;
    if (textoItemHeader.classList.contains("active")) {
      textoItemBody.style.maxHeight = textoItemBody.scrollHeight + "px";
    } else {
      textoItemBody.style.maxHeight = 0;
    }
  });
});

// Abrir automaticamente o primeiro item do acordeão ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const primeiroTextoItemHeader = document.querySelector(
    ".texto-item-header"
  );
  primeiroTextoItemHeader.classList.add("active");
  const primeiroTextoItemBody = primeiroTextoItemHeader.nextElementSibling;
  primeiroTextoItemBody.style.maxHeight =
    primeiroTextoItemBody.scrollHeight + "px";
});

