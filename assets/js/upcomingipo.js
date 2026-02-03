document.addEventListener("DOMContentLoaded", () => {

  let ipoData = [];

  fetch("../assets/data/upcomingipo.csv")
    .then(res => res.text())
    .then(text => {
      // 🔥 BOM + extra spaces clean
      text = text.replace(/\ufeff/g, "").trim();

      const lines = text.split("\n");
      const headers = lines[0].split(",").map(h => h.trim());

      ipoData = lines.slice(1).map(line => {
        const values =
          line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
          ?.map(v => v.replace(/^"|"$/g, "").trim()) || [];

        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = values[i] || "";
        });

        return obj;
      });

      console.log("CSV DATA:", ipoData); // 👈 DEBUG
      renderTable(ipoData);
    })
    .catch(err => console.error("CSV load error:", err));

  // SEARCH
  document.getElementById("ipoSearch").addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    const filtered = ipoData.filter(ipo =>
      ipo.name.toLowerCase().includes(value)
    );
    renderTable(filtered);
  });

});


/* ===== RENDER TABLE ===== */
function renderTable(data) {
  const tbody = document.getElementById("ipoGmpBody");
  tbody.innerHTML = "";

  if (!data.length) {
    tbody.innerHTML =
      `<tr><td colspan="8">No IPO data found</td></tr>`;
    return;
  }

  data.forEach(ipo => {

    const { label, cssClass, icon } = getStatus(
      ipo.open,
      ipo.close,
      ipo.status
    );

    const row = `
      <tr>
        <td>
          ${
            ipo.website
              ? `<a href="${ipo.website}"
                   target="_blank"
                   rel="nofollow noopener"
                   class="ipo-link">
                   ${ipo.name}
                 </a>`
              : ipo.name
          }
        </td>

        <td class="gmp">₹${ipo.gmp}</td>
        <td>₹${ipo.issuePrice}</td>
        <td>${ipo.size} Cr</td>
        <td>${ipo.lot}</td>
        <td>${ipo.open}</td>
        <td>${ipo.close}</td>
        <td>
          <span class="status ${cssClass}">
            ${icon} ${label}
          </span>
        </td>
      </tr>
    `;

    tbody.insertAdjacentHTML("beforeend", row);
  });
}


/* ===== STATUS LOGIC ===== */
function getStatus(openDateStr, closeDateStr, manualStatus) {

  if (manualStatus?.toLowerCase() === "hot") {
    return { label: "Hot", cssClass: "status-hot", icon: "🔥" };
  }

  const today = new Date();
  const openDate = new Date(openDateStr);
  const closeDate = new Date(closeDateStr);

  if (today < openDate) {
    return { label: "Upcoming", cssClass: "status-upcoming", icon: "⏳" };
  }

  if (today >= openDate && today <= closeDate) {
    return { label: "Open", cssClass: "status-open", icon: "🟢" };
  }

  return { label: "Closed", cssClass: "status-closed", icon: "🔴" };
}
