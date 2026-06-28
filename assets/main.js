const SITE = {
  name: 'SarthakYojana',
  fullName: 'SarthakYojana.in',
  tagline: 'Ab Har Sarkari Yojana Hogi Aasan',
  url: 'https://sarthakyojana.in',
  waLink: 'https://wa.me/919999999999?text=Send+me+Job+Alerts',
  root: (()=>{
    const p = window.location.pathname;
    return p.includes('/pages/') ? '../' : './';
  })()
};

function renderHeader(activeNav) {
  const R = SITE.root;
  const links = [
    {label:'Home', href: R+'index.html'},
    {label:'Latest Job', href: R+'pages/jobs.html'},
    {label:'Admit Card', href: R+'pages/results.html#admit'},
    {label:'Result', href: R+'pages/results.html'},
    {label:'Answer Key', href: R+'pages/results.html#answer'},
    {label:'Schemes', href: R+'pages/schemes.html'},
    {label:'Private Jobs', href: R+'pages/private-jobs.html'},
    {label:'Job Finder', href: R+'pages/job-finder.html'},
    {label:'Sitemap', href: R+'pages/sitemap.html'},
  ];
  document.getElementById('site-header').innerHTML = `
    <div class="hdr-inner">
      <h1><a href="${R}index.html" style="color:#fff;text-decoration:none;">${SITE.fullName}</a></h1>
      <p class="hdr-sub">${SITE.tagline}</p>
    </div>`;
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `<div class="nav-inner">${links.map(l=>
    `<a href="${l.href}" class="${l.label===activeNav?'active':''}">${l.label}</a>`
  ).join('')}</div>`;
  document.getElementById('site-header').after(nav);

  const tag = document.createElement('div');
  tag.className = 'tagline-bar';
  tag.innerHTML = `<b>${SITE.name}</b> — Official site for Sarkari Naukri, Exam Results, Admit Cards, Answer Keys &amp; Government Schemes — Updated Daily`;
  nav.after(tag);
}

function renderTicker() {
  const jobs = typeof JOBS_DATA !== "undefined" ? JOBS_DATA : [];
const results = typeof RESULTS_DATA !== "undefined" ? RESULTS_DATA : [];

const items =
    jobs.slice(0,8).map(j=>j.title+" | ").join("") +
    results.slice(0,4).map(r=>r.title+" | ").join("");
  const el = document.getElementById('ticker-wrap');
  if (!el) return;
  el.innerHTML = `<div class="ticker-inner">
    <span class="ticker-label">NEW</span>
    <div class="ticker-scroll"><span>${items}</span></div>
  </div>`;
}

function renderFooter() {
  const R = SITE.root;
  document.getElementById('site-footer').innerHTML = `
  <div class="footer-main">
    <div class="footer-col">
      <h3>${SITE.fullName}</h3>
      <p style="font-size:11.5px;color:#777;line-height:1.6;">Trusted source for Sarkari Naukri, Exam Results and Government Schemes since 2022.</p>
    </div>
    <div class="footer-col">
      <h3>Govt Jobs</h3>
      <ul>
        <li><a href="${R}pages/jobs.html">Latest Jobs</a></li>
        <li><a href="${R}pages/jobs.html?cat=Defence">Defence Jobs</a></li>
        <li><a href="${R}pages/jobs.html?cat=Railway">Railway Jobs</a></li>
        <li><a href="${R}pages/jobs.html?cat=Banking">Banking Jobs</a></li>
        <li><a href="${R}pages/jobs.html?cat=SSC">SSC Jobs</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Results</h3>
      <ul>
        <li><a href="${R}pages/results.html">Latest Results</a></li>
        <li><a href="${R}pages/results.html#admit">Admit Cards</a></li>
        <li><a href="${R}pages/results.html#answer">Answer Keys</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Schemes</h3>
      <ul>
        <li><a href="${R}pages/schemes.html">All Schemes</a></li>
        <li><a href="${R}pages/schemes.html?type=Central">Central Govt</a></li>
        <li><a href="${R}pages/schemes.html?type=State">State Govt</a></li>
        <li><a href="${R}pages/private-jobs.html">Private Jobs</a></li>
        <li><a href="${R}pages/us-companies-india-jobs.html">US MNC Jobs</a></li>
        <li><a href="${R}pages/nri-jobs.html">NRI Jobs</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="${R}pages/job-finder.html">Job Finder</a></li>
        <li><a href="${R}pages/search.html">Search Jobs</a></li>
        <li><a href="${R}pages/about-us.html">About Us</a></li>
        <li><a href="${R}pages/contact.html">Contact Us</a></li>
        <li><a href="${R}pages/privacy-policy.html">Privacy Policy</a></li>
        <li><a href="${R}pages/disclaimer.html">Disclaimer</a></li>
        <li><a href="${R}pages/terms-conditions.html">Terms &amp; Conditions</a></li>
        <li><a href="${R}pages/sitemap.html">Sitemap</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <a href="${R}index.html">Home</a>
    <a href="${R}pages/about-us.html">About Us</a>
    <a href="${R}pages/sitemap.html">Sitemap</a>
    <a href="${R}pages/contact.html">Contact Us</a>
    <a href="${R}pages/disclaimer.html">Disclaimer</a>
    <a href="${R}pages/privacy-policy.html">Privacy Policy</a>
    <a href="${R}pages/terms-conditions.html">Terms &amp; Conditions</a>
    <br style="margin-bottom:6px;">
    &copy; 2026 ${SITE.fullName} — All Rights Reserved | Sarkari Naukri | Sarkari Result | Sarkari Yojana
  </div>`;
}

function secBox(title, items, viewAllHref) {
  const rows = items.slice(0,10).map(item => {
    const isNew = item.isNew || false;
    return `<li><a href="${item.href}">${item.label}${isNew ? '<span class="new-tag">NEW</span>':''}</a></li>`;
  }).join('');
  return `<div class="sec-box">
    <div class="sec-hdr"><h2>${title}</h2></div>
    <ul class="sec-list">${rows}</ul>
    <a href="${viewAllHref}" class="view-more">View More &raquo;</a>
  </div>`;
}

function buildJobSchema(job) {
  return {
    "@context":"https://schema.org/",
    "@type":"JobPosting",
    "title": job.title,
    "description": job.description || job.title,
    "identifier":{"@type":"PropertyValue","name":job.organization,"value":job.id},
    "datePosted": job.datePosted || "2026-04-01",
    "validThrough": job.validThrough || "2026-12-31T00:00",
    "employmentType": job.employmentType || "FULL_TIME",
    "hiringOrganization":{"@type":"Organization","name":job.organization,"sameAs":job.officialWebsite||""},
    "jobLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":job.location||"India","addressCountry":"IN"}},
    "baseSalary":{"@type":"MonetaryAmount","currency":"INR","value":{"@type":"QuantitativeValue","minValue":job.salaryMin||20000,"maxValue":job.salaryMax||100000,"unitText":"MONTH"}}
  };
}

function doSearch(q) {
  if (!q) return [];
  const lq = q.toLowerCase();
  return JOBS_DATA.filter(j =>
    j.title.toLowerCase().includes(lq) ||
    j.organization.toLowerCase().includes(lq) ||
    (j.category||'').toLowerCase().includes(lq) ||
    (j.qualification||'').toLowerCase().includes(lq)
  );
}


// ===== COOKIE CONSENT (GDPR/AdSense Compliance) =====
function renderCookieConsent() {
  if (localStorage.getItem('cookieConsent') === 'accepted') return;
  
  const banner = document.createElement('div');
  banner.id = 'cookie-consent';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;color:#ccc;padding:12px 16px;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:12px;font-family:Arial,sans-serif;';
  banner.innerHTML = `
    <div style="flex:1;min-width:200px;line-height:1.5;">
      <strong style="color:#fff;">We use cookies</strong> — SarthakYojana.in uses cookies and Google AdSense to serve relevant ads and improve your experience. 
      By continuing, you agree to our <a href="${SITE.root}pages/privacy-policy.html" style="color:#f9a825;">Privacy Policy</a>.
    </div>
    <div style="display:flex;gap:8px;flex-shrink:0;">
      <button onclick="document.getElementById('cookie-consent').style.display='none';localStorage.setItem('cookieConsent','accepted');" 
        style="background:#c0392b;color:#fff;border:none;padding:8px 18px;border-radius:3px;cursor:pointer;font-size:12px;font-weight:700;">
        Accept
      </button>
      <a href="${SITE.root}pages/privacy-policy.html" 
        style="background:transparent;color:#aaa;border:1px solid #555;padding:8px 14px;border-radius:3px;cursor:pointer;font-size:12px;text-decoration:none;display:inline-block;">
        Learn More
      </a>
    </div>`;
  document.body.appendChild(banner);
}