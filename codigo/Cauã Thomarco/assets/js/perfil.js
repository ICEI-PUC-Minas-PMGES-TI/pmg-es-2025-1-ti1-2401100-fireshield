
document.addEventListener('DOMContentLoaded', () => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
    return;
  }

  const form = document.getElementById('perfil-form');
  const editarBtn = document.getElementById('editar-btn');
  const salvarBtn = document.getElementById('salvar-btn');

  // Carregar dados do usuário
  fetch(`http://localhost:3000/usuarios/${userId}`)
    .then(res => res.json())
    .then(usuario => {
      // Preenche os campos
      document.getElementById('nome').value = usuario.nome;
      document.getElementById('email').value = usuario.email;
      document.getElementById('cpf').value = usuario.cpf;
      document.getElementById('cidade').value = usuario.cidade;
      document.getElementById('estado').value = usuario.estado;
      document.getElementById('pais').value = usuario.pais;
      document.getElementById('foto-preview').src = usuario.fotoPerfil || 'assets/img/perfil-icon.png';

      // Deixa os campos desativados inicialmente
      [...form.elements].forEach(el => el.disabled = true);
      editarBtn.disabled = false;
    });

  // Ativar edição
  editarBtn.addEventListener('click', () => {
    [...form.elements].forEach(el => el.disabled = false);
    editarBtn.style.display = 'none';
    salvarBtn.style.display = 'inline-block';
  });

  // Salvar edição
  salvarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      cpf: document.getElementById('cpf').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      pais: document.getElementById('pais').value,
      fotoPerfil: document.getElementById('foto').value || document.getElementById('foto-preview').src
    };

    fetch(`http://localhost:3000/usuarios/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    })
    .then(res => res.json())
    .then(() => {
      alert('Perfil atualizado com sucesso!');
      location.reload();
    });
  });
});

