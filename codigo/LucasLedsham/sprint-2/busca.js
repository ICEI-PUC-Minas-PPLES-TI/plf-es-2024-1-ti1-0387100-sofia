// Verifica se os dados já estão no localStorage
if (!localStorage.getItem("container")) {
  const data = [
    {
      id: 1,
      text: "Manter sua segurança online é essencial para proteger seus dados pessoais. Utilize senhas fortes e exclusivas para cada conta, ativando a autenticação de dois fatores sempre que possível. Além disso, evite clicar em links suspeitos e faça download de aplicativos apenas de fontes confiáveis. Essas práticas simples podem prevenir muitos problemas de segurança.",
    },
    {
      id: 2,
      text: "Em um mundo cada vez mais digital, a segurança online nunca foi tão importante. Mantenha seu software atualizado, incluindo sistemas operacionais e aplicativos, para se proteger contra vulnerabilidades conhecidas. Cuidado com e-mails de phishing e mensagens fraudulentas que tentam obter suas informações pessoais. Lembre-se, a prevenção é a melhor defesa.",
    },
    {
      id: 3,
      text: "A navegação segura na internet requer vigilância constante. Use uma VPN para proteger sua privacidade e evitar que suas atividades online sejam monitoradas por terceiros. Esteja atento ao compartilhar informações pessoais nas redes sociais e configure suas configurações de privacidade de forma adequada. Uma abordagem proativa à segurança online ajuda a manter suas informações seguras e protegidas.",
    },
  ];
  localStorage.setItem("content", JSON.stringify(data));
}

document.getElementById("campo-de-busca").addEventListener("input", buscar);

function buscar() {
  const termoDeBusca = document
    .getElementById("campo-de-busca")
    .value.toLowerCase()
    .trim();
  const resultados = document.getElementById("resultados");
  const conteudoEstatico = document.getElementById("conteudo-estatico");

  // Limpa os resultados anteriores
  resultados.innerHTML = "";

  if (!termoDeBusca) {
    conteudoEstatico.classList.remove("escondido");
    return;
  }

  conteudoEstatico.classList.add("escondido");

  try {
    const data = JSON.parse(localStorage.getItem("content"));

    const palavrasChave = termoDeBusca
      .split(" ")
      .filter((palavraChave) => palavraChave);
    let encontrado = false;

    data.forEach((item) => {
      const texto = item.text.toLowerCase();
      let corresponde = true;

      // Verifica se todas as palavras-chave estão presentes no parágrafo
      for (let palavraChave of palavrasChave) {
        if (!texto.includes(palavraChave)) {
          corresponde = false;
          break;
        }
      }

      if (corresponde) {
        encontrado = true;
        let textoOriginal = item.text;
        let textoDestacado = textoOriginal;

        // Destaca todas as palavras-chave no parágrafo
        for (let palavraChave of palavrasChave) {
          const regex = new RegExp(`(${palavraChave})`, "gi");
          textoDestacado = textoDestacado.replace(
            regex,
            '<span class="destaque">$1</span>'
          );
        }

        // Exibe o parágrafo com as palavras destacadas
        const paragrafoResultado = document.createElement("p");
        paragrafoResultado.innerHTML = textoDestacado;
        resultados.appendChild(paragrafoResultado);
      }
    });

    if (!encontrado) {
      resultados.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    }
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function limparBusca() {
  document.getElementById("campo-de-busca").value = "";
  document.getElementById("resultados").innerHTML = "";
  document.getElementById("conteudo-estatico").classList.remove("escondido");
}
