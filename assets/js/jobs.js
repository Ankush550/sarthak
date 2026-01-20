fetch("../assets/data/jobs.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("jobsContainer");

    data.forEach(job => {
      const div = document.createElement("div");
      div.className = "job-card";

      div.innerHTML = `
        <h3>${job.title}</h3>
        <p><b>Vacancy:</b> ${job.vacancy}</p>
        <p><b>Qualification:</b> ${job.qualification}</p>

        <a href="job-detail.html?id=${job.id}" class="apply-btn">
          View Details
        </a>
      `;

      container.appendChild(div);
    });
  });
