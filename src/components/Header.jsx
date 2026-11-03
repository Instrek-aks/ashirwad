import { useState, useEffect } from 'react'

export default function Header({ page, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [marketOpen, setMarketOpen] = useState(false)
  const [expertiseOpen, setExpertiseOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (page === 'home') {
        const sections = ['home', 'about', 'products', 'contact', 'resources']
        let current = 'home'
        for (const id of sections) {
          const el = document.getElementById(id)
          if (el && window.scrollY >= el.offsetTop - 120) current = id
        }
        setActive(current)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    if (page !== 'home' && id !== 'contact') {
      onNavigate('home')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    } else if (id === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    setMenuOpen(false)
    setProductsOpen(false)
    setMarketOpen(false)
    setExpertiseOpen(false)
    setMoreOpen(false)
  }

  const goTo = (e, target) => {
    e.preventDefault()
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (document.documentElement) document.documentElement.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
    onNavigate(target)
    setMenuOpen(false)
    setProductsOpen(false)
    setMarketOpen(false)
    setExpertiseOpen(false)
    setMoreOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled-active' : ''}`}>
      <div
        className="container header-inner"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(16px, 3vw, 44px)',
          width: '100%',
          height: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Logo */}
        <a
          href="/"
          className="logo"
          onClick={e => {
            e.preventDefault()
            page === 'home'
              ? window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
              : onNavigate('home')
          }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          <img
            src="/logo.webp"
            alt="Ashirwad Plastics Logo"
            style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </a>

        {/* Mobile menu backdrop blur overlay */}
        <div
          className={`nav-backdrop ${menuOpen ? 'visible' : ''}`}
          onClick={() => {
            setMenuOpen(false)
            setProductsOpen(false)
            setMarketOpen(false)
            setExpertiseOpen(false)
            setMoreOpen(false)
          }}
        />

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {/* Drawer Top Header for Mobile */}
          <div className="nav-drawer-header">
            <img
              src="/logo.webp"
              alt="Ashirwad Plastics Logo"
              style={{ height: '34px', width: 'auto', objectFit: 'contain' }}
            />
            <button
              className="nav-drawer-close"
              onClick={() => {
                setMenuOpen(false)
                setProductsOpen(false)
                setMarketOpen(false)
                setExpertiseOpen(false)
                setMoreOpen(false)
              }}
              aria-label="Close menu"
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav Links: Matching Exact Reference Screenshot */}
          <div className="nav-drawer-content">
            {/* Mobile-only Home Link */}
            <a
              href="/"
              className={`mobile-only-link ${page === 'home' ? 'active' : ''}`}
              onClick={e => goTo(e, 'home')}
              style={{ fontWeight: '550', fontSize: '15px', color: '#1F2937' }}
            >
              Home
            </a>

            {/* 1. About Us */}
            <a
              href="/about"
              className={page === 'about' ? 'active' : ''}
              onClick={e => goTo(e, 'about')}
              style={{ fontWeight: '550', fontSize: '15px', color: '#1F2937' }}
            >
              About Us
            </a>

            {/* 2. Market Sectors > */}
            <div
              className={`nav-dropdown-wrapper ${marketOpen ? 'open accordion-open' : ''}`}
              onMouseEnter={() => { if (window.innerWidth > 1080) setMarketOpen(true); }}
              onMouseLeave={() => { if (window.innerWidth > 1080) setMarketOpen(false); }}
            >
              <a
                href="#"
                className={page.startsWith('market-') ? 'active' : ''}
                onClick={e => {
                  e.preventDefault()
                  if (window.innerWidth <= 1080) {
                    setMarketOpen(!marketOpen)
                  }
                }}
                style={{ display: 'inline-flex', alignItems: 'center', fontWeight: '550', fontSize: '15px', color: '#1F2937', gap: '5px' }}
              >
                <span>Market Sectors</span>
                <svg
                  className={`nav-chevron ${marketOpen ? 'chevron-rotated' : ''}`}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.75, flexShrink: 0, marginLeft: '2px' }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <div className={`nav-dropdown-menu ${marketOpen ? 'mobile-expanded' : ''}`} style={{ minWidth: '220px' }}>
                <a href="/market/pharma" onClick={e => goTo(e, 'market-pharma')}>Pharma Market</a>
                <a href="/market/cosmetic" onClick={e => goTo(e, 'market-cosmetic')}>Cosmetic Market</a>
                <a href="/market/nutraceutical" onClick={e => goTo(e, 'market-nutraceutical')}>Nutraceutical Market</a>
              </div>
            </div>

            {/* 3. Our Products > */}
            <div
              className={`nav-dropdown-wrapper ${productsOpen ? 'open accordion-open' : ''}`}
              onMouseEnter={() => { if (window.innerWidth > 1080) setProductsOpen(true); }}
              onMouseLeave={() => { if (window.innerWidth > 1080) setProductsOpen(false); }}
            >
              <a
                href="#"
                className={page.startsWith('product-') ? 'active' : ''}
                onClick={e => {
                  e.preventDefault()
                  if (window.innerWidth <= 1080) {
                    setProductsOpen(!productsOpen)
                  }
                }}
                style={{ display: 'inline-flex', alignItems: 'center', fontWeight: '550', fontSize: '15px', color: '#1F2937', gap: '5px' }}
              >
                <span>Our Products</span>
                <svg
                  className={`nav-chevron ${productsOpen ? 'chevron-rotated' : ''}`}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.75, flexShrink: 0, marginLeft: '2px' }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <div className={`nav-dropdown-menu ${productsOpen ? 'mobile-expanded' : ''}`} style={{ minWidth: '280px', maxHeight: '420px', overflowY: 'auto' }}>
                <a href="/products/ophthalmic" onClick={e => goTo(e, 'product-ophthalmic')}>Ophthalmic Delivery System</a>
                <a href="/products/nasal" onClick={e => goTo(e, 'product-nasal')}>Nasal Delivery System</a>
                <a href="/products/tablet" onClick={e => goTo(e, 'product-tablet')}>Tablet Containers &amp; Closures</a>
                <a href="/products/flip-off" onClick={e => goTo(e, 'product-flipoff')}>Flip-Off Seals</a>
                <a href="/products/measuring" onClick={e => goTo(e, 'product-measuring')}>Measuring Caps &amp; Oral Droppers</a>
                <a href="/products/glass-dropper" onClick={e => goTo(e, 'product-glass-dropper')}>Glass Droppers</a>
                <a href="/products/dispenser" onClick={e => goTo(e, 'product-dispenser')}>Dispenser Pumps</a>
                <a href="/products/trigger" onClick={e => goTo(e, 'product-trigger')}>Trigger Pumps</a>
                <a href="/products/mist-cream" onClick={e => goTo(e, 'product-mist-cream')}>Mist &amp; Cream Pumps</a>
                <a href="/products/caps-closures" onClick={e => goTo(e, 'product-caps-closures')}>Caps &amp; Closures</a>
              </div>
            </div>

            {/* 4. Our Expertise > */}
            <div
              className={`nav-dropdown-wrapper ${expertiseOpen ? 'open accordion-open' : ''}`}
              onMouseEnter={() => { if (window.innerWidth > 1080) setExpertiseOpen(true); }}
              onMouseLeave={() => { if (window.innerWidth > 1080) setExpertiseOpen(false); }}
            >
              <a
                href="#"
                className={page.startsWith('expertise') ? 'active' : ''}
                onClick={e => {
                  e.preventDefault()
                  if (window.innerWidth <= 1080) {
                    setExpertiseOpen(!expertiseOpen)
                  }
                }}
                style={{ display: 'inline-flex', alignItems: 'center', fontWeight: '550', fontSize: '15px', color: '#1F2937', gap: '5px' }}
              >
                <span>Our Expertise</span>
                <svg
                  className={`nav-chevron ${expertiseOpen ? 'chevron-rotated' : ''}`}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.75, flexShrink: 0, marginLeft: '2px' }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <div className={`nav-dropdown-menu ${expertiseOpen ? 'mobile-expanded' : ''}`} style={{ minWidth: '230px' }}>
                <a href="/product-development" onClick={e => goTo(e, 'expertise')}>New Product Development</a>
                <a href="/expertise/manufacturing" onClick={e => goTo(e, 'expertise-manufacturing')}>Manufacturing</a>
                <a href="/expertise/sustainability" onClick={e => goTo(e, 'expertise-sustainability')}>Sustainability</a>
                <a href="/expertise/quality" onClick={e => goTo(e, 'expertise-quality')}>Quality Assurance</a>
                <a href="/expertise/rd-innovation" onClick={e => goTo(e, 'expertise-rd-innovation')}>R&amp;D and Innovation</a>
              </div>
            </div>

            {/* 5. More > */}
            <div
              className={`nav-dropdown-wrapper dropdown-right ${moreOpen ? 'open accordion-open' : ''}`}
              onMouseEnter={() => { if (window.innerWidth > 1080) setMoreOpen(true); }}
              onMouseLeave={() => { if (window.innerWidth > 1080) setMoreOpen(false); }}
            >
              <a
                href="#"
                className={page === 'career' || page === 'event' || page === 'presence' || page === 'blogs' ? 'active' : ''}
                onClick={e => {
                  e.preventDefault()
                  if (window.innerWidth <= 1080) {
                    setMoreOpen(!moreOpen)
                  }
                }}
                style={{ display: 'inline-flex', alignItems: 'center', fontWeight: '550', fontSize: '15px', color: '#1F2937', gap: '5px' }}
              >
                <span>More</span>
                <svg
                  className={`nav-chevron ${moreOpen ? 'chevron-rotated' : ''}`}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.75, flexShrink: 0, marginLeft: '2px' }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
              <div className={`nav-dropdown-menu ${moreOpen ? 'mobile-expanded' : ''}`}>
                <a href="/blogs" onClick={e => goTo(e, 'blogs')}>Blogs &amp; Insights</a>
                <a href="/careers" onClick={e => goTo(e, 'career')}>Careers</a>
                <a href="/events" onClick={e => goTo(e, 'event')}>CPHI-PMEC Event</a>
                <a href="/global-presence" onClick={e => goTo(e, 'presence')}>Global Presence</a>
              </div>
            </div>

            {/* 6. CTA Button: Contact Us ↗ */}
            <a
              href="/contact"
              onClick={e => goTo(e, 'contact')}
              className="btn-header-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '30px',
                padding: '9.5px 24px',
                background: '#2F65E3',
                color: '#FFFFFF',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(47, 101, 227, 0.28)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1D4ED8'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2F65E3'; }}
            >
              <span>Contact Us</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(m => !m)}
          type="button"
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>
    </header>
  )
}
