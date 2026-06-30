// ============================================================
// SarthakYojana.in — internal-links.js
// Automatically injects "Related Jobs" + "You Might Also Like"
// links at the bottom of every job-detail / item-detail page.
//
// WHY: Internal linking is the #1 free SEO lever. It tells
// Google your pages are connected, helps new pages get crawled
// faster, and keeps visitors on-site longer (lower bounce rate
// = better rankings).
//
// HOW IT WORKS: This runs AFTER fullContent is rendered on
// job-detail.html / admit-card-detail.html / item-detail.html.
// It does NOT require editing job-content.js manually for each
// of your 25+ entries — it works automatically for every job,
// forever, including jobs you add in future.
// ============================================================

function renderInternalLinks(currentId, currentCategory) {
  var container = document.getElementById('fullContent');
  if (!container) return;

  var allJobs    = typeof JOBS_DATA        !== 'undefined' ? JOBS_DATA        : [];
  var allAdmits  = typeof ADMIT_CARDS_DATA !== 'undefined' ? ADMIT_CARDS_DATA : [];
  var allResults = typeof RESULTS_DATA     !== 'undefined' ? RESULTS_DATA     : [];
  var allAnswers = typeof ANSWER_KEYS_DATA !== 'undefined' ? ANSWER_KEYS_DATA : [];

  // ── 1. Same-category related jobs (highest relevance) ──────
  var sameCategory = allJobs.filter(function(j) {
    return j.id !== currentId && j.category === currentCategory;
  }).slice(0, 4);

  // ── 2. Fill remaining slots with other recent jobs ──────────
  var others = allJobs.filter(function(j) {
    return j.id !== currentId && j.category !== currentCategory;
  });
  var related = sameCategory.concat(others).slice(0, 6);

  // ── 3. Cross-content links: relevant admit card / result ────
  var crossLinks = [];
  if (allAdmits.length) {
    var ac = allAdmits[Math.floor(Math.random() * allAdmits.length)];
    crossLinks.push({label: ac.title, href: 'admit-card-detail.html?id=' + ac.id, type: '📋 Admit Card'});
  }
  if (allResults.length) {
    var rs = allResults[Math.floor(Math.random() * allResults.length)];
    crossLinks.push({label: rs.title, href: 'item-detail.html?type=result&id=' + rs.id, type: '🏆 Result'});
  }
  if (allAnswers.length) {
    var ak = allAnswers[Math.floor(Math.random() * allAnswers.length)];
    crossLinks.push({label: ak.title, href: 'item-detail.html?type=answer&id=' + ak.id, type: '📝 Answer Key'});
  }

  if (!related.length && !crossLinks.length) return;

  // ── Build HTML ────────────────────────────────────────────
  var html = '<div class="internal-links-block" style="margin-top:28px;padding-top:20px;border-top:2px dashed #dde3f0;">';

  if (related.length) {
    html += '<h2 style="font-size:20px;color:#1a237e;margin-bottom:12px;">📌 Related Government Jobs 2026</h2>';
    html += '<ul style="list-style:none;padding:0;margin:0 0 18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;">';
    related.forEach(function(j) {
      html += '<li style="background:#f7f9ff;border:1px solid #e4e9f7;border-radius:6px;padding:9px 12px;">' +
        '<a href="job-detail.html?id=' + j.id + '" style="color:#1565c0;font-weight:600;text-decoration:none;font-size:13px;line-height:1.4;display:block;">' +
        j.title +
        '</a></li>';
    });
    html += '</ul>';
  }

  if (crossLinks.length) {
    html += '<h2 style="font-size:20px;color:#1a237e;margin-bottom:12px;">🔗 You Might Also Need</h2>';
    html += '<ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;">';
    crossLinks.forEach(function(c) {
      html += '<li style="background:#fff8f0;border:1px solid #ffe0b2;border-radius:6px;padding:9px 12px;">' +
        '<span style="font-size:10px;color:#e65100;font-weight:700;display:block;margin-bottom:2px;">' + c.type + '</span>' +
        '<a href="' + c.href + '" style="color:#bf360c;font-weight:600;text-decoration:none;font-size:13px;line-height:1.4;">' +
        c.label +
        '</a></li>';
    });
    html += '</ul>';
  }

  html += '</div>';

  container.insertAdjacentHTML('beforeend', html);
}

// ============================================================
// IN-ARTICLE CONTEXTUAL LINKS
// Replaces common phrases inside job-content.js articles with
// links to other relevant pages — WITHOUT editing each article
// by hand. Runs once after content is injected.
// ============================================================
function addContextualLinks() {
  var container = document.getElementById('fullContent');
  if (!container) return;

  var allJobs = typeof JOBS_DATA !== 'undefined' ? JOBS_DATA : [];

  // Map of keyword -> link (extend this list as you add more pages)
  var linkMap = [
    {keyword: 'Sarkari Result',   href: '../pages/results.html',           done: false},
    {keyword: 'Admit Card',       href: '../pages/results.html#admit',     done: false},
    {keyword: 'Answer Key',       href: '../pages/results.html#answer',    done: false},
    {keyword: 'Sarkari Yojana',   href: '../pages/schemes.html',           done: false},
    {keyword: 'Sarkari Naukri',   href: '../pages/jobs.html',              done: false}
  ];

  // Walk through text nodes only (avoid breaking existing <a> tags)
  var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
  var node;
  var nodesToProcess = [];
  while ((node = walker.nextNode())) {
    if (node.parentElement && node.parentElement.tagName !== 'A' &&
        node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
      nodesToProcess.push(node);
    }
  }

  nodesToProcess.forEach(function(textNode) {
    var text = textNode.nodeValue;
    var replaced = false;
    var fragment = document.createDocumentFragment();
    var remaining = text;

    linkMap.forEach(function(item) {
      if (item.done) return; // only link the FIRST occurrence site-wide-ish per article to avoid over-optimization
      var idx = remaining.indexOf(item.keyword);
      if (idx === -1) return;

      var before = remaining.substring(0, idx);
      var after  = remaining.substring(idx + item.keyword.length);

      if (before) fragment.appendChild(document.createTextNode(before));
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.keyword;
      a.style.color = '#1565c0';
      a.style.fontWeight = '600';
      fragment.appendChild(a);

      remaining = after;
      item.done = true;
      replaced = true;
    });

    if (replaced) {
      fragment.appendChild(document.createTextNode(remaining));
      textNode.parentNode.replaceChild(fragment, textNode);
    }
  });
}
