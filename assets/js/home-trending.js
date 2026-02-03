fetch("assets/data/articles.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("trendingCards");

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "trending-card";

      card.innerHTML = `
        <span class="tag">GUIDE</span>
        <h3>${item.title}</h3>
        <p>${item.intro.slice(0, 90)}...</p>
        <a href="pages/article.html?id=${item.id}">
          Read Full Guide →
        </a>
      `;
      container.appendChild(card);
    });
  });

  