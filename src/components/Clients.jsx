import { useState } from 'react'
import FadeIn from './FadeIn'

const clientBrands = [
  { name: 'Mankind', logo: '/images/clients/client-1.webp' },
  { name: 'Alkem Healthcare', logo: '/images/clients/client-2.webp' },
  { name: 'Leeford', logo: '/images/clients/client-3.webp' },
  { name: 'Akums', logo: '/images/clients/client-4.webp' },
  { name: 'Add', logo: '/images/clients/client-5.webp' },
  { name: 'Tirupati', logo: '/images/clients/client-7.webp' },
  { name: 'Acme Generics', logo: '/images/clients/client-8.webp' },
  { name: 'Immacule', logo: '/images/clients/client-9.webp' },
  { name: 'Pure & Cure', logo: '/images/clients/client-10.webp' },
  { name: 'Synokem', logo: '/images/clients/client-11.webp' },
  { name: 'Macleods', logo: '/images/clients/client-12.webp' },
  { name: 'Client 12', logo: '/images/clients/client-nl.png' },
  { name: 'Client 13', logo: '/images/clients/logo-client-1.png' },
  { name: 'Client 14', logo: '/images/clients/logo-client-2.png' },
  { name: 'Client 15', logo: '/images/clients/logo-client-3.png' },
  { name: 'Client 16', logo: '/images/clients/logo-client-4.png' },
  { name: 'Client 17', logo: '/images/clients/logo-client-5.png' }
]

const largeLogos = ['/images/clients/client-1.webp', '/images/clients/client-2.webp', '/images/clients/client-4.webp', '/images/clients/client-5.webp', '/images/clients/client-7.webp', '/images/clients/client-8.webp', '/images/clients/client-9.webp', '/images/clients/logo-client-1.png']

function ClientLogoCard({ brand, width }) {
  const [imgFailed, setImgFailed] = useState(false)
  const isLarge = largeLogos.includes(brand.logo)
  const isV2 = brand.logo === '/images/clients/client-2.webp'

  return (
    <div 
      className="client-logo-card" 
      style={{ 
        background: '#fff', 
        borderRadius: '12px', 
        border: '1px solid rgba(0,0,0,0.06)', 
        padding: '24px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '130px', 
        width: '100%',
        boxShadow: 'var(--shadow-sm)', 
        transition: 'all 0.3s ease' 
      }}
    >
      {!imgFailed ? (
        <img 
          src={brand.logo} 
          alt={brand.name} 
          style={{ 
            width: '85%', 
            height: '85%', 
            maxHeight: '90px', 
            objectFit: 'contain', 
            display: 'block',
            transform: brand.logo === '/images/clients/client-2.webp' ? 'scale(1.25)' : 'none'
          }}
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
          {clientBrands.map((brand, i) => (
            <FadeIn key={i}>
              <ClientLogoCard brand={brand} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
