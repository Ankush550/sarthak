fetch("../assets/data/ministries.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("ministryGrid");

    data.forEach(ministry => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${ministry.name}</h3>
        <p>${ministry.count} Schemes</p>
      `;
      card.onclick = () => {
        window.location.href =
          `ministry.html?ministry=${ministry.id}`;
      };
      grid.appendChild(card);
    });
  });
