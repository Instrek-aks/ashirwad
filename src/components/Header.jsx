import { useState, useEffect } from 'react'

export default function Header({ page, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
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
    if (page !== 'home') {
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setMenuOpen(false)
    setProductsOpen(false)
    setMoreOpen(false)
  }

  const goTo = (e, target) => {
    e.preventDefault()
    onNavigate(target)
    setMenuOpen(false)
    setProductsOpen(false)
    setMoreOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'scrolled-active' : ''}`}>
      <div className="container header-inner">
        <a
          href="#"
          className="logo"
          onClick={e => { e.preventDefault(); page === 'home' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : onNavigate('home') }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          <img 
            src="/logo.png" 
            alt="Ashirwad Plastics Logo" 
            style={{ height: '44px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </a>

        {/* Mobile menu backdrop blur overlay */}
        <div 
          className={`nav-backdrop ${menuOpen ? 'visible' : ''}`} 
          onClick={() => { setMenuOpen(false); setProductsOpen(false); setMoreOpen(false); }} 
        />

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {/* Drawer Top Header for Mobile */}
          <div className="nav-drawer-header">
            <img 
              src="/logo.png" 
              alt="Ashirwad Plastics Logo" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
            <button
              className="nav-drawer-close"
              onClick={() => { setMenuOpen(false); setProductsOpen(false); setMoreOpen(false); }}
              aria-label="Close menu"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable links content */}
          <div className="nav-drawer-content">
            <a
              href="#"
              className={page === 'about' ? 'active' : ''}
              onClick={e => goTo(e, 'about')}
              style={{ fontWeight: '450', color: '#1F2937' }}
            >About Us</a>
            
            <a
              href="#"
              className={page === 'market' ? 'active' : ''}
              onClick={e => goTo(e, 'market')}
              style={{ display: 'flex', alignItems: 'center', fontWeight: '450', color: '#1F2937', gap: '4px' }}
            >
              Market Sectors
              <svg className="desktop-chevron-only" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.8, flexShrink: 0, marginTop: '2px' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>

            <div className={`nav-dropdown-wrapper ${productsOpen ? 'accordion-open' : ''}`}>
              <a
                href="#"
                className={page === 'contact' || page === 'product-ophthalmic' || page === 'product-nasal' ? 'active' : ''}
                onClick={e => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                    setProductsOpen(!productsOpen);
                  } else {
                    scrollToSection(e, 'products');
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', fontWeight: '450', color: '#1F2937', gap: '4px' }}
              >
                <span>Our Products</span>
                <svg 
                  className={`nav-chevron ${productsOpen ? 'chevron-rotated' : ''}`}
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  style={{ opacity: 0.8, flexShrink: 0 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <div className={`nav-dropdown-menu ${productsOpen ? 'mobile-expanded' : ''}`}>
                <a href="#" onClick={e => goTo(e, 'product-ophthalmic')}>Ophthalmic Delivery System</a>
                <a href="#" onClick={e => goTo(e, 'product-nasal')}>Nasal Delivery System</a>
                <a href="#" onClick={e => goTo(e, 'contact')}>All Products Inquiry</a>
              </div>
            </div>

            <a
              href="#"
              className={page === 'expertise' ? 'active' : ''}
              onClick={e => goTo(e, 'expertise')}
              style={{ display: 'flex', alignItems: 'center', fontWeight: '450', color: '#1F2937', gap: '4px' }}
            >
              Our Expertise
              <svg className="desktop-chevron-only" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.8, flexShrink: 0, marginTop: '2px' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>

            <div className={`nav-dropdown-wrapper dropdown-right ${moreOpen ? 'accordion-open' : ''}`}>
              <a
                href="#"
                className={page === 'manufacturing' || page === 'presence' || page === 'career' || page === 'event' ? 'active' : ''}
                onClick={e => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                    setMoreOpen(!moreOpen);
                  } else {
                    goTo(e, 'manufacturing');
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', fontWeight: '450', color: '#1F2937', gap: '4px' }}
              >
                <span>More</span>
                <svg 
                  className={`nav-chevron ${moreOpen ? 'chevron-rotated' : ''}`}
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  style={{ opacity: 0.8, flexShrink: 0 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <div className={`nav-dropdown-menu ${moreOpen ? 'mobile-expanded' : ''}`}>
                <a href="#" onClick={e => goTo(e, 'manufacturing')}>Manufacturing</a>
                <a href="#" onClick={e => goTo(e, 'presence')}>Global Presence</a>
                <a href="#" onClick={e => goTo(e, 'career')}>Career</a>
                <a href="#" onClick={e => goTo(e, 'event')}>CPHI-PMEC Event</a>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#"
              className="btn-header-cta"
              onClick={e => e.preventDefault()}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '30px', padding: '12px 24px', background: '#2456D3', color: '#FFFFFF', fontWeight: '600', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(36, 86, 211, 0.15)', marginTop: '12px' }}
            >
              Download Brochure
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px' }}>
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
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>
    </header>
  )
}
