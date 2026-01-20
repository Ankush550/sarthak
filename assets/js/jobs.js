document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("jobs-container");

  const basePath = location.hostname.includes("github.io")
    ? "/sarthak"
    : "";

  fetch(`${basePath}/assets/data/jobs.json`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
          <h3>${job.title}</h3>
          <p><b>Vacancy:</b> ${job.vacancy}</p>
          <p><b>Qualification:</b> ${job.qualification}</p>

          <a class="detail-btn"
             href="job-detail.html?id=${job.id}">
             View Details →
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(() => {
      container.innerHTML = "<p>Jobs load nahi ho rahi</p>";
    });
});
