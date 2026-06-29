// ============================================================
// SarthakYojana.in — main.js  (SEO + AdSense + Hi/En Toggle)
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

  // ── Toggle button CSS ─────────────────────────────────────
  if (!document.getElementById('lang-style')) {
    const st = document.createElement('style');
    st.id = 'lang-style';
    st.textContent =
      '#lang-toggle-wrap{display:flex;align-items:center;gap:4px;background:rgba(0,0,0,0.25);border-radius:30px;padding:4px 6px;}' +
      '.lang-btn{' +
        'padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;' +
        'border:none;cursor:pointer;transition:all 0.2s;letter-spacing:0.3px;' +
      '}' +
      '.lang-btn.active{background:#fff;color:#1a237e;box-shadow:0 1px 4px rgba(0,0,0,0.2);}' +
      '.lang-btn.inactive{background:transparent;color:rgba(255,255,255,0.75);}' +
      '.lang-btn.inactive:hover{background:rgba(255,255,255,0.15);color:#fff;}';
    document.head.appendChild(st);
  }

  // ── Header ────────────────────────────────────────────────
  document.getElementById('site-header').innerHTML =
    '<div class="hdr-inner" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:10px 20px;">' +
      '<div>' +
        '<h1 style="margin:0;font-size:clamp(20px,4vw,30px);">' +
          '<a href="'+R+'index.html" style="color:#fff;text-decoration:none;">'+SITE.fullName+'</a>' +
        '</h1>' +
        '<p style="margin:2px 0 0;font-size:13px;color:#ffe082;">'+SITE.tagline+'</p>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;">' +
        '<span style="color:rgba(255,255,255,0.7);font-size:10px;font-weight:600;letter-spacing:0.5px;">SELECT LANGUAGE</span>' +
        '<div id="lang-toggle-wrap">' +
          '<button class="lang-btn active" id="btn-hi" onclick="setLang(\'hi\')">🇮🇳 हिंदी</button>' +
          '<button class="lang-btn inactive" id="btn-en" onclick="setLang(\'en\')">🇬🇧 English</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  // ── Nav ──────────────────────────────────────────────────
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', 'Main Navigation');
  nav.innerHTML = '<div class="nav-inner">' +
    links.map(function(l) {
      return '<a href="'+l.href+'" class="'+(l.label===activeNav?'active':'')+'" title="'+l.label+'">'+l.label+'</a>';
    }).join('') + '</div>';
  document.getElementById('site-header').after(nav);

  // ── Tagline bar ───────────────────────────────────────────
  const tag = document.createElement('div');
  tag.className = 'tagline-bar';
  tag.innerHTML = '<b>'+SITE.name+'</b> — India\'s Trusted Site for Sarkari Naukri, Exam Results, Admit Cards, Answer Keys &amp; Government Schemes — Updated Daily';
  nav.after(tag);

  // ── Restore saved language preference ────────────────────
  const savedLang = localStorage.getItem('sy-lang') || 'hi';
  setTimeout(function(){ setLang(savedLang, true); }, 50);

  // ── Schemas ───────────────────────────────────────────────
  if (!document.getElementById('ws-schema')) {
    const s = document.createElement('script');
    s.id='ws-schema'; s.type='application/ld+json';
    s.text=JSON.stringify({"@context":"https://schema.org","@type":"WebSite","name":SITE.fullName,"url":SITE.url,"potentialAction":{"@type":"SearchAction","target":SITE.url+"/pages/search.html?q={search_term_string}","query-input":"required name=search_term_string"}});
    document.head.appendChild(s);
  }
  if (!document.getElementById('org-schema')) {
    const s = document.createElement('script');
    s.id='org-schema'; s.type='application/ld+json';
    s.text=JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":SITE.fullName,"url":SITE.url,"logo":SITE.url+"/assets/logo.png","sameAs":[SITE.url]});
    document.head.appendChild(s);
  }
}

// ============================================================
// SET LANGUAGE — Hindi / English toggle
// ============================================================
function setLang(lang, silent) {
  // Update buttons
  var btnHi = document.getElementById('btn-hi');
  var btnEn = document.getElementById('btn-en');
  if (btnHi && btnEn) {
    if (lang === 'hi') {
      btnHi.className = 'lang-btn active';
      btnEn.className = 'lang-btn inactive';
    } else {
      btnHi.className = 'lang-btn inactive';
      btnEn.className = 'lang-btn active';
    }
  }
  localStorage.setItem('sy-lang', lang);

  // Load Google Translate script once
  if (!document.getElementById('gt-script')) {
    window._gtLang = lang;
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'hi',
        includedLanguages: 'hi,en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'gt-hidden-div');
      // Trigger translation after init
      setTimeout(function(){ _triggerTranslate(window._gtLang); }, 600);
    };
    // Hidden div for widget
    if (!document.getElementById('gt-hidden-div')) {
      var d = document.createElement('div');
      d.id = 'gt-hidden-div';
      d.style.display = 'none';
      document.body.appendChild(d);
    }
    var s = document.createElement('script');
    s.id = 'gt-script';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);
  } else {
    // Script already loaded — trigger directly
    if (!silent) {
      window._gtLang = lang;
      setTimeout(function(){ _triggerTranslate(lang); }, 100);
    }
  }
}

// ── Internal: trigger Google Translate combo change ──────────
function _triggerTranslate(lang) {
  var combo = document.querySelector('.goog-te-combo');
  if (!combo) return;
  combo.value = (lang === 'en') ? 'en' : 'hi';
  combo.dispatchEvent(new Event('change'));
}

// ============================================================
// RENDER TICKER
// ============================================================
function renderTicker() {
  var jobs    = typeof JOBS_DATA        !== 'undefined' ? JOBS_DATA        : [];
  var results = typeof RESULTS_DATA     !== 'undefined' ? RESULTS_DATA     : [];
  var admits  = typeof ADMIT_CARDS_DATA !== 'undefined' ? ADMIT_CARDS_DATA : [];
  var items =
    jobs.slice(0,6).map(function(j){ return j.title+' | '; }).join('')+
    admits.slice(0,4).map(function(a){ return a.title+' | '; }).join('')+
    results.slice(0,2).map(function(r){ return r.title+' | '; }).join('');
  var el = document.getElementById('ticker-wrap');
  if (!el) return;
  el.innerHTML='<div class="ticker-inner"><span class="ticker-label">NEW</span><div class="ticker-scroll"><span>'+(items||'SarthakYojana.in – Latest Sarkari Naukri, Result, Admit Card Updates')+'</span></div></div>';
}

// ============================================================
// RENDER FOOTER
// ============================================================
function renderFooter() {
  var R = SITE.root;
  document.getElementById('site-footer').innerHTML=
  '<div class="footer-main">'+
    '<div class="footer-col"><h3>'+SITE.fullName+'</h3><p style="font-size:11.5px;color:#777;line-height:1.7;">India\'s trusted source for <strong>Sarkari Naukri 2026</strong>, Exam Results, Admit Cards, Answer Keys &amp; Govt Schemes since 2022.</p></div>'+
    '<div class="footer-col"><h3>Govt Jobs 2026</h3><ul>'+
      '<li><a href="'+R+'pages/jobs.html">Latest Sarkari Naukri</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=Defence">Defence Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=Railway">Railway Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=Banking">Bank Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=SSC">SSC Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=Police">Police Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=PSU">PSU Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/jobs.html?cat=Teaching">Teaching Jobs 2026</a></li>'+
    '</ul></div>'+
    '<div class="footer-col"><h3>Results &amp; Admit Cards</h3><ul>'+
      '<li><a href="'+R+'pages/results.html">Sarkari Result 2026</a></li>'+
      '<li><a href="'+R+'pages/results.html#admit">Admit Card Download</a></li>'+
      '<li><a href="'+R+'pages/results.html#answer">Answer Key 2026</a></li>'+
      '<li><a href="'+R+'pages/results.html">UPSC Result 2026</a></li>'+
      '<li><a href="'+R+'pages/results.html">SSC Result 2026</a></li>'+
      '<li><a href="'+R+'pages/results.html">RRB Result 2026</a></li>'+
      '<li><a href="'+R+'pages/results.html">IBPS Result 2026</a></li>'+
    '</ul></div>'+
    '<div class="footer-col"><h3>Govt Schemes</h3><ul>'+
      '<li><a href="'+R+'pages/schemes.html">Sarkari Yojana 2026</a></li>'+
      '<li><a href="'+R+'pages/schemes.html?type=Central">Central Govt Schemes</a></li>'+
      '<li><a href="'+R+'pages/schemes.html?type=State">State Govt Schemes</a></li>'+
      '<li><a href="'+R+'pages/private-jobs.html">Private Jobs 2026</a></li>'+
      '<li><a href="'+R+'pages/us-companies-india-jobs.html">US MNC Jobs India</a></li>'+
      '<li><a href="'+R+'pages/nri-jobs.html">NRI Jobs 2026</a></li>'+
    '</ul></div>'+
    '<div class="footer-col"><h3>Quick Links</h3><ul>'+
      '<li><a href="'+R+'pages/job-finder.html">Job Finder</a></li>'+
      '<li><a href="'+R+'pages/search.html">Search Jobs</a></li>'+
      '<li><a href="'+R+'pages/about-us.html">About Us</a></li>'+
      '<li><a href="'+R+'pages/contact.html">Contact Us</a></li>'+
      '<li><a href="'+R+'pages/privacy-policy.html">Privacy Policy</a></li>'+
      '<li><a href="'+R+'pages/disclaimer.html">Disclaimer</a></li>'+
      '<li><a href="'+R+'pages/terms-conditions.html">Terms &amp; Conditions</a></li>'+
      '<li><a href="'+R+'pages/sitemap.html">Sitemap</a></li>'+
    '</ul></div>'+
  '</div>'+
  '<div class="footer-bottom">'+
    '<a href="'+R+'index.html">Home</a> <a href="'+R+'pages/jobs.html">Sarkari Naukri</a> '+
    '<a href="'+R+'pages/results.html">Sarkari Result</a> <a href="'+R+'pages/results.html#admit">Admit Card</a> '+
    '<a href="'+R+'pages/results.html#answer">Answer Key</a> <a href="'+R+'pages/schemes.html">Sarkari Yojana</a> '+
    '<a href="'+R+'pages/sitemap.html">Sitemap</a> <a href="'+R+'pages/about-us.html">About Us</a> '+
    '<a href="'+R+'pages/contact.html">Contact</a><br style="margin-bottom:6px;">'+
    '&copy; 2026 '+SITE.fullName+' — All Rights Reserved | '+
    '<a href="'+R+'pages/jobs.html" style="color:#aaa;">Sarkari Naukri</a> | '+
    '<a href="'+R+'pages/results.html" style="color:#aaa;">Sarkari Result</a> | '+
    '<a href="'+R+'pages/schemes.html" style="color:#aaa;">Sarkari Yojana</a>'+
  '</div>';
}

// ============================================================
// SEC BOX
// ============================================================
function secBox(title, items, viewAllHref) {
  var rows=items.slice(0,10).map(function(item){
    var clean=item.label.replace(/<[^>]*>/g,'');
    return '<li><a href="'+item.href+'" title="'+clean+'">'+item.label+(item.isNew?'<span class="new-tag">NEW</span>':'')+'</a></li>';
  }).join('');
  return '<div class="sec-box"><div class="sec-hdr"><h2>'+title+'</h2></div><ul class="sec-list">'+(rows||'<li style="color:#888;padding:6px 0;">Coming soon\u2026</li>')+'</ul><a href="'+viewAllHref+'" class="view-more">View More &raquo;</a></div>';
}

// ============================================================
// JOB SCHEMA
// ============================================================
function buildJobSchema(job) {
  var v=['FULL_TIME','PART_TIME','CONTRACTOR','TEMPORARY','INTERN','VOLUNTEER','PER_DIEM','OTHER'];
  return {"@context":"https://schema.org/","@type":"JobPosting","title":job.title,"description":job.description||(job.title+' recruitment 2026 by '+job.organization+'.'),"identifier":{"@type":"PropertyValue","name":job.organization,"value":job.id},"datePosted":job.datePosted||"2026-01-01","validThrough":job.validThrough||(job.lastDate?job.lastDate+'T23:59:00+05:30':"2026-12-31T23:59:00+05:30"),"employmentType":v.includes(job.employmentType)?job.employmentType:"FULL_TIME","hiringOrganization":{"@type":"Organization","name":job.organization,"sameAs":job.orgWebsite||"","logo":{"@type":"ImageObject","url":SITE.url+"/assets/logo.png"}},"jobLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":job.location||"India","addressRegion":job.addressRegion||"Delhi","addressCountry":"IN"}},"applicantLocationRequirements":{"@type":"Country","name":"India"},"baseSalary":{"@type":"MonetaryAmount","currency":"INR","value":{"@type":"QuantitativeValue","minValue":job.salaryMin||20000,"maxValue":job.salaryMax||100000,"unitText":"MONTH"}},"totalJobOpenings":parseInt(job.totalPosts||job.totalVacancies)||undefined,"directApply":false};
}

// ============================================================
// SEARCH
// ============================================================
function doSearch(q) {
  if (!q) return [];
  var lq=q.toLowerCase(),data=typeof JOBS_DATA!=='undefined'?JOBS_DATA:[];
  return data.filter(function(j){return j.title.toLowerCase().includes(lq)||j.organization.toLowerCase().includes(lq)||(j.category||'').toLowerCase().includes(lq)||(j.qualification||'').toLowerCase().includes(lq)||(j.location||'').toLowerCase().includes(lq);});
}

// ============================================================
// COOKIE CONSENT
// ============================================================
function renderCookieConsent() {
  if (localStorage.getItem('cookieConsent')==='accepted') return;
  var b=document.createElement('div');
  b.id='cookie-consent';
  b.style.cssText='position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;color:#ccc;padding:12px 16px;z-index:9999;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:12px;';
  b.innerHTML='<div style="flex:1;min-width:200px;line-height:1.6;"><strong style="color:#fff;">🍪 We use cookies</strong> — SarthakYojana.in uses cookies and Google AdSense. By continuing, you agree to our <a href="'+SITE.root+'pages/privacy-policy.html" style="color:#f9a825;">Privacy Policy</a>.</div><div style="display:flex;gap:8px;flex-shrink:0;"><button onclick="document.getElementById(\'cookie-consent\').style.display=\'none\';localStorage.setItem(\'cookieConsent\',\'accepted\');" style="background:#c0392b;color:#fff;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:700;">Accept All</button><a href="'+SITE.root+'pages/privacy-policy.html" style="color:#aaa;border:1px solid #555;padding:8px 14px;border-radius:4px;font-size:12px;text-decoration:none;display:inline-block;">Learn More</a></div>';
  document.body.appendChild(b);
}
