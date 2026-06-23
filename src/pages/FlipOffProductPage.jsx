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

export default function FlipOffProductPage({ onNavigate }) {
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
    "/Flip off Seals.webp"
  ]

  // Gallery images (simulated product variants)
  const galleryImages = [
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_35_32 AM.webp", label: "Flip-Off Seal 13mm" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_35_32 AM.webp", label: "Flip-Off Seal 20mm" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_35_32 AM.webp", label: "Flip-Off Seal 28mm" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_35_32 AM.webp", label: "Aluminium Collar Detail" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_35_32 AM.webp", label: "Various Colors Selection" },
    { src: "/Product_Images/ChatGPT Image Jun 18, 2026, 01_35_32 AM.webp", label: "Tamper-Evident Feature" }
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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/Flip off Seals.webp')",
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
              <span className="breadcrumb-active">FLIP-OFF SEALS</span>
            </nav>
            <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Flip-Off Seals</h1>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <div className="op-tabs-bar" ref={tabsRef}>
        <div className="container op-tabs-container">
          {productsList.map((prod, idx) => (
            <button 
              key={idx}
              className={`op-tab-btn ${prod.path === 'product-flipoff' ? 'active' : ''}`} 
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
            <h2 className="op-overview-title">Secure &amp; Tamper-Evident Sealing Solutions</h2>
            <p className="op-overview-subtitle">
              Ashirwad Plastics manufactures high-quality flip-off seals designed to maintain sterility, product integrity, and tamper-evidence for injectable pharmaceutical packaging.
            </p>

            {/* Product Showcase Card */}
            <div className="op-showcase-card">
              
              {/* Image Carousel */}
              <div className="op-carousel-wrapper">
                <div className="op-carousel-slide">
                  <img 
                    src={carouselImages[activeSlide]} 
                    alt={`Flip-Off Seal Render ${activeSlide + 1}`}
                    onError={(e) => handleImageError(e, `Showcase Slide ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="op-showcase-desc">
                Our flip-off seals are engineered to meet the strict safety and quality demands of the pharmaceutical industry, providing a secure and clean closure for standard injection vials.
              </p>

              {/* Product Specifications Badges */}
              <div className="op-tags-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-gray)', paddingTop: '40px', alignItems: 'flex-start' }}>
                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Color Options</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Blue</span>
                    <span className="op-pill">Red</span>
                    <span className="op-pill">Green</span>
                    <span className="op-pill">White</span>
                    <span className="op-pill">Yellow</span>
                    <span className="op-pill">Custom (as requested)</span>
                  </div>
                </div>

                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Materials Used</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Pharmaceutical Grade Plastic</span>
                    <span className="op-pill">High-Purity Aluminium</span>
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
                    "Tamper-evident protection",
                    "Secure and reliable sealing performance",
                    "Pharmaceutical-grade quality materials",
                    "Available in multiple color options",
                    "Compatible with standard pharmaceutical vials"
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
                    "Injectable Pharmaceuticals",
                    "Healthcare Packaging",
                    "Sterile Drug Packaging"
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
                Manufactured in controlled environments using pharmaceutical-grade materials with stringent quality checks to ensure consistent sealing integrity, sterility, and compliance with international pharmaceutical packaging standards.
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
                    { spec: "Product Type", detail: "Flip-Off Seal" },
                    { spec: "Material", detail: "Pharmaceutical Grade Plastic & Aluminium" },
                    { spec: "Color Options", detail: "Multiple (as per requirement)" },
                    { spec: "Application", detail: "Injectable / Sterile Packaging" },
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
                    "ISO & GMP compliant manufacturing",
                    "Multiple color options available",
                    "Reliable compatibility with standard vials",
                    "Consistent product quality and dimensions",
                    "High-volume supply capabilities"
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
            <h2 className="cta-banner-heading">Looking for Reliable Flip-Off Seals?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team for customized flip-off seal solutions tailored to your pharmaceutical packaging requirements.
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
