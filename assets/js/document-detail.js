document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("document-detail");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const isGitHub = location.hostname.includes("github.io");
  const basePath = isGitHub ? "/sarthak" : "";

  fetch(`${basePath}/assets/data/documents.json`)
    .then(res => res.json())
    .then(data => {
      const doc = data.find(d => d.id === id);
      if (!doc) {
        container.innerHTML = "<p>Document not found</p>";
        return;
      }

      container.innerHTML = `
        <h1>${doc.title}</h1>

        <div class="doc-info">
          <p><b>Use:</b> ${doc.desc}</p>
          <p><b>Eligibility:</b> ${doc.eligibility}</p>
          <p><b>Required Documents:</b> ${doc.documents}</p>
          <p><b>Process:</b> ${doc.steps}</p>
        </div>

        <div class="doc-divider"></div>

        <a href="${doc.official}" target="_blank" class="apply-btn">
          📝 Apply Online (Official)
        </a>

        <div class="warning">
          ⚠ Apply only on official government websites
        </div>

        <a href="documents.html" class="back-btn">← Back to Documents</a>
      `;
    });
});
