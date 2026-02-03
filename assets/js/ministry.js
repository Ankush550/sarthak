const params = new URLSearchParams(window.location.search);
const ministryId = params.get("ministry");

fetch("../assets/data/schemes.json")
  .then(res => res.json())
  .then(data => {

    const header = document.getElementById("ministryHeader");
    const list = document.getElementById("schemeList");

    const ministry = data[ministryId];

    header.innerHTML = `
      <h2>${ministry.title}</h2>
      <p>${ministry.desc}</p>
    `;

    ministry.schemes.forEach(s => {
      const card = document.createElement("div");
      card.className = "scheme-card";
      card.setAttribute("data-id", s.id);

      card.innerHTML = `
        <h3>${s.name}</h3>
        <p>${s.details}</p>
        <div class="tags">
          ${s.tags.map(t => `<span>${t}</span>`).join("")}
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `scheme-detail.html?scheme=${s.id}`;
      });

      list.appendChild(card);
    });
  });
