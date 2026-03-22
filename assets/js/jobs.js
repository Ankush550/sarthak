fetch("../assets/data/jobs.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("job-list");
    if (!container || !Array.isArray(data)) return;

    container.innerHTML = "";

    data.forEach(job => {

      // 🛑 Skip invalid objects
      if (!job || !job.id || !job.title) return;

      container.innerHTML += `
        <div class="job-row">
          <a href="job-detail.html?id=${job.id}">
            ${job.title}
          </a>
        </div>
      `;
    });

  })
  .catch(err => {
    console.error("JSON Error:", err);
  });