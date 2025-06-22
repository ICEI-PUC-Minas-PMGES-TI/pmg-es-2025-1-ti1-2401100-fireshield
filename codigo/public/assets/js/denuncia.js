const form = document.getElementById('denunciaForm');
  const API_URL = 'http://localhost:3000/denuncias';

  async function geocodeEndereco(endereco) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    return { lat: null, lng: null };
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const endereco = form.local.value.trim();

    const { lat, lng } = await geocodeEndereco(endereco);

    const novaDenuncia = {
      local: endereco,
      data: form.data.value,
      hora: form.hora.value,
      tipoArea: form['tipo-area'].value,
      descricao: form.descricao.value.trim(),
      arquivo: form.arquivo.value.trim(),
      nome: form.nome.value.trim(),
      telefone: form.telefone.value.trim(),
      email: form.email.value.trim(),
      userId: userId ? Number(userId) : null,
      lat,
      lng,
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