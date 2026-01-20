document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scholarship-container");
  if (!container) return;

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/scholarships.json`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "info-card";

        card.innerHTML = `
          <h3>${item.title}</h3>
          <p><b>Eligibility:</b> ${item.eligibility}</p>
          <p><b>Amount:</b> ${item.amount}</p>
          <p><b>Last Date:</b> ${item.lastDate}</p>

          <a href="scholarship-detail.html?id=${item.id}" class="apply-btn">
            View Details
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(() => {
      container.innerHTML = "<p style='color:red'>Scholarship data load nahi ho raha</p>";
    });
});
