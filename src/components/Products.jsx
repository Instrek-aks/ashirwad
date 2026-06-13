import { useState } from 'react'
import FadeIn from './FadeIn'

const productsList = [
  {
    id: 'ophthalmic',
    name: 'Ophthalmic Delivery System',
    desc: 'High-precision ophthalmic packaging for safe, sterile, & reliable drug delivery.',
    img: '/o1.jpg',
    cover: true
  },
  {
    id: 'nasal',
    name: 'Nasal Delivery System',
    desc: 'Advanced nasal dispensing for consistent dosing, convenience, & product integrity.',
    img: '/o2.jpg',
    cover: true
  },
  {
    id: 'tablet',
    name: 'Tablet Containers & Closures',
    desc: 'Secure, durable packaging for safe storage & protection of solid-dose products.',
    img: '/03.png',
    cover: true
  },
  {
    id: 'measuring',
    name: 'Measuring Caps & Oral Droppers',
    desc: 'Accurate, user-friendly dispensing for liquid pharmaceutical formulations.',
    img: '/o4.png'
  },
  {
    id: 'dropper',
    name: 'Glass Droppers',
    desc: 'Premium glass droppers for controlled dispensing and enhanced compatibility.',
    img: '/o5.png'
  },
  {
    id: 'dispenser',
    name: 'Dispenser Pumps',
    desc: 'Reliable pump systems for efficient, controlled liquid dispensing.',
    img: '/o6.png'
  },
  {
    id: 'trigger',
    name: 'Trigger Pumps',
    desc: 'Durable, ergonomic trigger pumps for personal care and industrial use.',
    img: '/o7.png'
  },
  {
    id: 'mist',
    name: 'Mist & Cream Pumps',
    desc: 'Precision-engineered mist and cream pumps for smooth, consistent dispensing.',
    img: '/o8.png'
  },
  {
    id: 'caps',
    name: 'Caps and Closures',
    desc: 'A wide range of closures for safety, protection, and product integrity.',
    img: '/o9.png'
  },
  {
    id: 'flipoff',
    name: 'Flip off Seals',
    desc: 'Secure, tamper-evident seals for pharmaceutical safety and sterility.',
    img: '/o10.png'
  }
]

function ProductCard({ product, onNavigate }) {
  const [imgFailed, setImgFailed] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div 
      className="product-card-ref" 
      onClick={() => {
        if (product.id === 'ophthalmic') {
          if (onNavigate) onNavigate('product-ophthalmic');
        } else if (product.id === 'nasal') {
          if (onNavigate) onNavigate('product-nasal');
        } else {
          if (onNavigate) onNavigate('contact');
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        background: '#fff', 
        border: '1px solid var(--border-gray)', 
        borderRadius: '24px', 
        padding: '20px', 
        boxShadow: hovered ? '0 12px 32px rgba(0, 0, 0, 0.08)' : '0 4px 16px rgba(0, 0, 0, 0.02)', 
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)', 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        height: '100%'
      }}
    >
      {/* Product Image Wrapper */}
      <div 
        className="product-card-img-box" 
        style={{ 
          width: '100%', 
          aspectRatio: '1.45', 
          borderRadius: '16px', 
          background: 'transparent',
          border: 'none',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden', 
          marginBottom: '16px', 
          position: 'relative'
        }}
      >
        {!imgFailed ? (
          <img 
            src={product.img} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: product.cover ? 'cover' : 'contain', 
              display: 'block',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="product-card-placeholder-text" style={{ fontSize: '12px', color: 'var(--text-gray)', opacity: 0.65, fontWeight: 500, textAlign: 'center', padding: '16px' }}>
            {product.name} Image
          </div>
        )}
      </div>

      {/* Product Info Block (Title at top, Description + Button Row below) */}
      <div className="product-card-info" style={{ marginTop: '0px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px', marginTop: 0, lineHeight: 1.3 }}>
          {product.name}
        </h3>

        {/* Description + Button Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <p style={{ flex: 1, fontSize: '13px', color: 'var(--text-gray)', lineHeight: '1.5', margin: 0, paddingRight: '4px' }}>
            {product.desc}
          </p>

          {/* Solid Blue Circle Arrow Action Button */}
          <div 
            className="product-card-circle-btn" 
            style={{ 
              position: 'relative',
              bottom: 'auto',
              right: 'auto',
              width: '30px', 
              height: '30px', 
              backgroundColor: hovered ? 'var(--blue-dark)' : 'var(--blue)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0,
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(36, 86, 211, 0.15)'
            }}
          >
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#fff" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ stroke: '#fff' }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products({ onNavigate }) {
  return (
    <section className="products-section section-padding" id="products" style={{ backgroundColor: '#fff', padding: '80px 0' }}>
      <div className="container">
        {/* Header Block */}
        <div className="products-intro" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Our Products
          </h2>
          <p className="section-desc" style={{ fontSize: '15px', color: 'var(--text-gray)', lineHeight: '1.7' }}>
            Innovative pharmaceutical packaging and dispensing solutions engineered for precision, safety, and regulatory compliance across global healthcare industries.
          </p>
        </div>

        {/* 10 Products Grid Layout */}
        <div className="products-grid-layout">
          {productsList.map((product, i) => (
            <FadeIn key={i}>
              <ProductCard product={product} onNavigate={onNavigate} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
