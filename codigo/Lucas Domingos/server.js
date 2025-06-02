const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

function lerNoticias() {
  const conteudo = fs.readFileSync('noticias.txt', 'utf-8');
  const blocos = conteudo.split('------------------------').map(b => b.trim()).filter(b => b);

  return blocos.map(b => {
    const linhas = b.split('\n').filter(l => l.trim() !== '');
    const noticia = {};
    linhas.forEach(linha => {
      if (linha.startsWith('Título:')) noticia.titulo = linha.replace('Título:', '').trim();
      else if (linha.startsWith('Link:')) noticia.link = linha.replace('Link:', '').trim();
      else if (linha.startsWith('Data:')) noticia.data = linha.replace('Data:', '').trim();
      else if (linha.startsWith('Resumo:')) noticia.resumo = linha.replace('Resumo:', '').trim();
    });
    return noticia;
  });
}

app.get('/', (req, res) => {
  const noticias = lerNoticias();
  const conteudo = noticias.map(n => `
    <div class="noticia">
      <div class="titulo"><a href="${n.link}" target="_blank">${n.titulo}</a></div>
      <div class="data">${n.data}</div>
      <div class="resumo">${n.resumo}</div>
    </div>
  `).join('');

  const template = fs.readFileSync('noticia.html', 'utf-8'); // abre a pág noticia
  const pagina = template.replace('{{conteudo}}', conteudo);
  res.send(pagina);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
