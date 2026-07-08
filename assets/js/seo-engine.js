// ============================================================
// SarthakYojana.in — seo-engine.js
// ENTERPRISE SEO ENGINE — one file, used by every page.
//
// HOW TO USE (in any page's <head>, right after SITE config loads):
//
//   <script src="../assets/js/seo-engine.js"></script>
//   <script>
//     applySEO({
//       title: "Sarkari Result 2026 – Admit Card | Answer Key",
//       description: "Check Latest Sarkari Result 2026...",
//       keywords: "sarkari result 2026, admit card 2026",
//       path: "pages/results.html",          // relative to domain root, no leading slash
//       type: "CollectionPage",               // WebPage | CollectionPage | JobPosting | Article
//       image: "assets/og-default.jpg",       // optional, falls back to default
//       breadcrumbs: [
//         {name:"Home", path:""},
//         {name:"Sarkari Result 2026", path:"pages/results.html"}
//       ],
//       job: null,            // pass job object here for JobPosting schema (job-detail.html)
//       faq: null             // pass [{q,a}, ...] for FAQPage schema
//     });
//   </script>
//
// This single call injects: <title>, meta description, meta keywords,
// robots, canonical, OG tags, Twitter Card, hreflang, WebSite schema,
// Organization schema, BreadcrumbList schema, and page-type schema —
// all de-duplicated so calling it twice never creates doubles.
// ============================================================

const SEO = {
  domain:    'https://sarthakyojana.in',
  siteName:  'SarthakYojana.in',
  defaultOgImage: 'https://sarthakyojana.in/assets/og-default.jpg',
  twitterHandle:  '@sarthakyojana',
  orgLogo:   'https://sarthakyojana.in/assets/logo.png',
  orgDescription: 'Free Sarkari Naukri portal for Government Jobs, Results, Admit Cards and Sarkari Yojana',
  orgFoundingDate: '2022',
  orgAreaServed: 'India',
  orgContactEmail: 'Ankush.Jain70146@gmail.com',
  locale:    'hi_IN',

  // ── Google Search Console verification ────────────────────────
  // 1. Go to search.google.com/search-console → Add Property → sarthakyojana.in
  // 2. Choose the "HTML tag" verification method (NOT the file-upload method)
  // 3. Google shows a tag like:
  //      <meta name="google-site-verification" content="AbCdEf123..." />
  // 4. Copy ONLY the content value (the part inside content="...") and paste
  //    it below, replacing PASTE_YOUR_CODE_HERE. Leave it blank/as-is and
  //    nothing is added — safe to deploy either way.
  // 5. Click "Verify" on Search Console — since this runs on every page via
  //    applySEO(), it will already be live once you upload these files.
  googleSiteVerification: 'PASTE_YOUR_CODE_HERE',

  // Same idea for Bing Webmaster Tools (bing.com/webmasters), optional:
  //   <meta name="msvalidate.01" content="..." />
  bingSiteVerification: '',

  // AdSense account verification meta tag (in addition to the adsbygoogle.js
  // script already on every page) — this is your actual publisher ID with
  // the "ca-" prefix kept, exactly as AdSense shows it.
  adsenseAccount: 'ca-pub-8602963796651751'
};

function applySEO(cfg) {
  cfg = cfg || {};
  var url = SEO.domain + '/' + (cfg.path || '').replace(/^\/+/, '');
  if (cfg.path === '' || cfg.path === '/') url = SEO.domain + '/';

  // ── 1. <title> ──────────────────────────────────────────────
  if (cfg.title) {
    document.title = cfg.title;
  }

  // ── 2. Standard meta tags ───────────────────────────────────
  _setMeta('name', 'description', cfg.description || '');
  if (cfg.keywords) _setMeta('name', 'keywords', cfg.keywords);
  _setMeta('name', 'robots', cfg.noindex
    ? 'noindex,follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // Search engine ownership verification (site-wide, safe no-op until
  // you paste real codes into the SEO config object above)
  if (SEO.googleSiteVerification && SEO.googleSiteVerification !== 'PASTE_YOUR_CODE_HERE') {
    _setMeta('name', 'google-site-verification', SEO.googleSiteVerification);
  }
  if (SEO.bingSiteVerification) {
    _setMeta('name', 'msvalidate.01', SEO.bingSiteVerification);
  }
  if (SEO.adsenseAccount) {
    _setMeta('name', 'google-adsense-account', SEO.adsenseAccount);
  }
  _setMeta('name', 'author', SEO.siteName);

  // ── 3. Canonical ─────────────────────────────────────────────
  _setLink('canonical', url);

  // ── 4. Hreflang (Hindi default, English alt — site is bilingual) ─
  _setLink('alternate', url, { hreflang: 'hi-IN' });
  _setLink('alternate', url, { hreflang: 'en-IN' });
  _setLink('alternate', url, { hreflang: 'x-default' });

  // ── 5. Open Graph ────────────────────────────────────────────
  var ogImage = cfg.image ? (SEO.domain + '/' + cfg.image.replace(/^\/+/, '')) : SEO.defaultOgImage;
  _setMeta('property', 'og:title',       cfg.title || SEO.siteName);
  _setMeta('property', 'og:description', cfg.description || '');
  _setMeta('property', 'og:type',        cfg.ogType || 'website');
  _setMeta('property', 'og:url',         url);
  _setMeta('property', 'og:site_name',   SEO.siteName);
  _setMeta('property', 'og:image',       ogImage);
  _setMeta('property', 'og:locale',      SEO.locale);

  // ── 6. Twitter Card ──────────────────────────────────────────
  _setMeta('name', 'twitter:card',  'summary_large_image');
  _setMeta('name', 'twitter:site',  SEO.twitterHandle);
  _setMeta('name', 'twitter:title', cfg.title || SEO.siteName);
  _setMeta('name', 'twitter:description', cfg.description || '');
  _setMeta('name', 'twitter:image', ogImage);

  // ── 7. WebSite schema (once per site, with SearchAction) ─────
  _setSchema('seo-website-schema', {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SEO.siteName,
    "url": SEO.domain,
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": SEO.domain + "/pages/search.html?q={search_term_string}" },
      "query-input": "required name=search_term_string"
    }
  });

  // ── 8. Organization schema ──────────────────────────────────
  _setSchema('seo-org-schema', {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SEO.siteName,
    "url": SEO.domain,
    "logo": SEO.orgLogo,
    "description": SEO.orgDescription,
    "foundingDate": SEO.orgFoundingDate,
    "areaServed": SEO.orgAreaServed,
    "contactPoint": SEO.orgContactEmail ? {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": SEO.orgContactEmail,
      "availableLanguage": ["Hindi", "English"]
    } : undefined,
    "sameAs": [SEO.domain]
  });

  // ── 9. BreadcrumbList schema ─────────────────────────────────
  if (cfg.breadcrumbs && cfg.breadcrumbs.length) {
    var items = cfg.breadcrumbs.map(function(b, i) {
      return {
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": SEO.domain + '/' + (b.path || '').replace(/^\/+/, '')
      };
    });
    _setSchema('seo-breadcrumb-schema', {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    });
  }

  // ── 10. Page-type-specific schema ───────────────────────────
  if (cfg.type === 'JobPosting' && cfg.job) {
    _setSchema('seo-jobposting-schema', _buildJobPostingSchema(cfg.job, url));
  } else if (cfg.type === 'CollectionPage') {
    _setSchema('seo-collectionpage-schema', {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": cfg.title,
      "description": cfg.description,
      "url": url,
      "isPartOf": { "@type": "WebSite", "name": SEO.siteName, "url": SEO.domain }
    });
  } else if (cfg.type === 'Article') {
    _setSchema('seo-article-schema', {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": cfg.title,
      "description": cfg.description,
      "image": ogImage,
      "datePublished": cfg.datePublished || new Date().toISOString().slice(0,10),
      "dateModified":  cfg.dateModified  || new Date().toISOString().slice(0,10),
      "author": { "@type": "Organization", "name": SEO.siteName },
      "publisher": {
        "@type": "Organization",
        "name": SEO.siteName,
        "logo": { "@type": "ImageObject", "url": SEO.orgLogo }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": url }
    });
  }

  // ── 11. FAQ schema (optional, for any page with FAQs) ────────
  if (cfg.faq && cfg.faq.length) {
    _setSchema('seo-faq-schema', {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": cfg.faq.map(function(f) {
        return {
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        };
      })
    });
  }
}

// ============================================================
// JobPosting schema builder (enterprise-grade, Google Jobs ready)
// ============================================================
function _buildJobPostingSchema(job, url) {
  var validEmpTypes = ['FULL_TIME','PART_TIME','CONTRACTOR','TEMPORARY','INTERN','VOLUNTEER','PER_DIEM','OTHER'];
  var empType = validEmpTypes.includes(job.employmentType) ? job.employmentType : 'FULL_TIME';

  var schemaTitle = (job.title || '').replace(/\s*Recruitment\s*\d{4}.*$/i, '').trim() || job.title;

  var address = { "@type": "PostalAddress", "addressCountry": "IN" };
  // Only claim a specific city/state when the job data actually says so.
  // Defaulting every unspecified job to "Delhi" (or "India" as a locality,
  // which isn't a real locality) fabricates location data for jobs that
  // are genuinely nationwide or based elsewhere — same accuracy risk as
  // the salary fallback above.
  if (job.addressLocality || job.location) address.addressLocality = job.addressLocality || job.location;
  if (job.addressRegion) address.addressRegion = job.addressRegion;

  var schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": schemaTitle,
    "description": job.description || (job.title + ' recruitment 2026 by ' + job.organization + '. Check eligibility, salary, last date and apply online.'),
    "identifier": { "@type": "PropertyValue", "name": job.organization, "value": job.id },
    "datePosted": job.datePosted || "2026-01-01",
    "validThrough": job.validThrough || (job.lastDate ? job.lastDate + 'T23:59:00+05:30' : "2026-12-31T23:59:00+05:30"),
    "employmentType": empType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.organization,
      "sameAs": job.orgWebsite || job.officialNotification || SEO.domain,
      "logo": { "@type": "ImageObject", "url": SEO.orgLogo }
    },
    "jobLocation": {
      "@type": "Place",
      "address": address
    },
    "applicantLocationRequirements": { "@type": "Country", "name": "India" },
    "directApply": false
  };

  // Only add baseSalary when we actually have real numbers for this job.
  // A fabricated generic ₹20,000–₹1,00,000 fallback range would misrepresent
  // pay for every job that doesn't specify a salary (e.g. a ₹10,900 apprentice
  // stipend would incorrectly show as up to ₹1,00,000) — this violates
  // Google's structured-data accuracy policy and risks a manual JobPosting
  // rich-result penalty. Better to omit the field entirely than guess.
  if (job.salaryMin || job.salaryMax) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryMin || job.salaryMax,
        "maxValue": job.salaryMax || job.salaryMin,
        "unitText": "MONTH"
      }
    };
  }

  if (job.totalPosts || job.totalVacancies) {
    schema.totalJobOpenings = parseInt(job.totalPosts || job.totalVacancies) || undefined;
  }

  // Education credential mapping (helps Google Jobs filter accuracy)
  var qual = (job.qualification || '').toLowerCase();
  var credCategory = 'high school';
  if (qual.includes('postgrad') || qual.includes('m.sc') || qual.includes('mba') || qual.includes('phd') || qual.includes('master')) {
    credCategory = 'postgraduate degree';
  } else if (qual.includes('graduate') || qual.includes('b.tech') || qual.includes('b.e') || qual.includes('degree')) {
    credCategory = 'bachelor degree';
  } else if (qual.includes('diploma')) {
    credCategory = 'associate degree';
  }
  schema.educationRequirements = { "@type": "EducationalOccupationalCredential", "credentialCategory": credCategory };

  return schema;
}

// ============================================================
// Internal helpers — idempotent (safe to call multiple times)
// ============================================================
function _setMeta(attr, key, content) {
  var selector = 'meta[' + attr + '="' + key + '"]';
  var el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function _setLink(rel, href, extraAttrs) {
  var selector = 'link[rel="' + rel + '"]';
  if (extraAttrs && extraAttrs.hreflang) {
    selector += '[hreflang="' + extraAttrs.hreflang + '"]';
  }
  var el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extraAttrs) {
      Object.keys(extraAttrs).forEach(function(k) { el.setAttribute(k, extraAttrs[k]); });
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function _setSchema(id, obj) {
  var el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(obj);
}
