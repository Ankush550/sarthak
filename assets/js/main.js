// ============================================================
// SarthakYojana.in — main.js  (SEO + AdSense + Translate)
// ============================================================

const SITE = {
  name:     'SarthakYojana',
  fullName: 'SarthakYojana.in',
  tagline:  'Ab Har Sarkari Yojana Hogi Aasan',
  url:      'https://sarthakyojana.in',
  waLink:   'https://wa.me/919999999999?text=Send+me+Job+Alerts',
  root: (()=>{
    const p = window.location.pathname;
    return p.includes('/pages/') ? '../' : './';
  })()
};

// ============================================================
// GOOGLE TRANSLATE — called automatically by Google script
// ============================================================
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage:      'en',
    includedLanguages: 'hi,en,ta,te,kn,ml,mr,gu,bn,pa,ur,or,as',
    layout:            google.translate.TranslateElement.InlineLayout.HORIZONTAL,
    autoDisplay:       false
  }, 'google_translate_element');
}

// ============================================================
// RENDER HEADER
// ============================================================
function renderHeader(activeNav) {
  const R = SITE.root;
  const links = [
    {label:'Home',         href: R+'index.html'},
    {label:'Latest Job',   href: R+'pages/jobs.html'},
    {label:'Admit Card',   href: R+'pages/results.html#admit'},
    {label:'Result',       href: R+'pages/results.html'},
    {label:'Answer Key',   href: R+'pages/results.html#answer'},
    {label:'Schemes',      href: R+'pages/schemes.html'},
    {label:'Private Jobs', href: R+'pages/private-jobs.html'},
    {label:'Job Finder',   href: R+'pages/job-finder.html'},
    {label:'Sitemap',      href: R+'pages/sitemap.html'},
  ];

  // ── Site Header ─────────────────────────────────────────
  document.getElementById('site-header').innerHTML =
    '<div class="hdr-inner" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;padding:8px 16px;">' +
      '<div>' +
        '<h1 style="margin:0;"><a href="' + R + 'index.html" style="color:#fff;text-decoration:none;" title="SarthakYojana.in">' + SITE.fullName + '</a></h1>' +
        '<p class="hdr-sub" style="margin:2px 0 0;font-size:13px;color:#ffe082;">' + SITE.tagline + '</p>' +
      '</div>' +
      // Translate widget RIGHT side of header
      '<div style="background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 10px;display:flex;align-items:center;gap:6px;">' +
        '<span style="color:#fff;font-size:11px;font-weight:600;white-space:nowrap;">🌐 भाषा:</span>' +
        '<div id="google_translate_element"></div>' +
      '</div>' +
    '</div>';

  // ── Nav ──────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', 'Main Navigation');
  nav.innerHTML = '<div class="nav-inner">' +
    links.map(function(l) {
      return '<a href="' + l.href + '" class="' + (l.label === activeNav ? 'active' : '') + '" title="' + l.label + ' – SarthakYojana.in">' + l.label + '</a>';
    }).join('') +
    '</div>';
  document.getElementById('site-header').after(nav);

  // ── Tagline bar ───────────────────────────────────────────
  const tag = document.createElement('div');
  tag.className = 'tagline-bar';
  tag.innerHTML = '<b>' + SITE.name + '</b> — India\'s Trusted Site for Sarkari Naukri, Exam Results, Admit Cards, Answer Keys &amp; Government Schemes — Updated Daily';
  nav.after(tag);

  // ── Load Google Translate script ──────────────────────────
  if (!document.getElementById('gt-script')) {
    const s = document.createElement('script');
    s.id  = 'gt-script';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);
  }

  // ── Style: hide Google Translate top banner & branding ────
  if (!document.getElementById('gt-style')) {
    const style = document.createElement('style');
    style.id = 'gt-style';
    style.textContent =
      '.goog-te-banner-frame { display:none !important; }' +
      'body { top: 0 !important; }' +
      '.goog-te-gadget { font-size:0 !important; }' +
      '.goog-te-gadget .goog-te-combo { font-size:12px !important; padding:3px 6px; border-radius:4px; border:1px solid rgba(255,255,255,0.4); background:rgba(255,255,255,0.9); color:#1a237e; font-weight:600; cursor:pointer; outline:none; }' +
      '.goog-te-gadget span { display:none !important; }' +
      '#google_translate_element { min-width:130px; }';
    document.head.appendChild(style);
  }

  // ── WebSite schema ─────────────────────────────────────────
  if (!document.getElementById('ws-schema')) {
    const s = document.createElement('script');
    s.id   = 'ws-schema';
    s.type = 'application/ld+json';
    s.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type":    "WebSite",
      "name":     SITE.fullName,
      "url":      SITE.url,
      "potentialAction": {
        "@type":       "SearchAction",
        "target":      SITE.url + "/pages/search.html?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(s);
  }

  // ── Organization schema ────────────────────────────────────
  if (!document.getElementById('org-schema')) {
    const s = document.createElement('script');
    s.id   = 'org-schema';
    s.type = 'application/ld+json';
    s.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type":    "Organization",
      "name":     SITE.fullName,
      "url":      SITE.url,
      "logo":     SITE.url + "/assets/logo.png",
      "sameAs":   [SITE.url]
    });
    document.head.appendChild(s);
  }
}

// ============================================================
// RENDER TICKER
// ============================================================
function renderTicker() {
  var jobs    = typeof JOBS_DATA        !== 'undefined' ? JOBS_DATA        : [];
  var results = typeof RESULTS_DATA     !== 'undefined' ? RESULTS_DATA     : [];
  var admits  = typeof ADMIT_CARDS_DATA !== 'undefined' ? ADMIT_CARDS_DATA : [];

  var items =
    jobs.slice(0,6).map(function(j){ return j.title + ' | '; }).join('') +
    admits.slice(0,4).map(function(a){ return a.title + ' | '; }).join('') +
    results.slice(0,2).map(function(r){ return r.title + ' | '; }).join('');

  var el = document.getElementById('ticker-wrap');
  if (!el) return;
  el.innerHTML =
    '<div class="ticker-inner">' +
      '<span class="ticker-label">NEW</span>' +
      '<div class="ticker-scroll"><span>' +
        (items || 'SarthakYojana.in – Latest Sarkari Naukri, Result, Admit Card Updates') +
      '</span></div>' +
    '</div>';
}

// ============================================================
// RENDER FOOTER
// ============================================================
function renderFooter() {
  var R = SITE.root;
  document.getElementById('site-footer').innerHTML =
  '<div class="footer-main">' +

    '<div class="footer-col">' +
      '<h3>' + SITE.fullName + '</h3>' +
      '<p style="font-size:11.5px;color:#777;line-height:1.7;">India\'s trusted source for <strong>Sarkari Naukri 2026</strong>, Exam Results, Admit Cards, Answer Keys &amp; Government Schemes since 2022. Updated daily.</p>' +
    '</div>' +

    '<div class="footer-col">' +
      '<h3>Govt Jobs 2026</h3>' +
      '<ul>' +
        '<li><a href="' + R + 'pages/jobs.html" title="Latest Sarkari Naukri 2026">Latest Sarkari Naukri</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=Defence">Defence Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=Railway">Railway Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=Banking">Bank Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=SSC">SSC Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=Police">Police Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=PSU">PSU Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/jobs.html?cat=Teaching">Teaching Jobs 2026</a></li>' +
      '</ul>' +
    '</div>' +

    '<div class="footer-col">' +
      '<h3>Results &amp; Admit Cards</h3>' +
      '<ul>' +
        '<li><a href="' + R + 'pages/results.html">Sarkari Result 2026</a></li>' +
        '<li><a href="' + R + 'pages/results.html#admit">Admit Card Download</a></li>' +
        '<li><a href="' + R + 'pages/results.html#answer">Answer Key 2026</a></li>' +
        '<li><a href="' + R + 'pages/results.html">UPSC Result 2026</a></li>' +
        '<li><a href="' + R + 'pages/results.html">SSC Result 2026</a></li>' +
        '<li><a href="' + R + 'pages/results.html">RRB Result 2026</a></li>' +
        '<li><a href="' + R + 'pages/results.html">IBPS Result 2026</a></li>' +
      '</ul>' +
    '</div>' +

    '<div class="footer-col">' +
      '<h3>Govt Schemes</h3>' +
      '<ul>' +
        '<li><a href="' + R + 'pages/schemes.html">Sarkari Yojana 2026</a></li>' +
        '<li><a href="' + R + 'pages/schemes.html?type=Central">Central Govt Schemes</a></li>' +
        '<li><a href="' + R + 'pages/schemes.html?type=State">State Govt Schemes</a></li>' +
        '<li><a href="' + R + 'pages/private-jobs.html">Private Jobs 2026</a></li>' +
        '<li><a href="' + R + 'pages/us-companies-india-jobs.html">US MNC Jobs India</a></li>' +
        '<li><a href="' + R + 'pages/nri-jobs.html">NRI Jobs 2026</a></li>' +
      '</ul>' +
    '</div>' +

    '<div class="footer-col">' +
      '<h3>Quick Links</h3>' +
      '<ul>' +
        '<li><a href="' + R + 'pages/job-finder.html">Job Finder</a></li>' +
        '<li><a href="' + R + 'pages/search.html">Search Jobs</a></li>' +
        '<li><a href="' + R + 'pages/about-us.html">About Us</a></li>' +
        '<li><a href="' + R + 'pages/contact.html">Contact Us</a></li>' +
        '<li><a href="' + R + 'pages/privacy-policy.html">Privacy Policy</a></li>' +
        '<li><a href="' + R + 'pages/disclaimer.html">Disclaimer</a></li>' +
        '<li><a href="' + R + 'pages/terms-conditions.html">Terms &amp; Conditions</a></li>' +
        '<li><a href="' + R + 'pages/sitemap.html">Sitemap</a></li>' +
      '</ul>' +
    '</div>' +

  '</div>' +
  '<div class="footer-bottom">' +
    '<a href="' + R + 'index.html">Home</a> ' +
    '<a href="' + R + 'pages/jobs.html">Sarkari Naukri</a> ' +
    '<a href="' + R + 'pages/results.html">Sarkari Result</a> ' +
    '<a href="' + R + 'pages/results.html#admit">Admit Card</a> ' +
    '<a href="' + R + 'pages/results.html#answer">Answer Key</a> ' +
    '<a href="' + R + 'pages/schemes.html">Sarkari Yojana</a> ' +
    '<a href="' + R + 'pages/sitemap.html">Sitemap</a> ' +
    '<a href="' + R + 'pages/about-us.html">About Us</a> ' +
    '<a href="' + R + 'pages/contact.html">Contact</a>' +
    '<br style="margin-bottom:6px;">' +
    '&copy; 2026 ' + SITE.fullName + ' — All Rights Reserved | ' +
    '<a href="' + R + 'pages/jobs.html" style="color:#aaa;">Sarkari Naukri</a> | ' +
    '<a href="' + R + 'pages/results.html" style="color:#aaa;">Sarkari Result</a> | ' +
    '<a href="' + R + 'pages/schemes.html" style="color:#aaa;">Sarkari Yojana</a>' +
  '</div>';
}

// ============================================================
// SEC BOX
// ============================================================
function secBox(title, items, viewAllHref) {
  var rows = items.slice(0, 10).map(function(item) {
    var cleanLabel = item.label.replace(/<[^>]*>/g, '');
    return '<li><a href="' + item.href + '" title="' + cleanLabel + '">' +
      item.label + (item.isNew ? '<span class="new-tag">NEW</span>' : '') +
      '</a></li>';
  }).join('');
  return '<div class="sec-box">' +
    '<div class="sec-hdr"><h2>' + title + '</h2></div>' +
    '<ul class="sec-list">' + (rows || '<li style="color:#888;padding:6px 0;">Coming soon\u2026</li>') + '</ul>' +
    '<a href="' + viewAllHref + '" class="view-more">View More &raquo;</a>' +
    '</div>';
}

// ============================================================
// JOB POSTING SCHEMA
// ============================================================
function buildJobSchema(job) {
  var validEmpTypes = ['FULL_TIME','PART_TIME','CONTRACTOR','TEMPORARY','INTERN','VOLUNTEER','PER_DIEM','OTHER'];
  return {
    "@context": "https://schema.org/",
    "@type":    "JobPosting",
    "title":    job.title,
    "description": job.description || (job.title + ' recruitment 2026 by ' + job.organization + '. Apply online before last date.'),
    "identifier": {"@type":"PropertyValue","name":job.organization,"value":job.id},
    "datePosted":   job.datePosted   || "2026-01-01",
    "validThrough": job.validThrough || (job.lastDate ? job.lastDate + 'T23:59:00+05:30' : "2026-12-31T23:59:00+05:30"),
    "employmentType": validEmpTypes.includes(job.employmentType) ? job.employmentType : "FULL_TIME",
    "hiringOrganization": {
      "@type":  "Organization",
      "name":   job.organization,
      "sameAs": job.orgWebsite || job.officialNotification || "",
      "logo":   {"@type":"ImageObject","url": SITE.url + "/assets/logo.png"}
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type":           "PostalAddress",
        "addressLocality": job.addressLocality || job.location || "India",
        "addressRegion":   job.addressRegion   || "Delhi",
        "addressCountry":  "IN"
      }
    },
    "applicantLocationRequirements": {"@type":"Country","name":"India"},
    "baseSalary": {
      "@type":    "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type":    "QuantitativeValue",
        "minValue": job.salaryMin || 20000,
        "maxValue": job.salaryMax || 100000,
        "unitText": "MONTH"
      }
    },
    "totalJobOpenings": parseInt(job.totalPosts || job.totalVacancies) || undefined,
    "directApply": false
  };
}

// ============================================================
// SEARCH
// ============================================================
function doSearch(q) {
  if (!q) return [];
  var lq = q.toLowerCase();
  var data = typeof JOBS_DATA !== 'undefined' ? JOBS_DATA : [];
  return data.filter(function(j) {
    return j.title.toLowerCase().includes(lq) ||
      j.organization.toLowerCase().includes(lq) ||
      (j.category      || '').toLowerCase().includes(lq) ||
      (j.qualification || '').toLowerCase().includes(lq) ||
      (j.location      || '').toLowerCase().includes(lq);
  });
}

// ============================================================
// COOKIE CONSENT
// ============================================================
function renderCookieConsent() {
  if (localStorage.getItem('cookieConsent') === 'accepted') return;
  var banner = document.createElement('div');
  banner.id = 'cookie-consent';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;color:#ccc;padding:12px 16px;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:12px;font-family:Arial,sans-serif;';
  banner.innerHTML =
    '<div style="flex:1;min-width:200px;line-height:1.6;">' +
      '<strong style="color:#fff;">🍪 We use cookies</strong> — SarthakYojana.in uses cookies and Google AdSense to serve relevant ads and improve your experience. By continuing, you agree to our ' +
      '<a href="' + SITE.root + 'pages/privacy-policy.html" style="color:#f9a825;">Privacy Policy</a>.' +
    '</div>' +
    '<div style="display:flex;gap:8px;flex-shrink:0;">' +
      '<button onclick="document.getElementById(\'cookie-consent\').style.display=\'none\';localStorage.setItem(\'cookieConsent\',\'accepted\');" ' +
        'style="background:#c0392b;color:#fff;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:700;">' +
        'Accept All' +
      '</button>' +
      '<a href="' + SITE.root + 'pages/privacy-policy.html" ' +
        'style="background:transparent;color:#aaa;border:1px solid #555;padding:8px 14px;border-radius:4px;font-size:12px;text-decoration:none;display:inline-block;">' +
        'Learn More' +
      '</a>' +
    '</div>';
  document.body.appendChild(banner);
}
