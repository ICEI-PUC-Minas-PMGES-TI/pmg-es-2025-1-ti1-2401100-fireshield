document.addEventListener('DOMContentLoaded', async function () {
  const usuarioId = localStorage.getItem('usuarioId');
  if (!usuarioId) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = 'login.html';
    return;
  }

  try {
    const resposta = await fetch(`http://localhost:3000/usuarios/${usuarioId}`);
    const usuario = await resposta.json();

    // Preenche os dados na tela
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('cpf').value = usuario.cpf;
    document.getElementById('cidade').value = usuario.cidade;
    document.getElementById('estado').value = usuario.estado;
    document.getElementById('pais').value = usuario.pais;
    document.getElementById('rua').value = usuario.rua;
    document.getElementById('fotoPerfilPreview').src = usuario.fotoPerfil || 'assets/img/perfil-icon.png';

    // Bloqueia os campos até clicar em Editar
    document.querySelectorAll('input').forEach(input => input.disabled = true);

    document.getElementById('editarBtn').addEventListener('click', () => {
      document.querySelectorAll('input').forEach(input => input.disabled = false);
    });

    document.getElementById('salvarBtn').addEventListener('click', async () => {
      const novosDados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        pais: document.getElementById('pais').value,
        rua: document.getElementById('rua').value,
        fotoPerfil: document.getElementById('fotoPerfil').value // Ex: URL ou Base64
      };

      await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novosDados)
      });

      alert('Perfil atualizado com sucesso!');
      location.reload();
    });
  } catch (error) {
    console.error("Erro ao carregar dados do perfil:", error);
    alert("Erro ao buscar dados do usuário.");
  }
});