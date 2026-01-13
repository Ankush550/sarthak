document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("stateSchemeGrid");
  const searchInput = document.getElementById("stateSearch");
  const stateFilter = document.getElementById("stateFilter");

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  let allSchemes = [];

  fetch(`${basePath}/assets/data/state-schemes.json`)
    .then(res => res.json())
    .then(data => {
      allSchemes = data;
      renderSchemes(data);
      populateStates(data);
    });

  function populateStates(data) {
    const states = [...new Set(data.map(s => s.state))];
    states.forEach(state => {
      const opt = document.createElement("option");
      opt.value = state;
      opt.textContent = state;
      stateFilter.appendChild(opt);
    });
  }

  function renderSchemes(data) {
    grid.innerHTML = "";
    data.forEach(scheme => {
      const card = document.createElement("div");
      card.className = "scheme-card";

      card.innerHTML = `
        <h3>${scheme.name}</h3>
        <strong>${scheme.state}</strong>
        <p>${scheme.description}</p>

        <div class="card-actions">
          <a href="${basePath}/pages/state-scheme-detail.html?id=${scheme.id}">
            View Details →
          </a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function applyFilters() {
    const q = searchInput.value.toLowerCase();
    const state = stateFilter.value;

    const filtered = allSchemes.filter(s =>
      (!state || s.state === state) &&
      (s.name.toLowerCase().includes(q) ||
       s.description.toLowerCase().includes(q))
    );

    renderSchemes(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  stateFilter.addEventListener("change", applyFilters);
});
