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
            <img src="/Product_Images/image3.jpeg" alt="ISO 15378 SGS Certification" style={{ height: '78px', maxWidth: '180px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/Product_Images/image4.jpeg" alt="ISO 9001 SGS Certification" style={{ height: '78px', maxWidth: '180px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/nl.webp" alt="US FDA Registration" style={{ height: '55px', maxWidth: '180px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/c4.webp" alt="Health Canada Registered" style={{ height: '78px', maxWidth: '180px', objectFit: 'contain' }} />
          </FadeIn>

          <FadeIn>
            <img src="/c5.webp" alt="GMP Compliant" style={{ height: '78px', maxWidth: '180px', objectFit: 'contain' }} />
          </FadeIn>

        </div>

        {/* FDA & Health Canada DMF Registration Info */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '30px', background: '#F0F5FF', border: '1px solid #D6E4FF', fontSize: '13.5px', color: '#1D39C4', fontWeight: 600 }}>
            US FDA Drug Master File (DMF) &amp; Health Canada DMF Registered Facility
          </span>
        </div>
      </div>
    </section>
  )
}
