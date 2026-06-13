import FadeIn from './FadeIn'

export default function VisionMission() {
  const images = [
    '/g3.webp',
    '/g1.webp',
    '/y.webp',
    '/g2.webp',
    '/y.webp',
    '/g3.webp'
  ]

  return (
    <section 
      className="vision-section-blue" 
    >
      {/* 1. Our Vision Row */}
      <div className="container" style={{ maxWidth: '1000px', padding: '0 24px' }}>
        <FadeIn>
          <div className="vision-mission-row">
            <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Our Vision
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', margin: 0, fontWeight: 500 }}>
              To redefine pharmaceutical and industrial packaging through continuous innovation, uncompromising quality, and environmentally responsible practices while becoming a globally trusted partner in healthcare packaging solutions.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* 2. Full-bleed Image Row */}
      <div 
        className="vision-image-scroller" 
        style={{ 
          display: 'flex', 
          gap: '24px', 
          overflowX: 'auto', 
          paddingLeft: 'max(24px, calc((100% - 1000px) / 2 + 24px))', 
          paddingRight: 'max(24px, calc((100% - 1000px) / 2 + 24px))', 
          margin: '48px 0', 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {images.map((src, i) => (
          <FadeIn key={i}>
            <div 
              className="vision-gallery-item" 
              style={{ 
                width: '260px',
                height: '200px', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255, 255, 255, 0.15)', 
                background: 'rgba(255, 255, 255, 0.05)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img 
                src={src} 
                alt={`Factory Interior ${i + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </FadeIn>
        ))}
      </div>

      {/* 3. Our Mission Row */}
      <div className="container" style={{ maxWidth: '1000px', padding: '0 24px' }}>
        <FadeIn>
          <div className="vision-mission-row">
            <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Our Mission
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', margin: 0, fontWeight: 500 }}>
              To deliver innovative, high-performance, and cost-effective packaging solutions that create long-term value for customers, employees, and stakeholders through ethical business practices, operational excellence, and continuous improvement.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
