window.onload = async () => {
  const userId = localStorage.getItem('usuarioId');
  if (!userId) return;

  const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
  const usuario = await response.json();

  document.getElementById('nome').value = usuario.nome;
  document.getElementById('Email').value = usuario.email;
  document.getElementById('cpf').value = usuario.cpf;
  document.getElementById('cidade').value = usuario.cidade;
  document.getElementById('estado').value = usuario.estado;
  document.getElementById('rua').value = usuario.rua;
  document.getElementById('pais').value = usuario.pais;
};

document.getElementById('form-perfil').addEventListener('submit', async function (event) {
  event.preventDefault();

  const userId = localStorage.getItem('usuarioId');
  if (!userId) return;

  const atualizado = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('Email').value,
    cpf: document.getElementById('cpf').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
    rua: document.getElementById('rua').value,
    pais: document.getElementById('pais').value
  };

  const response = await fetch(`http://localhost:3000/usuarios/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atualizado)
  });

  if (response.ok) {
    alert("Dados atualizados!");
  } else {
    alert("Erro ao atualizar.");
  }
});
