import FadeIn from './FadeIn'

export default function BottomCertifications() {
  const certifications = [
    {
      title: 'ISO 15378:2017',
      desc: 'Primary Packaging Materials for Medicinal Products',
      img: '/Product_Images/image3.jpeg',
      alt: 'ISO 15378 SGS Certification'
    },
    {
      title: 'ISO 9001:2015',
      desc: 'Quality Management Systems Standard',
      img: '/Product_Images/image4.jpeg',
      alt: 'ISO 9001 SGS Certification'
    },
    {
      title: 'US FDA DMF',
      desc: 'US Drug Master File (DMF) Registered Facility',
      img: '/nl.webp',
      alt: 'US FDA DMF Registration'
    },
    {
      title: 'Health Canada DMF',
      desc: 'Health Canada Drug Master File (HC DMF) Documentation',
      img: '/c4.webp',
      alt: 'Health Canada DMF Registered'
    },
    {
      title: 'cGMP Compliant',
      desc: 'Current Good Manufacturing Practice Compliant Facility',
      img: '/c5.webp',
      alt: 'cGMP Compliance'
    }
  ]

  return (
    <section 
      className="bottom-certifications-section" 
      style={{ 
        backgroundColor: '#F8FAFC', 
        borderTop: '1px solid #E2E8F0', 
        borderBottom: '1px solid #E2E8F0',
        padding: '70px 0 60px' 
      }}
    >
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(36, 86, 211, 0.08)', 
            color: '#2456D3', 
            borderRadius: '24px', 
            padding: '6px 16px', 
            fontSize: '13px', 
            fontWeight: 600, 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '12px'
          }}>
            Global Compliance &amp; Standards
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            International Quality &amp; Regulatory Certifications
          </h2>
          <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
            Every product manufactured at Ashirwad Plastics complies with global regulatory standards, validated by accredited international audit authorities and official Drug Master File (DMF) registrations.
          </p>
        </div>

        {/* Certification Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px', 
            marginBottom: 0 
          }}
        >
          {certifications.map((item, index) => (
            <FadeIn key={index} delay={index * 100}>
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(36, 86, 211, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <img 
                    src={item.img} 
                    alt={item.alt} 
                    style={{ maxHeight: '78px', maxWidth: '140px', objectFit: 'contain' }} 
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
