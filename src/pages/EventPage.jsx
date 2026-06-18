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

export default function EventPage({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [highlightsRef, highlightsVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [futureRef, futureVisible] = useFadeIn()
  const [meetingRef, meetingVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.ep-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'ep-img-fallback-badge'
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
    <div className="ep-page-wrapper">

      <section 
        className="ep-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/l0.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'var(--white)',
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`ep-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="ep-breadcrumb" style={{ color: '#E5E7EB', margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active" style={{ color: 'var(--white)' }}>CPHI PMEC INDIA 2025</span>
          </nav>
          <h1 className="ep-hero-title" style={{ color: 'var(--white)', margin: 0, lineHeight: 1.15 }}>Our Presence at CPHI-PMEC India 2025</h1>
        </div>
      </section>

      {/* 2. EVENT OVERVIEW SECTION */}
      <section className="ep-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`ep-overview-grid fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            {/* Left Side: Overview Details */}
            <div className="ep-overview-left">
              <h2 className="ep-overview-heading">Connecting, Collaborating &amp; Showcasing Innovation</h2>
              <p className="ep-overview-desc">
                CPHI-PMEC India 2025 provided an excellent international platform to connect with industry leaders, partners, and pharmaceutical manufacturers. At the exhibition, Ashirwad Plastics presented our next-generation primary packaging and dispensing systems, highlighting strict safety standards and regulatory compliance.
              </p>
              <p className="ep-overview-desc">
                Engaging with global healthcare companies, we focused on custom engineering solutions that enhance drug sterility and delivery convenience, laying a path for the future of pharmaceutical packaging.
              </p>
            </div>

            {/* Right Side: 2x3 Grid */}
            <div className="ep-overview-right">
              <div className="ep-overview-gallery">
                <div className="ep-ov-gallery-img">
                  <img src="/cp1.jpg" alt="Exhibition scene 1" onError={(e) => handleImageError(e, "Exhibition 1")} />
                </div>
                <div className="ep-ov-gallery-img">
                  <img src="/cp2.png" alt="Exhibition scene 2" onError={(e) => handleImageError(e, "Exhibition 2")} />
                </div>
                <div className="ep-ov-gallery-img">
                  <img src="/cp3.png" alt="Exhibition scene 3" onError={(e) => handleImageError(e, "Exhibition 3")} />
                </div>
                <div className="ep-ov-gallery-img">
                  <img src="/cp4.png" alt="Exhibition scene 4" onError={(e) => handleImageError(e, "Exhibition 4")} />
                </div>
                <div className="ep-ov-gallery-img">
                  <img src="/cp5.png" alt="Exhibition scene 5" onError={(e) => handleImageError(e, "Exhibition 5")} />
                </div>
                <div className="ep-ov-gallery-img">
                  <img src="/cp6.png" alt="Exhibition scene 6" onError={(e) => handleImageError(e, "Exhibition 6")} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EVENT HIGHLIGHTS SECTION */}
      <section className="ep-highlights-section" ref={highlightsRef}>
        <div className="container">
          <div className={`ep-highlights-container fade-section ${highlightsVisible ? 'visible' : ''}`}>
            
            {/* Highlights Header */}
            <div className="ep-highlights-header">
              <h2 className="ep-highlights-heading">Event Highlights</h2>
              <p className="ep-highlights-intro">
                CPHI-PMEC 2025 was a milestone event for us. Here are the core areas where we made a significant impact during the exhibition.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="ep-highlights-grid">
              
              {/* Card 1 */}
              <div className="ep-highlight-card">
                <div className="ep-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Industry Engagement</h3>
                <p>Engaged with manufacturers, partners, and healthcare professionals globally.</p>
              </div>

              {/* Card 2 */}
              <div className="ep-highlight-card">
                <div className="ep-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <h3>Product Showcase</h3>
                <p>Presented high-precision pharmaceutical packaging and dispensing solutions.</p>
              </div>

              {/* Card 3 */}
              <div className="ep-highlight-card">
                <div className="ep-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <h3>Strategic Partnerships</h3>
                <p>Established new B2B partnerships and collaborative growth opportunities.</p>
              </div>

              {/* Card 4 */}
              <div className="ep-highlight-card">
                <div className="ep-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>
                <h3>Innovation &amp; Compliance</h3>
                <p>Strengthened packaging security, materials quality, and regulatory expertise.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION */}
      <section className="ep-gallery-section" ref={galleryRef}>
        <div className="container">
          <div className={`ep-gallery-header fade-section ${galleryVisible ? 'visible' : ''}`}>
            <h2 className="ep-gallery-title">Gallery</h2>
            <p className="ep-gallery-desc">
              A glimpse of our participation, interactions, and product showcase at CPHI-PMEC India 2025.
            </p>
          </div>

          <div className="ep-gallery-scroller">
            <div className="ep-gallery-item">
              <img src="/cp1.jpg" alt="Client Interaction" onError={(e) => handleImageError(e, "Exhibition Stand 1")} />
            </div>
            <div className="ep-gallery-item">
              <img src="/cp2.png" alt="Audience Presentation" onError={(e) => handleImageError(e, "Exhibition Stand 2")} />
            </div>
            <div className="ep-gallery-item">
              <img src="/cp3.png" alt="Networking Discussion" onError={(e) => handleImageError(e, "Exhibition Stand 3")} />
            </div>
            <div className="ep-gallery-item">
              <img src="/cp4.png" alt="Exhibition Floor" onError={(e) => handleImageError(e, "Exhibition Stand 4")} />
            </div>
            <div className="ep-gallery-item">
              <img src="/cp5.png" alt="Exhibition Showcase" onError={(e) => handleImageError(e, "Exhibition Stand 5")} />
            </div>
            <div className="ep-gallery-item">
              <img src="/cp6.png" alt="Product Presentation" onError={(e) => handleImageError(e, "Exhibition Stand 6")} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FUTURE EVENT CTA SECTION */}
      <section className="ep-future-section" ref={futureRef}>
        <div className="container">
          <div className={`ep-future-container fade-section ${futureVisible ? 'visible' : ''}`}>
            <div className="ep-future-grid">
              
              {/* Left: Future info */}
              <div className="ep-future-left">
                <h2 className="ep-future-heading">Meet Us at CPHI 2026<br />Continuing the Journey of Innovation</h2>
                <p className="ep-future-desc">
                  Building on our success at CPHI 2025, we look forward to greeting partners, healthcare innovators, and global pharmaceutical manufacturers at CPHI India 2026. Join us to discuss how our state-of-the-art manufacturing, regulatory compliance, and customized dispensing technologies can elevate your product safety.
                </p>
                <div style={{ marginTop: '32px' }}>
                  <button className="ep-btn-future-cta" onClick={() => onNavigate('contact')}>
                    Get Event Schedule
                  </button>
                </div>
              </div>

              {/* Right: Large event photo */}
              <div className="ep-future-right">
                <div className="ep-future-img-box">
                  <img 
                    src="/l5.webp" 
                    alt="Ashirwad plastics at CPHI future"
                    onError={(e) => handleImageError(e, "Future Event 2026")}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. SCHEDULE MEETING SECTION */}
      <section 
        className="ep-meeting-section" 
        ref={meetingRef}
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(13, 28, 61, 0.7), rgba(13, 28, 61, 0.85)), url('/l6.webp')"
        }}
      >
        <div className="container ep-meeting-grid">
          
          {/* Floating meeting Form Card */}
          <div className="ep-meeting-card">
            <span className="ep-meeting-label">Schedule A Meeting</span>
            <h2 className="ep-meeting-heading">Planning to attend CPHI 2026?</h2>
            <p className="ep-meeting-desc">
              Schedule a one-on-one session with our technical experts to discuss your custom pharmaceutical packaging requirements.
            </p>
            
            {submitted ? (
              <div className="ep-form-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" style={{ marginBottom: '12px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <h4>Thank You!</h4>
                <p>We will contact you shortly to confirm your schedule.</p>
              </div>
            ) : (
              <form className="ep-meeting-form" onSubmit={handleFormSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your business email..." 
                  className="ep-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="ep-form-submit-btn">
                  Submit Now <span style={{ marginLeft: '4px' }}>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Event counters */}
          <div className="ep-stats-block">
            <div className="ep-stat-item">
              <div className="ep-stat-number">15+</div>
              <div className="ep-stat-label">Global Pharma Events Attended</div>
            </div>
            <div className="ep-stat-item" style={{ marginTop: '40px' }}>
              <div className="ep-stat-number">500+</div>
              <div className="ep-stat-label">Industry Professionals Engaged</div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. EVENT CTA BANNER */}
      <section className="cta-banner-section" ref={ctaRef}>
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div className="cta-banner-grid">
            <h2 className="cta-banner-heading">See You at CPHI 2026</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                We look forward to building new partnerships, sharing innovative solutions, and shaping the future of pharmaceutical packaging together.
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
