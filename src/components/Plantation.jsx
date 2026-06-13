import FadeIn from './FadeIn'

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

export default function Plantation() {
  const points = [
    {
      title: 'Zero Carbon Footprint',
      desc: 'Utilizing solar power infrastructure to reduce carbon footprint by 60% across all production sites.'
    },
    {
      title: '100% Recyclable Material',
      desc: 'We use post-consumer recycled plastics (PCR) and eco-friendly resins in up to 40% of our products.'
    },
    {
      title: 'Water Recycling System',
      desc: 'Closed-loop cooling and production systems to recirculate water and minimize waste.'
    },
    {
      title: 'Solar Power Infrastructure',
      desc: 'Equipped with advanced rooftop solar arrays to supply our manufacturing facility with clean energy.'
    }
  ]

  return (
    <section className="plantation-section-ref" id="plantation">
      <div className="container">
        <div className="plantation-grid">
          {/* Left: Checklist */}
          <div>
            <h2 className="section-title">Innovating Pharmaceutical &amp; Packaging</h2>
            <p className="section-desc" style={{ marginBottom: '24px' }}>
              Our green initiatives integrate sustainable practices into every stage of packaging design and manufacturing.
            </p>
            <div className="plantation-points">
              {points.map((p, i) => (
                <div className="plantation-point-item" key={i} style={{ marginTop: i === 0 ? 0 : '16px' }}>
                  <div className="point-icon-green"><CheckIcon /></div>
                  <div className="point-text-block">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Radial Factory Machine Image */}
          <FadeIn>
            <div className="plantation-img-box-ref">
              <img src="/images/factory_interior3.webp" alt="Sustainability Packaging" className="plantation-ref-img" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

