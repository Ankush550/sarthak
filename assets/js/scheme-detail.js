const params = new URLSearchParams(window.location.search);
const schemeId = params.get("scheme");
const box = document.getElementById("schemeDetail");

fetch("../assets/data/scheme-detail.json")
  .then(res => res.json())
  .then(data => {
    const scheme = data.find(s => s.id === schemeId);

    if (!scheme) {
      box.innerHTML = "<p>Scheme not found.</p>";
      return;
    }

    let html = `
      <h1>${scheme.title}</h1>
      <p class="tag">${scheme.category}</p>
      <p class="scheme-intro">${scheme.intro}</p>
    `;

    if (scheme.objective) {
      html += `
        <h3>Objectives</h3>
        <ul>${scheme.objective.map(o => `<li>${o}</li>`).join("")}</ul>
      `;
    }

    if (scheme.about_scheme) {
      html += `<h3>About the Scheme</h3><p>${scheme.about_scheme}</p>`;
    }

    if (scheme.benefits) {
      html += `
        <h3>Benefits</h3>
        <ul>${scheme.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
      `;
    }

    if (scheme.eligibility) {
      html += `
        <h3>Eligibility</h3>
        <ul>${scheme.eligibility.map(e => `<li>${e}</li>`).join("")}</ul>
      `;
    }

    if (scheme.application_process) {
      html += `
        <h3>Application Process</h3>
        <p><b>Mode:</b> ${scheme.application_process.mode}</p>
        <ol>${scheme.application_process.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      `;
    }

    /* 🔥 APPLY ONLINE – TUMHARE appl_link SE */
    if (scheme.appl_link) {
      html += `
        <div class="apply-section">
          <a href="${scheme.appl_link}"
             target="_blank"
             rel="nofollow noopener"
             class="apply-btn">
             Apply Online
          </a>
        </div>
      `;
    }

    if (scheme.documents_required) {
      html += `
        <h3>Documents Required</h3>
        <ul>${scheme.documents_required.map(d => `<li>${d}</li>`).join("")}</ul>
      `;
    }

    if (scheme.faqs) {
      html += `
        <h3>FAQs</h3>
        ${scheme.faqs.map((f, i) => `
          <div class="faq-item">
            <div class="faq-question" onclick="toggleFaq(${i})">
              ${f.question} <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer" id="faq-${i}">
              ${f.answer}
            </div>
          </div>
        `).join("")}
      `;
    }

    html += `<p class="scheme-note">${scheme.disclaimer}</p>`;
    box.innerHTML = html;
  })
  .catch(err => {
    console.error(err);
    box.innerHTML = "<p>Error loading scheme details.</p>";
  });

function toggleFaq(i) {
  const ans = document.getElementById(`faq-${i}`);
  ans.style.display = ans.style.display === "block" ? "none" : "block";
}

document.getElementById("backCentralBtn")
  .addEventListener("click", () => {
    window.location.href = "central-schemes.html";
  });
