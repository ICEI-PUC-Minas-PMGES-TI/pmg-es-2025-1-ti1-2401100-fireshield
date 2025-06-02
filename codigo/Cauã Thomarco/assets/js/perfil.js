const API_URL = "http://localhost:3000/usuarios";
let usuarioAtual = null;

// Função para carregar os dados
async function carregarPerfil() {
  const cpfLogado = localStorage.getItem('cpfLogado');
  const res = await fetch(`${API_URL}?cpf=${cpfLogado}`);
  const dados = await res.json();
  usuarioAtual = dados[0];

  if (usuarioAtual) {
    document.getElementById("nome").value = usuarioAtual.nome;
    document.getElementById("email").value = usuarioAtual.email;
    document.getElementById("cpf").value = usuarioAtual.cpf;
    document.getElementById("cidade").value = usuarioAtual.cidade;
    document.getElementById("estado").value = usuarioAtual.estado;
    document.getElementById("pais").value = usuarioAtual.pais;
    document.getElementById("fotoPreview").src = usuarioAtual.foto || "assets/img/default-profile.png";
  }
}

document.getElementById('editar-btn').addEventListener('click', () => {
  document.querySelectorAll("#perfil-form input").forEach(input => input.removeAttribute("readonly"));
  document.getElementById("salvar-btn").style.display = "inline";
  document.getElementById("editar-btn").style.display = "none";
});

// Salvar alterações
document.getElementById('perfil-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const novaFoto = document.getElementById("foto").files[0];
  let fotoBase64 = usuarioAtual.foto;

  if (novaFoto) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      fotoBase64 = e.target.result;
      await atualizarPerfil(fotoBase64);
    };
    reader.readAsDataURL(novaFoto);
  } else {
    await atualizarPerfil(fotoBase64);
  }
});

async function atualizarPerfil(foto) {
  const dadosAtualizados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    cpf: document.getElementById("cpf").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    pais: document.getElementById("pais").value,
    foto
  };

  await fetch(`${API_URL}/${usuarioAtual.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosAtualizados)
  });

  alert("Perfil atualizado com sucesso!");
  window.location.reload();
}

carregarPerfil();