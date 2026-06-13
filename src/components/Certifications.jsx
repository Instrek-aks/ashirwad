import FadeIn from './FadeIn'

export default function Certifications() {
  return (
    <section className="cert-section section-padding" style={{ backgroundColor: '#fff', borderTop: '1px solid var(--border-gray)', borderBottom: '1px solid var(--border-gray)', padding: '60px 0' }}>
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="section-title" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
            Certifications &amp; Compliance
          </h2>
        </div>

        {/* Logos Strip Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          
          <FadeIn>
            <img src="/c1.webp" alt="Certification Logo 1" style={{ height: '60px', maxWidth: '140px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/c2.webp" alt="Certification Logo 2" style={{ height: '60px', maxWidth: '140px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/c3.webp" alt="Certification Logo 3" style={{ height: '60px', maxWidth: '140px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/c4.webp" alt="Certification Logo 4" style={{ height: '60px', maxWidth: '140px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/c5.webp" alt="Certification Logo 5" style={{ height: '60px', maxWidth: '140px', objectFit: 'contain' }} />
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
