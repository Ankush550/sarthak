// ===============================
// GET ARTICLE ID FROM URL
// ===============================
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");

// ===============================
// LOAD ARTICLES JSON
// ===============================
fetch("../assets/data/articles.json")
  .then(res => res.json())
  .then(data => {
    const article = data.find(item => item.id === articleId);

    if (!article) {
      document.getElementById("articleTitle").innerText = "Article Not Found";
      document.getElementById("articleIntro").innerText =
        "Requested article is not available.";
      return;
    }

    // ===============================
    // TITLE & INTRO
    // ===============================
    document.getElementById("articleTitle").innerText = article.title;
    document.getElementById("articleIntro").innerText = article.intro || "";

    // ===============================
    // CLEAR ALL SECTIONS FIRST
    // ===============================
    document.getElementById("articleSteps").innerHTML = "";
    document.getElementById("articleFaq").innerHTML = "";
    document.getElementById("articleSections").innerHTML = "";
    document.getElementById("articleConclusion").innerHTML = "";

    // ===============================
    // STEPS (Mobile / UPI type)
    // ===============================
    if (article.steps && article.steps.length) {
      article.steps.forEach(step => {
        const li = document.createElement("li");
        li.innerText = step;
        document.getElementById("articleSteps").appendChild(li);
      });
    }

    // ===============================
    // SECTIONS (AI article type)
    // ===============================
    if (article.sections && article.sections.length) {
      article.sections.forEach(sec => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "article-section";

        let html = `<h3>${sec.heading}</h3><ul>`;
        sec.content.forEach(line => {
          html += `<li>${line}</li>`;
        });
        html += "</ul>";

        sectionDiv.innerHTML = html;
        document.getElementById("articleSections").appendChild(sectionDiv);
      });
    }

    // ===============================
    // FAQ
    // ===============================
    if (article.faq && article.faq.length) {
      article.faq.forEach(item => {
        const div = document.createElement("div");
        div.className = "faq-item";
        div.innerHTML = `<strong>${item.q}</strong><p>${item.a}</p>`;
        document.getElementById("articleFaq").appendChild(div);
      });
    }

    // ===============================
    // CONCLUSION
    // ===============================
    if (article.conclusion) {
      document.getElementById("articleConclusion").innerText =
        article.conclusion;
    }
  })
  .catch(err => {
    console.error("Article load error:", err);
  });

  // ===============================
// ARTICLE BADGE (CATEGORY)
// ===============================
const badgeEl = document.getElementById("articleBadge");

if (badgeEl && article.type) {
  badgeEl.innerText = article.type.toUpperCase();
  badgeEl.className = `badge ${article.type}`;
}
