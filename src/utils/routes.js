// Centralized Route Map & Path Resolution for Ashirwad Plastics

export const ROUTE_MAP = {
  home: '/',
  about: '/about',
  contact: '/contact',
  blogs: '/blogs',
  'blog-detail': (slug) => `/blog/${slug}`,
  'market-pharma': '/market/pharma',
  'market-cosmetic': '/market/cosmetic',
  'market-nutraceutical': '/market/nutraceutical',
  'market-homecare': '/market/homecare',
  'product-ophthalmic': '/products/ophthalmic',
  'product-nasal': '/products/nasal',
  'product-tablet': '/products/tablet',
  'product-flipoff': '/products/flip-off',
  'product-measuring': '/products/measuring',
  'product-glass-dropper': '/products/glass-dropper',
  'product-dispenser': '/products/dispenser',
  'product-trigger': '/products/trigger',
  'product-mist-cream': '/products/mist-cream',
  'product-caps-closures': '/products/caps-closures',
  expertise: '/product-development',
  'expertise-manufacturing': '/expertise/manufacturing',
  'expertise-sustainability': '/expertise/sustainability',
  'expertise-quality': '/expertise/quality',
  'expertise-rd-innovation': '/expertise/rd-innovation',
  'expertise-innovation': '/expertise/rd-innovation',
  'expertise-rd': '/expertise/rd-innovation',
  presence: '/global-presence',
  career: '/careers',
  event: '/events',
  admin: '/admin'
};

/**
 * Returns the canonical URL path for a given navigation target.
 */
export function getPathForTarget(target, data = null) {
  if (target === 'blog-detail' && data) {
    return `/blog/${data}`;
  }
  const mapped = ROUTE_MAP[target];
  if (typeof mapped === 'function') {
    return mapped(data);
  }
  if (typeof mapped === 'string') {
    return mapped;
  }
  return `/${target}`;
}

/**
 * Parses the current window location (pathname and hash) into a page key and optional slug.
 */
export function parseCurrentLocation() {
  if (typeof window === 'undefined') {
    return { page: 'home', slug: null };
  }

  // Normalize pathname: remove trailing slash, lowercase
  let path = window.location.pathname.toLowerCase().trim();
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Also check hash for backward compatibility (e.g., #admin, #blogs, #blog/my-slug)
  const hash = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase().trim();

  // 1. Check Admin
  if (path === '/admin' || hash === 'admin') {
    return { page: 'admin', slug: null };
  }

  // 2. Check Blog Detail (/blog/:slug or #blog/:slug)
  if (path.startsWith('/blog/')) {
    const slug = window.location.pathname.replace(/^\/blog\//i, '').replace(/\/+$/, '').trim();
    if (slug) return { page: 'blog-detail', slug };
  }
  if (hash.startsWith('blog/')) {
    const slug = hash.replace(/^blog\//i, '').replace(/\/+$/, '').trim();
    if (slug) return { page: 'blog-detail', slug };
  }

  // 3. Check Blogs / Insights list
  if (path === '/blogs' || path === '/insights' || hash === 'blogs' || hash === 'insights') {
    return { page: 'blogs', slug: null };
  }

  // 4. Check About
  if (path === '/about' || hash === 'about') {
    return { page: 'about', slug: null };
  }

  // 5. Check Contact
  if (path === '/contact' || hash === 'contact') {
    return { page: 'contact', slug: null };
  }

  // 6. Check Market Sectors
  if (path === '/market/pharma' || path === '/market-pharma' || hash === 'market-pharma') {
    return { page: 'market-pharma', slug: null };
  }
  if (path === '/market/cosmetic' || path === '/market-cosmetic' || hash === 'market-cosmetic') {
    return { page: 'market-cosmetic', slug: null };
  }
  if (
    path === '/market/nutraceutical' ||
    path === '/market/homecare' ||
    path === '/market-nutraceutical' ||
    path === '/market-homecare' ||
    hash === 'market-nutraceutical' ||
    hash === 'market-homecare'
  ) {
    return { page: 'market-nutraceutical', slug: null };
  }

  // 7. Check Products
  const productRoutes = [
    { target: 'product-ophthalmic', paths: ['/products/ophthalmic', '/product-ophthalmic'] },
    { target: 'product-nasal', paths: ['/products/nasal', '/product-nasal'] },
    { target: 'product-tablet', paths: ['/products/tablet', '/product-tablet'] },
    { target: 'product-flipoff', paths: ['/products/flip-off', '/products/flipoff', '/product-flipoff'] },
    { target: 'product-measuring', paths: ['/products/measuring', '/product-measuring'] },
    { target: 'product-glass-dropper', paths: ['/products/glass-dropper', '/product-glass-dropper'] },
    { target: 'product-dispenser', paths: ['/products/dispenser', '/product-dispenser'] },
    { target: 'product-trigger', paths: ['/products/trigger', '/product-trigger'] },
    { target: 'product-mist-cream', paths: ['/products/mist-cream', '/product-mist-cream'] },
    { target: 'product-caps-closures', paths: ['/products/caps-closures', '/product-caps-closures'] }
  ];

  for (const item of productRoutes) {
    if (item.paths.includes(path) || hash === item.target) {
      return { page: item.target, slug: null };
    }
  }

  // 8. Check Expertise / Product Development
  if (path === '/product-development' || path === '/expertise' || hash === 'expertise') {
    return { page: 'expertise', slug: null };
  }
  if (path === '/expertise/manufacturing' || path === '/expertise-manufacturing' || hash === 'expertise-manufacturing') {
    return { page: 'expertise-manufacturing', slug: null };
  }
  if (path === '/expertise/sustainability' || path === '/expertise-sustainability' || hash === 'expertise-sustainability') {
    return { page: 'expertise-sustainability', slug: null };
  }
  if (path === '/expertise/quality' || path === '/expertise-quality' || hash === 'expertise-quality') {
    return { page: 'expertise-quality', slug: null };
  }
  if (
    path === '/expertise/rd-innovation' ||
    path === '/expertise-rd-innovation' ||
    path === '/expertise-innovation' ||
    path === '/expertise-rd' ||
    hash === 'expertise-rd-innovation'
  ) {
    return { page: 'expertise-rd-innovation', slug: null };
  }

  // 9. Other pages
  if (path === '/global-presence' || path === '/presence' || hash === 'presence') {
    return { page: 'presence', slug: null };
  }
  if (path === '/careers' || path === '/career' || hash === 'career') {
    return { page: 'career', slug: null };
  }
  if (path === '/events' || path === '/event' || hash === 'event') {
    return { page: 'event', slug: null };
  }

  // Default to home
  return { page: 'home', slug: null };
}

/**
 * Returns a descriptive document title based on the active page.
 */
export function getDocumentTitle(page, blogTitle = '') {
  if (page === 'blog-detail' && blogTitle) {
    return `${blogTitle} | Ashirwad Plastics`;
  }
  const titles = {
    home: 'Ashirwad Plastics | Pharmaceutical & Healthcare Packaging Solutions',
    about: 'About Us | Ashirwad Plastics',
    contact: 'Contact Us | Ashirwad Plastics',
    blogs: 'Insights & Knowledge Center | Ashirwad Plastics',
    'market-pharma': 'Pharmaceutical Market Solutions | Ashirwad Plastics',
    'market-cosmetic': 'Cosmetic & Personal Care Packaging | Ashirwad Plastics',
    'market-nutraceutical': 'Nutraceutical & Home Care Packaging | Ashirwad Plastics',
    'product-ophthalmic': 'Ophthalmic Delivery Systems | Ashirwad Plastics',
    'product-nasal': 'Nasal Delivery Systems | Ashirwad Plastics',
    'product-tablet': 'Tablet Containers & Closures | Ashirwad Plastics',
    'product-flipoff': 'Flip-Off Seals | Ashirwad Plastics',
    'product-measuring': 'Measuring Caps & Oral Droppers | Ashirwad Plastics',
    'product-glass-dropper': 'Glass Droppers | Ashirwad Plastics',
    'product-dispenser': 'Dispenser Pumps | Ashirwad Plastics',
    'product-trigger': 'Trigger Pumps | Ashirwad Plastics',
    'product-mist-cream': 'Mist & Cream Pumps | Ashirwad Plastics',
    'product-caps-closures': 'Caps & Closures | Ashirwad Plastics',
    expertise: 'New Product Development | Ashirwad Plastics',
    'expertise-manufacturing': 'Cleanroom Manufacturing | Ashirwad Plastics',
    'expertise-sustainability': 'Sustainable Polymer Solutions | Ashirwad Plastics',
    'expertise-quality': 'Quality Assurance & Regulatory Compliance | Ashirwad Plastics',
    'expertise-rd-innovation': 'R&D and Innovation | Ashirwad Plastics',
    presence: 'Global Presence & Export Network | Ashirwad Plastics',
    career: 'Careers & Opportunities | Ashirwad Plastics',
    event: 'CPHI-PMEC Event & Exhibitions | Ashirwad Plastics',
    admin: 'Admin CMS Portal | Ashirwad Plastics'
  };
  return titles[page] || 'Ashirwad Plastics | Pharmaceutical Packaging';
}

