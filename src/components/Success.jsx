import FadeIn from './FadeIn'

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

export default function Success() {
  return (
    <section className="success-section" id="success">
      <div className="container">
        <div className="success-grid">
          {/* Left: Image */}
          <FadeIn>
            <div className="success-img-box-ref">
              <img src="/images/factory_success.webp" alt="Future Business Plan" className="success-ref-img" />
            </div>
          </FadeIn>

          {/* Right: Checklist */}
          <div>
            <h2 className="section-title">Future Business Plan</h2>
            <p className="section-desc" style={{ marginBottom: '24px' }}>
              We are constantly looking ahead to expand our technological capabilities and environmental initiatives.
            </p>
            <div className="success-points-ref">
              <div className="success-point-item">
                <div className="point-icon-green"><CheckIcon /></div>
                <div className="point-text-block">
                  <h4>Automation Expansion</h4>
                  <p>Expanding our production capacity with 5 new fully automated assembly and packaging lines imported from Europe.</p>
                </div>
              </div>

              <div className="success-point-item" style={{ marginTop: '20px' }}>
                <div className="point-icon-green"><CheckIcon /></div>
                <div className="point-text-block">
                  <h4>Sustainable Material Integration</h4>
                  <p>Introducing 100% PCR (Post-Consumer Recycled) plastic materials and biodegradable resins across our packaging products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

