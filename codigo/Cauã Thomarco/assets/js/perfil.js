
    const cpfLogado = localStorage.getItem("cpfLogado");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(user => user.cpf === cpfLogado);

    if (!usuario) {
      alert("Usuário não encontrado. Faça login novamente.");
      window.location.href = "login.html";
    } else {
      document.getElementById("nome").value = usuario.nome;
      document.getElementById("Email").value = usuario.email;
      document.getElementById("cpf").value = usuario.cpf;
      document.getElementById("cidade").value = usuario.cidade;
      document.getElementById("estado").value = usuario.estado;
      document.getElementById("pais").value = usuario.pais;
      document.getElementById("senha").value = usuario.senha;
    }

    document.getElementById("perfil-form").addEventListener("submit", function (event) {
      event.preventDefault();

      usuario.nome = document.getElementById("nome").value;
      usuario.email = document.getElementById("Email").value;
      usuario.cidade = document.getElementById("cidade").value;
      usuario.estado = document.getElementById("estado").value;
      usuario.pais = document.getElementById("pais").value;
      usuario.senha = document.getElementById("senha").value;

      const index = usuarios.findIndex(user => user.cpf === cpfLogado);
      if (index !== -1) {
        usuarios[index] = usuario;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Perfil atualizado com sucesso!");
      }
    });