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

export default function CapsClosuresProductPage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0)
  
  const [heroRef, heroVisible] = useFadeIn()
  const [tabsRef, tabsVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [featureRef, featureVisible] = useFadeIn()
  const [specsRef, specsVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()

  // Carousel images
  const carouselImages = [
    "/Caps and Closures.webp"
  ]

  // Gallery images (simulated product variants)
  const galleryImages = [
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_33_56 AM.webp", label: "Flip-Top Cap Model" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_33_56 AM.webp", label: "Standard Screw Cap" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_33_56 AM.webp", label: "Child-Resistant CRC Cap" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_33_56 AM.webp", label: "Tamper-Evident Closure" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_33_56 AM.webp", label: "Sealing Liner Detail" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_33_56 AM.webp", label: "Multiple Sizes Display" }
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

  const productsList = [
    { name: 'Ophthalmic Delivery System ↗', path: 'product-ophthalmic' },
    { name: 'Nasal Delivery System ↗', path: 'product-nasal' },
    { name: 'Flip off Seals ↗', path: 'product-flipoff' },
    { name: 'Measuring Caps & Oral Droppers ↗', path: 'product-measuring' },
    { name: 'Glass Droppers ↗', path: 'product-glass-dropper' }
  ]

  return (
    <div className="op-page-wrapper">

      <section 
        className="op-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/Caps and Closures.webp')",
          position: 'relative',
          minHeight: '280px',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          padding: '40px 0'
        }}
      >
        <div className="container">
          <div 
            ref={heroRef} 
            className={`op-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
            style={{ 
              position: 'relative',
              maxWidth: '852px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'left'
            }}
          >
            <nav className="op-breadcrumb" style={{ margin: 0 }}>
              <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>PRODUCTS</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-active">CAPS &amp; CLOSURES</span>
            </nav>
            <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Caps &amp; Closures</h1>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <div className="op-tabs-bar" ref={tabsRef}>
        <div className="container op-tabs-container">
          {productsList.map((prod, idx) => (
            <button 
              key={idx}
              className={`op-tab-btn ${prod.path === 'product-caps-closures' ? 'active' : ''}`} 
              onClick={() => onNavigate(prod.path)}
            >
              {prod.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT OVERVIEW SECTION */}
      <section className="op-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`op-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="op-overview-title">Secure Packaging Protection Solutions</h2>
            <p className="op-overview-subtitle">
              Ashirwad Plastics offers a comprehensive range of caps and closures designed for product safety, sealing integrity, and regulatory compliance across pharmaceutical, cosmetic, and nutraceutical packaging.
            </p>

            {/* Product Showcase Card */}
            <div className="op-showcase-card">
              
              {/* Image Carousel */}
              <div className="op-carousel-wrapper">
                <div className="op-carousel-slide">
                  <img 
                    src={carouselImages[activeSlide]} 
                    alt={`Caps & Closures Render ${activeSlide + 1}`}
                    onError={(e) => handleImageError(e, `Showcase Slide ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="op-showcase-desc">
                Available in multiple sizes and closure types, our solutions are built to protect products at every stage from production to end-use.
              </p>

              {/* Product Specifications Badges */}
              <div className="op-tags-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-gray)', paddingTop: '40px', alignItems: 'flex-start' }}>
                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Closure Types</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Flip-Top Caps</span>
                    <span className="op-pill">Screw Caps</span>
                    <span className="op-pill">Child-Resistant Closures (CRC)</span>
                    <span className="op-pill">Tamper-Evident Closures</span>
                  </div>
                </div>

                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Materials Used</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Pharmaceutical Grade Plastic</span>
                    <span className="op-pill">Cosmetic Grade Plastic</span>
                  </div>
                </div>
              </div>

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
                  {[
                    "Tamper-evident options for product safety",
                    "Child-resistant closures available",
                    "Secure and leak-proof sealing performance",
                    "Multiple size configurations",
                    "High durability and material compatibility",
                    "Suitable for pharmaceutical and cosmetic use"
                  ].map((feat, idx) => (
                    <div key={idx} className="op-feature-item">
                      <span className="op-check-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Card: Applications */}
              <div className="op-feature-card op-card-navy">
                <h3>Applications Suitable for:</h3>
                <div className="op-feature-list">
                  {[
                    "Pharmaceutical Packaging",
                    "Healthcare Products",
                    "Cosmetic Packaging",
                    "Nutraceutical Products",
                    "Personal Care Products"
                  ].map((app, idx) => (
                    <div key={idx} className="op-feature-item">
                      <span className="op-check-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Manufacturing Text Below Cards */}
            <div className="op-manufacturing-standards">
              <div className="op-mfg-title">Manufacturing &amp; Quality Standards</div>
              <div className="op-mfg-desc">
                Manufactured using high-grade materials with precision tooling and strict quality control systems to deliver consistent sealing performance, dimensional accuracy, and regulatory compliance across all closure types.
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
                  {[
                    { spec: "Product Type", detail: "Caps & Closures" },
                    { spec: "Closure Types", detail: "Flip-Top / Screw Cap / CRC / Tamper Evident" },
                    { spec: "Material", detail: "Pharmaceutical / Cosmetic Grade Plastic" },
                    { spec: "Size Options", detail: "Multiple (as per requirement)" },
                    { spec: "Application", detail: "Pharma / Cosmetic / Nutraceutical" },
                    { spec: "Compliance", detail: "GMP / ISO Standards" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.spec}</td>
                      <td>{row.detail}</td>
                    </tr>
                  ))}
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
                  {[
                    "Wide range of closure types and sizes",
                    "Pharmaceutical and cosmetic grade materials",
                    "Child-resistant and tamper-evident options",
                    "Consistent quality and dimensional accuracy",
                    "Scalable manufacturing for high-volume requirements"
                  ].map((why, idx) => (
                    <div key={idx} className="op-why-item">
                      <span className="op-why-check">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="op-why-text">{why}</span>
                    </div>
                  ))}
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
            <h2 className="cta-banner-heading">Looking for Reliable Caps &amp; Closures?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team to find the right closure solution for your packaging requirements.
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
