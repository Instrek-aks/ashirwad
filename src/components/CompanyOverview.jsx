import FadeIn from './FadeIn'

export default function CompanyOverview({ onNavigate }) {
  return (
    <section className="overview-section section-padding" id="about" style={{ backgroundColor: '#fff', padding: '80px 0' }}>
      <div className="container">
        
        {/* Two-Column Header Block */}
        <div className="overview-grid" style={{ marginBottom: '40px' }}>
          {/* Left Column: Heading */}
          <div>
            <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '10px', letterSpacing: '0.5px' }}>
              About Us
            </span>
            <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.25, color: 'var(--text-dark)', margin: 0 }}>
              Delivering Industrial Excellence<br />Through Innovation &amp; Precision
            </h2>
          </div>
          
          {/* Right Column: Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '28px' }}>
            <p className="section-desc" style={{ fontSize: '14.5px', color: 'var(--text-gray)', lineHeight: '1.75', margin: 0 }}>
              Ashirwad Plastics is proud to expand its operations with a state-of-the-art manufacturing facility in Solan, Himachal Pradesh. This advanced facility is designed to redefine standards in pharmaceutical packaging through enhanced quality, compliance, and operational excellence.
            </p>
            <p className="section-desc" style={{ fontSize: '14.5px', color: 'var(--text-gray)', lineHeight: '1.75', margin: 0 }}>
              With a strong focus on innovation, customer satisfaction, and sustainable growth, we continue to deliver reliable packaging solutions that align with global industry standards.
            </p>
          </div>
        </div>

        {/* Video / Image Showcase Container */}
        <FadeIn>
          <div className="overview-video-container">
            <img 
              src="/y.png" 
              alt="Ashirwad Plastics Solan Facility" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {/* Dark tint overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.2)' }}></div>

            {/* YouTube Red Play Button overlay */}
            <div className="youtube-play-btn" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '68px', height: '48px', backgroundColor: '#ff0000', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(255, 0, 0, 0.3)', transition: 'all 0.3s ease' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            </div>
            
            {/* Fallback label if image fails */}
            <div className="video-fallback-label" style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#fff', fontSize: '13px', fontWeight: 600, background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '4px' }}>
              Solan Facility Video Walkthrough
            </div>
          </div>
        </FadeIn>

        {/* Read More Button */}
        <div style={{ textAlign: 'center' }}>
          <a 
            href="#" 
            className="btn-primary" 
            onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              borderRadius: '30px', 
              padding: '12px 30px', 
              background: '#2456D3', 
              color: '#FFFFFF', 
              fontWeight: '600', 
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s ease', 
              boxShadow: '0 4px 12px rgba(36, 86, 211, 0.15)' 
            }}
          >
            Read More About Us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '4px' }}>
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
