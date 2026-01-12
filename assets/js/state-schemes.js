document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("stateSchemeGrid");
  const searchInput = document.getElementById("stateSearch");

  fetch("../assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {
      renderCards(data);

      searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();
        const filtered = data.filter(s =>
          s.name.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q)
        );
        renderCards(filtered);
      });
    })
    .catch(() => {
      grid.innerHTML = "<p style='color:red'>Data load nahi ho raha</p>";
    });

  function renderCards(list) {
    grid.innerHTML = "";
    list.forEach(scheme => {
      const card = document.createElement("a");
      card.className = "scheme-card";
      card.href = `state-scheme-detail.html?id=${scheme.id}`;

      card.innerHTML = `
        <h3>${scheme.name}</h3>
        <p><strong>${scheme.state}</strong></p>
        <p>${scheme.description}</p>
        <span class="view-more">View Details →</span>
      `;
      grid.appendChild(card);
    });
  }
});
