const brandBar = document.getElementById("brandBar");
const phonesGrid = document.getElementById("phonesGrid");
const detailsSection = document.getElementById("detailsSection");
const phoneTitle = document.getElementById("phoneTitle");
const specsTable = document.getElementById("specsTable");

let PHONES = [];
let SPECS = [];

/* LOAD DATA */
async function loadData() {
  const brands = await fetch("../assets/data/mobiles/brands.json").then(r => r.json());
  PHONES = await fetch("../assets/data/mobiles/phones.json").then(r => r.json());
  SPECS = await fetch("../assets/data/mobiles/phone-specs.json").then(r => r.json());

  renderBrands(brands);
}

function renderBrands(brands) {
  brands.forEach(b => {
    const btn = document.createElement("button");
    btn.innerText = b.name;
    btn.onclick = () => loadPhones(b.id);
    brandBar.appendChild(btn);
  });
}

function loadPhones(brandId) {
  phonesGrid.innerHTML = "";
  detailsSection.style.display = "none";

  PHONES.filter(p => p.brand === brandId).forEach(p => {
    phonesGrid.innerHTML += `
      <div class="phone-card" onclick="showDetails('${p.id}')">
        <img src="../assets/images/mobiles/${p.image}">
        <h3>${p.name}</h3>
        <span class="status ${p.status.toLowerCase()}">${p.status}</span>
        <p>${p.price}</p>
      </div>
    `;
  });

  document.getElementById("phonesSection")
    .scrollIntoView({ behavior: "smooth" });
}

window.showDetails = function(id) {
  const phone = PHONES.find(p => p.id === id);
  const detail = SPECS.find(s => s.id === id);

  phoneTitle.innerText = phone.name;
  specsTable.innerHTML = "";

  Object.entries(detail.specs).forEach(([k, v]) => {
    specsTable.innerHTML += `
      <tr><td>${k}</td><td>${v}</td></tr>
    `;
  });

  detailsSection.style.display = "block";
  detailsSection.scrollIntoView({ behavior: "smooth" });
}

loadData();
