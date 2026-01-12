<<<<<<< HEAD
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
=======
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


>>>>>>> 4d8a51be720f701d9be302a54bef6a6c5dc729a0
