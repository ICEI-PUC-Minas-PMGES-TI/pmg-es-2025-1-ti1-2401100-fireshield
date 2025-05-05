function fazerDenuncia() {
    alert("Redirecionando para o formulário de denúncia...");
  }
  document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Registro enviado com sucesso!');
    // Aqui você pode enviar os dados para o servidor depois
  });
  // Simula login automático quando registra (para testes)
document.getElementById('register-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    localStorage.setItem('logado', 'true'); // Marca como logado
    alert('Registro feito e login realizado com sucesso!');
    window.location.href = 'index.html'; // Voltar para Home
  });
  
  // Simula login manual (se você quiser depois fazer uma tela de login separada)
  function fazerLogin() {
    localStorage.setItem('logado', 'true');
    alert('Login realizado com sucesso!');
    window.location.href = 'index.html';
  }
  
  // Simula logout
  function fazerLogout() {
    localStorage.removeItem('logado');
    alert('Logout realizado!');
    window.location.href = 'index.html';
  }
  