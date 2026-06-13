import FadeIn from './FadeIn'
import ProductBottleSvg from './svg/ProductBottleSvg'

export default function Hero({ onNavigate }) {
  return (
    <section className="hero-centered-layout" id="home">

      {/* Main Centered Hero Copy */}
      <div className="container hero-centered-container">
        <FadeIn>
          <h1 className="hero-centered-title">
            Innovative, World-Class<br />Packaging Solutions
          </h1>
          <p className="hero-centered-desc">
            Driving sustainable growth through reliable packaging solutions that enhance efficiency, ensure quality, and support long-term business success.
          </p>
          <div className="hero-centered-btns">
            <a href="#products" className="btn-primary-centered">
              Request Product Specs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
            <a
              href="#"
              className="btn-ghost-centered"
              onClick={e => { e.preventDefault(); onNavigate('contact'); }}
            >
              Consult with Experts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }}>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Careers Ticker with cream-beige background exactly matching the screenshot */}
      <div className="hero-careers-ticker-centered">
        <div className="container">
          <span>
            Join our team – We are looking for talented &amp; driven people to come work with us.{' '}
            <a href="#careers" className="ticker-link-centered" onClick={(e) => { e.preventDefault(); onNavigate('career'); }}>
              Explore Careers
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
