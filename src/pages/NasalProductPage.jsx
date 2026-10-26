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

export default function NasalProductPage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0)
  
  const [heroRef, heroVisible] = useFadeIn()
  const [tabsRef, tabsVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [featureRef, featureVisible] = useFadeIn()
  const [specsRef, specsVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  // Carousel images (Nasal spray focus)
  const carouselImages = [
    "/Nasal Delivery System/Products/17.png",
  ]

  // Gallery images (Item 19: 6 Nasal Delivery System product images)
  const galleryImages = [
    { src: "/Nasal Delivery System/Products/19 (1).png", label: "Nasal Delivery System 19 (1)" },
    { src: "/Nasal Delivery System/Products/19 (2).png", label: "Nasal Delivery System 19 (2)" },
    { src: "/Nasal Delivery System/Products/19 (3).png", label: "Nasal Delivery System 19 (3)" },
    { src: "/Nasal Delivery System/Products/19 (4).png", label: "Nasal Delivery System 19 (4)" },
    { src: "/Nasal Delivery System/Products/19 (5).png", label: "Nasal Delivery System 19 (5)" },
    { src: "/Nasal Delivery System/Products/19 (6).png", label: "Nasal Delivery System 19 (6)" }
  ]

  // Graceful fallback for missing local images
  const handleImageError = (e, label, fallbackSrc) => {
    if (fallbackSrc && e.target.src !== window.location.origin + fallbackSrc) {
      e.target.src = fallbackSrc
      return
    }
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.np-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'np-img-fallback-badge'
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
    { name: 'Tablet Containers & Closures ↗', path: 'product-tablet' },
    { name: 'Flip off Seals ↗', path: 'product-flipoff' },
    { name: 'Measuring Caps & Oral Droppers ↗', path: 'product-measuring' },
    { name: 'Glass Droppers ↗', path: 'product-glass-dropper' },
    { name: 'Dispenser Pumps ↗', path: 'product-dispenser' },
    { name: 'Trigger Pumps ↗', path: 'product-trigger' },
    { name: 'Mist & Cream Pumps ↗', path: 'product-mist-cream' },
    { name: 'Caps & Closures ↗', path: 'product-caps-closures' }
  ]

  return (
    <div className="np-page-wrapper">

      <section 
        className="np-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/Nasal Delivery System/banner.webp')",
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
            className={`np-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
            <nav className="np-breadcrumb" style={{ margin: 0 }}>
              <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span onClick={() => onNavigate('contact')} style={{ cursor: 'pointer' }}>PRODUCTS</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-active">NASAL DELIVERY SYSTEM</span>
            </nav>
            <h1 className="np-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Nasal Delivery System</h1>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <div className="np-tabs-bar" ref={tabsRef}>
        <div className="container np-tabs-container">
          {productsList.map((prod, idx) => (
            <button 
              key={idx}
              className={`np-tab-btn ${prod.path === 'product-nasal' ? 'active' : ''}`} 
              onClick={() => onNavigate(prod.path)}
            >
              {prod.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT OVERVIEW SECTION */}
      <section className="np-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`np-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="np-overview-title">Precision Packaging for Nasal Applications</h2>
            <p className="np-overview-subtitle">
              Ashirwad Plastics offers innovative nasal delivery systems designed to support enhanced drug absorption, smooth actuation, and consistent spray pattern delivery for liquid intranasal formulations. Our range includes multidose nasal spray devices and squeeze-bottle spray systems engineered for reliable performance, accurate dose delivery, and ease of use.
            </p>

            {/* Product Showcase Card */}
            <div className="np-showcase-card">
              
              {/* Image Carousel */}
              <div className="np-carousel-wrapper">
                <div className="np-carousel-slide" style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
                  <img 
                    src={carouselImages[activeSlide]} 
                    alt={`Nasal Product Render ${activeSlide + 1}`}
                    style={{ objectFit: 'contain' }}
                    onError={(e) => handleImageError(e, `Showcase Slide ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="np-showcase-desc">
                Manufactured under controlled cleanroom conditions using pharmaceutical-grade raw materials, our nasal delivery solutions are designed to minimize contamination risks and help maintain product integrity throughout shelf life. We also offer customized development solutions with tailored spray characteristics to meet specific formulation requirements, enhance patient experience, and support faster market readiness with short development lead times.
              </p>

              {/* Product Specifications Badges */}
              <div className="np-tags-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-gray)', paddingTop: '40px', alignItems: 'flex-start' }}>
                <div className="np-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="np-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Available Sizes</span>
                  <div className="np-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill" style={{ background: '#2456D3', color: '#fff', fontWeight: 600 }}>30 ml</span>
                  </div>
                </div>

                <div className="np-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="np-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Available Components</span>
                  <div className="np-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="np-pill">Snap-on, Screw-type &amp; Crimp-on Nasal Spray Pumps</span>
                    <span className="np-pill">Child-Resistant Closures (CRC)</span>
                    <span className="np-pill">Tamper-Evident Closures</span>
                    <span className="np-pill">Tear-Off Tamper-Evident (TE) Closures</span>
                    <span className="np-pill">Squeeze-Bottle Spray Containers</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT IMAGES GALLERY */}
      <section className="np-gallery-section" ref={galleryRef}>
        <div className="container">
          <div className={`fade-section ${galleryVisible ? 'visible' : ''}`}>
            
            <h2 className="np-gallery-title">Nasal Delivery System Product Images</h2>
            
            <div className="np-gallery-grid">
              {galleryImages.map((item, i) => (
                <div key={i} className="np-gallery-card">
                  <div className="np-gallery-img-box">
                    <img 
                      src={item.src} 
                      alt={item.label} 
                      onError={(e) => handleImageError(e, item.label, item.fallback)}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. FEATURES & APPLICATIONS SECTION */}
      <section className="np-features-section" ref={featureRef}>
        <div className="container">
          <div className={`fade-section ${featureVisible ? 'visible' : ''}`}>
            
            <div className="np-features-grid">
              
              {/* Left Card: Key Features */}
              <div className="np-feature-card np-card-light">
                <h3>Key Features</h3>
                <div className="np-feature-list">
                  {[
                    "Controlled Cleanroom Manufacturing: Class 100,000 cleanroom production with automated processes to help minimize contamination risks.",
                    "Consistent Spray Performance: Designed to deliver uniform spray patterns and reliable dose delivery.",
                    "Smooth Actuation: Engineered for comfortable, easy, and consistent operation.",
                    "Customized Spray Characteristics: Development options tailored to formulation and application requirements.",
                    "Enhanced Drug Delivery: Designed to support effective intranasal drug delivery and absorption.",
                    "Secure Packaging: Multiple pump and closure configurations to support product integrity and safe containment.",
                    "Pharmaceutical-Grade Materials: Manufactured using materials selected for pharmaceutical packaging applications."
                  ].map((feat, idx) => (
                    <div key={idx} className="np-feature-item" style={{ alignItems: 'flex-start' }}>
                      <span className="np-check-icon" style={{ marginTop: '2px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span style={{ fontSize: '13.5px', lineHeight: '1.5' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Card: Regulatory Compliance & Customized Solutions */}
              <div className="np-feature-card np-card-navy">
                <h3>Regulatory Compliance &amp; Quality</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  Ashirwad Plastics supports pharmaceutical packaging requirements through controlled manufacturing processes and regulatory documentation, including US Drug Master File (US DMF) and Health Canada Drug Master File (HC DMF).
                </p>
                <h4 style={{ color: '#60A5FA', fontSize: '16px', fontWeight: 600, marginBottom: '8px', marginTop: '16px' }}>Customized Nasal Delivery Solutions</h4>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  From metered-dose pumps to squeeze-bottle spray systems, we provide flexible nasal delivery solutions designed around your product requirements. Our customization capabilities and streamlined development approach help support dependable performance and efficient product development.
                </p>
                <div className="np-feature-list">
                  {[
                    "Metered-Dose Nasal Spray Devices",
                    "Squeeze-Bottle Spray Systems (20 ml & 30 ml)",
                    "US DMF & Health Canada DMF Documented"
                  ].map((app, idx) => (
                    <div key={idx} className="np-feature-item">
                      <span className="np-check-icon">
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
            <div className="np-manufacturing-standards">
              <div className="np-mfg-title">Controlled Cleanroom Manufacturing &amp; Quality</div>
              <div className="np-mfg-desc">
                Our nasal delivery systems are developed with a focus on quality, product integrity, and applicable pharmaceutical packaging requirements in Class 100,000 cleanrooms under ISO 15378 and ISO 9001 certified operations.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TECHNICAL SPECIFICATIONS SECTION */}
      <section className="np-specs-section" ref={specsRef}>
        <div className="container">
          <div className={`fade-section ${specsVisible ? 'visible' : ''}`}>
            
            <h2 className="np-specs-title">Technical Specifications</h2>
            
            <div className="np-table-wrapper">
              <table className="np-specs-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product Type</td>
                    <td>Nasal Delivery System</td>
                  </tr>
                  <tr>
                    <td>Sizes Available</td>
                    <td>5 ml, 7 ml, 10 ml, 15 ml</td>
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
                    <td>Nasal Drug Delivery</td>
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
      <section className="np-why-section" ref={whyRef}>
        <div className="container">
          <div className={`np-why-container fade-section ${whyVisible ? 'visible' : ''}`}>
            <div className="np-why-grid">
              
              {/* Left Column: Benefits */}
              <div className="np-why-left">
                <h2 className="np-why-heading">Why Choose Ashirwad Plastics?</h2>
                <div className="np-why-list">
                  <div className="np-why-item">
                    <span className="np-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="np-why-text">ISO &amp; GMP compliant manufacturing</span>
                  </div>
                  <div className="np-why-item">
                    <span className="np-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="np-why-text">High-volume production capabilities</span>
                  </div>
                  <div className="np-why-item">
                    <span className="np-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="np-why-text">Advanced automated manufacturing systems</span>
                  </div>
                  <div className="np-why-item">
                    <span className="np-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="np-why-text">Strong focus on product safety and precision</span>
                  </div>
                  <div className="np-why-item">
                    <span className="np-why-check">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="np-why-text">Regulatory-ready pharmaceutical packaging solutions</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="np-why-right">
                <div className="np-why-img-box">
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
            <h2 className="cta-banner-heading">Looking for Reliable Nasal Delivery Packaging Solutions?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our team for customized nasal packaging and dispensing solutions tailored to your requirements.
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
