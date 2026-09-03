/**
 * ENHANCED: job-detail.js with SEO improvements
 * Issues Fixed:
 * 1. Canonical URL encoding (proper encodeURIComponent)
 * 2. Better content structure for "discovered but not indexed" pages
 * 3. Improved Schema.org markup
 * 4. Better internal linking
 */

const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

// ✅ FIX #1: If no valid job ID, redirect to jobs list
if (!jobId) {
  window.location.href = '/pages/jobs.html';
}

fetch("../assets/data/jobs.json")
  .then(res => res.json())
  .then(data => {

    const job = data.find(j => j.id === jobId);
    if (!job) {
      // ✅ Mark invalid job pages as noindex
      const noindexMeta = document.createElement('meta');
      noindexMeta.name = 'robots';
      noindexMeta.content = 'noindex, follow';
      document.head.appendChild(noindexMeta);
      
      document.getElementById("job-detail").innerHTML = `
        <div class="error-box">
          <h1>Job Not Found</h1>
          <p>The job you're looking for is no longer available.</p>
          <a href="jobs.html">← Back to Jobs</a>
        </div>
      `;
      return;
    }

    // ============================================================
    // SEO: Set proper canonical URL with encoding
    // ============================================================
    
    const canonicalUrl = window.location.origin + '/pages/job-detail.html?id=' + encodeURIComponent(job.id);
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonicalUrl;

    // ============================================================
    // SEO: Update title and meta tags
    // ============================================================

    document.title = job.title + " | Sarthak Portal - Apply Online";
    
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.content = 
        job.title + " - Vacancy: " + (job.overview?.["Total Vacancies"] || "Many") + 
        " posts. Last Date: " + (job.overview?.["Last Date"] || "TBA") + 
        ". Check eligibility, salary, and apply online at Sarthak Portal.";
    }

    // ✅ NEW Badge for recent jobs
    const postDateObj = new Date(job.postDate);
    const today = new Date();
    const diffDays = (today - postDateObj) / (1000 * 60 * 60 * 24);

    let newBadge = diffDays <= 7
      ? `<span class="new-badge">🆕 NEW</span>`
      : "";

    // ============================================================
    // HTML: Main content with better structure
    // ============================================================

    let html = `
      <div class="breadcrumb">
        <a href="../index.html">Home</a> »
        <a href="jobs.html">Govt Jobs</a> »
        <span>${job.title}</span>
      </div>

      <h1>${job.title} ${newBadge}</h1>
      <p class="post-date">
        <strong>Posted:</strong> ${job.postDate}
      </p>
      
      <div class="job-description">
        ${job.description}
      </div>
    `;

    // ============================================================
    // Advertisement Section
    // ============================================================

    html += `
      <div class="ad-box">
        <p style="text-align: center; color: #999; font-size: 12px; margin: 0;">Advertisement</p>
      </div>
    `;

    // ============================================================
    // Overview Table
    // ============================================================

    if (job.overview) {
      html += `
        <h2>📋 Job Overview</h2>
        <table class="overview-table">
      `;

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

    // ============================================================
    // Vacancy Details (if available)
    // ============================================================

    if (job.vacancyDetails && job.vacancyDetails.rows && job.vacancyDetails.rows.length > 0) {
      html += `
        <h2>🎯 Vacancy Details</h2>
        <p>${job.vacancyDetails.heading || ''}</p>
        <table class="vacancy-table">
          <thead>
            <tr>
              ${job.vacancyDetails.columns.map(col => `<th>${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${job.vacancyDetails.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      `;
    }

    // ============================================================
    // Eligibility Criteria
    // ============================================================

    if (job.eligibility && job.eligibility.points && job.eligibility.points.length > 0) {
      html += `
        <h2>✅ Eligibility Criteria</h2>
        <p>${job.eligibility.heading || ''}</p>
        <ul class="eligibility-list">
          ${job.eligibility.points.map(point => `<li>${point}</li>`).join('')}
        </ul>
      `;
    } else {
      // Fallback content for thin pages
      html += `
        <h2>✅ Eligibility Criteria</h2>
        <ul class="eligibility-list">
          <li><strong>Educational Qualification:</strong> ${job.overview?.["Qualification"] || "As specified in notification"}</li>
          <li><strong>Age Limit:</strong> ${job.overview?.["Age Limit"] || "18-40 years (may vary)"}</li>
          <li><strong>Nationality:</strong> Indian citizen</li>
          <li><strong>Physical Requirements:</strong> As per notification</li>
        </ul>
      `;
    }

    // ============================================================
    // Important Dates
    // ============================================================

    html += `
      <h2>📅 Important Dates</h2>
      <table class="dates-table">
        <tr>
          <td><strong>Notification Published:</strong></td>
          <td>${job.postDate || "See notification"}</td>
        </tr>
        <tr>
          <td><strong>Application Start Date:</strong></td>
          <td><strong>${job.overview?.["Apply Start Date"] || "Check notification"}</strong></td>
        </tr>
        <tr>
          <td><strong>Last Date to Apply:</strong></td>
          <td><strong style="color: red;">${job.overview?.["Last Date"] || "Check notification"}</strong></td>
        </tr>
        <tr>
          <td><strong>Admit Card Release:</strong></td>
          <td>${job.examDate ? job.examDate : "To be announced"}</td>
        </tr>
      </table>
    `;

    // ============================================================
    // Important Links
    // ============================================================

    if (job.importantLinks && job.importantLinks.length > 0) {
      html += `
        <h2>🔗 Important Links</h2>
        <table class="important-table">
      `;

      job.importantLinks.forEach(row => {
        const isApply = row.label.toLowerCase().includes("apply");

        html += `<tr>
          <td><strong>${row.label}</strong></td>
          <td>`;

        if (row.links && row.links.length > 0) {
          row.links.forEach((link, index) => {
            const isPDF = link.url && link.url.endsWith(".pdf");
            html += `
              <a href="${link.url}" 
                 target="_blank"
                 rel="nofollow noopener"
                 class="${isApply ? "apply-link" : "info-link"}">
                 ${link.text}
                 ${isPDF ? " [PDF]" : ""}
              </a>
            `;
            if (index !== row.links.length - 1) html += " | ";
          });
        }

        html += `</td></tr>`;
      });

      html += `</table>`;
    }

    // ============================================================
    // How to Apply
    // ============================================================

    if (job.howToApply && job.howToApply.steps && job.howToApply.steps.length > 0) {
      html += `
        <h2>📝 How to Apply Online</h2>
        <ol class="steps-list">
          ${job.howToApply.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      `;
    } else {
      // Fallback content
      html += `
        <h2>📝 How to Apply Online</h2>
        <ol class="steps-list">
          <li>Visit the official website (link provided above)</li>
          <li>Look for the recruitment notification</li>
          <li>Click on "Apply Online" link</li>
          <li>Fill in your personal and educational details</li>
          <li>Upload required documents (photo, signature, certificates)</li>
          <li>Pay application fee (if applicable)</li>
          <li>Submit and download confirmation (save for future reference)</li>
        </ol>
      `;
    }

    // ============================================================
    // Selection Process (Generic Content)
    // ============================================================

    html += `
      <h2>🎓 Selection Process</h2>
      <ul>
        <li><strong>Written Test (CBT):</strong> Objective type questions based on syllabus</li>
        <li><strong>Physical Test (PET):</strong> For posts requiring physical fitness</li>
        <li><strong>Document Verification:</strong> Verification of qualifications and certificates</li>
        <li><strong>Medical Examination:</strong> Medical fitness check as per guidelines</li>
        <li><strong>Final Merit List:</strong> Final selection based on overall performance</li>
      </ul>
    `;

    // ============================================================
    // Salary & Benefits
    // ============================================================

    html += `
      <h2>💰 Salary & Benefits</h2>
      <ul>
        <li><strong>Pay Scale:</strong> ${job.overview?.["Pay Scale"] || "As per 7th Pay Commission"}</li>
        <li><strong>Grade Pay:</strong> Included in pay scale</li>
        <li><strong>Dearness Allowance (DA):</strong> As per government rules</li>
        <li><strong>House Rent Allowance (HRA):</strong> Based on location</li>
        <li><strong>Pension Benefits:</strong> EPS/NPS as applicable</li>
        <li><strong>Medical Benefits:</strong> CGHS/ESIC coverage</li>
      </ul>
    `;

    // ============================================================
    // Preparation Tips
    // ============================================================

    html += `
      <h2>📚 Preparation Tips</h2>
      <ul>
        <li><strong>Know the Syllabus:</strong> Download and study the complete exam syllabus</li>
        <li><strong>Solve Previous Papers:</strong> Practice last 5 years' question papers</li>
        <li><strong>Take Mock Tests:</strong> Take regular mock tests to improve speed and accuracy</li>
        <li><strong>Time Management:</strong> Practice completing exams within given time</li>
        <li><strong>Focus on Weak Areas:</strong> Identify weak subjects and practice more</li>
        <li><strong>Stay Updated:</strong> Keep track of current affairs and static GK</li>
        <li><strong>Healthy Lifestyle:</strong> Get adequate sleep and maintain good health</li>
      </ul>
    `;

    // ============================================================
    // FAQ Section
    // ============================================================

    html += `
      <h2>❓ Frequently Asked Questions (FAQ)</h2>
      <dl class="faq-list">
        <dt><strong>Q: What is the age limit for this job?</strong></dt>
        <dd>${job.overview?.["Age Limit"] || "Please check the official notification"}</dd>
        
        <dt><strong>Q: What is the last date to apply?</strong></dt>
        <dd><strong style="color: red;">${job.overview?.["Last Date"] || "Please check the official website"}</strong></dd>
        
        <dt><strong>Q: Is there an application fee?</strong></dt>
        <dd>${job.overview?.["Application Fee"] ? "Yes: " + job.overview["Application Fee"] : "Please check the notification"}</dd>
        
        <dt><strong>Q: How many vacancies are available?</strong></dt>
        <dd>${job.overview?.["Total Vacancies"] || "See vacancy details table above"}</dd>
        
        <dt><strong>Q: What is the educational qualification required?</strong></dt>
        <dd>${job.overview?.["Qualification"] || "See eligibility criteria section"}</dd>
        
        <dt><strong>Q: Where can I download the notification PDF?</strong></dt>
        <dd>Use the "Official Notification" link provided in the Important Links section above</dd>
      </dl>
    `;

    // ============================================================
    // Disclaimer
    // ============================================================

    html += `
      <div class="job-disclaimer">
        <strong>⚠️ Disclaimer:</strong>
        <p>
          This website is a job notification portal and is not affiliated with any government organization. 
          All information provided here is based on official notifications. 
          We recommend verifying all details from the official government website before applying. 
          The organization and Sarthak Portal are not responsible for any changes in recruitment notification or discrepancies in information.
        </p>
      </div>
    `;

    // ============================================================
    // Share Section
    // ============================================================

    const cleanURL = encodeURIComponent(canonicalUrl);
    const shareText = encodeURIComponent(job.title + " - Apply at Sarthak Portal");

    html += `
      <div class="share-section">
        <h3>📱 Share This Job</h3>
        <a class="share-btn whatsapp"
           href="https://wa.me/?text=${shareText}%20${cleanURL}"
           target="_blank"
           rel="nofollow noopener">
           WhatsApp
        </a>
        <a class="share-btn telegram"
           href="https://t.me/share/url?url=${cleanURL}&text=${shareText}"
           target="_blank"
           rel="nofollow noopener">
           Telegram
        </a>
        <a class="share-btn facebook"
           href="https://www.facebook.com/sharer/sharer.php?u=${cleanURL}"
           target="_blank"
           rel="nofollow noopener">
           Facebook
        </a>
      </div>
    `;

    // Back to home button
    html += `
      <div class="back-home-section">
        <a href="../index.html" class="back-home-btn">⬅ Back To Home</a>
      </div>
    `;

    document.getElementById("job-detail").innerHTML = html;

    // ============================================================
    // Floating Apply Button (if apply link available)
    // ============================================================

    if (job.importantLinks) {
      const applyRow = job.importantLinks.find(r =>
        r.label.toLowerCase().includes("apply")
      );

      if (applyRow && applyRow.links && applyRow.links.length > 0) {
        const floatingBtn = document.createElement("a");
        floatingBtn.href = applyRow.links[0].url;
        floatingBtn.target = "_blank";
        floatingBtn.rel = "nofollow noopener";
        floatingBtn.className = "floating-apply-btn";
        floatingBtn.innerHTML = "🔗 Apply Now";
        document.body.appendChild(floatingBtn);
      }
    }

    // ============================================================
    // Back to Top Button
    // ============================================================

    const topBtn = document.createElement("button");
    topBtn.innerHTML = "⬆️";
    topBtn.className = "back-to-top-btn";
    topBtn.title = "Back to top";
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ============================================================
    // SEO Schema: JobPosting Markup
    // ============================================================

    const schema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description.replace(/<[^>]*>?/gm, ''),
      "datePosted": new Date(job.postDate).toISOString(),
      "validThrough": job.overview?.["Last Date"] || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      "employmentType": "FULL_TIME",
      "directApply": true,
      "url": canonicalUrl,
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.overview?.["Organization Name"] || "Government of India",
        "sameAs": "https://www.gov.in"
      },
      "jobLocation": {
        "@type": "Place",
        "name": job.jobLocation || "India"
      },
      "baseSalary": job.overview?.["Pay Scale"] ? {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "text": job.overview["Pay Scale"]
      } : undefined,
      "educationRequirements": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": job.overview?.["Qualification"] || "As per notification"
      }
    };

    // Remove undefined properties
    Object.keys(schema).forEach(key => schema[key] === undefined && delete schema[key]);

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    console.log('✅ SEO: Schema markup added');

  })
  .catch(err => {
    console.error("Error loading job data:", err);
    document.getElementById("job-detail").innerHTML = `
      <div class="error-box">
        <h1>Error Loading Job Details</h1>
        <p>Please try again or contact support.</p>
        <a href="jobs.html">← Back to Jobs</a>
      </div>
    `;
  });
