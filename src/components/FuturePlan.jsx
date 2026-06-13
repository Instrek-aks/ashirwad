import FadeIn from './FadeIn'

const CheckIcon = () => (
  <div style={{ width: '20px', height: '20px', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
)

export default function FuturePlan() {
  return (
    <section className="future-section section-padding" id="success" style={{ backgroundColor: '#fff', padding: '80px 0' }}>
      <div className="container future-grid">
        {/* Left Side: Factory/Production Image */}
        <FadeIn>
          <div className="future-img-box" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-gray)', aspectRatio: '1.35', backgroundColor: '#f1f5f9' }}>
            <img 
              src="/f1.png" 
              alt="Advanced Baddi Facility Production" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="img-fallback-label" style={{ color: 'var(--text-gray)', fontSize: '13px', fontWeight: 600, textAlign: 'center', padding: '40px 20px' }}>
              Advanced Machinery Production
            </div>
          </div>
        </FadeIn>

        {/* Right Side: Checklist Content */}
        <div>
          <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '18px' }}>
            Future Business Plan
          </h2>
          <p className="section-desc" style={{ fontSize: '14.5px', color: 'var(--text-gray)', lineHeight: '1.75', marginBottom: '28px' }}>
            At Ashirwad Plastics, we are entering a new phase of growth from our advanced Baddi facility, driven by innovation and customer-centric solutions. With a strong export focus, we aim to be a global partner in pharmaceutical packaging, ensuring top standards of quality, security, and service.
          </p>

          <div className="future-points" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Point 1 */}
            <div className="future-point-item" style={{ display: 'flex', gap: '16px' }}>
              <CheckIcon />
              <div className="future-point-text">
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
                  Expanding Global Reach
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', margin: 0 }}>
                  Our new plant meets global demand for high-quality packaging, adhering to international standards with a seamless supply chain.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="future-point-item" style={{ display: 'flex', gap: '16px' }}>
              <CheckIcon />
              <div className="future-point-text">
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
                  Investment in Research &amp; Development
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', margin: 0 }}>
                  Innovation drives our growth as we invest in R&D to deliver advanced, tailored solutions that enhance client value.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
