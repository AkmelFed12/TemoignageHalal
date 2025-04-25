let articles = JSON.parse(localStorage.getItem('articles') || '[]');

function displayArticles() {
  const container = document.getElementById('articles');
  if (container) {
    container.innerHTML = articles.map((a, i) => \`
      <article>
        <h2>\${a.title}</h2>
        <p>\${a.content.substring(0, 100)}...</p>
        <a href="article.html?id=\${i}">Lire plus</a>
      </article>
    \`).join('');
  }
}

function displaySingleArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id && articles[id]) {
    const a = articles[id];
    document.getElementById('article-content').innerHTML = \`
      <h2>\${a.title}</h2>
      <p>\${a.content}</p>
      <p><em>Publié le : \${a.date}</em></p>
    \`;
  }
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'admin' && pass === 'temoignage2025') {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    showArticlesAdmin();
  } else {
    alert('Identifiants incorrects');
  }
}

function addArticle() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const date = new Date().toLocaleDateString();
  articles.push({ title, content, date });
  localStorage.setItem('articles', JSON.stringify(articles));
  alert('Témoignage ajouté');
  showArticlesAdmin();
}

function showArticlesAdmin() {
  const list = document.getElementById('article-list');
  if (list) {
    list.innerHTML = articles.map((a, i) => \`
      <li><strong>\${a.title}</strong>
        <button onclick="deleteArticle(\${i})">Supprimer</button>
      </li>
    \`).join('');
  }
}

function deleteArticle(index) {
  if (confirm('Supprimer ce témoignage ?')) {
    articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(articles));
    showArticlesAdmin();
    displayArticles();
  }
}

window.onload = () => {
  displayArticles();
  displaySingleArticle();
};
