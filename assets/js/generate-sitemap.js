// ============================================================
// generate-sitemap.js
//
// Saari data files (Jobs, Admit Cards, Results, Answer Keys)
// se automatically poori sitemap.xml bana deti hai — manually
// entry add karne ki zaroorat nahi padegi.
//
// Usage (VS Code Terminal me, isi assets/js folder se):
//   node generate-sitemap.js
//
// Ye sitemap.xml ko seedhe website ke root folder me save
// karti hai (assets/js se 2 folder upar — jahan index.html hai).
// ============================================================

const fs = require("fs");
const path = require("path");

const DOMAIN = "https://sarthakyojana.in";

// sitemap.xml root folder me jaani chahiye (index.html ke saath)
// Abhi hum assets/js ke andar hain, isliye 2 level upar jaayenge.
const OUTPUT_PATH = path.join(__dirname, "..", "..", "sitemap.xml");

const TODAY = new Date().toISOString().slice(0, 10);

// ---- Data files load karo (safe — agar koi file na mile to khali array) ----
function safeRequire(filename, exportKey) {
  try {
    const mod = require(filename);
    return mod[exportKey] || [];
  } catch (e) {
    console.log(`⚠ ${filename} load nahi ho payi (${e.message}) — skip kar rahe hain.`);
    return [];
  }
}

const JOBS_DATA        = safeRequire("./jobs-data.js", "JOBS_DATA");
const ADMIT_CARDS_DATA = safeRequire("./admit-card-data.js", "ADMIT_CARDS_DATA");
const RESULTS_DATA     = safeRequire("./result-data.js", "RESULTS_DATA");
const ANSWER_KEYS_DATA = safeRequire("./answerkey-data.js", "ANSWER_KEYS_DATA");

// ---- Static pages (jo data files se nahi aatin) ----
const STATIC_PAGES = [
  { loc: `${DOMAIN}/`,                          changefreq: "daily",   priority: "1.0" },
  { loc: `${DOMAIN}/pages/jobs.html`,           changefreq: "daily",   priority: "0.9" },
  { loc: `${DOMAIN}/pages/results.html`,        changefreq: "daily",   priority: "0.9" },
  { loc: `${DOMAIN}/pages/scholarships.html`,   changefreq: "weekly",  priority: "0.8" },
];

// ---- URL entries banao ----
const urls = [];

STATIC_PAGES.forEach(p => {
  urls.push({ loc: p.loc, lastmod: TODAY, changefreq: p.changefreq, priority: p.priority });
});

JOBS_DATA.forEach(j => {
  urls.push({
    loc: `${DOMAIN}/pages/job-detail.html?id=${j.id}`,
    lastmod: j.datePosted || TODAY,
    changefreq: "weekly",
    priority: "0.8"
  });
});

ADMIT_CARDS_DATA.forEach(a => {
  urls.push({
    loc: `${DOMAIN}/pages/admit-card-detail.html?id=${a.id}`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.7"
  });
});

RESULTS_DATA.forEach(r => {
  urls.push({
    loc: `${DOMAIN}/pages/item-detail.html?type=result&id=${r.id}`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.7"
  });
});

ANSWER_KEYS_DATA.forEach(a => {
  urls.push({
    loc: `${DOMAIN}/pages/item-detail.html?type=answer&id=${a.id}`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.7"
  });
});

// ---- XML banao ----
function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(u => {
  xml += `  <url>\n`;
  xml += `    <loc>${escapeXml(u.loc)}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

// ---- File save karo ----
fs.writeFileSync(OUTPUT_PATH, xml, "utf-8");

console.log(`\n✅ sitemap.xml ban gayi — ${urls.length} URLs`);
console.log(`   Jobs: ${JOBS_DATA.length} | Admit Cards: ${ADMIT_CARDS_DATA.length} | Results: ${RESULTS_DATA.length} | Answer Keys: ${ANSWER_KEYS_DATA.length}`);
console.log(`   Saved to: ${OUTPUT_PATH}\n`);
