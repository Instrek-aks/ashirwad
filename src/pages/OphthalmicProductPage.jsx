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

export default function OphthalmicProductPage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(1)
  
  const [heroRef, heroVisible] = useFadeIn()
  const [tabsRef, tabsVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [featureRef, featureVisible] = useFadeIn()
  const [specsRef, specsVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  // Carousel images
  const carouselImages = [
    "/ophthalmic_user.png",
    "/ophthalmic_user.png",
    "/ophthalmic_user.png"
  ]

  // Gallery images (simulated product variants)
  const galleryImages = [
    { src: "/ophthalmic_user.png", label: "Ophthalmic Bottle 5ml" },
    { src: "/ophthalmic_user.png", label: "Ophthalmic Bottle 7ml" },
    { src: "/ophthalmic_user.png", label: "Ophthalmic Bottle 10ml" },
    { src: "/ophthalmic_user.png", label: "Ophthalmic Bottle 15ml" },
    { src: "/ophthalmic_user.png", label: "CRC Closure Detail" },
    { src: "/ophthalmic_user.png", label: "Tamper-Evident Closure" }
  ]

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.op-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'op-img-fallback-badge'
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
    <div className="op-page-wrapper">

      <section 
        className="op-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(245, 245, 245, 0.45), rgba(245, 245, 245, 0.55)), url('/d0.webp')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`op-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="op-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span onClick={() => onNavigate('contact')} style={{ cursor: 'pointer' }}>PRODUCTS</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">OPHTHALMIC DELIVERY SYSTEM</span>
          </nav>
          <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Ophthalmic<br />Delivery System</h1>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <div className="op-tabs-bar" ref={tabsRef}>
        <div className="container op-tabs-container">
          <button className="op-tab-btn active">Ophthalmic Delivery System ↗</button>
          <button className="op-tab-btn" onClick={() => onNavigate('product-nasal')}>Nasal Delivery System ↗</button>
          <button className="op-tab-btn" onClick={() => onNavigate('contact')}>Flip off Seals ↗</button>
          <button className="op-tab-btn" onClick={() => onNavigate('contact')}>Measuring Caps &amp; Oral Droppers ↗</button>
          <button className="op-tab-btn" onClick={() => onNavigate('contact')}>Glass Droppers ↗</button>
        </div>
      </div>

      {/* 3. PRODUCT OVERVIEW SECTION */}
      <section className="op-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`op-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="op-overview-title">Precision Packaging for Ophthalmic Applications</h2>
            <p className="op-overview-subtitle">
              Ashirwad Plastics offers advanced ophthalmic delivery systems engineered to ensure sterility, dosage accuracy, and product safety. Designed for pharmaceutical-grade applications, our solutions meet stringent quality and regulatory standards for reliable eye-care packaging
            </p>

            {/* Product Showcase Card */}
            <div className="op-showcase-card">
              
              {/* Image Carousel */}
              <div className="op-carousel-wrapper">
                <div className="op-carousel-slide">
                  <img 
                    src={carouselImages[activeSlide]} 
                    alt={`Ophthalmic Product Render ${activeSlide + 1}`}
                    onError={(e) => handleImageError(e, `Showcase Slide ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="op-showcase-desc">
                Our ophthalmic packaging range is manufactured using high-quality pharmaceutical-grade materials within controlled manufacturing environments. Engineered for precision and patient safety, these solutions are ideal for ophthalmic formulations requiring contamination-free dispensing and secure closures.
              </p>

              {/* Product Specifications Badges */}
              <div className="op-tags-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-gray)', paddingTop: '40px', alignItems: 'flex-start' }}>
                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Available Sizes</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>5 ml ↗</span>
                    <span className="op-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>7 ml ↗</span>
                    <span className="op-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>10 ml ↙</span>
                    <span className="op-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>15 ml ↗</span>
                  </div>
                </div>

                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Available Components</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Dropper Bottles</span>
                    <span className="op-pill">CRC Closures</span>
                    <span className="op-pill">Tamper-Evident Closures</span>
                    <span className="op-pill">Tear-Off TE Closures</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT IMAGES GALLERY */}
      <section className="op-gallery-section" ref={galleryRef}>
        <div className="container">
          <div className={`fade-section ${galleryVisible ? 'visible' : ''}`}>
            
            <h2 className="op-gallery-title">Ophthalmic Delivery System Product Images</h2>
            
            <div className="op-gallery-grid">
              {galleryImages.map((item, i) => (
                <div key={i} className="op-gallery-card">
                  <div className="op-gallery-img-box">
                    <img 
                      src={item.src} 
                      alt={item.label} 
                      onError={(e) => handleImageError(e, item.label)}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURES & APPLICATIONS SECTION */}
      <section className="op-features-section" ref={featureRef}>
        <div className="container">
          <div className={`fade-section ${featureVisible ? 'visible' : ''}`}>
            
            <div className="op-features-grid">
              
              {/* Left Card: Key Features */}
              <div className="op-feature-card op-card-light">
                <h3>Key Features</h3>
                <div className="op-feature-list">
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>High-precision dispensing performance</span>
                  </div>
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Tamper-evident safety systems</span>
                  </div>
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Leak-resistant packaging design</span>
                  </div>
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Pharmaceutical-grade raw materials</span>
                  </div>
                </div>
              </div>

              {/* Right Card: Applications */}
              <div className="op-feature-card op-card-navy">
                <h3>Applications Suitable for:</h3>
                <div className="op-feature-list">
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Eye Drops</span>
                  </div>
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Ophthalmic Solutions</span>
                  </div>
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Sterile Pharmaceutical Formulations</span>
                  </div>
                  <div className="op-feature-item">
                    <span className="op-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Prescription &amp; OTC Eye Care Products</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Manufacturing Text Below Cards */}
            <div className="op-manufacturing-standards">
              <div className="op-mfg-title">Manufacturing &amp; Quality Standards</div>
              <div className="op-mfg-desc">
                Our ophthalmic products are manufactured under strict GMP compliance protocols. We implement high-speed automated assembly lines and multi-stage optoelectronic dimensional checks to guarantee absolute defect-free packaging safety for global pharmaceutical clients.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TECHNICAL SPECIFICATIONS SECTION */}
      <section className="op-specs-section" ref={specsRef}>
        <div className="container">
          <div className={`fade-section ${specsVisible ? 'visible' : ''}`}>
            
            <h2 className="op-specs-title">Technical Specifications</h2>
            
            <div className="op-table-wrapper">
              <table className="op-specs-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product Type</td>
                    <td>Ophthalmic Delivery System</td>
                  </tr>
                  <tr>
                    <td>Sizes Available</td>
                    <td>5 ml, 6 ml, 10 ml, 15 ml</td>
                  </tr>
                  <tr>
                    <td>Material</td>
                    <td>Pharmaceutical Grade Plastic</td>
                  </tr>
                  <tr>
                    <td>Closure Options</td>
                    <td>CRC / Tamper Evident / Tear-Off</td>
                  </tr>
                  <tr>
                    <td>Application</td>
                    <td>Ophthalmic Formulations</td>
                  </tr>
                  <tr>
                    <td>Compliance</td>
                    <td>GMP / ISO Standards</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE ASHIRWAD SECTION */}
      <section className="op-why-section" ref={whyRef}>
        <div className="container">
          <div className={`op-why-container fade-section ${whyVisible ? 'visible' : ''}`}>
            <div className="op-why-grid">
              
              {/* Left Column: Benefits */}
              <div className="op-why-left">
                <h2 className="op-why-heading">Why Choose Ashirwad Plastics?</h2>
                <div className="op-why-list">
                  <div className="op-why-item">
                    <span className="op-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="op-why-text">ISO &amp; GMP compliant manufacturing</span>
                  </div>
                  <div className="op-why-item">
                    <span className="op-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="op-why-text">High-volume production capabilities</span>
                  </div>
                  <div className="op-why-item">
                    <span className="op-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="op-why-text">Advanced automated manufacturing systems</span>
                  </div>
                  <div className="op-why-item">
                    <span className="op-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="op-why-text">Strong focus on product safety and precision</span>
                  </div>
                  <div className="op-why-item">
                    <span className="op-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="op-why-text">Regulatory-ready pharmaceutical packaging solutions</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="op-why-right">
                <div className="op-why-img-box">
                  <img 
                    src="/s7.webp" 
                    alt="Ashirwad plastics workforce" 
                    onError={(e) => handleImageError(e, "Workforce Team")}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER SECTION */}
      <section className="cta-banner-section" ref={ctaRef}>
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div className="cta-banner-grid">
            <h2 className="cta-banner-heading">Looking for Reliable Ophthalmic Packaging Solutions?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our team for customized ophthalmic packaging and dispensing solutions tailored to your requirements.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. REACH OUT TODAY */}
      <ReachOut />

    </div>
  )
}
