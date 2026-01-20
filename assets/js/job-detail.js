const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

fetch("../assets/data/jobs.json")
  .then(res => res.json())
  .then(data => {
    const job = data.find(j => j.id === jobId);

    if (!job) {
      document.body.innerHTML = "<h2>Job not found</h2>";
      return;
    }

    document.getElementById("jobTitle").innerText = job.title;

    document.getElementById("jobDetails").innerHTML = `
      <li><b>Vacancy:</b> ${job.vacancy}</li>
      <li><b>Qualification:</b> ${job.qualification}</li>
      <li><b>Age Limit:</b> ${job.age}</li>
      <li><b>Last Date:</b> ${job.lastDate}</li>
    `;

    document.getElementById("applyBtn").href = job.applyLink;
  });
