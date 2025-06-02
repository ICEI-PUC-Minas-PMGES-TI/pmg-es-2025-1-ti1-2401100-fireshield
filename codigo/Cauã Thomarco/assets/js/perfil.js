
    const usuarioId = localStorage.getItem('userId');
    if (!usuarioId) {
      alert('Usuário não logado.');
      window.location.href = 'login.html';
    }

 async function carregarPerfil() {
  const usuarioId = localStorage.getItem('userId');
  if (!usuarioId) {
    alert('Usuário não logado.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const resposta = await fetch(`http://localhost:3000/usuarios/${usuarioId}`);
    if (!resposta.ok) throw new Error('Usuário não encontrado.');

    const usuario = await resposta.json();

    document.getElementById('nome').textContent = usuario.nome;
    document.getElementById('email').textContent = usuario.email;
    document.getElementById('cpf').textContent = usuario.cpf;
    document.getElementById('cidade').textContent = usuario.cidade;
    document.getElementById('rua').textContent = usuario.rua;
    document.getElementById('estado').textContent = usuario.estado;
    document.getElementById('pais').textContent = usuario.pais;
    document.getElementById('foto-perfil').src = usuario.fotoPerfil || 'assets/img/perfil-icon.png';
  } catch (erro) {
    console.error('Erro ao carregar perfil:', erro);
  }
}

window.addEventListener('DOMContentLoaded', carregarPerfil);


    async function carregarDenuncias() {
      const resposta = await fetch('http://localhost:3000/denuncias');
      const todas = await resposta.json();
      const minhas = todas.filter(d => d.userId == userId);

      const lista = document.getElementById('lista-denuncias');
      lista.innerHTML = '';

      if (minhas.length === 0) {
        lista.innerHTML = '<p>Nenhuma denúncia registrada.</p>';
        return;
      }

      minhas.forEach(denuncia => {
        const div = document.createElement('div');
        div.className = 'denuncia-item';
        div.innerHTML = `
          <p><strong>Título:</strong> ${denuncia.titulo || 'Sem título'}</p>
          <p><strong>Descrição:</strong> ${denuncia.descricao || 'Sem descrição'}</p>
          <button class="btn-excluir-denuncia" onclick="excluirDenuncia(${denuncia.id})">Excluir</button>
        `;
        lista.appendChild(div);
      });
    }

    async function excluirDenuncia(id) {
      if (confirm('Tem certeza que deseja excluir esta denúncia?')) {
        await fetch(`http://localhost:3000/denuncias/${id}`, { method: 'DELETE' });
        carregarDenuncias();
      }
    }

    document.getElementById('deletar-conta').addEventListener('click', async () => {
      if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
        await fetch(`http://localhost:3000/usuarios/${usuarioId}`, { method: 'DELETE' });
        localStorage.clear();
        alert('Conta deletada com sucesso.');
        window.location.href = 'index.html';
      }
    });

    document.getElementById('editar-btn').addEventListener('click', () => {
      window.location.href = 'editar_perfil.html'; // Página de edição (opcional)
    });

    // Carregamento inicial
    carregarPerfil();
    carregarDenuncias();
