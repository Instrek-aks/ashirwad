import { useState, useEffect, useRef } from 'react'

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

export default function ResearchDevelopmentPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [teamRef, teamRefVisible] = useFadeIn()
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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/reseach.webp')",
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
            <span className="breadcrumb-active">RESEARCH &amp; DEVELOPMENT</span>
          </nav>
          <h1 className="mfg-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>R &amp; D</h1>
          <p className="mfg-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            Exploring new frontiers to build better solutions. Research &amp; Development is not a department, it is a mindset.
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="mfg-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`mfg-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            <div className="mfg-overview-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">A Look Into Our R&amp;D Practices</h2>
              <p className="mfg-overview-paragraph">
                At Ashirwad Plastics, Research &amp; Development is not a department, it is a mindset. Our dedicated team of researchers, engineers, and materials scientists work together every day to explore new ideas, test new possibilities, and develop solutions that push our products and processes forward.
              </p>
              <p className="mfg-overview-paragraph">
                R&amp;D is our commitment to always being better for our customers, our industry, and our future.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="mfg-cta-link"
              >
                Learn About Our R&amp;D <span className="mfg-cta-arrow">→</span>
              </a>
            </div>

            <div className="mfg-overview-right">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b1.webp" 
                  alt="Research and Design Lab" 
                  onError={(e) => handleImageError(e, "Research and Design Lab")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. R&D PRACTICES GRID (2x2) */}
      <section className="mfg-capabilities-section">
        <div className="container">
          <div ref={gridRef} className={`mfg-capabilities-grid fade-section ${gridVisible ? 'visible' : ''}`}>
            
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/b3.webp" 
                alt="State of the Art Facility" 
                onError={(e) => handleImageError(e, "State of the Art Facility")}
              />
            </div>

            <div className="mfg-grid-card mfg-card-dark">
              <h3 className="mfg-card-heading">R&amp;D Focus Areas</h3>
              <div className="mfg-benefits-list">
                
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>State-of-the-Art Facility</h4>
                    <p>Our R&amp;D facility is equipped with advanced tools, testing equipment, and resources to support cutting-edge research, prototyping, and product development.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>New Product Development</h4>
                    <p>We are continuously exploring new concepts and formulations to develop products that address emerging market needs, regulatory requirements, and evolving customer demands.</p>
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
                    <h4 style={{ color: '#1F2937' }}>Continuous Improvement</h4>
                    <p style={{ color: '#6B7280' }}>Innovation is not a one-time event. We are committed to ongoing improvement in our R&amp;D methodologies, processes, and outcomes, building on each breakthrough to reach the next.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>From Insight to Reality</h4>
                    <p style={{ color: '#6B7280' }}>Our Development team translates R&amp;D insights into practical, market-ready solutions. Through iterative prototyping, rigorous testing, and structured validation processes, we refine every innovation until it meets customer expectations.</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/s7.webp" 
                alt="Product Testing Inspection" 
                onError={(e) => handleImageError(e, "Product Testing Lab")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. TEAM & COLLABORATIVE RESEARCH */}
      <section className="mfg-facility-section" style={{ borderTop: '1px solid var(--border-gray)' }}>
        <div className="container">
          <div ref={teamRef} className={`mfg-facility-grid fade-section ${teamRefVisible ? 'visible' : ''}`}>
            
            <div className="mfg-facility-left">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b.webp" 
                  alt="Multidisciplinary Team" 
                  onError={(e) => handleImageError(e, "Multidisciplinary Team")}
                />
              </div>
            </div>

            <div className="mfg-facility-right">
              <h2 className="mfg-section-title">Multidisciplinary Team &amp; Process Innovation</h2>
              <div className="mfg-facility-desc">
                <p>
                  Our R&amp;D team brings together experts from materials science, engineering, product design, and manufacturing combining diverse knowledge to generate well-rounded, practical innovations.
                </p>
                <p>
                  <strong>Process Innovation:</strong> Our R&amp;D efforts extend beyond product development. We continuously seek ways to improve manufacturing efficiency, reduce material waste, and enhance sustainability across our production processes leveraging R&amp;D insights to drive operational excellence throughout the business.
                </p>
                <p>
                  <strong>Collaborative Research:</strong> We believe the best outcomes come from collaboration. We forge partnerships with industry peers, academic institutions, and technology providers tapping into diverse expertise and resources to amplify our capabilities and accelerate the pace of innovation.
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
            <h2 className="cta-banner-heading">Interested in Our R&amp;D Capabilities?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our team to learn how our research and development expertise can support your product development needs.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
