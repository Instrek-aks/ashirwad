import { useState, useEffect, useRef } from 'react'
import ProductRibbon from '../components/ProductRibbon'

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

export default function TabletProductPage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0)
  
  const [heroRef, heroVisible] = useFadeIn()
  const [tabsRef, tabsVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [featureRef, featureVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()

  // Carousel images
  const carouselImages = [
    "/images/products/tablet-containers/banner.webp"
  ]

  // Gallery images (simulated product variants)
  const galleryImages = [
    { src: "/images/products/tablet-containers/product-1.webp", label: "Pure Form. Trusted Protection. - Tablet Container" },
    { src: "/images/products/tablet-containers/product-2.webp", label: "Precision You Can Trust - Dosing & Storage" },
    { src: "/images/products/tablet-containers/product-3.webp", label: "Precision in Every Drop, Safety in Every Use" },
    { src: "/images/products/tablet-containers/product-4.webp", label: "Better Design, Smarter Care - Bottle Assembly" },
    { src: "/images/products/tablet-containers/product-5.webp", label: "Safe, Secure, Reliable - Exploded Cap View" },
    { src: "/images/products/tablet-containers/product-6.webp", label: "Protecting What Matters - Multi-Size Range" }
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
    { name: 'Tablet Containers & Closures ↗', path: 'product-tablet' },
    { name: 'Flip off Seals ↗', path: 'product-flipoff' },
    { name: 'Measuring Caps ↗', path: 'product-measuring' },
    { name: 'Oral & Glass Droppers ↗', path: 'product-glass-dropper' },
    { name: 'Dispenser Pumps ↗', path: 'product-dispenser' },
    { name: 'Trigger Pumps ↗', path: 'product-trigger' },
    { name: 'Mist & Cream Pumps ↗', path: 'product-mist-cream' },
    { name: 'Caps & Closures ↗', path: 'product-caps-closures' }
  ]

  return (
    <div className="op-page-wrapper">

      <section 
        className="op-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/images/product-banners/tablet-containers.webp')",
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
              <span className="breadcrumb-active">TABLET CONTAINERS &amp; CLOSURES</span>
            </nav>
            <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Tablet Containers &amp; Closures</h1>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <ProductRibbon activePath="product-tablet" onNavigate={onNavigate} />

      {/* 3. PRODUCT OVERVIEW SECTION */}
      <section className="op-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`op-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="op-overview-title">Secure Packaging for Solid-Dose Products</h2>
            <p className="op-overview-subtitle">
              Ashirwad Plastics offers durable and high-performance tablet containers and closures designed to protect pharmaceutical and nutraceutical products while ensuring safety, convenience, and regulatory compliance.
            </p>

            {/* Product Showcase Card */}
            <div className="op-showcase-card">
              
              {/* Image Carousel */}
              <div className="op-carousel-wrapper">
                <div className="op-carousel-slide">
                  <img 
                    src={carouselImages[activeSlide]} 
                    alt={`Tablet Container Render ${activeSlide + 1}`}
                    onError={(e) => handleImageError(e, `Showcase Slide ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              {/* Product Description */}
              <p className="op-showcase-desc">
                Versatile HDPE tablet containers with matching child-resistant and continuous-thread closures for solid-dose pharmaceutical and nutraceutical products.
              </p>
              <div className="product-spec-grid">
                <div className="product-spec-card">
                  <span className="product-spec-label">Capacities</span>
                  <span className="product-spec-value">30 cc to 300 cc HDPE</span>
                  <span className="product-spec-note">Wide-mouth &amp; precision-moulded necks</span>
                </div>
                <div className="product-spec-card">
                  <span className="product-spec-label">CRC Closures</span>
                  <span className="product-spec-value">28 mm &amp; 33 mm</span>
                  <span className="product-spec-note">Push-and-turn; 38 mm under development</span>
                </div>
                <div className="product-spec-card">
                  <span className="product-spec-label">CT Closures</span>
                  <span className="product-spec-value">33 mm, 38 mm &amp; 53 mm</span>
                  <span className="product-spec-note">Conventional screw-cap design</span>
                </div>
                <div className="product-spec-card">
                  <span className="product-spec-label">Qualification</span>
                  <span className="product-spec-value">CRC &amp; Adult-Use Tested</span>
                  <span className="product-spec-note">Smooth labelling &amp; custom colours</span>
                </div>
              </div>
</div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT IMAGES GALLERY */}
      {/* <section className="op-gallery-section" ref={galleryRef}>
        <div className="container">
          <div className={`fade-section ${galleryVisible ? 'visible' : ''}`}>
            
            <h2 className="op-gallery-title">Tablet Containers &amp; Closures Gallery</h2>
            
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
      </section> */}

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
                    "Superior moisture barrier protecting tablets and capsules from humidity",
                    "Wide-mouth access for fast, clean filling and effortless dispensing",
                    "Precision-moulded necks ensuring consistent closure fit and seal integrity",
                    "Smooth bottle surfaces for crisp, clear product labelling",
                    "Comfortable closure grip designed for elderly patients too",
                    "Custom bottle and closure colours to strengthen brand identity"
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
                    "Tablets",
                    "Capsules",
                    "Nutraceutical Products",
                    "Solid Oral Dosage Formulations"
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
                Manufactured using advanced automated systems and strict quality assurance processes to deliver consistency, reliability, and regulatory-ready packaging solutions.
                Manufactured in a Class 7 &amp; Class 8 cleanroom GMP facility, supported by US DMF &amp; Health Canada DMF documentation.
              </div>
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
                    "Wide range of packaging sizes and closures",
                    "High-performance pharmaceutical packaging solutions",
                    "Advanced manufacturing infrastructure",
                    "Regulatory-compliant production systems",
                    "Reliable supply and scalable manufacturing capabilities"
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
                    src="/images/markets/cta-banner-bg.webp" 
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
            <h2 className="cta-banner-heading">Need High-Quality Tablet Packaging Solutions?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team to explore customized pharmaceutical packaging solutions for your business.
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
