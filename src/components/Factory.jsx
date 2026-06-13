import FadeIn from './FadeIn'

export default function Factory() {
  const images = [
    '/images/factory_interior1.png',
    '/images/factory_interior2.png',
    '/images/factory_interior3.png',
    '/images/factory_success.png',
    '/images/factory_interior1.png' // fallback for 5th item
  ]

  return (
    <section className="factory-section-blue" id="factory">
      <div className="container">
        {/* Our Vision Block */}
        <div className="vision-block">
          <div className="vision-left">
            <h2>Our Vision</h2>
          </div>
          <div className="vision-right">
            <p>
              To be the global leader in providing world-class, innovative, and sustainable packaging solutions. We strive to empower industries through advanced manufacturing, top-tier quality, and unmatched customer service, paving the way for a greener future.
            </p>
          </div>
        </div>

        {/* 5-Photo Gallery Grid */}
        <div className="factory-gallery-grid">
          {images.map((src, i) => (
            <FadeIn key={i}>
              <div className="factory-gallery-item">
                <img src={src} alt={`Factory Process ${i + 1}`} className="factory-gallery-img" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Our Factory Block */}
        <div className="factory-details-block">
          <div className="factory-left">
            <h2>Our Factory</h2>
          </div>
          <div className="factory-right">
            <p>
              Equipped with state-of-the-art European injection molding, blow molding, and automated assembly machinery, our facility operates under certified cleanroom environments. We manufacture high-precision pharmaceutical, cosmetic, and personal care products with zero tolerance for defects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

