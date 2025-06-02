document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const cpf = document.getElementById('cpf').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch(`http://localhost:3000/usuarios?cpf=${cpf}&senha=${senha}`);
  const users = await response.json();

  if (users.length > 0) {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuarioId', users[0].id); // Importante para buscar no perfil
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
  } else {
    alert("CPF ou senha incorretos.");
  }
});
