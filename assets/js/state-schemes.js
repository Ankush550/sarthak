document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("stateSchemeGrid");
  if (!grid) return;

  // 🔥 Auto base path detection
  const isGitHub = window.location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/state-schemes.json`)
    .then(res => {
      if (!res.ok) throw new Error("JSON load failed");
      return res.json();
    })
    .then(data => {
      grid.innerHTML = "";

      data.forEach(scheme => {
        const card = document.createElement("a");
        card.className = "scheme-card";
        card.href = `${basePath}/pages/state-scheme-detail.html?id=${scheme.id}`;

        card.innerHTML = `
          <h3>${scheme.name}</h3>
          <p><strong>${scheme.state}</strong></p>
          <p>${scheme.description}</p>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = "<p style='color:red'>Data load nahi ho raha</p>";
    });

});
