// SarthakYojana.in – Results Page JS

// ── Mobile menu toggle ──────────────────────────────
function toggleMenu() {
  var nav = document.getElementById('mainNav');
  var btn = document.querySelector('.hamburger');
  if (nav) {
    nav.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  }
}

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

function smoothScroll(id) {
  var el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
}

function toggleStep(i) {
  var el = document.getElementById('step-' + i);
  if (el) el.classList.toggle('open');
}

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

function cookieAccept() {
  localStorage.setItem('cookieConsent', 'accepted');
  var b = document.getElementById('cookieBanner'); if (b) b.style.display = 'none';
}
function cookieDecline() {
  localStorage.setItem('cookieConsent', 'declined');
  var b = document.getElementById('cookieBanner'); if (b) b.style.display = 'none';
}

renderHeader('Result');
renderTicker();
renderFooter();
renderCookieConsent();

// Safe data access
const _results = typeof RESULTS_DATA     !== 'undefined' ? RESULTS_DATA     : [];
const _admits  = typeof ADMIT_CARDS_DATA !== 'undefined' ? ADMIT_CARDS_DATA : [];
const _answers = typeof ANSWER_KEYS_DATA !== 'undefined' ? ANSWER_KEYS_DATA : [];

// ── Sidebar lists ─────────────────────────────────────
const rList = document.getElementById('resultsList');
if (rList) rList.innerHTML = _results.map(r=>
  `<li><a href="item-detail.html?type=result&id=${r.id}">${r.title}${r.isNew?'<span class="new-tag">NEW</span>':''}</a></li>`).join('') || '<li>No results yet</li>';

const aList = document.getElementById('admitList');
if (aList) aList.innerHTML = _admits.map(a=>
  `<li><a href="admit-card-detail.html?id=${a.id}">${a.title}${a.isNew?'<span class="new-tag">NEW</span>':''}</a></li>`).join('') || '<li>No admit cards yet</li>';

const anList = document.getElementById('answerList');
if (anList) anList.innerHTML = _answers.map(a=>
  `<li><a href="item-detail.html?type=answer&id=${a.id}">${a.title}${a.isNew?'<span class="new-tag">NEW</span>':''}</a></li>`).join('') || '<li>No answer keys yet</li>';

// ── Main tables ───────────────────────────────────────
const rTable = document.getElementById('resultsTable');
if (rTable) rTable.innerHTML = _results.length
  ? _results.map((r,i)=>
    `<tr><td>${i+1}</td><td><a href="item-detail.html?type=result&id=${r.id}" style="color:#c0392b;">${r.title}</a></td><td>${r.organization||'—'}</td><td>${r.date||'—'}</td><td><a href="item-detail.html?type=result&id=${r.id}" class="apply-small">Check</a></td></tr>`).join('')
  : `<tr><td colspan="5" style="text-align:center;color:#888;padding:16px;">No results added yet. Check back soon.</td></tr>`;

const aTable = document.getElementById('admitTable');
if (aTable) aTable.innerHTML = _admits.length
  ? _admits.map((a,i)=>
    `<tr><td>${i+1}</td><td><a href="admit-card-detail.html?id=${a.id}" style="color:#c0392b;">${a.title}</a></td><td>${a.organization||'—'}</td><td>${a.examDate||'—'}</td><td><a href="admit-card-detail.html?id=${a.id}" class="apply-small">Download</a></td></tr>`).join('')
  : `<tr><td colspan="5" style="text-align:center;color:#888;padding:16px;">No admit cards added yet. Check back soon.</td></tr>`;

const anTable = document.getElementById('answerTable');
if (anTable) anTable.innerHTML = _answers.length
  ? _answers.map((a,i)=>
    `<tr><td>${i+1}</td><td><a href="item-detail.html?type=answer&id=${a.id}" style="color:#c0392b;">${a.title}</a></td><td>${a.organization||'—'}</td><td>${a.date||'—'}</td><td><a href="item-detail.html?type=answer&id=${a.id}" class="apply-small">Download</a></td></tr>`).join('')
  : `<tr><td colspan="5" style="text-align:center;color:#888;padding:16px;">No answer keys added yet. Check back soon.</td></tr>`;
