/* =========================
   GET SCHEME ID FROM URL
========================= */
const params = new URLSearchParams(window.location.search);
const schemeId = params.get("scheme");
const box = document.getElementById("schemeDetail");

/* =========================
   LOAD SCHEME DATA
========================= */
fetch("../assets/data/scheme-detail.json")
  .then(res => res.json())
  .then(data => {
    const scheme = data.find(s => s.id === schemeId);

    if (!scheme) {
      box.innerHTML = "<p>Scheme not found.</p>";
      return;
    }

    /* 🔹 UPDATE PAGE TITLE & META (SEO BOOST) */
    document.title = `${scheme.title} – Eligibility, Benefits & Apply Online`;

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc && scheme.intro) {
      metaDesc.setAttribute(
        "content",
        scheme.intro.substring(0, 150)
      );
    }

    let html = `
      <h1>${scheme.title}</h1>
      <p class="tag">${scheme.category}</p>
      <p class="scheme-intro">${scheme.intro}</p>
    `;

    /* OBJECTIVES */
    if (scheme.objective && scheme.objective.length) {
      html += `
        <h2>Objectives</h2>
        <ul>${scheme.objective.map(o => `<li>${o}</li>`).join("")}</ul>
      `;
    }

    /* ABOUT */
    if (scheme.about_scheme) {
      html += `
        <h2>About the Scheme</h2>
        <p>${scheme.about_scheme}</p>
      `;
    }

    /* BENEFITS */
    if (scheme.benefits && scheme.benefits.length) {
      html += `
        <h2>Benefits</h2>
        <ul>${scheme.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
      `;
    }

    /* ELIGIBILITY */
    if (scheme.eligibility && scheme.eligibility.length) {
      html += `
        <h2>Eligibility</h2>
        <ul>${scheme.eligibility.map(e => `<li>${e}</li>`).join("")}</ul>
      `;
    }

    /* APPLICATION PROCESS */
    if (scheme.application_process) {
      html += `
        <h2>Application Process</h2>
        <p><strong>Mode:</strong> ${scheme.application_process.mode}</p>
        <ol>${scheme.application_process.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      `;
    }

    /* APPLY ONLINE BUTTON (SAFE) */
    if (scheme.appl_link) {
      html += `
        <div class="apply-section">
          <a href="${scheme.appl_link}"
             target="_blank"
             rel="nofollow noopener"
             class="apply-btn">
             Apply on Official Website
          </a>
        </div>
      `;
    }

    /* DOCUMENTS */
    if (scheme.documents_required && scheme.documents_required.length) {
      html += `
        <h2>Documents Required</h2>
        <ul>${scheme.documents_required.map(d => `<li>${d}</li>`).join("")}</ul>
      `;
    }

    /* FAQ SECTION */
    if (scheme.faqs && scheme.faqs.length) {
      html += `<h2>Frequently Asked Questions (FAQs)</h2>`;
      html += scheme.faqs.map((f, i) => `
        <div class="faq-item">
          <button class="faq-question" onclick="toggleFaq(${i})">
            ${f.question}
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer" id="faq-${i}">
            ${f.answer}
          </div>
        </div>
      `).join("");
    }

    /* DISCLAIMER (JSON + PAGE BOTH) */
    if (scheme.disclaimer) {
      html += `
        <p class="scheme-note">
          <strong>Disclaimer:</strong> ${scheme.disclaimer}
        </p>
      `;
    }

    box.innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    box.innerHTML = "<p>Error loading scheme details.</p>";
  });

/* =========================
   FAQ TOGGLE (ACCESSIBLE)
========================= */
function toggleFaq(i) {
  const ans = document.getElementById(`faq-${i}`);
  const isOpen = ans.style.display === "block";

  document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
  document.querySelectorAll(".faq-icon").forEach(i => i.innerText = "+");

  if (!isOpen) {
    ans.style.display = "block";
    ans.previousElementSibling.querySelector(".faq-icon").innerText = "−";
  }
}

/* =========================
   BACK BUTTON
========================= */
const backBtn = document.getElementById("backCentralBtn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "central-schemes.html";
  });
}
