document.addEventListener("DOMContentLoaded", () => {

  const id = new URLSearchParams(location.search).get("id");

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(basePath + "/assets/data/state-schemes.json")
    .then(res => res.json())
    .then(data => {

      const scheme = data.find(s => s.id === id);

      if (!scheme) {
        document.getElementById("title").innerText = "Scheme not found";
        return;
      }

      document.getElementById("title").innerText = scheme.name;
      document.getElementById("desc").innerText = scheme.description;
    })
    .catch(() => {
      document.getElementById("title").innerText = "Error loading scheme";
    });
});
