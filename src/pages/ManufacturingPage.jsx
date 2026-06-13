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

export default function ManufacturingPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [facilityRef, facilityVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [peopleRef, peopleVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/b2.png')",
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
            <span className="breadcrumb-active">MANUFACTURING</span>
          </nav>
          <h1 className="mfg-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Manufacturing</h1>
          <p className="mfg-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            Manufacturing practices that make the world a better place with the help of automation.
          </p>
        </div>
      </section>

      {/* 2. MANUFACTURING OVERVIEW SECTION */}
      <section className="mfg-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`mfg-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            {/* Left Column: Copy */}
            <div className="mfg-overview-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Manufacturing</h2>
              <p className="mfg-overview-paragraph">
                At Ashirwad Plastics, our production system is built on precision engineering, state-of-the-art automation, and cleanroom molding capabilities. We serve the pharmaceutical packaging sector under strict international guidelines to ensure absolute dimensional accuracy, thickness tolerance, and secure closure functionality.
              </p>
              <p className="mfg-overview-paragraph">
                By integrating advanced materials, automated testing devices, and rigorous quality check protocols, we deliver robust solutions that prevent leakage, maintain sterile containment, and uphold product integrity throughout transit and usage.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="mfg-cta-link"
              >
                Consult with Experts <span className="mfg-cta-arrow">→</span>
              </a>
            </div>

            {/* Right Column: Manufacturing Image */}
            <div className="mfg-overview-right">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b1.png" 
                  alt="Manufacturing Process" 
                  onError={(e) => handleImageError(e, "Manufacturing Process")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FACILITY SECTION */}
      <section className="mfg-facility-section">
        <div className="container">
          <div ref={facilityRef} className={`mfg-facility-grid fade-section ${facilityVisible ? 'visible' : ''}`}>
            
            {/* Left: Large Image */}
            <div className="mfg-facility-left">
              <div className="mfg-facility-img-box">
                <img 
                  src="/b.png" 
                  alt="Ashirwad Plastics Manufacturing Cleanroom" 
                  onError={(e) => handleImageError(e, "Facility Cleanroom")}
                />
              </div>
            </div>

            {/* Right: Copy */}
            <div className="mfg-facility-right">
              <h2 className="mfg-section-title">Our Facility</h2>
              <div className="mfg-facility-desc">
                <p>
                  Established in 2018, our GMP-compliant manufacturing operations located in Himachal Pradesh operate with high-speed automated systems. Our cleanrooms are designed to maintain sterile environments and zero-contamination thresholds, meeting strict global regulatory criteria for pharmaceutical and cosmetic primary packaging production.
                </p>
                <p>
                  By focusing on <strong>Hygiene</strong>, <strong>Precision</strong>, <strong>Durability</strong>, and <strong>Automation</strong>, we ensure that every batch of ophthalmic droppers, measuring cups, and nasal sprays provides maximum chemical compatibility, neck sealing security, and dosage accuracy.
                </p>
                <p>
                  Our continuous integration of high-grade raw medical materials, robotic molding equipment, and multi-stage leak checks ensures that Ashirwad Plastics remains a trusted, premium manufacturing partner for B2B enterprises worldwide.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MANUFACTURING CAPABILITIES GRID (2x2) */}
      <section className="mfg-capabilities-section">
        <div className="container">
          <div ref={gridRef} className={`mfg-capabilities-grid fade-section ${gridVisible ? 'visible' : ''}`}>
            
            {/* Card 1: Production Line Image */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/b3.jpg" 
                alt="Plastic Containers Production Line" 
                onError={(e) => handleImageError(e, "Plastic Containers Line")}
              />
            </div>

            {/* Card 2: Dark Navy Content Card */}
            <div className="mfg-grid-card mfg-card-dark">
              <h3 className="mfg-card-heading">What Makes Ashirwad Better?</h3>
              <div className="mfg-benefits-list">
                
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Advanced Infrastructure</h4>
                    <p>State-of-the-art cleanroom molding facilities and automated high-speed machinery.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Customisation</h4>
                    <p>Tailored dimension molding, custom color matching, and design branding parameters.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Quality Control</h4>
                    <p>Rigorous leak testing, pressure checks, torque calibrations, and absolute traceability.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 3: Light Background Card */}
            <div className="mfg-grid-card mfg-card-light">
              <h3 className="mfg-card-heading" style={{ color: '#1F2937' }}>Our Manufacturing Philosophy</h3>
              <div className="mfg-benefits-list">

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>Safety & Environment</h4>
                    <p style={{ color: '#6B7280' }}>Adhering to strict occupational safety standards and eco-friendly waste management processes.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>Quality</h4>
                    <p style={{ color: '#6B7280' }}>Continuous R&D inspections and mold enhancements to guarantee defect-free product delivery.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4 style={{ color: '#1F2937' }}>On-Time Delivery</h4>
                    <p style={{ color: '#6B7280' }}>Optimized inventory pipelines and logistics channels ensuring prompt shipment schedules.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 4: Factory Floor Image */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/s7.png" 
                alt="Production Factory Floor" 
                onError={(e) => handleImageError(e, "Factory Floor")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR PEOPLE SECTION */}
      <section className="mfg-people-section">
        <div className="container">
          <div ref={peopleRef} className={`mfg-people-grid fade-section ${peopleVisible ? 'visible' : ''}`}>
            
            {/* Left Column: Copy */}
            <div className="mfg-people-left">
              <h2 className="mfg-section-title">Our People</h2>
              <div className="mfg-people-desc">
                <p>
                  At Ashirwad Plastics, our workforce is our primary driving force. We cultivate a strong organizational culture rooted in teamwork, safety, and continuous professional training. Every team member undergoes exhaustive training on cleanroom GMP protocols and automated device controls to guarantee zero-defect operational excellence.
                </p>
                <p>
                  We foster a collaborative work environment that encourages employee development, technological innovation, and compliance adherence. It is this shared dedication to excellence that enables us to deliver industry-leading pharmaceutical packaging products day in and day out.
                </p>
              </div>
            </div>

            {/* Right Column: Team Image */}
            <div className="mfg-people-right">
              <div className="mfg-people-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="Ashirwad Plastics Workforce Team" 
                  onError={(e) => handleImageError(e, "Workforce Team")}
                />
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
            <h2 className="cta-banner-heading">Want to Know More About Our Manufacturing Capabilities?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team to learn how our advanced manufacturing infrastructure can support your packaging requirements.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REACH OUT TODAY */}
      <ReachOut />

    </div>
  )
}
