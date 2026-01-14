document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearch");
  const btn = document.getElementById("searchBtn");

  btn.addEventListener("click", doSearch);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") doSearch();
  });

  function doSearch() {
    const q = input.value.toLowerCase().trim();
    if (!q) return alert("Kuch search karein");

    // APPLY / STATUS
    if (q.includes("apply") || q.includes("form")) {
      location.href = "pages/apply-online.html";
      return;
    }

    if (q.includes("status") || q.includes("result")) {
      location.href = "pages/status-check.html";
      return;
    }

    // CENTRAL SCHEMES
    if (
      q.includes("pm") ||
      q.includes("yojana") ||
      q.includes("central")
    ) {
      location.href = "pages/central-schemes.html?search=" + q;
      return;
    }

    // STATE SCHEMES
    location.href = "pages/state-schemes.html?search=" + q;
  }
});
