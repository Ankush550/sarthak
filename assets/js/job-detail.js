const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

const basePath = location.hostname.includes("github.io")
  ? "/sarthak"
  : "";

fetch(`${basePath}/assets/data/jobs.json`)
  .then(res => res.json())
  .then(data => {
    const job = data.find(j => j.id === jobId);

    if (!job) {
      document.getElementById("job-detail").innerHTML = "Job not found";
      return;
    }

    document.getElementById("job-detail").innerHTML = `
      <h2>${job.title}</h2>

      <p><b>Department:</b> ${job.department}</p>
      <p><b>Qualification:</b> ${job.qualification}</p>
      <p><b>Age Limit:</b> ${job.age}</p>
      <p><b>Vacancy:</b> ${job.vacancy}</p>
      <p><b>Last Date:</b> ${job.lastDate}</p>
      <p><b>Location:</b> ${job.location}</p>

      <a href="${job.applyLink}" target="_blank" class="apply-btn">
        📝 Apply Online (Official)
      </a>

      <p class="note">
        ⚠️ Application official website par hota hai
      </p>
    `;
  });
