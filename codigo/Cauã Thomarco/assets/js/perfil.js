
    const cpfLogado = localStorage.getItem('cpfLogado');
    const form = document.getElementById('perfil-form');
    const editarBtn = document.getElementById('editar-btn');
    const salvarBtn = document.getElementById('salvar-btn');
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('foto-preview');
    let usuarioId = null;

    // Carregar dados do usuário
    window.onload = async () => {
      if (!cpfLogado) {
        alert("Você precisa estar logado para acessar o perfil.");
        window.location.href = "login.html";
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/usuarios?cpf=${cpfLogado}`);
        const data = await res.json();

        if (data.length === 0) {
          alert("Usuário não encontrado.");
          return;
        }

        const user = data[0];
        usuarioId = user.id;

        document.getElementById('nome').value = user.nome;
        document.getElementById('email').value = user.email;
        document.getElementById('cpf').value = user.cpf;
        document.getElementById('cidade').value = user.cidade;
        document.getElementById('estado').value = user.estado;
        document.getElementById('rua').value = user.rua;
        document.getElementById('pais').value = user.pais;
        if (user.foto) {
          fotoPreview.src = user.foto;
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    // Ativar edição
    editarBtn.addEventListener('click', () => {
      [...form.elements].forEach(el => el.disabled = false);
      salvarBtn.disabled = false;
    });

    // Salvar alterações
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fotoBase64 = await getBase64(fotoInput.files[0]);

      const dadosAtualizados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        rua: document.getElementById('rua').value,
        pais: document.getElementById('pais').value,
        foto: fotoBase64 || fotoPreview.src
      };

      try {
        const res = await fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosAtualizados)
        });

        if (res.ok) {
          alert("Perfil atualizado com sucesso!");
          window.location.reload();
        } else {
          alert("Erro ao atualizar perfil.");
        }
      } catch (error) {
        console.error("Erro na atualização:", error);
      }
    });

    // Função para transformar a imagem em Base64
    function getBase64(file) {
      return new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }