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

export default function PharmaMarketPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [productsRef, productsVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [bannerRef, bannerVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.pharma-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'pharma-img-fallback-badge'
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
    <div className="pharma-market-wrapper">

      <section 
        className="pharma-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/s4.webp')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`pharma-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="pharma-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span onClick={() => onNavigate('market')} style={{ cursor: 'pointer' }}>MARKET SECTORS</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">PHARMA MARKET</span>
          </nav>
          <h1 className="pharma-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Pharma Market</h1>
          <p className="pharma-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            We understand that the industry seeks safety and trust for its products, and their reliability and durability form the crux of all our endeavors.
          </p>
        </div>
      </section>

      {/* 2. MARKET OVERVIEW SECTION */}
      <section className="overview-section">
        <div className="container">
          <div ref={overviewRef} className={`overview-grid-layout fade-section ${overviewVisible ? 'visible' : ''}`}>
            
            {/* Left Side: Copy */}
            <div className="overview-left-col">
              <div className="accent-blue-line" />
              <h2 className="overview-heading">Pharma Market</h2>
              <p className="overview-paragraph">
                In the context of the pharmaceutical industry, the packaging is the most critical element. It is not just about containing the drug; it is about ensuring it remains pure, safe, and effective from the point of manufacture to the moment of delivery. Our design and engineering processes are built on strict quality standards, ensuring that our nasal dispensing pumps, injection closures, and dropper caps exceed expectation in safety and reliability.
              </p>
              <p className="overview-paragraph">
                We understand that our B2B partners seek safety and trust above all else. This drives our investment in controlled manufacturing environments and continuous inspections at every stage of the production process.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="overview-cta-link"
              >
                Consult with Experts <span className="cta-arrow">→</span>
              </a>
            </div>

            {/* Right Side: World Map Image */}
            <div className="overview-right-col">
              <div className="world-map-container">
                <img 
                  src="/map.webp" 
                  alt="Ashirwad Plastics Global Presence Map" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* 3. FEATURE GRID SECTION */}
      <section className="feature-grid-section">
        <div className="container">
          <div ref={gridRef} className={`feature-grid-layout fade-section ${gridVisible ? 'visible' : ''}`}>
            
            {/* Card 1: Closures Image Card */}
            <div className="feature-card feature-img-card">
              <img 
                src="/s1.webp" 
                alt="Pharmaceutical Closures" 
                onError={(e) => handleImageError(e, "Pharmaceutical Closures")}
              />
            </div>

            {/* Card 2: Navy Content Card */}
            <div className="feature-card feature-card-dark">
              <div>
                <h3 className="feature-card-title">Premium-Grade Manufacturing</h3>
                <p className="feature-card-desc">
                  Every product we manufacture is subjected to strict quality controls. Our production takes place in controlled, cleanroom environments under GMP and ISO guidelines, utilizing state-of-the-art machinery. This guarantees that our plastic seals, oral dispensing droppers, and nasal delivery components maintain the absolute sterility and integrity required for healthcare applications.
                </p>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="feature-card-cta">
                View More 
                <span className="circle-arrow-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Card 3: Light Content Card */}
            <div className="feature-card feature-card-light">
              <div>
                <h3 className="feature-card-title">Trusted Across Applications</h3>
                <p className="feature-card-desc">
                  Our products are trusted across diverse healthcare sectors: liquid sanitizers, syrup bottles, oral dispensing, and nasal spray systems. We work closely with leading B2B pharmaceutical laboratories to custom-engineer dispensing closures that guarantee safety, child resistance, and precise dosage delivery.
                </p>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="feature-card-cta">
                View More
                <span className="circle-arrow-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Card 4: Product showcase image card */}
            <div className="feature-card feature-img-card">
              <img 
                src="/s2.webp" 
                alt="Product Showcase" 
                onError={(e) => handleImageError(e, "Product Showcase")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCTS SECTION */}
      <section className="pharma-products-section">
        <div className="container">
          <div ref={productsRef} className={`fade-section ${productsVisible ? 'visible' : ''}`}>
            
            <h2 className="pharma-products-section-title">Our Products for Pharma</h2>
            
            <div className="pharma-products-grid">
               
              {/* Product 1 */}
              <div className="pharma-product-card">
                <div className="product-img-box">
                  <img 
                    src="/s3.webp" 
                    alt="Ophthalmic Delivery System" 
                    onError={(e) => handleImageError(e, "Ophthalmic Delivery System")}
                  />
                </div>
                <div className="product-info-box">
                  <h3 className="product-info-title">Ophthalmic Delivery System</h3>
                  <p className="product-info-desc">High-precision ophthalmic packaging for safe, sterile, & reliable drug delivery.</p>
                </div>
                <button className="product-card-arrow-btn" onClick={() => onNavigate('product-ophthalmic')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Product 2 */}
              <div className="pharma-product-card">
                <div className="product-img-box">
                  <img 
                    src="/s5.webp" 
                    alt="Nasal Delivery System" 
                    onError={(e) => handleImageError(e, "Nasal Delivery System")}
                  />
                </div>
                <div className="product-info-box">
                  <h3 className="product-info-title">Nasal Delivery System</h3>
                  <p className="product-info-desc">Advanced nasal dispensing for consistent dosing, convenience, & product integrity.</p>
                </div>
                <button className="product-card-arrow-btn" onClick={() => onNavigate('product-nasal')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Product 3 */}
              <div className="pharma-product-card">
                <div className="product-img-box">
                  <img 
                    src="/s6.webp" 
                    alt="Tablet Container" 
                    onError={(e) => handleImageError(e, "Tablet Container")}
                  />
                </div>
                <div className="product-info-box">
                  <h3 className="product-info-title">Tablet Container</h3>
                  <p className="product-info-desc">Secure, durable packaging for safe storage & protection of solid-dose products.</p>
                </div>
                <button className="product-card-arrow-btn" onClick={() => onNavigate('contact')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Product 4 */}
              <div className="pharma-product-card">
                <div className="product-img-box">
                  <img 
                    src="/o10.webp" 
                    alt="Flip Off Seals" 
                    onError={(e) => handleImageError(e, "Flip Off Seals")}
                  />
                </div>
                <div className="product-info-box">
                  <h3 className="product-info-title">Flip Off Seals</h3>
                  <p className="product-info-desc">Secure, tamper-evident seals for pharmaceutical safety and sterility.</p>
                </div>
                <button className="product-card-arrow-btn" onClick={() => onNavigate('contact')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Product 5 */}
              <div className="pharma-product-card">
                <div className="product-img-box">
                  <img 
                    src="/o4.webp" 
                    alt="Measuring Caps & Oral Droppers" 
                    onError={(e) => handleImageError(e, "Measuring Caps & Oral Droppers")}
                  />
                </div>
                <div className="product-info-box">
                  <h3 className="product-info-title">Measuring Caps & Oral Droppers</h3>
                  <p className="product-info-desc">Accurate, user-friendly dispensing for liquid pharmaceutical formulations.</p>
                </div>
                <button className="product-card-arrow-btn" onClick={() => onNavigate('contact')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Product 6 */}
              <div className="pharma-product-card">
                <div className="product-img-box">
                  <img 
                    src="/o9.webp" 
                    alt="Caps and Closures" 
                    onError={(e) => handleImageError(e, "Caps and Closures")}
                  />
                </div>
                <div className="product-info-box">
                  <h3 className="product-info-title">Caps and Closures</h3>
                  <p className="product-info-desc">A wide range of closures for safety, protection, and product integrity.</p>
                </div>
                <button className="product-card-arrow-btn" onClick={() => onNavigate('contact')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <button className="pharma-explore-cta-btn" onClick={() => onNavigate('product-ophthalmic')}>
                Explore Our Products →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY PARTNER SECTION */}
      <section className="why-partner-section">
        <div className="container">
          <div ref={whyRef} className={`why-partner-container fade-section ${whyVisible ? 'visible' : ''}`}>
            <div className="why-partner-grid">
              
              {/* Left Column: Copy & Benefits */}
              <div className="why-partner-left">
                <h2 className="why-partner-heading">Why Partner with Ashirwad Plastics?</h2>
                <div className="why-partner-benefits-list">
                  
                  <div className="benefit-item">
                    <span className="benefit-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="benefit-text">Pharmaceutical-grade materials and controlled manufacturing</span>
                  </div>

                  <div className="benefit-item">
                    <span className="benefit-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="benefit-text">Tamper-evident and leak-resistant packaging solutions</span>
                  </div>

                  <div className="benefit-item">
                    <span className="benefit-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="benefit-text">GMP & ISO compliant production processes</span>
                  </div>

                  <div className="benefit-item">
                    <span className="benefit-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="benefit-text">Wide product range for diverse pharma applications</span>
                  </div>

                  <div className="benefit-item">
                    <span className="benefit-check-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="benefit-text">Reliable supply with high-volume capabilities</span>
                  </div>

                </div>
              </div>

              {/* Right Column: Team Image */}
              <div className="why-partner-right">
                <div className="why-partner-img-wrapper">
                  <img 
                    src="/s7.webp" 
                    alt="Ashirwad Plastics Team" 
                    onError={(e) => handleImageError(e, "Ashirwad Plastics Team")}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div ref={bannerRef} className={`cta-banner-grid fade-section ${bannerVisible ? 'visible' : ''}`}>
            <h2 className="cta-banner-heading">Ready to Elevate Your Pharmaceutical Packaging?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                We design and custom-engineer high-quality primary packaging solutions that ensure safety, regulatory compliance, and ease of use.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REACH OUT TODAY */}
      <ReachOut />

    </div>
  )
}
