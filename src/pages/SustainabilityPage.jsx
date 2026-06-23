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

export default function SustainabilityPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [journeyRef, journeyVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [commitmentRef, commitmentVisible] = useFadeIn()
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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/sustainibility/1.webp')",
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
            <span className="breadcrumb-active">SUSTAINABILITY</span>
          </nav>
          <h1 className="mfg-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Sustainability</h1>
          <p className="mfg-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            A core value that shapes every decision we make. We recognise that our choices today have a lasting impact on the world.
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="mfg-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`mfg-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            <div className="mfg-overview-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Environmental Responsibility</h2>
              <p className="mfg-overview-paragraph">
                Sustainability is not an afterthought at Ashirwad Plastics - it is a core value that shapes every decision we make. We recognise that our choices today have a lasting impact on the world we leave for future generations.
              </p>
              <p className="mfg-overview-paragraph">
                From responsible material sourcing to energy-efficient manufacturing, we are committed to minimising our environmental footprint and contributing to a cleaner, more sustainable future.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="mfg-cta-link"
              >
                Learn More About Our Efforts <span className="mfg-cta-arrow">→</span>
              </a>
            </div>

            <div className="mfg-overview-right">
              <div className="mfg-facility-img-box">
                <img 
                  src="/sustainibility/7.webp" 
                  alt="Environmental Responsibility" 
                  onError={(e) => handleImageError(e, "Environmental Responsibility")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SUSTAINABILITY PRACTICES GRID (3x2) */}
      <section className="mfg-capabilities-section">
        <div className="container">
          <div ref={gridRef} className={`mfg-capabilities-grid fade-section ${gridVisible ? 'visible' : ''}`}>
            
            {/* Card 1: What We Do (Image) */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/sustainibility/3.webp" 
                alt="Recycled Materials Line" 
                onError={(e) => handleImageError(e, "Recycled Materials")}
              />
            </div>

            {/* Card 2: What We Do (Text) */}
            <div className="mfg-grid-card mfg-card-dark">
              <h3 className="mfg-card-heading">What We Do for a Sustainable Future</h3>
              <div className="mfg-benefits-list">
                
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Recycled Materials</h4>
                    <p>We prioritise the use of recycled and recyclable plastics across our manufacturing processes wherever possible reducing waste, conserving natural resources, and contributing to a circular economy.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Energy Efficiency</h4>
                    <p>Our manufacturing facilities are designed with energy efficiency at the forefront. We continuously work to optimise our processes and reduce energy consumption across all operations.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 3: Waste Reduction (Text) */}
            <div className="mfg-grid-card mfg-card-light">
              <h3 className="mfg-card-heading" style={{ color: '#1F2937' }}>Waste Reduction</h3>
              <div className="mfg-benefits-list">
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6' }}>Through efficient resource management and proactive recycling initiatives, we minimise waste generation during production reducing landfill contributions and improving overall resource utilisation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Waste Reduction (Image) */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/sustainibility/4.webp" 
                alt="Waste Reduction" 
                onError={(e) => handleImageError(e, "Waste Reduction")}
              />
            </div>

            {/* Card 5: Sustainable Practices (Image) */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/sustainibility/5.webp" 
                alt="Sustainable Practices" 
                onError={(e) => handleImageError(e, "Sustainable Practices")}
              />
            </div>

            {/* Card 6: Sustainable Practices (Text) */}
            <div className="mfg-grid-card mfg-card-light">
              <h3 className="mfg-card-heading" style={{ color: '#1F2937' }}>Sustainable Practices</h3>
              <div className="mfg-benefits-list">
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6' }}>From the responsible sourcing of raw materials to eco-friendly packaging solutions, sustainability is embedded into our day-to-day operations at every level.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMMITMENT BEYOND THE ENVIRONMENT */}
      <section className="mfg-facility-section">
        <div className="container">
          <div ref={commitmentRef} className={`mfg-facility-grid fade-section ${commitmentVisible ? 'visible' : ''}`}>
            
            <div className="mfg-facility-left">
              <div className="mfg-facility-img-box">
                <img 
                  src="/sustainibility/2.webp" 
                  alt="Sustainable Workplace" 
                  onError={(e) => handleImageError(e, "Sustainable Workplace")}
                />
              </div>
            </div>

            <div className="mfg-facility-right">
              <h2 className="mfg-section-title">Beyond the Environment</h2>
              <div className="mfg-facility-desc">
                <p>
                  Sustainability at Ashirwad Plastics extends beyond environmental responsibility. We are equally committed to social responsibility and ethical business conduct ensuring safe working conditions, fair treatment of employees, and meaningful contributions to the communities we operate in.
                </p>
                <p>
                  We believe that a truly sustainable business is one that creates positive impact across people, planet, and performance.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. JOURNEY FORWARD */}
      <section className="mfg-people-section" style={{ borderTop: '1px solid var(--border-gray)' }}>
        <div className="container">
          <div ref={journeyRef} className={`mfg-people-grid fade-section ${journeyVisible ? 'visible' : ''}`}>
            
            <div className="mfg-people-left">
              <h2 className="mfg-section-title">Our Journey Forward</h2>
              <div className="mfg-people-desc">
                <p>
                  Sustainability is not a destination - it is a continuous journey of improvement and accountability. We hold ourselves to high standards, lead by example within our industry, and are committed to driving meaningful, lasting change.
                </p>
                <p>
                  Together with our customers, partners, and communities, we are working towards a more sustainable world.
                </p>
              </div>
            </div>

            <div className="mfg-people-right">
              <div className="mfg-people-img-box">
                <img 
                  src="/sustainibility/6.webp" 
                  alt="Our Journey Forward" 
                  onError={(e) => handleImageError(e, "Journey Forward")}
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
            <h2 className="cta-banner-heading">Want to Learn More About Our Sustainability Efforts?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our team to understand how our sustainable practices can align with your business values.
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
