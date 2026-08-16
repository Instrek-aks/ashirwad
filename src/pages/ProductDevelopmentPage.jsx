import { useState, useEffect, useRef } from 'react'
import Commitment from '../components/Commitment'

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

export default function ProductDevelopmentPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [bannerRef, bannerVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  return (
    <div className="dev-page-wrapper">

      {/* 1. HERO SECTION */}
      <section 
        className="dev-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/a.webp')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`dev-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="dev-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">NEW PRODUCT DEVELOPMENT</span>
          </nav>
          <h1 className="dev-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>New Product<br />Development</h1>
          <p className="dev-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            At Ashirwad Plastics, new product development is built on a structured five-step process designed to ensure packaging requirements are met with precision, quality, and full satisfaction.
          </p>
        </div>
      </section>

      {/* Reusable Commitment & 5-Step Process Section */}
      <Commitment />


      {/* 4. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div ref={bannerRef} className={`cta-banner-grid fade-section ${bannerVisible ? 'visible' : ''}`}>
            <h2 className="cta-banner-heading">Have a Packaging Requirement in Mind?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Our team is ready to guide you through every step of the development process from initial consultation to final delivery.
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
