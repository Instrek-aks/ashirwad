import { useState } from 'react'
import FadeIn from './FadeIn'

const clientBrands = [
  { name: 'Mankind', logo: '/v1.webp' },
  { name: 'Alkem Healthcare', logo: '/v2.webp' },
  { name: 'Leeford', logo: '/v3.webp' },
  { name: 'Akums', logo: '/v4.webp' },
  { name: 'Add', logo: '/v5.webp' },
  { name: 'Tirupati', logo: '/v7.webp' },
  { name: 'Acme Generics', logo: '/v8.webp' },
  { name: 'Immacule', logo: '/v9.webp' },
  { name: 'Pure & Cure', logo: '/v10.webp' },
  { name: 'Synokem', logo: '/v11.webp' },
  { name: 'Macleods', logo: '/v12.webp' }
]

function ClientLogoCard({ brand, width }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div 
      className="client-logo-card" 
      style={{ 
        background: '#fff', 
        borderRadius: '12px', 
        border: '1px solid rgba(0,0,0,0.06)', 
        padding: '20px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '85px', 
        width: width || 'auto',
        boxShadow: 'var(--shadow-sm)', 
        transition: 'all 0.3s ease' 
      }}
    >
      {!imgFailed ? (
        <img 
          src={brand.logo} 
          alt={brand.name} 
          style={{ maxHeight: '45px', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="client-logo-font" style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', textAlign: 'center', opacity: 0.8 }}>
          {brand.name}
        </span>
      )}
    </div>
  )
}

export default function Clients() {
  return (
    <section className="clients-section section-padding" id="clients" style={{ backgroundColor: '#f5f3e9', padding: '80px 0' }}>
      <div className="container">
        {/* Header Block */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Our Valuable Clients
          </h2>
          <p className="section-desc" style={{ fontSize: '15px', color: 'var(--text-gray)', opacity: 0.85, lineHeight: '1.7', margin: 0 }}>
            We are proud to partner with leading pharmaceutical names, delivering customized, regulatory-compliant packaging solutions trusted by healthcare brands worldwide.
          </p>
        </div>

        {/* Clients Grid Layout */}
        <div className="clients-grid-ref">
          {/* Main 10 clients on first two rows */}
          {clientBrands.slice(0, 10).map((brand, i) => (
            <FadeIn key={i}>
              <ClientLogoCard brand={brand} />
            </FadeIn>
          ))}
        </div>

        {/* Centered remaining 1 client on 3rd row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {clientBrands.slice(10).map((brand, i) => (
            <FadeIn key={i}>
              <ClientLogoCard brand={brand} width="184px" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
