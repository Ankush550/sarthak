document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("jobsGrid");

  fetch("../assets/data/jobs.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(job => {
        const card = document.createElement("div");
        card.className = "scheme-card";

        card.innerHTML = `
          <h3>${job.title}</h3>
          <p><strong>Department:</strong> ${job.department}</p>
          <p><strong>Qualification:</strong> ${job.qualification}</p>
          <p><strong>Last Date:</strong> ${job.lastDate}</p>

          <a href="job-detail.html?id=${job.id}" class="view-more">
            View Details →
          </a>
        `;

        grid.appendChild(card);
      });
    });
});
