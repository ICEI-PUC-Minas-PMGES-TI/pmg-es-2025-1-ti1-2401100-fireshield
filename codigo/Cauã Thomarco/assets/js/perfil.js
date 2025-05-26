  const cpfLogado = localStorage.getItem('cpfLogado');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cpf === cpfLogado);

    //if (!usuario) {
    //  alert("Usuário não logado!");
    //  window.location.href = "login.html";
    //}

    // Preencher os campos
    document.getElementById('perfil-nome').value = usuario.nome;
    document.getElementById('perfil-email').value = usuario.email;
    document.getElementById('perfil-cidade').value = usuario.cidade;
    document.getElementById('perfil-estado').value = usuario.estado;

    // Atualizar dados
    document.getElementById('perfil-form').addEventListener('submit', function (e) {
      e.preventDefault();

      usuario.nome = document.getElementById('perfil-nome').value;
      usuario.email = document.getElementById('perfil-email').value;
      usuario.cidade = document.getElementById('perfil-cidade').value;
      usuario.estado = document.getElementById('perfil-estado').value;

      const indice = usuarios.findIndex(u => u.cpf === cpfLogado);
      usuarios[indice] = usuario;

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Dados atualizados com sucesso!');
    });

    // Carregar denúncias do usuário
    const todasDenuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
    const minhasDenuncias = todasDenuncias.filter(d => d.cpf === cpfLogado);

    const lista = document.getElementById('lista-denuncias');
    if (minhasDenuncias.length === 0) {
      lista.innerHTML = "<p>Você ainda não realizou nenhuma denúncia.</p>";
    } else {
      minhasDenuncias.forEach(d => {
        const div = document.createElement('div');
        div.className = 'denuncia-item';
        div.innerHTML = `
          <strong>Título:</strong> ${d.titulo || 'Sem título'}<br>
          <strong>Descrição:</strong> ${d.descricao || 'Sem descrição'}<br>
          <strong>Data:</strong> ${d.data || 'Indefinida'}
        `;
        lista.appendChild(div);
      });
    }