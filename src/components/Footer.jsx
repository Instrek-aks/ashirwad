export default function Footer({ page, onNavigate }) {
  const scrollToSection = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const goTo = (e, target) => {
    e.preventDefault()
    if (onNavigate) onNavigate(target)
  }

  return (
    <footer className="footer-section-wrapper" style={{ backgroundColor: '#0D1C3D', position: 'relative', color: '#f8fafc', padding: '60px 0 30px' }}>
      <div className="container footer-container">
        
        {/* Five-Column Layout Grid */}
        <div className="footer-grid-ref">
          
          {/* Column 1: Logo & Description & Contact Info */}
          <div>
            <div className="footer-logo" style={{ marginBottom: '16px' }}>
              <a 
                href="#" 
                className="logo" 
                onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              >
                <img 
                  src="/logo.webp" 
                  alt="Ashirwad Plastics Logo" 
                  style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block', filter: 'brightness(0) invert(1)' }}
                />
              </a>
            </div>
            <p className="footer-about-text" style={{ fontSize: '13px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px', maxWidth: '280px' }}>
              Ashirwad Plastics stands at the forefront of Innovation, offering nasal dispensing solutions and injection seals that uphold the integrity of life-saving medicines.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+919569461234" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91-9569461234</a>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@ashirwadplastics.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>info@ashirwadplastics.com</a>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span>Khasra No 06 Solan, Himachal Pradesh</span>
              </div>

              {/* Website */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <a href="https://www.ashirwadplastics.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>www.ashirwadplastics.com</a>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="footer-column-ref">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Products</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-ophthalmic')}>Ophthalmic Delivery Systems</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-nasal')}>Nasal Delivery Systems</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-tablet')}>Tablet Containers &amp; Closures</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-flipoff')}>Flip-Off Seals</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-measuring')}>Measuring Caps &amp; Oral Droppers</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-glass-dropper')}>Glass Droppers</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-dispenser')}>Dispenser Pumps</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-trigger')}>Trigger Pumps</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-mist-cream')}>Mist &amp; Cream Pumps</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'product-caps-closures')}>Caps &amp; Closures</a></li>
            </ul>
          </div>

          {/* Column 3: Market Sectors */}
          <div className="footer-column-ref">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Market Sectors</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'market-pharma')}>Pharma Market</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'market-cosmetic')}>Cosmetic Market</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'market-homecare')}>Home Care Industry</a></li>
            </ul>
          </div>

          {/* Column 4: Our Expertise */}
          <div className="footer-column-ref">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Our Expertise</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'expertise-manufacturing')}>Manufacturing</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'expertise-sustainability')}>Sustainability</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'expertise-quality')}>Quality Assurance</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'expertise-innovation')}>Innovation</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'expertise-rd')}>Research &amp; Development</a></li>
            </ul>
          </div>

          {/* Column 5: Quick Links */}
          <div className="footer-column-ref">
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '16px', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => { e.preventDefault(); onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Home</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'about')}>About Us</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'presence')}>Global Presence</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'career')}>Careers</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'expertise')}>New Product Development</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'event')}>CPHI-PMEC Event</a></li>
              <li><a href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }} onClick={e => goTo(e, 'contact')}>Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Copyright & Social Links */}
        <div className="footer-bottom-ref" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', flexGrow: 1 }}>
            © 2024 ashirwadplastics.com | Designed &amp; Managed by{' '}
            Instrek Technology.
          </span>
          <div className="footer-socials" style={{ display: 'flex', gap: '10px' }}>
            
            {/* LinkedIn */}
            <a href="#" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1e293b' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#1e293b' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  )
}
