document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Loaded ✅");

  const grid = document.getElementById("stateSchemeGrid");
  const search = document.getElementById("stateSearch");

  if (!grid) {
    console.error("❌ stateSchemeGrid not found");
    return;
  }

  fetch("/sarthak/assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {
      console.log("Data loaded:", data);
      render(data);

      search.addEventListener("input", () => {
        const q = search.value.toLowerCase();
        const filtered = data.filter(item =>
          item.name.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q)
        );
        render(filtered);
      });
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = "<p style='color:red'>Data load nahi ho raha</p>";
    });

  function render(list) {
    grid.innerHTML = "";
    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "scheme-card";
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>${item.state}</strong></p>
        <p>${item.description}</p>
      `;
      grid.appendChild(card);
    });
  }
});

const searchInput = document.getElementById("stateSearch");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".scheme-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});


