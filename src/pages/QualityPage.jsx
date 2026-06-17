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

export default function QualityPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [certRef, certVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [processRef, processVisible] = useFadeIn()
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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/quality.png')",
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
            <span className="breadcrumb-active">QUALITY</span>
          </nav>
          <h1 className="mfg-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Quality Assurance</h1>
          <p className="mfg-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            At Ashirwad Plastics, quality is not just a promise, it is a guarantee. We leave nothing to chance in our pursuit of the highest standards.
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="mfg-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`mfg-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            <div className="mfg-overview-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Quality Assurance Standards</h2>
              <p className="mfg-overview-paragraph">
                At Ashirwad Plastics, quality is not just a promise, it is a guarantee. Our commitment to excellence is embedded in every product we manufacture, every process we follow, and every decision we make.
              </p>
              <p className="mfg-overview-paragraph">
                From raw material sourcing to final product inspection, we leave nothing to chance in our pursuit of the highest standards of quality and reliability.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="mfg-cta-link"
              >
                Learn About Our Standards <span className="mfg-cta-arrow">→</span>
              </a>
            </div>

            <div className="mfg-overview-right">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b1.webp" 
                  alt="Quality Lab Testing" 
                  onError={(e) => handleImageError(e, "Quality Lab Testing")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CERTIFICATIONS SECTION */}
      <section className="gp-cert-section" style={{ backgroundColor: '#fff', padding: '60px 0', borderTop: '1px solid var(--border-gray)', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container">
          <div ref={certRef} className={`gp-cert-content fade-section ${certVisible ? 'visible' : ''}`}>
            <h2 className="gp-cert-title" style={{ textAlign: 'center', fontSize: '24px', marginBottom: '32px' }}>Our Certifications</h2>
            <div className="gp-cert-row" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              
              <div className="gp-cert-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>ISO 15378:2017</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Primary Packaging Materials for Medicinal Products</span>
              </div>

              <div className="gp-cert-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>ISO 9001:2015</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Quality Management Systems</span>
              </div>

              <div className="gp-cert-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>US DMF</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Drug Master File Registration</span>
              </div>

              <div className="gp-cert-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Canada DMF</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Drug Master File Registration</span>
              </div>

              <div className="gp-cert-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>CGMP</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Current Good Manufacturing Practice</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. RETAINING QUALITY GRID (2x2) */}
      <section className="mfg-capabilities-section">
        <div className="container">
          <div ref={gridRef} className={`mfg-capabilities-grid fade-section ${gridVisible ? 'visible' : ''}`}>
            
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/b3.webp" 
                alt="Product Testing Lab" 
                onError={(e) => handleImageError(e, "Product Testing")}
              />
            </div>

            <div className="mfg-grid-card mfg-card-dark">
              <h3 className="mfg-card-heading">How We Retain Our Quality</h3>
              <div className="mfg-benefits-list">
                
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Strict Standards</h4>
                    <p>We follow strict quality management protocols throughout the manufacturing process, ensuring consistent durability, reliability, and performance. Our quality management system is ISO-certified.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Continuous Improvement</h4>
                    <p>We believe that quality is a moving target, and we are always striving to raise the bar. Through regular audits, employee training, and structured feedback mechanisms, we continuously identify and implement improvements.</p>
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
                    <h4 style={{ color: '#1F2937' }}>Product Testing</h4>
                    <p style={{ color: '#6B7280' }}>Every product undergoes rigorous testing before it reaches the market - from material strength evaluations to full performance assessments ensuring complete compliance with industry standards.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>Customer Satisfaction</h4>
                    <p style={{ color: '#6B7280' }}>Our ultimate measure of quality is the satisfaction of our customers. We listen, understand, and act on customer feedback to consistently meet and exceed expectations.</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/s7.webp" 
                alt="Quality Inspection Checks" 
                onError={(e) => handleImageError(e, "Inspection Checks")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. QUALITY CONTROL PROCESS DETAILS */}
      <section className="mfg-facility-section" style={{ borderTop: '1px solid var(--border-gray)' }}>
        <div className="container">
          <div ref={processRef} className={`mfg-facility-grid fade-section ${processVisible ? 'visible' : ''}`}>
            
            <div className="mfg-facility-left">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b.webp" 
                  alt="Raw Material Sourcing Quality" 
                  onError={(e) => handleImageError(e, "Raw Material Quality")}
                />
              </div>
            </div>

            <div className="mfg-facility-right">
              <h2 className="mfg-section-title">Our Quality Control Process</h2>
              <div className="mfg-facility-desc">
                <p>
                  Quality begins before production. We source raw materials exclusively from trusted, pre-qualified suppliers who share our commitment to quality and consistency.
                </p>
                <p>
                  Throughout manufacturing, our facilities are equipped with advanced inspection and testing technology to monitor quality at every critical stage. And after production, every finished product is thoroughly inspected before dispatch because our standards don't stop until the product is in your hands.
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
            <h2 className="cta-banner-heading">Want to Know More About Our Quality Standards?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team to learn how our quality-first approach can support your pharmaceutical or packaging requirements.
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
