
  document.addEventListener('DOMContentLoaded', function() {
    var perfilContainer = document.getElementById('perfil-container');
    var logado = localStorage.getItem('logado');

    if (logado === 'true') {
      perfilContainer.innerHTML = `
        <div class="perfil-menu">
          <img src="assets/img/perfil-icon.png" alt="Perfil" class="perfil-icone" id="perfil-icone">
          <div class="perfil-opcoes" id="perfil-opcoes" style="display: none;">
            <a href="perfil.html" class="btn perfil-btn">Ver Perfil</a>
            <button id="logout-btn" class="btn logout-btn">Sair</button>
          </div>
        </div>
      `;

      // Mostrar opções ao clicar na bolinha
      document.getElementById('perfil-icone').addEventListener('click', function() {
        var opcoes = document.getElementById('perfil-opcoes');
        opcoes.style.display = (opcoes.style.display === 'none') ? 'block' : 'none';
      });

      // Função de deslogar
      document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('logado');
        localStorage.removeItem('admin');
        localStorage.removeItem('cpfLogado');
        alert('Você saiu da conta.');
        window.location.href = 'index.html';
      });

    } else {
      perfilContainer.innerHTML = `
        <a href="login.html" class="btn login-btn">Entrar</a>
        <a href="register.html" class="btn register-btn">Registrar-se</a>
      `;
    }
  });
  const msg = sessionStorage.getItem('mensagemLogin');
  if (msg) {
    alert(msg);
    sessionStorage.removeItem('mensagemLogin');
  }
document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = localStorage.getItem('admin') === 'true';
    const adminLink = document.getElementById('admin-link');

    if (isAdmin && adminLink) {
      adminLink.style.display = 'inline-block';
    }
  });
