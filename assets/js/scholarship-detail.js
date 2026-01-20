const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const isGitHub = location.hostname.includes("github.io");
const basePath = isGitHub ? "/sarthak" : "";

fetch(`${basePath}/assets/data/scholarships.json`)
  .then(res => res.json())
  .then(data => {
    const item = data.find(s => s.id === id);
    const box = document.getElementById("detail-box");

    if (!item) {
      box.innerHTML = "<p>Scholarship not found</p>";
      return;
    }

    box.innerHTML = `
      <h2>${item.title}</h2>

      <p><b>Provider:</b> ${item.provider}</p>
      <p><b>Eligibility:</b> ${item.eligibility}</p>
      <p><b>Scholarship Amount:</b> ${item.amount}</p>
      <p><b>Last Date:</b> ${item.lastDate}</p>

      <a href="${item.applyLink}" target="_blank" class="apply-btn">
        📝 Apply Online (Official)
      </a>

      <p class="note">⚠️ Application sirf official government website par hota hai</p>
    `;
  });
