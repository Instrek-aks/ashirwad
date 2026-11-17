import { useEffect, useRef, useState } from 'react'

import BottomCertifications from '../components/BottomCertifications'



/* ─── Fade-in on scroll hook ─── */

function useFadeIn() {

  const ref = useRef(null)

  const [visible, setVisible] = useState(false)

  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => { if (entry.isIntersecting) setVisible(true) },

      { threshold: 0.1 }

    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()

  }, [])

  return [ref, visible]

}



/* ─── Section Tag ─── */

function Tag({ children, light }) {

  return (

    <span 

      style={{

        fontSize: '12px',

        fontWeight: 700,

        color: light ? 'rgba(255, 255, 255, 0.7)' : 'var(--blue)',

        textTransform: 'uppercase',

        display: 'block',

        marginBottom: '12px',

        letterSpacing: '1.5px'

      }}

    >

      {children}

    </span>

  )

}



/* ─────────────────────────────────────

   1. HERO BANNER

───────────────────────────────────── */

function AboutHero({ onNavigate }) {

  const [ref, v] = useFadeIn()

  return (

    <section 

      className="about-hero" 

      id="about-top"

    >

      <div className="container">

        <div 

          ref={ref} 

          className={`about-hero-content fade-section ${v ? 'visible' : ''}`} 

        >

          <Tag light>

            <span 

              onClick={() => onNavigate && onNavigate('home')} 

              style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}

              onMouseEnter={(e) => e.target.style.opacity = '0.7'}

              onMouseLeave={(e) => e.target.style.opacity = '1'}

            >

              HOME

            </span>{' '}

            &rarr; ABOUT US

          </Tag>

          <h1 className="about-hero-h1">

            Driven by Innovation,<br />Built on Quality Excellence

          </h1>

          <p className="about-hero-desc">

            we are not just manufacturers, we are architects of innovation and guardians of quality in the world of pharmaceutical packaging

          </p>

        </div>

      </div>

    </section>

  )

}



/* ─────────────────────────────────────

   2. WHO WE ARE & VIDEO SHOWCASE

───────────────────────────────────── */

function WhoWeAre() {

  const [ref1, v1] = useFadeIn()

  const [ref2, v2] = useFadeIn()



  return (

    <section style={{ backgroundColor: '#fff', padding: '80px 0 40px 0' }}>

      <div className="container">

        

        {/* Two Column Section */}

        <div ref={ref1} className={`fade-section ${v1 ? 'visible' : ''} about-who-grid`}>

          {/* Left Column: Copy */}

          <div>

            <Tag>Who We Are</Tag>

            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1E293B', marginBottom: '20px', lineHeight: 1.25 }}>

              Who We Are

            </h2>

            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.8', margin: 0 }}>

              At{' '}

              <a 

                href="#" 

                onClick={e => e.preventDefault()} 

                style={{ color: '#2456D3', fontWeight: 600, textDecoration: 'none' }}

              >

                Ashirwad Plastics

              </a>

              , we stand at the forefront of packaging innovation. We are committed to rendering dynamic, safe, and custom-made development in serving the pharmaceutical, cosmetic, and personal care industries. Since our founding in 2011, we have grown into a trusted name in pharmaceutical packaging, known for our unwavering commitment to quality, responsiveness, and product safety at every level.

            </p>

          </div>



          {/* Right Column: Workforce & Team Image */}

          <div className="about-who-img-col">

            <div className="about-who-img-wrapper">

              <img 

                src="/images/products/about-packaging.png" 

                alt="Ashirwad Plastics Workforce &amp; Team" 

                className="about-who-img"

                onError={e => {

                  if (e.target.src !== window.location.origin + '/images/markets/cta-banner-bg.webp') {

                    e.target.src = '/images/markets/cta-banner-bg.webp'

                  } else {

                    e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=450&q=80'

                  }

                }}

              />

            </div>

          </div>

        </div>



        {/* Video / Showcase container below */}

        <div ref={ref2} className={`fade-section ${v2 ? 'visible' : ''}`} style={{ marginTop: '50px' }}>

          <div 

            className="overview-video-container" 

          >

            <img 

              src="/images/facility/overview-thumb.webp" 

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

        </div>



      </div>

    </section>

  )

}



/* ─────────────────────────────────────

   3. STATS BAR

───────────────────────────────────── */

function AnimatedCounter({ target, suffix = '', active, duration = 1600 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }

    let frameId
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [active, target, duration])

  return <>{count}{suffix}</>
}

function AboutStats() {

  const [ref, v] = useFadeIn()

  const stats = [

    { target: 2018, suffix: '', label: 'Years of Established' },

    { target: 50, suffix: '+', label: 'Satisfied Customers' },

    { target: 10, suffix: '+', label: 'Product Categories' },

    { target: 200, suffix: '+', label: 'Professionals' }

  ]

  return (

    <section style={{ backgroundColor: '#fff', padding: '40px 0 60px 0' }}>

      <div className="container">

        <div ref={ref} className={`fade-section ${v ? 'visible' : ''} about-stats-grid`} style={{ textAlign: 'center' }}>

          {stats.map((s, i) => (

            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>

              <span style={{ fontSize: '48px', fontWeight: '800', color: '#2456D3', marginBottom: '8px', lineHeight: '1', fontVariantNumeric: 'tabular-nums' }}>
                <AnimatedCounter target={s.target} suffix={s.suffix} active={v} />
              </span>

              <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B' }}>{s.label}</span>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}



/* ─────────────────────────────────────

   4. FOUNDER'S MESSAGE

───────────────────────────────────── */

function FounderMessage() {

  const [ref, v] = useFadeIn()

  return (

    <section style={{ backgroundColor: '#fff', padding: '40px 0' }}>

      <div className="container">

        <div 

          ref={ref} 

          className={`fade-section ${v ? 'visible' : ''} about-founder-grid`}

          style={{

            background: 'linear-gradient(135deg, #163A9B 0%, #2456D3 100%)',

            borderRadius: '28px',

            padding: '48px',

            color: '#fff',

            boxShadow: '0 12px 32px rgba(36, 86, 211, 0.15)'

          }}

        >

          {/* Left Side */}

          <div>

            <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>

              Founder's Message

            </h2>

          </div>

          

          {/* Right Side */}

          <div>

            <p style={{ fontSize: '15px', lineHeight: '1.8', fontStyle: 'italic', margin: 0, color: 'rgba(255,255,255,0.95)' }}>

              "Driving, innovation packaging solutions is standard at Ashirwad Plastics to deliver safety and sustainability with inspection checks. We are one of the leading pharma &amp; food primary packaging companies showing quality checking, and precise packaging products to support health sector etc. We for standard B2B clients to secure plastic bottle caps, packaging detail of our company and professional guides."

            </p>

          </div>

        </div>

      </div>

    </section>

  )

}



/* ─────────────────────────────────────

   5. EXPERIENCE

───────────────────────────────────── */

function ExperienceAndCareers() {

  const [ref, v] = useFadeIn()



  return (

    <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>

      <div className="container">

        <div ref={ref} className={`fade-section ${v ? 'visible' : ''} about-experience-grid`}>

          

          {/* Left Column: Copy & Bio */}

          <div>

            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '24px', lineHeight: '1.2' }}>

              Experience

            </h2>

            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.8', marginBottom: '18px' }}>

              Manul Jain is a business leader with a strong foundation in legacy industries and a disciplined, adaptable approach to leadership. A former state-level cricketer, he brings the focus, teamwork, and resilience of competitive sport into business.

            </p>

            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.8', marginBottom: '18px' }}>

              Raised in a family rooted in pharmaceutical formulations, he gained early exposure to manufacturing, quality standards, and global markets through the family’s export-oriented plant, established in 2005. In 2018, he became Managing Director of Ashirwad Plastics, delivering innovative and reliable primary plastic packaging solutions for the pharmaceutical sector. He holds an MBA from Liverpool Business School.

            </p>

            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>

              Manul is committed to building value-driven solutions, fostering long-term partnerships, and consistently raising the bar.

            </p>

          </div>



          {/* Right Column: Founder Info Card */}

          <div 

            style={{ 

              background: '#fff', 

              border: '1px solid #E2E8F0', 

              borderRadius: '24px', 

              padding: '24px', 

              boxShadow: '0 10px 30px rgba(0,0,0,0.03)' 

            }}

          >

            <img 

              src="/images/about/team-1.webp" 

              alt="Manul Jain, Managing Director" 

              style={{ width: '100%', aspectRatio: '1.33', borderRadius: '16px', objectFit: 'cover', marginBottom: '20px', display: 'block' }}

            />

            

            {/* Info details */}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>

              <span style={{ color: '#2456D3', fontSize: '18px', fontWeight: '700' }}>

                Manul Jain

              </span>

              <div style={{ display: 'flex', gap: '8px' }}>

                {/* LinkedIn */}

                <a href="#" onClick={e => e.preventDefault()} style={{ color: '#2456D3' }}>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">

                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>

                  </svg>

                </a>

                {/* Facebook */}

                <a href="#" onClick={e => e.preventDefault()} style={{ color: '#2456D3' }}>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">

                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>

                  </svg>

                </a>

                {/* Twitter */}

                <a href="#" onClick={e => e.preventDefault()} style={{ color: '#2456D3' }}>

                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">

                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>

                  </svg>

                </a>

              </div>

            </div>



            <div style={{ fontSize: '14.5px', color: '#1E293B', fontWeight: '700', marginTop: '4px', marginBottom: '16px' }}>

              <strong>Managing Director</strong>

            </div>



            <div style={{ borderTop: '1px solid #F1F5F9', marginBottom: '16px' }}></div>



            {/* Address */}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2456D3" strokeWidth="2.5" style={{ marginTop: '2px', flexShrink: 0 }}>

                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />

                <circle cx="12" cy="9" r="2.5" />

              </svg>

              <span style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.4' }}>

                Address: Khasra No 06 Village Kather, Solan Bypass Road, Solan, Himachal Pradesh, 173212

              </span>

            </div>

          </div>



        </div>

      </div>

    </section>

  )

}







/* ─────────────────────────────────────

   7. OUR VALUABLE CLIENTS

───────────────────────────────────── */

function OurValuableClients() {

  const [ref, v] = useFadeIn()

  const [failedImages, setFailedImages] = useState({})



  const clients = [

    { name: 'Blue Cross', logo: '/images/clients/client-1.webp' },

    { name: 'Mankind', logo: '/images/clients/client-2.webp' },

    { name: 'Leeford', logo: '/images/clients/client-3.webp' },

    { name: 'Akums', logo: '/images/clients/client-4.webp' },

    { name: 'Add', logo: '/images/clients/client-5.webp' },

    { name: 'Tirupati', logo: '/images/clients/client-7.webp' },

    { name: 'Acme Generics', logo: '/images/clients/client-8.webp' },

    { name: 'Immacule', logo: '/images/clients/client-9.webp' },

    { name: 'Pure & Cure', logo: '/images/clients/client-10.webp' },

    { name: 'Synokem', logo: '/images/clients/client-11.webp' },

    { name: 'Macleods', logo: '/images/clients/client-12.webp' },

    { name: 'Pontika', logo: '/v6.webp' }, // fails and falls back to text 'Pontika'

    { name: 'Client 13', logo: '/images/clients/client-nl.png' },

    { name: 'Client 14', logo: '/images/clients/logo-client-1.png' },

    { name: 'Client 15', logo: '/images/clients/logo-client-2.png' },

    { name: 'Client 16', logo: '/images/clients/logo-client-3.png' },

    { name: 'Client 17', logo: '/images/clients/logo-client-4.png' },

    { name: 'Client 18', logo: '/images/clients/logo-client-5.png' }

  ]



  const handleImageError = (name) => {

    setFailedImages(prev => ({ ...prev, [name]: true }))

  }



  const renderClientCard = (client, width) => {

    const isFailed = failedImages[client.name]

    const largeLogos = ['/images/clients/client-1.webp', '/images/clients/client-2.webp', '/images/clients/client-4.webp', '/images/clients/client-5.webp', '/images/clients/client-7.webp', '/images/clients/client-8.webp', '/images/clients/client-9.webp', '/images/clients/logo-client-1.png']

    const isLarge = largeLogos.includes(client.logo)

    const isV2 = client.logo === '/images/clients/client-2.webp'



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

        {!isFailed ? (

          <img 

            src={client.logo} 

            alt={client.name} 

            style={{ 

              width: '85%', 

              height: '85%', 

              maxHeight: '90px', 

              objectFit: 'contain', 

              display: 'block',

              transform: client.logo === '/images/clients/client-2.webp' ? 'scale(1.25)' : 'none'

            }}

            onError={() => handleImageError(client.name)}

          />

        ) : (

          <span className="client-logo-font" style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', textAlign: 'center', opacity: 0.8 }}>

            {client.name}

          </span>

        )}

      </div>

    )

  }



  return (

    <section style={{ backgroundColor: '#f7f6f2', padding: '80px 0' }}>

      <div className="container">

        

        {/* Header */}

        <div ref={ref} className={`fade-section ${v ? 'visible' : ''}`} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>

          <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 700, color: '#1E293B', marginBottom: '10px' }}>

            Our Valuable Clients

          </h2>

          <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>

            Serving the healthcare industry worldwide with reliable packaging solutions.

          </p>

        </div>



        <div className="about-clients-grid">

          {clients.map((client, i) => (

            <div key={i}>

              {renderClientCard(client)}

            </div>

          ))}

        </div>



      </div>

    </section>

  )

}



/* ─────────────────────────────────────

   MAIN ABOUT PAGE EXPORT

───────────────────────────────────── */

export default function AboutPage({ onNavigate }) {

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'smooth' })

  }, [])



  return (

    <>

      <AboutHero onNavigate={onNavigate} />

      <WhoWeAre />

      <AboutStats />

      <FounderMessage />

      <ExperienceAndCareers />

      <BottomCertifications />

      <OurValuableClients />

    </>

  )

}

