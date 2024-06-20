const botaoCriarConta = document.getElementById('criarConta');
const botaoEntrar = document.getElementById('entrar');
const container = document.getElementById('container');

botaoCriarConta.addEventListener('click', () => {
	container.classList.add("painel-direito-ativo");
});

botaoEntrar.addEventListener('click', () => {
	container.classList.remove("painel-direito-ativo");
});
