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

export default function ProductDevelopmentPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [processRef, processVisible] = useFadeIn()
  const [bannerRef, bannerVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.dev-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'dev-img-fallback-badge'
      badge.style.width = '100%'
      badge.style.height = '100%'
      badge.style.display = 'flex'
      badge.style.flexDirection = 'column'
      badge.style.alignItems = 'center'
      badge.style.justifyContent = 'center'
      badge.style.background = 'rgba(255, 255, 255, 0.15)'
      badge.style.color = '#FFFFFF'
      badge.style.padding = '20px'
      badge.style.textAlign = 'center'
      badge.style.borderRadius = '20px'
      badge.style.backdropFilter = 'blur(10px)'
      badge.style.border = '1px solid rgba(255, 255, 255, 0.2)'
      
      badge.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.85;">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        <span style="font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">${label}</span>
      `
      parent.appendChild(badge)
    }
  }

  return (
    <div className="dev-page-wrapper">

      {/* 1. HERO SECTION */}
      <section 
        className="dev-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/a.webp')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`dev-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="dev-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">NEW PRODUCT DEVELOPMENT</span>
          </nav>
          <h1 className="dev-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>New Product<br />Development</h1>
          <p className="dev-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            At Ashirwad Plastics, new product development is built on a structured five-step process designed to ensure packaging requirements are met with precision, quality, and full satisfaction.
          </p>
        </div>
      </section>

      {/* 2. PROCESS OVERVIEW SECTION */}
      <section className="dev-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`dev-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="dev-overview-title">Our Commitment to Precision and Excellence!</h2>
            <p className="dev-overview-subtitle">Check out our videos for straightforward guidance.</p>
          </div>
        </div>
      </section>

      {/* 3. FIVE-STEP DEVELOPMENT PROCESS CONTAINER */}
      <section className="dev-process-section">
        <div className="container">
          <div ref={processRef} className={`dev-process-gradient-box fade-section ${processVisible ? 'visible' : ''}`}>
            
            {/* Step 1 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step1</div>
                <h3 className="dev-step-heading">Initial Expert Consultation</h3>
                <div className="dev-step-desc">
                  <p>Initial packaging consultation process.</p>
                  <p>Requirement gathering.</p>
                  <p>Industry recommendations.</p>
                  <p>Transportation considerations.</p>
                  <p>Project assessment.</p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a0.webp" 
                    alt="Initial Expert Consultation" 
                    onError={(e) => handleImageError(e, "Consultation Team")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 2 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 2</div>
                <h3 className="dev-step-heading">Customized Design Development</h3>
                <div className="dev-step-desc">
                  <p>Custom packaging development.</p>
                  <p>Design strategy.</p>
                  <p>Software-assisted planning.</p>
                  <p>Precision engineering.</p>
                  <p>Client collaboration.</p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a1.webp" 
                    alt="Customized Design Development" 
                    onError={(e) => handleImageError(e, "Design & Development Team")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 3 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 3</div>
                <h3 className="dev-step-heading">Prototype Creation and Approval</h3>
                <div className="dev-step-desc">
                  <p>Prototype development.</p>
                  <p>Client review.</p>
                  <p>Testing and validation.</p>
                  <p>Final design approval.</p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a3.webp" 
                    alt="Prototype Creation and Approval" 
                    onError={(e) => handleImageError(e, "Prototype Inspection")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 4 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 4</div>
                <h3 className="dev-step-heading">High-Quality Production</h3>
                <div className="dev-step-desc">
                  <p>Automated manufacturing.</p>
                  <p>Quality-controlled production.</p>
                  <p>Precision processes.</p>
                  <p>Industrial-grade packaging systems.</p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a4 (2).webp" 
                    alt="High-Quality Production" 
                    onError={(e) => handleImageError(e, "Automated Production")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 5 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step5</div>
                <h3 className="dev-step-heading">Comprehensive Quality Check</h3>
                <div className="dev-step-desc">
                  <p>Inspection process.</p>
                  <p>Quality verification.</p>
                  <p>Compliance review.</p>
                  <p>Final approval before delivery.</p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a5.webp" 
                    alt="Comprehensive Quality Check" 
                    onError={(e) => handleImageError(e, "Quality Assurance")}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div ref={bannerRef} className={`cta-banner-grid fade-section ${bannerVisible ? 'visible' : ''}`}>
            <h2 className="cta-banner-heading">Have a Packaging Requirement in Mind?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Our team is ready to guide you through every step of the development process from initial consultation to final delivery.
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
