<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  fetch("../assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("stateSchemeGrid");
      grid.innerHTML = "";

      data.forEach(scheme => {
        const card = document.createElement("a");

        // 👉 CLICKABLE LINK
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
    .catch(err => {
      console.error(err);
      document.getElementById("stateSchemeGrid").innerHTML =
        "<p style='color:red'>Data load nahi ho raha</p>";
    });
});
=======
document.addEventListener("DOMContentLoaded", () => {
  fetch("../assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("stateSchemeGrid");
      grid.innerHTML = "";

      data.forEach(scheme => {
        const card = document.createElement("a");

        // 👉 CLICKABLE LINK
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
    .catch(err => {
      console.error(err);
      document.getElementById("stateSchemeGrid").innerHTML =
        "<p style='color:red'>Data load nahi ho raha</p>";
    });
});
>>>>>>> 4d8a51be720f701d9be302a54bef6a6c5dc729a0
