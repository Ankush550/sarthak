document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("stateSchemeGrid");

  fetch("../assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = "";

      data.forEach(scheme => {
        const card = document.createElement("a");

        // ✅ ONLY STATE DETAIL PAGE
        card.href = `state-scheme-detail.html?id=${scheme.id}`;
        card.className = "scheme-card";

        card.innerHTML = `
          <h3>${scheme.name}</h3>
          <p><strong>${scheme.state}</strong></p>
          <p>${scheme.description}</p>
          <span class="view-more">View Details →</span>
        `;

        grid.appendChild(card);
      });
    })
    .catch(() => {
      grid.innerHTML = "<p style='color:red'>Data load nahi ho raha</p>";
    });
});
