// SarthakYojana.in – Main JS (Optimized)

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
  var ids = ['searchInput','sideSearch','mainSearch','mainSearchHeader'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el && el.value.trim()) { searchFrom(ids[i]); return; }
  }
}

// ── Enter key on search inputs ───────────────────────
(function() {
  function bindSearch() {
    ['searchInput','sideSearch','mainSearch','mainSearchHeader'].forEach(function(id) {
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
