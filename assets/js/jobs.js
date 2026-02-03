document.addEventListener("DOMContentLoaded", () => {

  /* ================= PATH FIX ================= */
  const basePath = location.hostname.includes("github.io")
    ? "/sarthak"
    : "";

  /* ================= JOB CARDS ================= */
  const cardsContainer = document.getElementById("jobs-container");

  fetch(`${basePath}/assets/data/jobs.json`)
    .then(res => res.json())
    .then(data => {
      cardsContainer.innerHTML = "";

      data.forEach(job => {
        cardsContainer.innerHTML += `
          <div class="job-card">
            <h3>${job.title}</h3>
            <p><b>Vacancy:</b> ${job.vacancy}</p>
            <p><b>Qualification:</b> ${job.qualification}</p>
            <a class="detail-btn" href="job-detail.html?id=${job.id}">
              View Details →
            </a>
          </div>
        `;
      });
    });

});


/* ================= TABLE DATA ================= */

const jobsTableData = [
  {
    id: "Indian-Bank",
    cat: "latest",
    postDate: "28/01/2026",
    board: "Indian Bank",
    post: "Internal Ombudsman – – 1 Post",
    qualification: "Any Graduate",
    advt: "-",
    lastDate: "11-02-2026"
  },
  {
    id: "central-bank-office-attendant-2026",
    cat: "banks",
    postDate: "23/01/2026",
    board: "Central Bank of India",
    post: "Office Attendant – 572 Posts",
    qualification: "10th",
    advt: "-",
    lastDate: "04-02-2026"
  },
  {
    id: "ssc-cgl-2025",
    cat: "ssc",
    postDate: "20/01/2026",
    board: "SSC",
    post: "SSC CGL 2025",
    qualification: "Graduate",
    advt: "-",
    lastDate: "10-02-2026"
  },
  {
    id: "bi-development-assistant-2026",
    cat: "latest",
    postDate: "22/01/2026",
    board: "RI",
    post: "Development Assistant – 162 Posts",
    qualification: "Any Bachelor Degree",
    advt: "-",
    lastDate: "03-02-2026"
  }
];


/* ================= LOAD TABLE ================= */

function loadJobs(category) {

  const title = document.getElementById("jobCategory");
  const wrapper = document.getElementById("jobTableWrapper");
  const tbody = document.getElementById("jobTableBody");

  title.style.display = "block";
  wrapper.style.display = "block";
  title.innerText = category.toUpperCase();

  tbody.innerHTML = "";

  const filtered = jobsTableData.filter(j => j.cat === category);

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7">No data</td></tr>`;
    return;
  }

  filtered.forEach(job => {
    tbody.innerHTML += `
      <tr data-id="${job.id}">
        <td>${job.postDate}</td>
        <td>${job.board}</td>
        <td>${job.post}</td>
        <td>${job.qualification}</td>
        <td>${job.advt}</td>
        <td>${job.lastDate}</td>
        <td>
          <a href="javascript:void(0)"
             onclick="openJobArticle('${job.id}')">
            Get Details
          </a>
        </td>
      </tr>
    `;
  });
}


/* ================= ARTICLE OPEN (ONLY ONE FUNCTION) ================= */

function openJobArticle(jobId) {

  // Hide other rows
  document.querySelectorAll("#jobTableBody tr").forEach(row => {
    row.style.display = row.dataset.id === jobId ? "" : "none";
  });

  fetch("../assets/data/job-articles.json")
    .then(res => res.json())
    .then(data => {

      const job = data.find(j => j.id === jobId);
      const box = document.getElementById("articleBox");

      if (!box) {
        console.error("articleBox not found in HTML");
        return;
      }

      box.style.display = "block";

      if (!job || !job.article) {
        box.innerHTML = "<p>❌ Article not found</p>";
        return;
      }

      box.innerHTML = `
        <h2>${job.article.title}</h2>
        <p class="meta">${job.article.updated} • ${job.article.board}</p>

        ${job.article.content.map(p => `<p>${p}</p>`).join("")}

        <h3>Overview</h3>
        <table class="overview-table">
          ${Object.entries(job.article.overview)
            .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
            .join("")}
        </table>

       ${
  job.article.pdf
    ? `<div class="pdf-box">
         <a href="${job.article.pdf.url}" target="_blank">
           ${job.article.pdf.label}
         </a>
       </div>`
    : ""
}

<div class="share-box">
  <span>Share this job:</span>
  <a href="https://wa.me/?text=${encodeURIComponent(
    job.article.title + 
    '\nLast Date: ' + job.article.overview['Last Date'] +
    '\nPDF: ' + job.article.pdf.url
  )}" target="_blank" class="share whatsapp">
    WhatsApp
  </a>

  <a href="https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(job.article.title)}"
     target="_blank" class="share telegram">
     Telegram
  </a>
</div>


        <button class="back-btn" onclick="showAllRows()">← Back to list</button>
      `;

      box.scrollIntoView({ behavior: "smooth" });
    })
    .catch(err => {
      console.error(err);
      document.getElementById("articleBox").innerHTML =
        "<p>❌ Error loading article</p>";
    });
}


/* ================= BACK TO LIST ================= */

function showAllRows() {
  document.querySelectorAll("#jobTableBody tr")
    .forEach(row => row.style.display = "");
  document.getElementById("articleBox").innerHTML = "";
}