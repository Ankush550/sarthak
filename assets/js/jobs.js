document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("jobs-container");
  if (!container) {
    console.error("jobs-container not found");
    return;
  }

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/jobs.json`)
    .then(res => {
      if (!res.ok) throw new Error("Jobs JSON not loaded");
      return res.json();
    })
    .then(data => {
      container.innerHTML = "";

      data.forEach(job => {
        const card = document.createElement("div");
        card.className = "info-card";

        card.innerHTML = `
          <h3>${job.title}</h3>
          <p><b>Vacancy:</b> ${job.vacancy}</p>
          <p><b>Qualification:</b> ${job.qualification}</p>
          <a href="${job.link}" target="_blank">Apply Online</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p style='color:red'>Jobs load nahi ho rahi</p>";
    });
});
