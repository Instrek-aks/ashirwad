import FadeIn from './FadeIn'

const CheckIcon = () => (
  <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2456D3" strokeWidth="4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
)

export default function Innovation() {
  const innovations = [
    {
      title: 'New Liquid Dispensing Solutions',
      desc: 'We develop advanced liquid dispensing systems ensuring precise dosage, safety, and convenience for evolving pharmaceutical needs.'
    },
    {
      title: 'Oral Solid Dispensing Solutions',
      desc: 'We develop oral solid packaging solutions with secure containers and closures, ensuring protection, ease of use, and global compliance.'
    },
    {
      title: 'Commitment to Customer Success',
      desc: "Our success is built on our customers' success, as we deliver tailored solutions, reliable support, and timely service to build lasting partnerships."
    },
    {
      title: 'Vision for the Future',
      desc: 'To become a global leader in pharmaceutical packaging through innovation, quality, and sustainable growth.'
    }
  ]

  return (
    <section className="innovation-section section-padding" id="innovation" style={{ background: 'linear-gradient(135deg, #163A9B 0%, #2456D3 100%)', padding: '80px 0', color: '#ffffff' }}>
      <div className="container">
        <div className="innovation-grid">
          {/* Left Column: Innovation Details */}
          <div>
            <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', marginBottom: '32px' }}>
              Innovating Pharmaceutical Packaging
            </h2>

            <div className="innovation-points-layout" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {innovations.map((item, i) => (
                <div className="innovation-item" key={i} style={{ display: 'flex', gap: '16px' }}>
                  <CheckIcon />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Manufacturing Image */}
          <FadeIn>
            <div className="innovation-img-box" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid rgba(255, 255, 255, 0.15)', aspectRatio: '1.15', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <img 
                src="/f2.webp" 
                alt="High-Precision Manufacturing Mold Assembly" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="img-fallback-label" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', fontWeight: 600, textAlign: 'center', padding: '40px 20px' }}>
                Precision Mold Process Assembly
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
