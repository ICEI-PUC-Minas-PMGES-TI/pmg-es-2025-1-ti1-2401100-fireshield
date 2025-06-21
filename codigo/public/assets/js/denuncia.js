const form = document.getElementById('denunciaForm');
  const API_URL = 'http://localhost:3000/denuncias';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // se estiver logado, vincula a denúncia

    const novaDenuncia = {
      local: form.local.value.trim(),
      data: form.data.value,
      hora: form.hora.value,
      tipoArea: form['tipo-area'].value,
      descricao: form.descricao.value.trim(),
      arquivo: form.arquivo.value.trim(),
      nome: form.nome.value.trim(),
      telefone: form.telefone.value.trim(),
      email: form.email.value.trim(),
      userId: userId ? Number(userId) : null,
      id: Date.now()
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaDenuncia)
      });

      if (!res.ok) throw new Error('Erro ao enviar denúncia');

      alert('Denúncia enviada com sucesso!');
      form.reset();
    } catch (error) {
      alert('Erro ao enviar denúncia. Tente novamente.');
      console.error(error);
    }
  });