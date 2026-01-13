document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/state-schemes.json`)
    .then(res => res.json())
    .then(data => {
      const scheme = data.find(s => s.id === id);
      if (!scheme) {
        document.getElementById("title").innerText = "Scheme not found";
        return;
      }

      document.getElementById("title").innerText = scheme.name;
      document.getElementById("state").innerText = scheme.state;
      document.getElementById("overview").innerText = scheme.overview;

      fillList("benefits", scheme.benefits);
      fillList("eligibility", scheme.eligibility);
      fillList("documents", scheme.documents);

      document.getElementById("apply").innerText = scheme.apply;
    });
});

function fillList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ul.appendChild(li);
  });
}
