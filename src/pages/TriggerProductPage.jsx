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

export default function TriggerProductPage({ onNavigate }) {
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
    "/o7.webp",
    "/o7.webp",
    "/o7.webp"
  ]

  // Gallery images (simulated product variants)
  const galleryImages = [
    { src: "/o7.webp", label: "Trigger Pump Red Variant" },
    { src: "/o7.webp", label: "Trigger Pump Blue Variant" },
    { src: "/o7.webp", label: "Trigger Pump Green Variant" },
    { src: "/o7.webp", label: "Adjustable Nozzle Cap" },
    { src: "/o7.webp", label: "Dip Tube Connection" },
    { src: "/o7.webp", label: "Ergonomic Handle Grip" }
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
    { name: 'Ophthalmic', path: 'product-ophthalmic' },
    { name: 'Nasal', path: 'product-nasal' },
    { name: 'Tablet Containers', path: 'product-tablet' },
    { name: 'Flip-Off Seals', path: 'product-flipoff' },
    { name: 'Measuring Caps', path: 'product-measuring' },
    { name: 'Glass Droppers', path: 'product-glass-dropper' },
    { name: 'Dispenser Pumps', path: 'product-dispenser' },
    { name: 'Trigger Pumps', path: 'product-trigger' },
    { name: 'Mist & Cream', path: 'product-mist-cream' },
    { name: 'Caps & Closures', path: 'product-caps-closures' }
  ]

  return (
    <div className="op-page-wrapper">

      <section 
        className="op-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(245, 245, 245, 0.45), rgba(245, 245, 245, 0.55)), url('/o7.webp')",
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
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>PRODUCTS</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">TRIGGER PUMPS</span>
          </nav>
          <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Trigger Pumps</h1>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <div className="op-tabs-bar" ref={tabsRef}>
        <div className="container op-tabs-container" style={{ gap: '16px', padding: '10px 24px' }}>
          {productsList.map((prod, idx) => (
            <button 
              key={idx}
              className={`op-tab-btn ${prod.path === 'product-trigger' ? 'active' : ''}`} 
              onClick={() => onNavigate(prod.path)}
              style={{ padding: '12px 8px', fontSize: '13px' }}
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
            <h2 className="op-overview-title">High-Performance Trigger Dispensing</h2>
            <p className="op-overview-subtitle">
              Ashirwad Plastics manufactures durable trigger pumps engineered for efficient spraying and controlled liquid dispensing across industrial, household, and personal care applications.
            </p>

            {/* Product Showcase Card */}
            <div className="op-showcase-card">
              
              {/* Image Carousel */}
              <div className="op-carousel-wrapper">
                <div className="op-carousel-slide">
                  <img 
                    src={carouselImages[activeSlide]} 
                    alt={`Trigger Pump Render ${activeSlide + 1}`}
                    onError={(e) => handleImageError(e, `Showcase Slide ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="op-showcase-desc">
                Our trigger pumps are available in multiple colors and configurations, making them suitable for a wide range of liquid products across cleaning, healthcare, and industrial sectors.
              </p>

              {/* Product Specifications Badges */}
              <div className="op-tags-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--border-gray)', paddingTop: '40px', alignItems: 'flex-start' }}>
                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Color Options</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Red</span>
                    <span className="op-pill">Blue</span>
                    <span className="op-pill">Green</span>
                    <span className="op-pill">White</span>
                    <span className="op-pill">Custom (as requested)</span>
                  </div>
                </div>

                <div className="op-tag-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', flexWrap: 'wrap', textAlign: 'left', width: '100%' }}>
                  <span className="op-tag-label" style={{ fontSize: '15px', fontWeight: '700', color: '#1F2937', minWidth: '160px', flexShrink: 0 }}>Nozzle Modes</span>
                  <div className="op-tag-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="op-pill">Stream</span>
                    <span className="op-pill">Spray</span>
                    <span className="op-pill">Mist</span>
                    <span className="op-pill">Lock / Off Position</span>
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
            
            <h2 className="op-gallery-title">Trigger Pumps Gallery</h2>
            
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
                  {[
                    "Ergonomic design for comfortable operation",
                    "Smooth and consistent trigger action",
                    "Adjustable spray nozzle functionality",
                    "Durable construction for repeated use",
                    "High dispensing efficiency",
                    "Compatible with standard bottle necks"
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
                    "Surface Cleaners",
                    "Home Care Products",
                    "Industrial Liquids",
                    "Agricultural Solutions",
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
                Produced using high-grade materials with precision-engineered trigger mechanisms and quality-tested for consistent spray performance, durability, and leak-proof operation under regular use conditions.
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
                    { spec: "Product Type", detail: "Trigger Pump" },
                    { spec: "Material", detail: "High-Grade Plastic" },
                    { spec: "Nozzle", detail: "Adjustable Spray" },
                    { spec: "Color Options", detail: "Multiple (as per requirement)" },
                    { spec: "Application", detail: "Household / Industrial / Personal Care" },
                    { spec: "Compliance", detail: "ISO Standards" }
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
                    "Ergonomic and comfortable design",
                    "Adjustable spray for versatile applications",
                    "Multiple color options available",
                    "Durable for high-frequency use",
                    "Reliable compatibility with standard bottles"
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
            <h2 className="cta-banner-heading">Looking for High-Performance Trigger Pumps?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team for trigger pump solutions tailored to your product and industry needs.
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
