// Sarthak Yojana – Main JS

// ── Mobile menu ──
function toggleMenu() {
  var nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('open');
}

// ── Search ──
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
  var ids = ['searchInput', 'sideSearch', 'mainSearch'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el && el.value.trim()) {
      var isSubPage = window.location.pathname.indexOf('/pages/') !== -1;
      var url = isSubPage ? 'search.html?q=' : 'pages/search.html?q=';
      window.location.href = url + encodeURIComponent(el.value.trim());
      return;
    }
  }
}

// ── Enter key on all search inputs ──
window.onload = function() {
  var ids = ['searchInput', 'sideSearch', 'mainSearch'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.onkeypress = function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          searchFrom(id);
        }
      };
    }
  });
};

// ── Smooth scroll ──
function smoothScroll(id) {
  var el = document.getElementById(id);
  if (el) {
    var top = el.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}

// ── Accordion steps ──
function toggleStep(i) {
  var el = document.getElementById('step-' + i);
  if (el) el.classList.toggle('open');
}
