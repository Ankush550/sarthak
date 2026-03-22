const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

fetch("../assets/data/jobs.json")
  .then(res => res.json())
  .then(data => {

    const job = data.find(j => j.id === jobId);
    if (!job) return;

    document.title = job.title + " | Sarthak Portal";

    /* ========= NEW Badge ========= */

    const postDateObj = new Date(job.postDate);
    const today = new Date();
    const diffDays = (today - postDateObj) / (1000 * 60 * 60 * 24);

    let newBadge = diffDays <= 7
      ? `<span class="new-badge">NEW</span>`
      : "";

    /* ========= Main HTML ========= */

    let html = `
      <div class="breadcrumb">
        <a href="../index.html">Home</a> »
        <a href="jobs.html">Jobs</a> »
        <span>${job.title}</span>
      </div>

      <h1>${job.title} ${newBadge}</h1>
      <p class="post-date">${job.postDate}</p>
      <div class="job-description">${job.description}</div>
    `;

    html += `
  <div class="ad-box">
    Advertisement
  </div>
`;

    /* ========= Overview ========= */

    if (job.overview) {
      html += `<h2>Overview</h2>
               <table class="overview-table">`;

      Object.keys(job.overview).forEach(key => {
        html += `
          <tr>
            <td><strong>${key}</strong></td>
            <td>${job.overview[key]}</td>
          </tr>
        `;
      });

      html += `</table>`;
    }

    /* ========= Important Links ========= */

    if (job.importantLinks) {
      html += `<h2>Important Links</h2>
               <table class="important-table">`;

      job.importantLinks.forEach(row => {

        const isApply = row.label.toLowerCase().includes("apply");

        html += `<tr>
                   <td>${row.label}</td>
                   <td>`;

        row.links.forEach((link, index) => {

          const isPDF = link.url.endsWith(".pdf");

          html += `
            <a href="${link.url}" 
               target="_blank"
               ${isPDF ? "" : ""}
               class="${isApply ? "apply-btn" : ""}">
               ${link.text}
            </a>
          `;

          if (index !== row.links.length - 1) html += " | ";
        });

        html += `</td></tr>`;
      });

      html += `</table>`;
    }

    /* ========= Share Section ========= */

    const currentURL = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(job.title);

    html += `
      <div class="share-section">
        <h3>Share This Job</h3>

        <a class="share-btn whatsapp"
           href="https://wa.me/?text=${shareText}%20${currentURL}"
           target="_blank">
           WhatsApp
        </a>

        <a class="share-btn telegram"
           href="https://t.me/share/url?url=${currentURL}&text=${shareText}"
           target="_blank">
           Telegram
        </a>
      </div>
    `;

    /* ========= Disclaimer ========= */

    html += `
      <div class="job-disclaimer">
        <strong>Disclaimer:</strong>
        This website is not affiliated with any government organization.
        Please verify details from official website before applying.
      </div>
    `;
    html += `
<h2>Selection Process</h2>
<p>The selection process includes CBT, PET, Document Verification and Medical Test.</p>

<h2>Salary Details</h2>
<p>Salary will be provided as per 7th CPC Pay Matrix Level-1 along with allowances.</p>

<h2>Important Dates</h2>
<table class="overview-table">
  <tr>
    <td><strong>Application Start</strong></td>
    <td>${job.overview?.["Apply Start Date"] || ""}</td>
  </tr>
  <tr>
    <td><strong>Last Date</strong></td>
    <td>${job.overview?.["Last Date"] || ""}</td>
  </tr>
</table>

<h2>Preparation Tips</h2>
<p>Focus on mock tests, previous year papers and time management.</p>

<h2>FAQ</h2>
<p><strong>Q:</strong> What is the age limit?</p>
<p>Minimum 18 years and Maximum 33 years.</p>
`;

    document.getElementById("job-detail").innerHTML = html;

    /* ========= Back To Home ========= */

    const backWrapper = document.createElement("div");
    backWrapper.className = "back-home-section";

    const backBtn = document.createElement("a");
    backBtn.href = "../index.html";
    backBtn.className = "back-home-btn";
    backBtn.innerText = "⬅ Back To Home";

    backWrapper.appendChild(backBtn);
    document.getElementById("job-detail").appendChild(backWrapper);

    /* ========= Floating Apply ========= */

    if (job.importantLinks) {
      const applyRow = job.importantLinks.find(r =>
        r.label.toLowerCase().includes("apply")
      );

      if (applyRow && applyRow.links.length > 0) {
        const floatingBtn = document.createElement("a");
        floatingBtn.href = applyRow.links[0].url;
        floatingBtn.target = "_blank";
        floatingBtn.className = "floating-apply";
        floatingBtn.innerText = "Apply Online";
        document.body.appendChild(floatingBtn);
      }
    }

    /* ========= Back To Top ========= */

    const topBtn = document.createElement("button");
    topBtn.innerText = "↑";
    topBtn.className = "back-to-top";
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ========= SEO Schema ========= */

    const schema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.title,
      "datePosted": new Date(job.postDate).toISOString(),
      "description": job.description.replace(/<[^>]*>?/gm, ''),
      "employmentType": "FULL_TIME",
      "directApply": true,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.overview?.["Organization Name"] || ""
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

  })
  .catch(err => console.error("Error:", err));