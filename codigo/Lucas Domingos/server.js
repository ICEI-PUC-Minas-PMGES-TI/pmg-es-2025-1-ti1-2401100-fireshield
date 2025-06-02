const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Função para ler o arquivo noticias.txt e transformar em array de notícias
function lerNoticias() {
  const conteudo = fs.readFileSync('noticias.txt', 'utf-8');
  const blocos = conteudo.split('------------------------').map(bloco => bloco.trim()).filter(b => b);

  const noticias = blocos.map(bloco => {
    const linhas = bloco.split('\n').filter(l => l.trim() !== '');
    const noticia = {};
    linhas.forEach(linha => {
      if (linha.startsWith('Título:')) noticia.titulo = linha.replace('Título:', '').trim();
      else if (linha.startsWith('Link:')) noticia.link = linha.replace('Link:', '').trim();
      else if (linha.startsWith('Data:')) noticia.data = linha.replace('Data:', '').trim();
      else if (linha.startsWith('Resumo:')) noticia.resumo = linha.replace('Resumo:', '').trim();
    });
    return noticia;
  });

  return noticias;
}

// Rota principal que mostra as notícias
app.get('/', (req, res) => {
  const noticias = lerNoticias();

  let html = `
    <html>
    <head>
      <title>Notícias</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; }
        .noticia { border-bottom: 1px solid #ccc; padding: 10px 0; }
        .titulo { font-size: 1.2em; font-weight: bold; }
        .data { color: gray; font-size: 0.9em; }
        .resumo { margin-top: 5px; }
        a { text-decoration: none; color: #0066cc; }
      </style>
    </head>
    <body>
      <h1>Notícias</h1>
      ${noticias.map(n => `
        <div class="noticia">
          <div class="titulo"><a href="${n.link}" target="_blank">${n.titulo}</a></div>
          <div class="data">${n.data}</div>
          <div class="resumo">${n.resumo}</div>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
