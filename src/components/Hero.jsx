import { useState, useEffect } from 'react'
import FadeIn from './FadeIn'

const heroImages = [
  '/hero.webp',
  '/hero2.png',
  '/hro3.png'
]

export default function Hero({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-centered-layout" id="home" style={{ backgroundImage: 'none' }}>
      
      {/* Background Slideshow Containers with Ken Burns effect */}
      <div className="hero-slideshow-container">
        {heroImages.map((img, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              transform: 'scale(1)',
              animation: index === activeIndex ? 'kenBurns 6.5s linear forwards' : 'none',
              zIndex: 1
            }}
          />
        ))}
      </div>

      {/* Main Centered Hero Copy */}
      <div className="container hero-centered-container" style={{ position: 'relative', zIndex: 10 }}>
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
      <div className="hero-careers-ticker-centered" style={{ zIndex: 10 }}>
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
