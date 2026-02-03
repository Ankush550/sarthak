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

    box.innerHTML = `
      <!-- TITLE -->
      <h1>${scheme.title}</h1>
      <p class="tag">${scheme.category}</p>

      <!-- INTRO -->
      <p class="scheme-intro">${scheme.intro}</p>

      <!-- DETAILS -->
      <h3>Scheme Details</h3>
      <ul>${scheme.details.map(d => `<li>${d}</li>`).join("")}</ul>

      <!-- BENEFITS -->
      <h3>Benefits</h3>
      <ul>${scheme.benefits.map(b => `<li>${b}</li>`).join("")}</ul>

      <!-- ELIGIBILITY -->
      <h3>Eligibility</h3>
      <ul>${scheme.eligibility.map(e => `<li>${e}</li>`).join("")}</ul>

      <!-- APPLICATION PROCESS -->
      <h3>Application Process</h3>
      <p><b>Mode:</b> ${scheme.application.mode}</p>
      <ol>${scheme.application.steps.map(s => `<li>${s}</li>`).join("")}</ol>

      <!-- DOCUMENTS -->
      <h3>Documents Required</h3>
      <ul>${scheme.documents.map(d => `<li>${d}</li>`).join("")}</ul>

      <!-- FAQ SECTION -->
      ${scheme.faqs ? `
        <h3>Frequently Asked Questions (FAQs)</h3>
        <div class="faq-box">
          ${scheme.faqs.map((faq, i) => `
            <div class="faq-item">
              <div class="faq-question" onclick="toggleFaq(${i})">
                ${faq.q}
                <span class="faq-icon">+</span>
              </div>
              <div class="faq-answer" id="faq-${i}">
                ${faq.a}
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <!-- DISCLAIMER -->
      <p class="scheme-note">
        Disclaimer: Scheme details are based on official government sources.
        Eligibility, benefits and rules may change. Please verify on the official website.
      </p>

      <!-- ACTION BUTTON -->
      <a href="${scheme.application.website}" target="_blank" class="apply-btn">
        Apply Online
      </a>

      <!-- INTERNAL LINKS -->
      <p class="internal-links">
        You may also explore
        <a href="central-schemes.html">Central Government Schemes</a>,
        <a href="scholarships.html">Scholarship Schemes</a> and
        <a href="jobs.html">Jobs & Results</a>.
      </p>

      <!-- BACK BUTTONS -->
      <div class="back-actions">
        <button onclick="goBackToSchemes()">← Back to Central Schemes</button>
        <button onclick="goBackToStateSchemes()">← Back to State Schemes</button>
      </div>
    `;
  })
  .catch(err => {
    box.innerHTML = "<p>Error loading scheme details.</p>";
    console.error(err);
  });

/* =========================
   FAQ TOGGLE
========================= */
function toggleFaq(index) {
  const answer = document.getElementById(`faq-${index}`);
  const isOpen = answer.style.display === "block";

  document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
  document.querySelectorAll(".faq-icon").forEach(i => i.innerText = "+");

  if (!isOpen) {
    answer.style.display = "block";
    answer.previousElementSibling.querySelector(".faq-icon").innerText = "−";
  }
}

/* =========================
   NAVIGATION
========================= */
function goBackToSchemes() {
  window.location.href = "central-schemes.html";
}

function goBackToStateSchemes() {
  window.location.href = "state-schemes.html";
}
