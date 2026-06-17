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

export default function InnovationPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [collaborativeRef, collaborativeRefVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.mfg-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'mfg-img-fallback-badge'
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
    <div className="mfg-page-wrapper">

      <section 
        className="mfg-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/innovation.png')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`mfg-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="mfg-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">INNOVATION</span>
          </nav>
          <h1 className="mfg-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Innovation</h1>
          <p className="mfg-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            Redefining what is possible in pharmaceutical packaging. Innovation is the lifeblood of Ashirwad Plastics.
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="mfg-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`mfg-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            <div className="mfg-overview-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Fostering a Culture of Innovation</h2>
              <p className="mfg-overview-paragraph">
                Innovation is the lifeblood of Ashirwad Plastics. We believe that true innovation goes beyond creating new products - it is about solving real problems, meeting evolving challenges, and delivering solutions that make a meaningful difference.
              </p>
              <p className="mfg-overview-paragraph">
                From advanced materials to smarter processes, innovation shapes the way we work, the products we create, and the future we are building.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="mfg-cta-link"
              >
                Learn More About Innovation <span className="mfg-cta-arrow">→</span>
              </a>
            </div>

            <div className="mfg-overview-right">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b1.webp" 
                  alt="Innovation Lab" 
                  onError={(e) => handleImageError(e, "Innovation Lab")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INNOVATION PILLARS GRID (2x2) */}
      <section className="mfg-capabilities-section">
        <div className="container">
          <div ref={gridRef} className={`mfg-capabilities-grid fade-section ${gridVisible ? 'visible' : ''}`}>
            
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/b3.webp" 
                alt="Product Enhancement Research" 
                onError={(e) => handleImageError(e, "Product Enhancement")}
              />
            </div>

            <div className="mfg-grid-card mfg-card-dark">
              <h3 className="mfg-card-heading">Key Innovation Pillars</h3>
              <div className="mfg-benefits-list">
                
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Research &amp; Development</h4>
                    <p>Our dedicated R&D team continuously explores new materials, processes, and product designs pushing the boundaries of what is possible in pharmaceutical and specialty packaging.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Product Enhancement</h4>
                    <p>We are constantly improving our existing product lines to deliver greater performance, durability, and value. We leverage the latest technologies and customer insights to ensure our products evolve with the market.</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mfg-grid-card mfg-card-light">
              <div className="mfg-benefits-list" style={{ marginTop: 0 }}>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>Market Intelligence</h4>
                    <p style={{ color: '#6B7280' }}>Staying ahead requires more than great ideas, it requires a deep understanding of where the market is headed. We invest in ongoing research and trend analysis to anticipate customer needs and stay ahead of the curve.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>Customer-Driven Innovation</h4>
                    <p style={{ color: '#6B7280' }}>Every innovation we pursue begins with the customer. We listen closely to feedback, understand pain points, and co-create solutions that address real, specific needs.</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/s7.webp" 
                alt="Technology Integration checks" 
                onError={(e) => handleImageError(e, "Technology Integration")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. COLLABORATION & EMERGING TECH */}
      <section className="mfg-facility-section" style={{ borderTop: '1px solid var(--border-gray)' }}>
        <div className="container">
          <div ref={collaborativeRef} className={`mfg-facility-grid fade-section ${collaborativeRefVisible ? 'visible' : ''}`}>
            
            <div className="mfg-facility-left">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b.webp" 
                  alt="Collaborative Innovation Teams" 
                  onError={(e) => handleImageError(e, "Collaborative Teams")}
                />
              </div>
            </div>

            <div className="mfg-facility-right">
              <h2 className="mfg-section-title">Collaborative Innovation</h2>
              <div className="mfg-facility-desc">
                <p>
                  We know that the best ideas rarely come from one place. That is why we foster a collaborative environment bringing together teams from sales, engineering, operations, materials science, and supply chain to solve challenges together. Our cross-functional teams work through a structured innovation process, ensuring every solution is aligned with customer success and commercial viability.
                </p>
                <p>
                  <strong>Embracing Emerging Technologies:</strong> We actively explore and invest in emerging technologies - from advanced automation and precision engineering to new material sciences - to continuously elevate our manufacturing and product development capabilities.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div ref={ctaRef} className={`cta-banner-grid fade-section ${ctaVisible ? 'visible' : ''}`}>
            <h2 className="cta-banner-heading">Want to Explore Innovative Packaging Solutions?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our team to discover how our innovation-driven approach can create better solutions for your business.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ReachOut />

    </div>
  )
}
