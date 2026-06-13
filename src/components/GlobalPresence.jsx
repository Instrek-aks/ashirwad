import FadeIn from './FadeIn'

export default function GlobalPresence({ onNavigate }) {
  return (
    <section className="global-section section-padding" id="resources">
      <div className="container global-grid-layout">
        {/* Left Column: Copywriting & Action */}
        <div className="global-left">
          <div style={{ width: '95px', height: '4px', backgroundColor: '#2456D3', marginBottom: '24px' }}></div>
          <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}>
            Ashirwad Plastics<br />Global Response
          </h2>
          <p className="section-desc" style={{ fontSize: '15px', color: 'var(--text-gray)', lineHeight: '1.7', marginBottom: '24px' }}>
            At <span style={{ color: '#2456D3', fontWeight: 600 }}>Ashirwad Plastics</span>, we are not just manufacturers; we are architects of innovation and guardians of quality in the world of pharmaceutical packaging.
          </p>
          <a
            href="#"
            onClick={e => { e.preventDefault(); if (onNavigate) onNavigate('presence'); }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px', 
              color: '#2456D3', 
              fontSize: '15px', 
              fontWeight: '600', 
              textDecoration: 'underline', 
              transition: 'color 0.3s ease' 
            }}
          >
            Global Presence
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }}>
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>

        {/* Right Column: World Map Image */}
        <FadeIn>
          <div className="global-map-wrapper" style={{ padding: '20px', background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/map.png" 
              alt="Global Presence Map" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
