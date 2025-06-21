let newsData = [];
let currentSort = 'date-desc';
let currentFilter = 'all';
let currentSearch = '';

function formatDate(dateStr) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateStr).toLocaleString('pt-BR', options);
}

function renderFeed() {
  const container = document.getElementById('news-feed');
  container.innerHTML = '';

  let filtered = newsData.filter(item =>
    (currentFilter === 'all' || item.category === currentFilter)
  );

  if (currentSearch.trim() !== '') {
    const searchLower = currentSearch.toLowerCase();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.content.toLowerCase().includes(searchLower)
    );
  }

  filtered.sort((a, b) => {
    if (currentSort === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (currentSort === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (currentSort === 'title-asc') return a.title.localeCompare(b.title);
    if (currentSort === 'title-desc') return b.title.localeCompare(a.title);
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
    return;
  }

  filtered.forEach(item => {
    const newsItem = document.createElement('article');
    newsItem.className = 'news-item';

    let titleHTML = item.title;
    if (item.link) {
      titleHTML = `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>`;
    }

    newsItem.innerHTML = `
      <h2>${titleHTML}</h2>
      <time datetime="${item.date}">${formatDate(item.date)}</time>
      <p style="font-style: italic;">Categoria: ${item.category}</p>
      <p>${item.content}</p>
    `;

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      newsItem.appendChild(img);
    }

    if (item.video) {
      const video = document.createElement('video');
      video.controls = true;
      video.src = item.video;
      newsItem.appendChild(video);
    }

    container.appendChild(newsItem);
  });
}

function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = `Hora atual: ${now.toLocaleTimeString('pt-BR')}`;
}

window.onload = () => {
  fetch('news.json')
    .then(response => response.json())
    .then(data => {
      newsData = data;
      renderFeed();
    })
    .catch(error => {
      console.error('Erro ao carregar os dados:', error);
      document.getElementById('news-feed').innerHTML = '<p>Erro ao carregar as notícias.</p>';
    });

  updateClock();
  setInterval(updateClock, 1000);
};

document.getElementById('sort-select').onchange = (e) => {
  currentSort = e.target.value;
  renderFeed();
};

document.getElementById('filter-select').onchange = (e) => {
  currentFilter = e.target.value;
  renderFeed();
};

document.getElementById('search-form').onsubmit = (e) => {
  e.preventDefault();
  currentSearch = document.getElementById('search-input').value;
  renderFeed();
};
