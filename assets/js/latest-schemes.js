document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("latest-scheme-container");
  if (!container) return;

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/latest-schemes.json`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "latest-card";

        card.innerHTML = `
          <span class="badge">${item.type}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="${item.link}" target="_blank">View Official →</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(() => {
      container.innerHTML = "<p>Data load nahi ho raha</p>";
    });
});
