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

export default function ProteinJarsProductPage({ onNavigate }) {
  const [activeSlide] = useState(0)

  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [featureRef, featureVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [ctaRef] = useFadeIn()

  const carouselImages = [
    '/images/products/tablet-containers/banner.webp'
  ]

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
              <span className="breadcrumb-active">PROTEIN JARS</span>
            </nav>
            <h1 className="op-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Protein Jars</h1>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORY NAVIGATION */}
      <ProductRibbon activePath="product-protein-jars" onNavigate={onNavigate} />

      {/* 3. PRODUCT OVERVIEW SECTION */}
      <section className="op-overview-section" ref={overviewRef}>
        <div className="container">
          <div className={`op-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="op-overview-title">Bulk Powder Packaging with Secure Reseal</h2>
            <p className="op-overview-subtitle">
              Wide-mouth HDPE protein jars with tamper-evident caps - bulk powder packaging engineered for a secure, tamper-evident reseal across nutraceutical and sports nutrition applications.
            </p>

            {/* Product Showcase Card */}
            <div className="op-showcase-card">
              <div className="op-carousel-wrapper">
                <div className="op-carousel-slide">
                  <img
                    src={carouselImages[activeSlide]}
                    alt={`Protein Jars Render ${activeSlide + 1}`}
                    onError={(e) => handleImageError(e, `Protein Jars ${activeSlide + 1}`)}
                  />
                </div>
              </div>

              <p className="op-showcase-desc">
                Wide-mouth HDPE jars engineered for bulk powder packaging with a secure, tamper-evident reseal.
              </p>
              <div className="product-spec-grid">
                <div className="product-spec-card">
                  <span className="product-spec-label">Material &amp; Design</span>
                  <span className="product-spec-value">Wide-Mouth HDPE</span>
                  <span className="product-spec-note">Convenient filling &amp; powder scooping</span>
                </div>
                <div className="product-spec-card">
                  <span className="product-spec-label">Closure</span>
                  <span className="product-spec-value">Tamper-Evident Caps</span>
                  <span className="product-spec-note">Engineered for a secure reseal</span>
                </div>
                <div className="product-spec-card">
                  <span className="product-spec-label">Branding</span>
                  <span className="product-spec-value">Smooth Labelling Surfaces</span>
                  <span className="product-spec-note">Custom jar &amp; closure colours</span>
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
                    "Effortless scooping and high-speed bulk powder filling access",
                    "Moisture and oxygen barrier protecting sensitive nutritional powders",
                    "Secure, repeatable reseal preserving freshness after first opening",
                    "Precision-moulded neck finish for reliable cap alignment",
                    "Impact-resistant, lightweight body suited for transit and retail"
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
                    "Protein & Sports Nutrition Powders",
                    "Nutraceutical & Dietary Supplements",
                    "Meal Replacement & Health Powders",
                    "Bulk Pharmaceutical & Herbal Formulations"
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
                Manufactured in a Class 7 &amp; Class 8 cleanroom GMP facility under ISO 9001:2015 and ISO 15378:2017 using automated lines, precision moulds, and visual inspection systems for consistent component dimensions and reliable sealing.
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
              <div className="op-why-left">
                <h2 className="op-why-heading">Why Choose Ashirwad Plastics?</h2>
                <div className="op-why-list">
                  {[
                    "Wide-mouth HDPE jars with tamper-evident reseal caps",
                    "ISO 9001:2015 and ISO 15378:2017 certified manufacturing",
                    "Class 7 & Class 8 cleanroom production in Baddi",
                    "Custom jar and closure colours for brand consistency",
                    "Scalable production and dependable supply"
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

              <div className="op-why-right">
                <div className="op-why-img-box">
                  <img
                    src="/images/markets/cta-banner-bg.webp"
                    alt="Ashirwad plastics workforce"
                    onError={(e) => handleImageError(e, 'Workforce Team')}
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
            <h2 className="cta-banner-heading">Need Reliable Bulk Powder Packaging Solutions?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team to explore wide-mouth HDPE protein jars and tamper-evident closures for your product line.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact') }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
