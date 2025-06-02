const RSSParser = require('rss-parser');
const fs = require('fs');

const parser = new RSSParser();

const feeds = [
    'https://g1.globo.com/rss/g1/',
    'https://g1.globo.com/dynamo/rss2.xml'
];

async function buscarNoticias() {
    let noticias = [];

    for (const url of feeds) {
        try {
            const feed = await parser.parseURL(url);
            feed.items.forEach(item => {
                noticias.push({
                    titulo: item.title,
                    link: item.link,
                    data: item.pubDate || "Sem data",
                    resumo: item.contentSnippet || "Sem resumo"
                });
            });
        } catch (error) {
            console.error(`Erro ao buscar RSS em ${url}:`, error.message);
        }
    }

    return noticias;
}

async function salvarNoticias(noticias) {
    const conteudo = noticias.map(n => 
        `Título: ${n.titulo}\nLink: ${n.link}\nData: ${n.data}\nResumo: ${n.resumo}\n------------------------\n`
    ).join('\n');

    fs.writeFileSync('noticias.txt', conteudo, 'utf-8');
    console.log(`Salvas ${noticias.length} notícias no arquivo noticias.txt`);
}

(async () => {
    const noticias = await buscarNoticias();
    await salvarNoticias(noticias);
})();
