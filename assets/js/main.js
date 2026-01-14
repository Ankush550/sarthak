document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scheme-list");
  if (!container) return;

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/schemes.json`)
    .then(res => {
      if (!res.ok) throw new Error("JSON load failed");
      return res.json();
    })
    .then(data => {
      container.innerHTML = "";

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "scheme-card";

        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="#" class="view-btn">View Details →</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p style='color:red'>Schemes load nahi ho rahi</p>";
    });
});
