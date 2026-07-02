// ============================================================
// SarthakYojana.in — sidebar-widgets.js
// Generates Left Sidebar (SEO/Navigation) + Right Sidebar (Earning)
// SIMPLE VERSION — only links to pages that already exist
// ============================================================

// ============================================================
// LEFT SIDEBAR — SEO + Navigation focused
// ============================================================
function renderLeftSidebar() {
  var el = document.getElementById('left-sidebar');
  if (!el) return;

  var jobs = typeof JOBS_DATA !== 'undefined' ? JOBS_DATA : [];
  var R = (typeof SITE !== 'undefined') ? SITE.root : './';

  var html = '';

  // ── Widget 1: Last Date Reminder (closing soon) ────────────
  function getDaysLeft(j) {
    var ld = j.lastDate || j.lastDateDisplay;
    if (!ld) return 999;
    // Shared robust parser lives in common.js — handles ISO,
    // "DD-MM-YYYY" and "D Month YYYY" formats correctly.
    var d = (typeof parseFlexibleDate === 'function') ? parseFlexibleDate(ld) : new Date(ld);
    if (!d || isNaN(d.getTime())) return 999;
    var today = new Date(); today.setHours(0,0,0,0);
    return Math.ceil((d - today) / 86400000);
  }

  var closingSoon = jobs
    .map(function(j){ return {job:j, days: getDaysLeft(j)}; })
    .filter(function(x){ return x.days >= 0 && x.days <= 10; })
    .sort(function(a,b){ return a.days - b.days; })
    .slice(0, 6);

  if (closingSoon.length) {
    html += '<div class="sidebar-widget" style="background:#fff;border:1px solid #dde3f0;border-radius:10px;margin-bottom:14px;overflow:hidden;">';
    html += '<div style="background:linear-gradient(135deg,#c0392b,#e74c3c);padding:10px 14px;"><h3 style="margin:0;color:#fff;font-size:14px;">⏰ Last Date Reminder</h3></div>';
    html += '<div style="padding:8px;">';
    closingSoon.forEach(function(x) {
      var dayLabel = x.days === 0 ? 'Today' : x.days === 1 ? 'Tomorrow' : x.days + ' days left';
      var color = x.days <= 2 ? '#c0392b' : '#e65100';
      html += '<a href="' + R + 'pages/job-detail.html?id=' + x.job.id + '" style="display:block;padding:8px 10px;border-bottom:1px solid #f0f2f8;text-decoration:none;">' +
        '<div style="font-size:12px;color:#222;font-weight:600;line-height:1.4;margin-bottom:3px;">' + x.job.title + '</div>' +
        '<span style="font-size:10.5px;color:' + color + ';font-weight:700;">⚡ ' + dayLabel + '</span>' +
        '</a>';
    });
    html += '</div></div>';
  }

  // ── Widget 2: Quick Links — only existing pages ────────────
  html += '<div class="sidebar-widget" style="background:#fff;border:1px solid #dde3f0;border-radius:10px;margin-bottom:14px;overflow:hidden;">';
  html += '<div style="background:linear-gradient(135deg,#1a237e,#1565c0);padding:10px 14px;"><h3 style="margin:0;color:#fff;font-size:14px;">🔗 Quick Links</h3></div>';
  html += '<div style="padding:6px 0;">';
  var quickLinks = [
    {label:'💼 Latest Jobs',      href: R+'pages/jobs.html'},
    {label:'🏆 Sarkari Result',   href: R+'pages/results.html'},
    {label:'📋 Admit Card',       href: R+'pages/results.html#admit'},
    {label:'📝 Answer Key',       href: R+'pages/results.html#answer'},
    {label:'🏛️ Sarkari Yojana',   href: R+'pages/schemes.html'}
  ];
  quickLinks.forEach(function(l) {
    html += '<a href="' + l.href + '" style="display:block;padding:8px 14px;font-size:12.5px;color:#1565c0;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f6fa;">' + l.label + '</a>';
  });
  html += '</div></div>';

  // ── Widget 3: Jobs by Education (links into existing jobs.html filter) ──
  html += '<div class="sidebar-widget" style="background:#fff;border:1px solid #dde3f0;border-radius:10px;margin-bottom:14px;overflow:hidden;">';
  html += '<div style="background:linear-gradient(135deg,#27ae60,#2ecc71);padding:10px 14px;"><h3 style="margin:0;color:#fff;font-size:14px;">🎓 Jobs by Education</h3></div>';
  html += '<div style="padding:10px;display:flex;flex-wrap:wrap;gap:6px;">';
  var quals = ['10th', '12th', 'ITI', 'Diploma', 'Graduate', 'Engineering', 'Postgraduate'];
  quals.forEach(function(q) {
    var count = jobs.filter(function(j){ return (j.qualification||'').toLowerCase().includes(q.toLowerCase()); }).length;
    html += '<a href="' + R + 'pages/jobs.html?qual=' + q + '" style="font-size:11px;background:#e8f5e9;color:#1b5e20;padding:5px 10px;border-radius:14px;text-decoration:none;font-weight:600;">' + q + (count ? ' (' + count + ')' : '') + '</a>';
  });
  html += '</div></div>';

  // ── Widget 4: Jobs by State (links into existing jobs.html filter) ──
  html += '<div class="sidebar-widget" style="background:#fff;border:1px solid #dde3f0;border-radius:10px;margin-bottom:14px;overflow:hidden;">';
  html += '<div style="background:linear-gradient(135deg,#6a1b9a,#8e24aa);padding:10px 14px;"><h3 style="margin:0;color:#fff;font-size:14px;">📍 Jobs by State</h3></div>';
  html += '<div style="padding:10px;display:flex;flex-wrap:wrap;gap:6px;">';
  var states = ['Uttar Pradesh','Rajasthan','Bihar','Madhya Pradesh','Haryana','Delhi','Pan India'];
  states.forEach(function(s) {
    var count = jobs.filter(function(j){ return j.location === s; }).length;
    html += '<a href="' + R + 'pages/jobs.html?state=' + encodeURIComponent(s) + '" style="font-size:11px;background:#f3e5f5;color:#4a148c;padding:5px 10px;border-radius:14px;text-decoration:none;font-weight:600;">' + s + (count ? ' (' + count + ')' : '') + '</a>';
  });
  html += '</div></div>';

  el.innerHTML = html;
}

// ============================================================
// RIGHT SIDEBAR — Earning + Engagement focused
// ============================================================
function renderRightSidebar() {
  var el = document.getElementById('right-sidebar');
  if (!el) return;

  var jobs = typeof JOBS_DATA !== 'undefined' ? JOBS_DATA : [];
  var R = (typeof SITE !== 'undefined') ? SITE.root : './';

  var html = '';

  // ── Widget 1: Sticky AdSense Ad ─────────────────────────────
  html += '<div id="sticky-ad-wrap" style="position:sticky;top:90px;margin-bottom:14px;">';
  html += '<p style="font-size:10px;color:#999;text-align:center;margin:0 0 4px;">Advertisement</p>';
  html += '<ins class="adsbygoogle" style="display:block;width:300px;height:600px;margin:0 auto;" ' +
          'data-ad-client="ca-pub-8602963796651751" data-ad-slot="XXXXXXXXXX" data-ad-format="auto"></ins>';
  html += '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
  html += '</div>';

  // ── Widget 2: Trending / Recent Jobs ────────────────────────
  var trending = jobs.slice(0, 6);
  if (trending.length) {
    html += '<div class="sidebar-widget" style="background:#fff;border:1px solid #dde3f0;border-radius:10px;margin-bottom:14px;overflow:hidden;">';
    html += '<div style="background:linear-gradient(135deg,#e65100,#ff6f00);padding:10px 14px;"><h3 style="margin:0;color:#fff;font-size:14px;">🔥 Trending Jobs</h3></div>';
    html += '<div style="padding:8px;">';
    trending.forEach(function(j, i) {
      html += '<a href="' + R + 'pages/job-detail.html?id=' + j.id + '" style="display:flex;align-items:flex-start;gap:8px;padding:7px 6px;border-bottom:1px solid #f5f6fa;text-decoration:none;">' +
        '<span style="background:#fff3e0;color:#e65100;font-size:11px;font-weight:700;border-radius:4px;padding:2px 7px;flex-shrink:0;">#' + (i+1) + '</span>' +
        '<span style="font-size:12px;color:#222;font-weight:600;line-height:1.4;">' + j.title + '</span>' +
        '</a>';
    });
    html += '</div></div>';
  }

  // ── Widget 3: WhatsApp Join (only — Telegram link not live yet) ──
  html += '<div class="sidebar-widget" style="background:linear-gradient(135deg,#25D366,#128C7E);border-radius:10px;padding:16px;text-align:center;">';
  html += '<div style="font-size:28px;margin-bottom:6px;">📲</div>';
  html += '<h3 style="color:#fff;font-size:14px;margin:0 0 6px;">Never Miss a Job Alert!</h3>';
  html += '<p style="color:rgba(255,255,255,0.9);font-size:11px;margin:0 0 12px;">Join our WhatsApp channel for instant updates</p>';
  html += '<a href="https://whatsapp.com/channel/0029Vb8H18cCHDydoevviH1f" target="_blank" rel="nofollow noopener" style="display:block;background:#fff;color:#128C7E;font-weight:700;font-size:12.5px;padding:9px;border-radius:6px;text-decoration:none;">💬 Join WhatsApp</a>';
  html += '</div>';

  el.innerHTML = html;
}
