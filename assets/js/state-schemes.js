document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("stateSchemeGrid");
  const searchInput = document.getElementById("stateSearch");

  if (!grid) return;

  const basePath = location.hostname.includes("github.io")
    ? "/sarthak"
    : "";

  let allSchemes = [];

  fetch(`${basePath}/assets/data/state-schemes.json?v=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
      allSchemes = data;
      renderSchemes(allSchemes);
    })
    .catch(() => {
      grid.innerHTML = "<p style='color:red'>Data load nahi ho raha</p>";
    });

  function renderSchemes(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = "<p>No scheme found ❌</p>";
      return;
    }

    list.forEach(scheme => {
      const card = document.createElement("a");
      card.className = "scheme-card";
      card.href = `${basePath}/pages/state-scheme-detail.html?id=${scheme.id}`;

      card.innerHTML = `
        <h3>${scheme.name}</h3>
        <p class="state-name">${scheme.state}</p>
        <p>${scheme.description}</p>
        <span class="view-more">View Details →</span>
      `;

      grid.appendChild(card);
    });
  }

  // 🔍 SEARCH LOGIC
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allSchemes.filter(s =>
      s.name.toLowerCase().includes(value) ||
      s.state.toLowerCase().includes(value)
    );

    renderSchemes(filtered);
  });
});
