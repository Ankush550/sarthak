function renderGmpTrend(trend) {
  if (!trend) return "";
  const values = trend.split(">");
  return `
    <div class="gmp-trend-mini">
      ${values.map((v, i) =>
        `<span class="gmp-point">${v}</span>${i < values.length - 1 ? '<span class="gmp-arrow">→</span>' : ''}`
      ).join("")}
    </div>
  `;
}

/* =====================================================
   IPO GMP – INLINE + MORE DETAILS (CSV BASED)
   ===================================================== */

const basePath = location.hostname.includes("github.io")
  ? "/sarthak"
  : "";

/* ---------- CSV LOADER ---------- */
async function loadCSV(path) {
  const res = await fetch(path);
  const text = await res.text();

  const rows = text.trim().split("\n");
  const headers = rows.shift().split(",");

  return rows.map(r => {
    const cols = r.split(",");
    let obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = cols[i] ? cols[i].trim() : "";
    });
    return obj;
  });
}

/* ---------- GLOBAL DATA ---------- */
let IPO_LIST = [];
let IPO_DETAILS = [];
let IPO_MORE = [];

/* ---------- TIME AGO ---------- */
function getTimeAgo(time) {
  if (!time) return "";
  const diff = Math.floor((Date.now() - new Date(time)) / 60000);
  if (diff < 1) return "• Updated just now";
  if (diff < 60) return `• Updated ${diff} min ago`;
  return `• Updated ${Math.floor(diff / 60)} hr ago`;
}

/* ---------- INIT ---------- */
async function initIPO() {
  IPO_LIST = await loadCSV(`${basePath}/assets/data/ipo_list.csv`);
  IPO_DETAILS = await loadCSV(`${basePath}/assets/data/ipo_details.csv`);
  IPO_MORE = await loadCSV(`${basePath}/assets/data/ipo_more_details.csv`);

  renderTable();

  // Updated text
  if (IPO_LIST.length && document.getElementById("ipoUpdatedText")) {
    document.getElementById("ipoUpdatedText").innerText =
      getTimeAgo(IPO_LIST[0].updated_at);
  }
}

/* ---------- RENDER TABLE ---------- */
function renderTable() {
  const tbody = document.getElementById("ipoTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  IPO_LIST.forEach(ipo => {
    tbody.innerHTML += `
      <tr class="ipo-row">

        <td>
          <a href="javascript:void(0)"
             onclick="toggleDetails('${ipo.id}', this)">
            ${ipo.ipo_name}
          </a>
        </td>
        <td>₹${ipo.gmp}</td>
        <td>₹${ipo.issue_price}</td>
        <td>${ipo.issue_size}</td>
        <td>${ipo.lot_size}</td>
        <td>${ipo.open_date || ipo.open}</td>
        <td>${ipo.close_date || ipo.close}</td>
        <td>
          <span class="ipo-status ${ipo.status.toLowerCase()}">
            ${ipo.status}
          </span>
        </td>
        <td>${ipo.updated_at || ""}</td>
      </tr>
    `;
  });
}

/* ---------- TOGGLE INLINE DETAILS ---------- */
function toggleDetails(id, el) {

  document.querySelectorAll(".ipo-detail-row").forEach(r => r.remove());

  const parentRow = el.closest("tr");
  const detail = IPO_DETAILS.find(d => d.id === id);
  if (!detail) return;

  const detailRow = document.createElement("tr");
  detailRow.className = "ipo-detail-row";

  detailRow.innerHTML = `
  <td colspan="9">
    <div class="ipo-inline-details">
      <p><b>Listing Date:</b> ${detail.listing_date}</p>
      <p><b>Exchange:</b> ${detail.exchange}</p>
      <p><b>Subscription:</b> ${detail.subscription}</p>
      <p><b>Registrar:</b> ${detail.registrar}</p>
      <p><b>Risk:</b> ${detail.risk}</p>
      <p><b>Expected Listing Price:</b> ₹${detail.expected_price}</p>

      <!-- ✅ YE LINE ADD KARO -->
      <p><b>GMP Trend:</b> ${renderGmpTrend(detail.gmp_trend)}</p>

      <a href="${detail.apply_via}"
         target="_blank"
         class="zerodha-cta">
         Apply via Zerodha
      </a>
    </div>
  </td>
`;


  parentRow.after(detailRow);
  detailRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- MORE DETAILS ---------- */
function openMoreDetails(id) {
  const box = document.getElementById("ipoMoreDetails");
  if (!box) return;

  const d = IPO_MORE.find(x => x.id === id);
  if (!d) {
    box.innerHTML = "<p>No additional details available.</p>";
    box.style.display = "block";
    return;
  }

  box.style.display = "block";
  box.innerHTML = `
    <h3>📊 Company & IPO Analysis</h3>

    <p><b>About Company:</b><br>${d.company_overview}</p>

    <div class="financial-grid">
      <div><b>Revenue:</b><br>${d.revenue}</div>
      <div><b>Profit:</b><br>${d.profit}</div>
      <div><b>Debt:</b><br>${d.debt}</div>
    </div>

    <div class="pros-cons">
      <div>
        <h4>✅ Pros</h4>
        <ul>${d.pros.split("|").map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>⚠️ Cons</h4>
        <ul>${d.cons.split("|").map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
    </div>

    <a href="${d.apply_link}" target="_blank" class="apply-btn">
      Apply via Zerodha →
    </a>
  `;

  box.scrollIntoView({ behavior: "smooth" });
}

/* ---------- LOAD ---------- */
document.addEventListener("DOMContentLoaded", initIPO);

function autoCloseDetails() {
  document.querySelectorAll(".ipo-detail-row").forEach(r => r.remove());
}

function autoCloseDetails() {
  document
    .querySelectorAll(".ipo-detail-row")
    .forEach(r => r.remove());
}

let closeTimer = null;

function scheduleClose() {
  closeTimer = setTimeout(() => {
    document
      .querySelectorAll(".ipo-detail-row")
      .forEach(r => r.remove());
  }, 350); // 350ms delay (perfect)
}

function cancelClose() {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
}
