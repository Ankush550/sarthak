document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("documents-container");

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/documents.json`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(doc => {
        const card = document.createElement("div");
        card.className = "info-card";

        card.innerHTML = `
          <h3>${doc.title}</h3>
          <p><b>Use:</b> ${doc.use}</p>
          <a href="document-detail.html?id=${doc.id}" class="btn">View Details</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(() => {
      container.innerHTML = "<p style='color:red'>Documents load nahi ho rahe</p>";
    });
});
