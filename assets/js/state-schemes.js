document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("stateSchemeGrid");

  if (!grid) {
    console.error("Grid element nahi mila");
    return;
  }

  // 🔥 AUTO BASE PATH (LOCAL + GITHUB)
  const basePath = window.location.origin + "/sarthak";

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
        card.href = `state-scheme-detail.html?id=${scheme.id}`;

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
      grid.innerHTML =
        "<p style='color:red'>Data load nahi ho raha (path issue)</p>";
    });
});
