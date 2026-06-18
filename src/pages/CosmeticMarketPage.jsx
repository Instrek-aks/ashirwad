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

export default function CosmeticMarketPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [overviewRef, overviewVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [productsRef, productsVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [bannerRef, bannerVisible] = useFadeIn()

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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/cosmatic.webp')",
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
            <span onClick={() => onNavigate('market-pharma')} style={{ cursor: 'pointer' }}>MARKET SECTORS</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">COSMETIC MARKET</span>
          </nav>
          <h1 className="pharma-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Cosmetic Market</h1>
          <p className="pharma-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            Elevating beauty and personal care brands with primary packaging solutions that combine superior quality, aesthetic appeal, and functional performance.
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
              <h2 className="overview-heading">Cosmetic Industry Solutions</h2>
              <p className="overview-paragraph">
                The cosmetic industry is evolving rapidly, driven by rising consumer expectations and a constant demand for innovation. At Ashirwad Plastics, we help cosmetic brands stay ahead with a diverse range of packaging solutions that ensure your products stand out on every shelf.
              </p>
              <p className="overview-paragraph">
                Our packaging is designed to support agile production, enabling our clients to bring products to market efficiently. Whether for liquids, creams, serums, or powders, our versatile range delivers the ideal balance of functionality and aesthetics.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="overview-cta-link"
              >
                Explore Cosmetic Packaging <span className="cta-arrow">→</span>
              </a>
            </div>

            {/* Right Side: Map */}
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
            
            <div className="feature-card feature-img-card">
              <img 
                src="/s1.webp" 
                alt="Cosmetic Bottles" 
                onError={(e) => handleImageError(e, "Cosmetic Bottles")}
              />
            </div>

            <div className="feature-card feature-card-dark">
              <div>
                <h3 className="feature-card-title">Tailored Solutions for Every Cosmetic Need</h3>
                <p className="feature-card-desc">
                  Our expertise lies in delivering customised packaging solutions across a wide spectrum of cosmetic categories from skincare and hair care to beauty and oral care products.
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

            <div className="feature-card feature-card-light">
              <div>
                <h3 className="feature-card-title">Where Design Meets Quality</h3>
                <p className="feature-card-desc">
                  We believe great packaging does more than protect a product - it elevates it. Every solution we design is crafted to deliver an exceptional consumer experience while reflecting the quality and identity of your brand.
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

            <div className="feature-card feature-img-card">
              <img 
                src="/s2.webp" 
                alt="Premium Cosmetic Renders" 
                onError={(e) => handleImageError(e, "Premium Renders")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCTS SECTION */}
      <section className="pharma-products-section">
        <div className="container">
          <div ref={productsRef} className={`fade-section ${productsVisible ? 'visible' : ''}`}>
            
            <h2 className="pharma-products-section-title">Our Products for Cosmetics</h2>
            
            <div className="pharma-products-grid">
               
              {[
                { name: "Glass Droppers", desc: "Premium-quality glass droppers offering controlled dispensing and enhanced product compatibility.", img: "/o5.webp", path: "product-glass-dropper" },
                { name: "Mist & Cream Pumps", desc: "Precision-engineered mist and cream pumps delivering smooth and consistent dispensing performance.", img: "/o8.webp", path: "product-mist-cream" },
                { name: "Dispenser Pumps", desc: "Reliable dispenser pump systems designed for efficient and controlled liquid dispensing applications.", img: "/o6.webp", path: "product-dispenser" },
                { name: "Caps & Closures", desc: "A comprehensive range of closures engineered for safety, protection, and product integrity.", img: "/o9.webp", path: "product-caps-closures" },
                { name: "Trigger Pumps", desc: "Durable and ergonomically designed trigger pumps suitable for personal care and industrial applications.", img: "/o7.webp", path: "product-trigger" }
              ].map((prod, idx) => (
                <div key={idx} className="pharma-product-card">
                  <div className="product-img-box">
                    <img 
                      src={prod.img} 
                      alt={prod.name} 
                      onError={(e) => handleImageError(e, prod.name)}
                    />
                  </div>
                  <div className="product-info-box">
                    <h3 className="product-info-title">{prod.name}</h3>
                    <p className="product-info-desc">{prod.desc}</p>
                  </div>
                  <button className="product-card-arrow-btn" onClick={() => onNavigate(prod.path)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              ))}

            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <button className="pharma-explore-cta-btn" onClick={() => onNavigate('home')}>
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
              
              <div className="why-partner-left">
                <h2 className="why-partner-heading">Why Partner with Ashirwad Plastics?</h2>
                <div className="why-partner-benefits-list">
                  {[
                    "Customised packaging tailored to your brand requirements",
                    "Aesthetic design combined with functional performance",
                    "Wide product range for diverse cosmetic applications",
                    "Consistent quality across all packaging components",
                    "Scalable production to support growing cosmetic brands"
                  ].map((benefit, idx) => (
                    <div key={idx} className="benefit-item">
                      <span className="benefit-check-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="benefit-text">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

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
            <h2 className="cta-banner-heading">Ready to Elevate Your Cosmetic Packaging?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our team to explore packaging solutions designed to enhance your brand and delight your customers.
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
