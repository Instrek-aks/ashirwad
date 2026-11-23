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

export default function OphthalmicProductPage({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0)
  
  const [heroRef, heroVisible] = useFadeIn()
  const [tabsRef, tabsVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [featureRef, featureVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  // Carousel images
  const carouselImages = [
    "/images/products/ophthalmic/ophthalmic-bottle.webp"
  ]

  // Gallery images (removed 3rd and 5th items as per Change Request)
  const galleryImages = [
    { src: "/images/products/ophthalmic/dropper-1.webp", label: "Ophthalmic Delivery System" },
    { src: "/images/products/ophthalmic/dropper-2.webp", label: "Ophthalmic Bottle 5ml" },
    { src: "/images/products/ophthalmic/dropper-4.webp", label: "Ophthalmic Bottle 10ml" },
    { src: "/images/products/ophthalmic/dropper-6.webp", label: "CRC Closure Detail" }
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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/images/product-banners/ophthalmic-delivery-system.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
              <span onClick={() => onNavigate('contact')} style={{ cursor: 'pointer' }}>PRODUCTS</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-active">OPHTHALMIC DELIVERY SYSTEM</span>
            </nav>
            <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Ophthalmic Delivery System</h1>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <ProductRibbon activePath="product-ophthalmic" onNavigate={onNavigate} />

      {/* 3. PRODUCT OVERVIEW SECTION */}
      <section className="op-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`op-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="op-overview-title">Precision Packaging for Ophthalmic Applications</h2>
            <p className="op-overview-subtitle">
              Ashirwad Plastics offers advanced ophthalmic delivery systems engineered to ensure sterility, dosage accuracy, and product safety. Designed for pharmaceutical-grade applications, our solutions meet stringent quality and regulatory standards for reliable eye-care packaging.
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
                Our ophthalmic delivery systems are available in <strong>5 ml, 6 ml, 10 ml, and 15 ml</strong> capacities across the <strong>AP Series</strong> (proprietary bottle geometry for consistent wall thickness and predictable squeeze force) and <strong>R Series</strong> (industry-standard design for established filling and labelling lines). Manufactured from pharmaceutical-grade LDPE in a GMP-compliant cleanroom facility, our bottles feature a 14 mm narrow, ringed-neck finish with USP-aligned tamper-evident ring retention and are supported by US Type III DMF and Health Canada DMF documentation.
              </p>
</div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT IMAGES GALLERY */}
      {/* <section className="op-gallery-section" ref={galleryRef}>
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <a 
                href="/docs/ashirwad-plastics-website-content.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="op-download-btn"
                style={{ textDecoration: 'none' }}
              >
                Download brochure ↗
              </a>
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
                    "Multiple Capacities & Series: 5 ml, 6 ml, 10 ml, and 15 ml options across AP Series and R Series.",
                    "Nozzle Options: Closed-tip, pre-pricked, and flow-control nozzles for controlled drop delivery.",
                    "Neck & Closure Options: 14 mm narrow, ringed-neck finish with USP-aligned tamper-evident ring retention, tear-off TE, and senior-friendly push-and-turn CRC caps.",
                    "Preservative-Free & Antimicrobial: Integrated antimicrobial technology supporting preservative-free formulations for chronic everyday use.",
                    "Cleanroom Manufacturing: Class 7 & Class 8 cleanroom production under ISO 9001:2015 and ISO 15378:2017.",
                    "Sterilisation & Packaging: Suitable for EtO and Gamma sterilisation; supplied in polybags, Tyvek bags, and beta bags.",
                    "Regulatory & Flexible Supply: US Type III DMF reference, Health Canada DMF documentation, and flexible order quantities."
                  ].map((feat, idx) => (
                    <div key={idx} className="op-feature-item" style={{ alignItems: 'flex-start' }}>
                      <span className="op-check-icon" style={{ marginTop: '2px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span style={{ fontSize: '14px', lineHeight: '1.5' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Card: Designed for Pharmaceutical Needs */}
              <div className="op-feature-card op-card-navy">
                <h3>Designed for Pharmaceutical Needs</h3>
                <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
                  Combining dependable quality with flexible configurations, our ophthalmic delivery systems meet diverse pharmaceutical packaging requirements with a focus on safety, functionality and reliability.
                </p>
                <div style={{ padding: '18px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#93C5FD', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Regulatory &amp; Cleanroom Quality
                  </div>
                  <div style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.88)', lineHeight: '1.6' }}>
                    Manufactured in a Class 7 &amp; Class 8 cleanroom GMP facility under ISO 9001:2015 and ISO 15378:2017, supported by US Type III DMF &amp; Health Canada DMF documentation.
                  </div>
                </div>
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

    </div>
  )
}
