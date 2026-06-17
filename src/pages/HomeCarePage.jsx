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

export default function HomeCarePage({ onNavigate }) {
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
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/homeindustry care.png')",
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
            <span className="breadcrumb-active">HOME CARE INDUSTRY</span>
          </nav>
          <h1 className="pharma-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Home Care Industry</h1>
          <p className="pharma-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            Delivering home care packaging solutions that are engineered to resist leakage, prevent tampering, and perform reliably in daily use.
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
              <h2 className="overview-heading">Home Care Industry Solutions</h2>
              <p className="overview-paragraph">
                The home care industry demands packaging that is safe, functional, and built to perform. At Ashirwad Plastics, we specialise in delivering home care packaging solutions that are engineered to resist leakage, prevent tampering, and align with the latest market trends.
              </p>
              <p className="overview-paragraph">
                We give brands the confidence that their products reach consumers in perfect condition every time. Our home care product range includes trigger pumps, dispenser pumps, caps, and closures all designed for smooth handling, consistent dispensing, and reliable performance in daily use.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="overview-cta-link"
              >
                Explore Home Care Packaging <span className="cta-arrow">→</span>
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
                alt="Home Care Bottles" 
                onError={(e) => handleImageError(e, "Home Care Bottles")}
              />
            </div>

            <div className="feature-card feature-card-dark">
              <div>
                <h3 className="feature-card-title">Functional Solutions for Everyday Use</h3>
                <p className="feature-card-desc">
                  We maintain strict quality checks and adhere to industry-leading manufacturing processes to ensure every product exceeds performance expectations across a wide range of household applications.
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
                <h3 className="feature-card-title">Packaging That Reflects Your Brand</h3>
                <p className="feature-card-desc">
                  Beyond performance, we understand that packaging is a powerful brand tool. Our customised solutions are designed to align with your brand identity helping your products stand out in a competitive retail environment.
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
                alt="Product Displays" 
                onError={(e) => handleImageError(e, "Product Displays")}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCTS SECTION */}
      <section className="pharma-products-section">
        <div className="container">
          <div ref={productsRef} className={`fade-section ${productsVisible ? 'visible' : ''}`}>
            
            <h2 className="pharma-products-section-title">Our Products for Home Care</h2>
            
            <div className="pharma-products-grid">
               
              {[
                { name: "Trigger Pumps", desc: "Durable and ergonomically designed trigger pumps suitable for personal care and industrial applications.", img: "/o7.webp", path: "product-trigger" },
                { name: "Dispenser Pumps", desc: "Reliable dispenser pump systems designed for efficient and controlled liquid dispensing applications.", img: "/o6.webp", path: "product-dispenser" },
                { name: "Caps & Closures", desc: "A comprehensive range of closures engineered for safety, protection, and product integrity.", img: "/o9.webp", path: "product-caps-closures" },
                { name: "Mist Pumps", desc: "Fine mist pumps delivering a consistent, uniform spray for cleaning and freshening formulations.", img: "/o8.webp", path: "product-mist-cream" }
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
                    "Leak-resistant and tamper-evident packaging solutions",
                    "Products designed to meet current market trends",
                    "Customisable solutions aligned with your brand identity",
                    "Consistent quality and reliable supply",
                    "Suitable for a wide range of home care product formats"
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
            <h2 className="cta-banner-heading">Looking for Reliable Home Care Packaging?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Get in touch with our team to explore packaging solutions that combine performance, quality, and brand appeal.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ReachOut />

    </div>
  )
}
