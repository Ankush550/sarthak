document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/home-trending.json")
    .then(res => res.json())
    .then(data => renderTrending(data));
});

function renderTrending(items) {
  const box = document.getElementById("trendingCards");
  box.innerHTML = "";

  items.forEach(item => {
    box.innerHTML += `
      <div class="trending-card" onclick="openArticle('${item.id}')">
        <span class="badge ${item.tag.toLowerCase()}">${item.tag}</span>
        <small class="category">${item.category}</small>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <span class="read-more">Read Full Guide →</span>
      </div>
    `;
  });
}

function openArticle(id) {
  window.location.href = `/pages/article.html?id=${id}`;
}
