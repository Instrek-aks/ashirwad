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
    "/Nasal Delivery System/banner.webp"
  ]

  // Gallery images (simulated product variants)
  const galleryImages = [
    { src: "/Nasal Delivery System/Products/1.webp", label: "Built for Every Drop - Nasal Spray System" },
    { src: "/Nasal Delivery System/Products/2.webp", label: "Engineered for Precision & Protection" },
    { src: "/Nasal Delivery System/Products/3.webp", label: "Precision in Every Drop, Safety in Every Use" },
    { src: "/Nasal Delivery System/Products/4.webp", label: "Lightweight & Easy to Clean Assembly" },
    { src: "/Nasal Delivery System/Products/5.webp", label: "Better Design, Smarter Care - Exploded View" },
    { src: "/Nasal Delivery System/Products/6.webp", label: "Premium Nasal Delivery System" }
  ]

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
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
    { name: 'Flip off Seals ↗', path: 'product-flipoff' },
    { name: 'Measuring Caps & Oral Droppers ↗', path: 'product-measuring' },
    { name: 'Glass Droppers ↗', path: 'product-glass-dropper' }
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
              Our Nasal Delivery System is designed to meet strict pharmaceutical regulations. Manufactured in ISO-certified cleanrooms, our spray bottles, child-resistant closures (CRC), and tamper-evident solutions ensure drug sterility, accurate dose-dispensing performance, and safe containment for advanced nasal-care products.
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
                Our nasal spray containers are manufactured under cleanroom conditions, using pharmaceutical-grade raw materials. They are engineered to provide maximum contamination protection and secure container closures, ensuring product integrity throughout its shelf life.
              </p>

              {/* Product Specifications Badges */}
              <div className="np-tags-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-gray)', paddingTop: '40px', alignItems: 'flex-start' }}>
                <div className="np-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="np-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Available Sizes</span>
                  <div className="np-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="np-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>5 ml ↗</span>
                    <span className="np-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>7 ml ↗</span>
                    <span className="np-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>10 ml ↙</span>
                    <span className="np-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>15 ml ↗</span>
                  </div>
                </div>

                <div className="np-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="np-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Available Components</span>
                  <div className="np-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="np-pill">Dropper Bottles</span>
                    <span className="np-pill">CRC Closures</span>
                    <span className="np-pill">Tamper-Evident Closures</span>
                    <span className="np-pill">Tear-Off TE Closures</span>
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
      <section className="np-features-section" ref={featureRef}>
        <div className="container">
          <div className={`fade-section ${featureVisible ? 'visible' : ''}`}>
            
            <div className="np-features-grid">
              
              {/* Left Card: Key Features */}
              <div className="np-feature-card np-card-light">
                <h3>Key Features</h3>
                <div className="np-feature-list">
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>High-precision dispensing performance</span>
                  </div>
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Tamper-evident safety systems</span>
                  </div>
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Leak-resistant packaging design</span>
                  </div>
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Pharmaceutical-grade raw materials</span>
                  </div>
                </div>
              </div>

              {/* Right Card: Applications */}
              <div className="np-feature-card np-card-navy">
                <h3>Applications Suitable for:</h3>
                <div className="np-feature-list">
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Nasal Sprays</span>
                  </div>
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Nasal Drug Delivery Solutions</span>
                  </div>
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Sterile Pharmaceutical Formulations</span>
                  </div>
                  <div className="np-feature-item">
                    <span className="np-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>Prescription &amp; OTC Nasal Products</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Manufacturing Text Below Cards */}
            <div className="np-manufacturing-standards">
              <div className="np-mfg-title">Manufacturing &amp; Quality Standards</div>
              <div className="np-mfg-desc">
                Our nasal spray products are manufactured under strict GMP compliance protocols. We implement high-speed automated assembly lines and multi-stage optoelectronic dimensional checks to guarantee absolute defect-free packaging safety for global pharmaceutical clients.
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
