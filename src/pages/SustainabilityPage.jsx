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
  const [galleryRef, galleryVisible] = useFadeIn()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const galleryItems = [
    { img: '/sustainibility/1.webp' },
    { img: '/sustainibility/2.webp' },
    { img: '/sustainibility/3.webp' },
    { img: '/sustainibility/4.webp' },
    { img: '/sustainibility/5.webp' },
    { img: '/sustainibility/6.webp' },
    { img: '/sustainibility/7.webp' },
    { img: '/sustainibility/8.webp' }
  ]

  const maxSlide = Math.max(0, galleryItems.length - 3)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, maxSlide])

  const nextSlide = () => setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))

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

            {/* Right Column: Single Prominent Image */}
            <div className="mfg-overview-right">
              <div 
                className="mfg-facility-img-box" 
                style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  height: '100%', 
                  minHeight: '380px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)'
                }}
              >
                <img 
                  src="/sustainibility/7.webp" 
                  alt="Environmental Responsibility" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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

      {/* 4. SUSTAINABILITY IN ACTION: COMPACT MULTI-CARD CAROUSEL GALLERY */}
      <section 
        className="sustainability-gallery-section" 
        ref={galleryRef}
        style={{ 
          backgroundColor: '#F8FAFC', 
          padding: '40px 0', 
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0'
        }}
      >
        <div className="container">
          <div className={`fade-section ${galleryVisible ? 'visible' : ''}`}>
            
            {/* Header with Title on Left, Controls on Right */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end', 
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'rgba(34, 197, 94, 0.1)', 
                  color: '#16A34A', 
                  borderRadius: '20px', 
                  padding: '3px 12px', 
                  fontSize: '11.5px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.8px',
                  marginBottom: '6px'
                }}>
                  Sustainability In Action
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
                  Eco-Initiatives &amp; Facility Gallery
                </h2>
              </div>

              {/* Prev / Next Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#64748B', marginRight: '6px' }}>
                  {currentSlide + 1} - {Math.min(currentSlide + 3, galleryItems.length)} of {galleryItems.length}
                </span>
                <button 
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#22C55E'
                    e.currentTarget.style.borderColor = '#22C55E'
                    e.currentTarget.style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF'
                    e.currentTarget.style.borderColor = '#CBD5E1'
                    e.currentTarget.style.color = '#0F172A'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#22C55E'
                    e.currentTarget.style.borderColor = '#22C55E'
                    e.currentTarget.style.color = '#FFFFFF'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF'
                    e.currentTarget.style.borderColor = '#CBD5E1'
                    e.currentTarget.style.color = '#0F172A'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Multi-Card Carousel Viewport */}
            <div 
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                padding: '4px 2px'
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className="sustainability-carousel-track"
                style={{
                  display: 'flex',
                  gap: '16px',
                  transform: `translateX(calc(-${currentSlide} * (33.3333% + 5.33px)))`,
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                {galleryItems.map((item, idx) => (
                  <div 
                    key={idx}
                    className="sustainability-card-item"
                    style={{
                      flex: '0 0 calc((100% - 32px) / 3)',
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1px solid #E2E8F0',
                      padding: '8px',
                      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxSizing: 'border-box',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.04)'
                    }}
                  >
                    {/* Uncropped Image Box: contain ensures 100% complete visibility */}
                    <div 
                      style={{
                        width: '100%',
                        height: '190px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <img 
                        src={item.img} 
                        alt="Sustainability Initiative"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                        onError={(e) => handleImageError(e, "Sustainability Initiative")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
              {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide page ${idx + 1}`}
                  style={{
                    width: currentSlide === idx ? '22px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: currentSlide === idx ? '#22C55E' : '#CBD5E1',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.25s ease'
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. COMMITMENT BEYOND THE ENVIRONMENT */}
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

      {/* 6. JOURNEY FORWARD */}
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

      {/* 7. CTA BANNER SECTION */}
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
