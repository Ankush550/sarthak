/**
 * SEO FIX: Block search results, filters, and low-quality pages from indexing
 * Issue: Google was indexing thin search result pages as duplicate content
 * Solution: Dynamically add noindex meta tag to query-based pages
 * 
 * Files affected: All detail pages that accept ?q=, ?filter=, ?search= params
 * Impact: Fixes "Crawled - currently not indexed" issues
 */

(function() {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;

  // ============================================================
  // RULE 1: Noindex search/query result pages
  // ============================================================
  
  // If page has query parameters for search/filter, mark as noindex
  const hasSearchQuery = (
    params.has('q') ||        // Search query
    params.has('search') ||   // Search term
    params.has('filter') ||   // Filter criteria
    params.has('sort') ||     // Sorting (duplicate content)
    params.has('page') ||     // Pagination (duplicate content)
    params.has('category')    // Category filter
  );

  if (hasSearchQuery) {
    const noindexMeta = document.createElement('meta');
    noindexMeta.name = 'robots';
    noindexMeta.content = 'noindex, follow';
    document.head.appendChild(noindexMeta);
    console.log('🚫 SEO: Search results page marked as noindex');
  }

  // ============================================================
  // RULE 2: Block specific low-quality paths
  // ============================================================

  const blockPatterns = [
    /feed\.xml/i,           // Sitemap/Feed files
    /sitemap\.xml/i,
    /\.json$/i,             // JSON data files
    /\/admin\//i,           // Admin pages
    /\/api\//i,             // API endpoints
    /\/assets\/data\//i,    // Data directory
    /\/draft\//i,           // Draft pages
    /\/preview\//i,         // Preview pages
    /\?utm_/i,              // UTM tracking params (duplicate URLs)
    /\?fbclid/i,            // Facebook tracking
    /\?gclid/i              // Google Ads tracking
  ];

  if (blockPatterns.some(pattern => pattern.test(pathname) || pattern.test(window.location.search))) {
    const noindexMeta = document.createElement('meta');
    noindexMeta.name = 'robots';
    noindexMeta.content = 'noindex, follow';
    document.head.appendChild(noindexMeta);
    console.log('🚫 SEO: Low-quality page marked as noindex');
  }

  // ============================================================
  // RULE 3: Enforce canonical URL (without tracking params)
  // ============================================================

  // Only keep id and type params in canonical
  if (pathname.includes('/job-detail.html') || 
      pathname.includes('/alert-detail.html') ||
      pathname.includes('/scheme-detail.html')) {
    
    const jobId = params.get('id');
    const pageType = params.get('type');
    
    if (jobId) {
      let canonicalUrl = window.location.origin + pathname + '?id=' + encodeURIComponent(jobId);
      
      if (pageType) {
        canonicalUrl = window.location.origin + pathname + 
                      '?type=' + encodeURIComponent(pageType) + 
                      '&id=' + encodeURIComponent(jobId);
      }
      
      // Remove or update existing canonical
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonicalUrl;
      console.log('✅ SEO: Canonical URL set to: ' + canonicalUrl);
    }
  }

  // ============================================================
  // RULE 4: Log what was changed (optional, remove in production)
  // ============================================================

  console.log('✅ SEO Noindex Module Loaded');
  console.log('📍 Current URL:', window.location.href);
  console.log('🔍 Search params:', Object.fromEntries(params));

})();
