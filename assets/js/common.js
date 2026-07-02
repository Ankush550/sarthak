// SarthakYojana.in – Main JS (Optimized)

// ── Robust date parser (fixes false "Closed/Expired" badge bug) ──────
// Handles: "21 July 2026", "21 Jul 2026", "2026-07-21" (ISO),
// "21-07-2026" / "21/07/2026" (DD-MM-YYYY, Indian convention).
// Returns a Date object at local midnight, or null if unparseable.
function parseFlexibleDate(str) {
  if (!str) return null;
  str = String(str).trim();

  var MONTHS = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};

  // ISO: YYYY-MM-DD
  var m = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    var d = new Date(parseInt(m[1]), parseInt(m[2]) - 1, parseInt(m[3]));
    return isNaN(d.getTime()) ? null : d;
  }

  // DD-MM-YYYY or DD/MM/YYYY (Indian convention — day first, never month-first)
  m = str.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (m) {
    var day = parseInt(m[1]), mon = parseInt(m[2]) - 1, yr = parseInt(m[3]);
    var d2 = new Date(yr, mon, day);
    return isNaN(d2.getTime()) ? null : d2;
  }

  // "21 July 2026" or "21 Jul 2026" (day, month name, year — any order of name)
  m = str.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (m) {
    var mi = MONTHS[m[2].slice(0,3).toLowerCase()];
    if (mi !== undefined) {
      var d3 = new Date(parseInt(m[3]), mi, parseInt(m[1]));
      return isNaN(d3.getTime()) ? null : d3;
    }
  }

  // "July 21, 2026" style — safe to let native parser handle (unambiguous, month-first)
  m = str.match(/^[A-Za-z]+\s+\d{1,2},?\s+\d{4}$/);
  if (m) {
    var d4 = new Date(str);
    return isNaN(d4.getTime()) ? null : d4;
  }

  return null;
}

// ── Resolve a job/item's display status without wrongly showing
//    "Expired" just because a date failed to parse or is stale.
//    Priority: explicit non-ambiguous "closed/expired" status wins.
//    Otherwise a valid parsed date drives open/closing_soon/expired.
//    If the date can't be parsed OR is stale but the editor explicitly
//    marked it open, we trust the editor rather than silently hiding
//    a live job listing. ──────────────────────────────────────────
function resolveJobStatus(j) {
  var explicit = (j.status || '').toString().trim().toLowerCase();
  var isExplicitClosed = explicit === 'closed' || explicit === 'expired';
  if (isExplicitClosed) return 'expired';

  var raw = j.lastDate || j.lastDateDisplay;
  var d = parseFlexibleDate(raw);

  if (d) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var diff = Math.ceil((d - today) / 86400000);
    if (diff > 7) return 'open';
    if (diff >= 0) return 'closing_soon';
    // Date has passed — but if the editor explicitly says it's still
    // open, trust that instead of silently marking it Expired.
    if (explicit === 'open' || explicit === 'closing_soon') return 'closing_soon';
    return 'expired';
  }

  // Date unparseable — fall back fully to explicit status if usable,
  // otherwise default to "open" rather than incorrectly showing Closed.
  if (explicit === 'open' || explicit === 'closing_soon') return explicit;
  return 'open';
}

// ── Mobile menu toggle ──────────────────────────────
function toggleMenu() {
  var nav = document.getElementById('mainNav');
  var btn = document.querySelector('.hamburger');
  if (nav) {
    nav.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  }
}

// Close menu on outside click
document.addEventListener('click', function(e) {
  var nav = document.getElementById('mainNav');
  var btn = document.querySelector('.hamburger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && btn && !btn.contains(e.target)) {
    nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});

// ── Search ───────────────────────────────────────────
function searchFrom(inputId) {
  var el = document.getElementById(inputId);
  if (!el) return;
  var q = el.value.trim();
  if (!q) { el.focus(); return; }
  var isSubPage = window.location.pathname.indexOf('/pages/') !== -1;
  var url = isSubPage ? 'search.html?q=' : 'pages/search.html?q=';
  window.location.href = url + encodeURIComponent(q);
}

function doSearch() {
  var ids = ['searchInput','sideSearch','mainSearch'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el && el.value.trim()) { searchFrom(ids[i]); return; }
  }
}

// ── Enter key on search inputs ───────────────────────
(function() {
  function bindSearch() {
    ['searchInput','sideSearch','mainSearch'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el && !el._searchBound) {
        el._searchBound = true;
        el.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.keyCode === 13) { searchFrom(id); }
        });
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindSearch);
  } else { bindSearch(); }
})();

// ── Smooth scroll ─────────────────────────────────────
function smoothScroll(id) {
  var el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
}

// ── Accordion steps ───────────────────────────────────
function toggleStep(i) {
  var el = document.getElementById('step-' + i);
  if (el) el.classList.toggle('open');
}

// ── Auto date (Hindi) ─────────────────────────────────
(function() {
  function updateDate() {
    var days   = ['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'];
    var months = ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'];
    var d = new Date();
    var str = days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    document.querySelectorAll('.auto-date').forEach(function(el) { el.textContent = '📅 ' + str; });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', updateDate); }
  else { updateDate(); }
})();

// ── Cookie consent ────────────────────────────────────
function cookieAccept() {
  localStorage.setItem('cookieConsent', 'accepted');
  var b = document.getElementById('cookieBanner'); if (b) b.style.display = 'none';
}
function cookieDecline() {
  localStorage.setItem('cookieConsent', 'declined');
  var b = document.getElementById('cookieBanner'); if (b) b.style.display = 'none';
}
