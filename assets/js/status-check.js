document.getElementById("statusForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const appId = document.getElementById("appId").value.trim();
  const result = document.getElementById("statusResult");

  if (appId.length < 5) {
    result.innerHTML = "<p class='error'>Invalid Application Number</p>";
    return;
  }

  // Fake status (safe demo)
  result.innerHTML = `
    <div class="status-card">
      <h3>Status: <span class="approved">Under Verification</span></h3>
      <p><strong>Application ID:</strong> ${appId}</p>
      <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
      <p><strong>Note:</strong> Official verification in progress.</p>
    </div>
  `;
});
