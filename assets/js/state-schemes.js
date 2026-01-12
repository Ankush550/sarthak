document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("schemeGrid");

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(basePath + "/assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = "";

      data.forEach(scheme => {
        const a = document.createElement("a");
        a.className = "card";
        a.href = basePath + "/pages/state-scheme-detail.html?id=" + scheme.id;

        a.innerHTML = `
          <h3>${scheme.name}</h3>
          <p><b>${scheme.state}</b></p>
          <p>${scheme.description}</p>
        `;

        grid.appendChild(a);
      });
    })
    .catch(() => {
      grid.innerHTML = "<p style='color:red'>Data load nahi ho raha</p>";
    });
});
