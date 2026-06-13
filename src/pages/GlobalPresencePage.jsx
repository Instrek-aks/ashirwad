import { useState, useEffect, useRef } from 'react'
import ReachOut from '../components/ReachOut'

/* ─── Fade-in on scroll hook ─── */
function useFadeIn() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

export default function GlobalPresencePage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [certRef, certVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.gp-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'gp-img-fallback-badge'
      badge.style.width = '100%'
      badge.style.height = '100%'
      badge.style.display = 'flex'
      badge.style.flexDirection = 'column'
      badge.style.alignItems = 'center'
      badge.style.justifyContent = 'center'
      badge.style.background = 'linear-gradient(135deg, #2F67F6 0%, #0D1C3D 100%)'
      badge.style.color = '#FFFFFF'
      badge.style.padding = '20px'
      badge.style.textAlign = 'center'
      badge.style.borderRadius = '20px'
      
      badge.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.85;">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span style="font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">${label}</span>
      `
      parent.appendChild(badge)
    }
  }

  return (
    <div className="gp-page-wrapper">

      <section 
        className="gp-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url('/b4.jpg')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`gp-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
          style={{ 
            position: 'absolute',
            top: 'clamp(100px, 9.2vw, 132px)',
            left: 'clamp(24px, 8.3vw, 120px)',
            maxWidth: '852px',
            width: 'calc(100% - 48px)',
            minHeight: '238.729736328125px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transform: 'rotate(0deg)',
            opacity: 1,
            textAlign: 'left'
          }}
        >
          <nav className="gp-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">GLOBAL PRESENCE</span>
          </nav>
          <h1 className="gp-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Global Presence</h1>
          <p className="gp-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            Serving One Nation and Aiming To Serve Many More In The Future
          </p>
        </div>
      </section>

      {/* 2. GLOBAL PRESENCE OVERVIEW */}
      <section className="gp-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`gp-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            {/* Left Column: Copy */}
            <div className="gp-overview-left">
              <div className="gp-accent-line" />
              <h2 className="gp-section-title">Global Presence</h2>
              <p className="gp-overview-paragraph">
                At Ashirwad Plastics, our global presence is a reflection of our commitment to excellence, quality, and meaningful partnerships. From our manufacturing base in India, we serve customers across international markets, delivering pharmaceutical packaging solutions that meet the highest global standards. Our ambition is not simply to expand our reach, but to build lasting relationships and create genuine value for every customer, partner, and community we work with.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="gp-cta-link"
              >
                Consult with Experts <span className="gp-cta-arrow">→</span>
              </a>
            </div>

            {/* Right Column: World Map Image */}
            <div className="gp-overview-right">
              <div className="gp-map-container" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)' }}>
                <img 
                  src="/map.png" 
                  alt="World Map Distribution" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  onError={(e) => handleImageError(e, "World Map")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GLOBAL REACH FEATURE GRID */}
      <section className="gp-grid-section">
        <div className="container">
          <div ref={gridRef} className={`gp-grid-layout fade-section ${gridVisible ? 'visible' : ''}`}>
            
            {/* Card 1: Hologram Globe Card */}
            <div className="gp-grid-card gp-img-card">
              <img 
                src="/b5.png" 
                alt="Global Business Hologram" 
                onError={(e) => handleImageError(e, "Global Hologram")}
              />
            </div>

            {/* Card 2: Dark Navy Content Card */}
            <div className="gp-grid-card gp-card-dark">
              <h3 className="gp-card-heading">Our Global Approach</h3>
              <div className="gp-benefits-list">
                
                <div className="gp-benefit-item">
                  <span className="gp-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="gp-benefit-content">
                    <h4>Made in India, for the World</h4>
                    <p>We manufacture in India with the highest quality and compliance standards, delivering innovative, reliable solutions trusted worldwide.</p>
                  </div>
                </div>

                <div className="gp-benefit-item">
                  <span className="gp-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="gp-benefit-content">
                    <h4>Local Expertise, Global Reach</h4>
                    <p>We combine deep regional insights with global capabilities to deliver custom solutions that meet diverse market needs worldwide.</p>
                  </div>
                </div>

                <div className="gp-benefit-item">
                  <span className="gp-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="gp-benefit-content">
                    <h4>Commitment to Quality & Compliance</h4>
                    <p>We maintain consistent quality worldwide, with every product rigorously tested to meet global regulatory and industry standards.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 3: Light Content Card */}
            <div className="gp-grid-card gp-card-sand">
              <h3 className="gp-card-heading" style={{ color: '#1F2937' }}>Community Engagement and Social Responsibility</h3>
              <div className="gp-benefits-list">

                <div className="gp-benefit-item">
                  <span className="gp-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="gp-benefit-content">
                    <p style={{ color: '#1F2937', fontWeight: 500 }}>Our wide distribution network ensures timely, reliable delivery, while our customer-first approach builds trust and long-term relationships worldwide.</p>
                  </div>
                </div>

                <div className="gp-benefit-item">
                  <span className="gp-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="gp-benefit-content">
                    <p style={{ color: '#1F2937', fontWeight: 500 }}>Our global presence focuses on creating positive impact through community support, sustainability, and responsible business practices.</p>
                  </div>
                </div>

                <div className="gp-benefit-item">
                  <span className="gp-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="gp-benefit-content">
                    <p style={{ color: '#1F2937', fontWeight: 500 }}>Through our corporate social responsibility programs, we aim to create shared value, foster social inclusion, and contribute to the well-being and prosperity of communities around the world.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 4: Earth Digital Connection Image */}
            <div className="gp-grid-card gp-img-card">
              <img 
                src="/b6.png" 
                alt="Earth Digital Connectivity" 
                onError={(e) => handleImageError(e, "Earth Connections")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. CERTIFICATIONS SECTION */}
      <section className="gp-cert-section">
        <div className="container">
          <div ref={certRef} className={`gp-cert-content fade-section ${certVisible ? 'visible' : ''}`}>
            
            <h2 className="gp-cert-title">We are Certified By</h2>
            
            <div className="gp-cert-row">
              
              {/* Badge 1: ISO 9001:2015 */}
              <div className="gp-cert-badge">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#2F67F6" strokeWidth="2.5" fill="none" />
                  <circle cx="30" cy="30" r="24" stroke="#2F67F6" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                  <text x="50%" y="42%" dominantBaseline="central" textAnchor="middle" fill="#2F67F6" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="9" fontWeight="800">ISO</text>
                  <text x="50%" y="58%" dominantBaseline="central" textAnchor="middle" fill="#2F67F6" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="7" fontWeight="600">9001:2015</text>
                </svg>
              </div>

              {/* Badge 2: ISO Certified */}
              <div className="gp-cert-badge">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#122A5C" strokeWidth="2.5" fill="none" />
                  <path d="M20 30L27 37L40 22" stroke="#122A5C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="50%" y="78%" dominantBaseline="central" textAnchor="middle" fill="#122A5C" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="6.5" fontWeight="700">ISO CERTIFIED</text>
                </svg>
              </div>

              {/* Badge 3: FDA */}
              <div className="gp-cert-badge">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#1F2937" fontFamily="Georgia, serif" fontSize="26" fontWeight="900" letterSpacing="2">FDA</text>
                </svg>
              </div>

              {/* Badge 4: Health Canada */}
              <div className="gp-cert-badge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Red Maple Leaf SVG */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E11D48">
                    <path d="M12 2L13.5 7.5L18.5 6L17 11L22 12.5L16.5 14L18 19L13.5 17.5L12 22L10.5 17.5L6 19L7.5 14L2 12.5L7 11L5.5 6L10.5 7.5L12 2Z" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937', fontFamily: 'system-ui' }}>Health</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', fontFamily: 'system-ui' }}>Canada</span>
                  </div>
                </div>
              </div>

              {/* Badge 5: GMP */}
              <div className="gp-cert-badge">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#22C55E" strokeWidth="2.5" fill="none" />
                  <rect x="16" y="22" width="28" height="16" rx="3" fill="#22C55E" />
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#FFFFFF" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="9" fontWeight="800">GMP</text>
                  <text x="50%" y="78%" dominantBaseline="central" textAnchor="middle" fill="#22C55E" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="6.5" fontWeight="700">CERTIFIED</text>
                </svg>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div className="cta-banner-grid">
            <h2 className="cta-banner-heading">Ready to Elevate Your Global Packaging Supply?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                We custom-engineer primary pharmaceutical packaging built for international transit compliance, seal security, and high-volume delivery.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REACH OUT TODAY */}
      <ReachOut />

    </div>
  )
}
