document.addEventListener('DOMContentLoaded', (event) => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;

            if (username && password) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userExists = users.some(user => user.username === username);

                if (userExists) {
                    alert('Nome de usuário já existe!');
                } else {
                    users.push({ username, password });
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = 'index.html';
                }
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const validUser = users.find(user => user.username === username && user.password === password);

            if (validUser) {
                alert('Login bem-sucedido!');
                // Redirecionar para a página principal ou área restrita
                window.location.href = 'welcome.html';
            } else {
                alert('Nome de usuário ou senha incorretos!');
            }
        });
    }
});
