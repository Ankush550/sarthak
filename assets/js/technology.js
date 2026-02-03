const DATA_URL = "../assets/data/technology.json";

document.addEventListener("DOMContentLoaded", () => {
  fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
      if (document.getElementById("categories")) {
        loadListing(data);
      }
      if (document.getElementById("articleTitle")) {
        loadDetail(data);
      }
    });
});

/* ================= LISTING PAGE ================= */

function loadListing(data) {
  document.getElementById("pageTitle").innerText = data.page.title;
  document.getElementById("pageIntro").innerText = data.page.intro;
  document.getElementById("trustNote").innerText = data.trust.note;

  const container = document.getElementById("categories");
  container.innerHTML = "";

  data.categories.forEach(cat => {
    let articlesHTML = "";
    cat.articles.forEach(a => {
      articlesHTML += `
        <a href="technology-detail.html?id=${a.id}" class="article-link">
          <strong>${a.title}</strong>
          <span>${a.summary}</span>
        </a>
      `;
    });

    container.innerHTML += `
      <div class="category-card">
        <h3>${cat.icon} ${cat.title}</h3>
        <p>${cat.description}</p>
        ${articlesHTML}
      </div>
    `;
  });
}

/* ================= DETAIL PAGE ================= */

function loadDetail(data) {
  const id = new URLSearchParams(window.location.search).get("id");

  data.categories.forEach(cat => {
    cat.articles.forEach(article => {
      if (article.id === id) {
        document.getElementById("articleTitle").innerText = article.title;
        document.getElementById("articleIntro").innerText = article.content.intro;

        document.getElementById("stepsList").innerHTML =
          article.content.steps.map(s => `<li>${s}</li>`).join("");

        document.getElementById("tipsList").innerHTML =
          article.content.tips.map(t => `<li>${t}</li>`).join("");

        document.getElementById("faqBox").innerHTML =
          article.faq.map(f =>
            `<p><strong>Q:</strong> ${f.q}<br><strong>A:</strong> ${f.a}</p>`
          ).join("");
      }
    });
  });
}
