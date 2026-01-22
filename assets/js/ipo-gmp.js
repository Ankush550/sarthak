fetch("assets/data/ipo-gmp.json")
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("ipoGmpBody");

    data.forEach((ipo, index) => {
      const mainRow = `
        <tr class="ipo-row" onclick="toggleDetails(${index})">
          <td><strong>${ipo.name}</strong></td>
          <td class="gmp">${ipo.gmp}</td>
          <td>${ipo.price}</td>
          <td>${ipo.ipoSize}</td>
          <td>${ipo.lot}</td>
          <td>${ipo.open}</td>
          <td>${ipo.close}</td>
          <td><span class="status">${ipo.status}</span></td>
        </tr>
        <tr id="details-${index}" class="ipo-details-row">
          <td colspan="8">
            <div class="ipo-details-box">
              <p><strong>📅 Listing Date:</strong> ${ipo.listing}</p>
              <p><strong>🏛 Exchange:</strong> ${ipo.exchange}</p>
              <p><strong>📊 Subscription:</strong> ${ipo.subscription}</p>
              <p><strong>🧾 Registrar:</strong> ${ipo.registrar}</p>
              <p><strong>⚠ Risk:</strong> ${ipo.risk}</p>
              <p><strong>Expected Listing Price:</strong> ${ipo.ExpectedListingPrice}</p>
              <p><strong>GMP Trend:</strong> ${ipo.GMPTrend}</p>
             <p>
  <b>Apply Via:</b> <a href="${ipo.apply_via.url}"
     target="_blank"
     rel="nofollow sponsored"
     class="apply-link">
     ${ipo.apply_via.name}
  </a>
</p>
            </div>
          </td>
        </tr>
      `;
      tbody.innerHTML += mainRow;
    });
  });

function toggleDetails(index) {
  const row = document.getElementById(`details-${index}`);
  row.classList.toggle("show");
}
