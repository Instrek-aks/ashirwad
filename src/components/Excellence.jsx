import FadeIn from './FadeIn'

export default function Excellence() {
  const cards = [
    {
      title: 'Manufacturing',
      desc: 'We leverage advanced manufacturing technologies and modern facilities to deliver consistent quality and operational excellence.',
      icon: (
        <svg viewBox="0 0 24 24" className="excellence-icon" fill="none" stroke="#2456D3" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="10" x2="6" y2="14" stroke="#2456D3" strokeWidth="2" />
          <line x1="18" y1="10" x2="18" y2="14" stroke="#2456D3" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: 'Sustainability',
      desc: 'We follow environmentally responsible practices focused on efficiency, waste reduction, and sustainable growth.',
      icon: (
        <svg viewBox="0 0 24 24" className="excellence-icon" fill="none" stroke="#2456D3" strokeWidth="2">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 6V12L16 14" />
        </svg>
      )
    },
    {
      title: 'Quality',
      desc: 'Our strict quality standards ensure every product meets industry regulations and customer expectations.',
      icon: (
        <svg viewBox="0 0 24 24" className="excellence-icon" fill="none" stroke="#2456D3" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'Research & Development',
      desc: 'Our R&D team continuously develops innovative packaging solutions aligned with evolving industry needs.',
      icon: (
        <svg viewBox="0 0 24 24" className="excellence-icon" fill="none" stroke="#2456D3" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    }
  ]

  return (
    <section 
      className="excellence-section section-padding" 
      style={{ 
        backgroundColor: '#f7f6f2', 
        padding: '100px 0 80px 0',
        borderTopLeftRadius: '60px',
        borderTopRightRadius: '60px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
            Excellence at Every Stage.
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="excellence-grid">
          {cards.map((c, i) => (
            <FadeIn key={i}>
              <div className="excellence-card" style={{ backgroundColor: '#fff', border: '1px solid var(--border-gray)', borderRadius: '12px', padding: '30px 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <div className="excellence-icon-box" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(36, 86, 211, 0.06)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {c.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '10px' }}>{c.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', lineHeight: '1.6', margin: 0 }}>{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
