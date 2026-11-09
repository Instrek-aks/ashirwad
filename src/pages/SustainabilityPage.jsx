import { useState, useEffect, useRef } from 'react'

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

export default function SustainabilityPage({ onNavigate }) {
  const [heroRef, heroVisible] = useFadeIn()
  const [approachRef, approachVisible] = useFadeIn()
  const [ehsRef, ehsVisible] = useFadeIn()
  const [focusRef, focusVisible] = useFadeIn()
  const [gridRef, gridVisible] = useFadeIn()
  const [commitmentRef, commitmentVisible] = useFadeIn()
  const [journeyRef, journeyVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()

  // Active tab state for EHS & Policies section
  const [activePolicyTab, setActivePolicyTab] = useState('ehs')

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [lightboxImg, setLightboxImg] = useState(null)

  const galleryImages = [
    '/sustainibility/4.webp',
    '/sustainibility/5.webp',
    '/sustainibility/1.webp',
    '/sustainibility/3.webp',
    '/sustainibility/7.webp',
    '/sustainibility/8.webp',
    '/sustainibility/6.webp'
  ]

  // Responsive itemsPerView
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth <= 640) {
        setItemsPerView(1)
      } else if (window.innerWidth <= 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const maxSlide = Math.max(0, galleryImages.length - itemsPerView)

  useEffect(() => {
    if (isPaused || maxSlide === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, maxSlide])

  const nextSlide = () => setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))

  useEffect(() => {
    if (!lightboxImg) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.mfg-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'mfg-img-fallback-badge'
      badge.style.width = '100%'
      badge.style.height = '100%'
      badge.style.display = 'flex'
      badge.style.flexDirection = 'column'
      badge.style.alignItems = 'center'
      badge.style.justifyContent = 'center'
      badge.style.background = 'linear-gradient(135deg, #2F67F6 0%, #0D1C3D 100%)'
      badge.style.color = '#FFFFFF'
      badge.style.padding = '20px'
      badge.style.textAlign = 'center'
      badge.style.borderRadius = '20px'
      
      badge.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.85;">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span style="font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">${label}</span>
      `
      parent.appendChild(badge)
    }
  }

  // Policy tab contents
  const policyTabs = [
    { id: 'ehs', label: 'EHS Policy' },
    { id: 'about', label: 'About Sustainability' },
    { id: 'director', label: 'Message from Management' },
    { id: 'esg', label: 'ESG Policy' },
    { id: 'csr', label: 'CSR Policy' },
    { id: 'risk', label: 'Risk Management' },
    { id: 'whistle', label: 'Whistle Blower' }
  ]

  const policyData = {
    ehs: {
      badge: "Environment, Health & Safety",
      title: "Our Commitment to Environment, Health, and Safety (EHS):",
      points: [
        "Comply with all statutory EHS regulations, national standards, and customer sustainability frameworks.",
        "Prevent environmental pollution by minimizing emissions, recycling process scrap, and conserving water and power.",
        "Implement rigorous hazard identification, risk assessments, and proactive incident reporting to maintain a zero-harm workplace.",
        "Conduct regular employee and contractor training in machine safety, PPE compliance, and cleanroom safety protocols.",
        "Regularly audit EHS systems and benchmark against global packaging and cleanroom standards (ISO 9001, ISO 15378, GMP).",
        "Invest in energy-efficient all-electric injection blow molding machines and closed-loop process cooling systems.",
        "Foster workplace innovation to conserve natural resources, improve ergonomics, and eliminate hazardous waste."
      ]
    },
    about: {
      badge: "Core Philosophy",
      title: "Our Strategic Sustainability Blueprint:",
      points: [
        "Embedding responsible manufacturing principles into every stage of pharmaceutical packaging design and supply.",
        "Active decoupling of operational growth from environmental impact through cleaner industrial technologies.",
        "Collaborative supplier engagement ensuring ethical raw material sourcing and full chain-of-custody compliance.",
        "Targeting verified life-cycle enhancements across our primary packaging containers, closures, and dispensing systems.",
        "Fostering employee-driven green champions across all our production shifts and quality laboratories."
      ]
    },
    director: {
      badge: "Leadership Vision",
      title: "Message from the Management:",
      points: [
        "\"At Ashirwad Plastics, our ambition is to protect vital pharmaceutical products while safeguarding our planet's future.\"",
        "Continuous capital investment in low-emission machinery, rooftop solar feasibility, and advanced scrap reclaim systems.",
        "Empowering our workforce through transparent leadership, safety ownership, and lifelong skill upgradation.",
        "Partnering closely with pharmaceutical innovators to develop lighter, circular-ready packaging that reduces global carbon footprints."
      ]
    },
    esg: {
      badge: "ESG Architecture",
      title: "Environmental, Social & Governance (ESG) Framework:",
      points: [
        "Environmental: Carbon footprint tracking, closed-loop cooling, clean scrap pulverizing, and energy conservation.",
        "Social: Safe and inclusive workplace culture, fair wages, zero discrimination, and strong employee welfare schemes.",
        "Governance: Transparent business ethics, strict anti-bribery policies, verifiable quality audits, and data integrity.",
        "Regulatory adherence to FDA DMF, US Pharmacopeia, and European Pharmacopoeia regulatory expectations."
      ]
    },
    csr: {
      badge: "Community & Impact",
      title: "Corporate Social Responsibility (CSR):",
      points: [
        "Local environmental greening and plantation drives around industrial sectors and local community belts.",
        "Educational and healthcare assistance for shop-floor personnel and supporting surrounding regional communities.",
        "Promoting community sanitation, clean drinking water access, and waste awareness programs.",
        "Emergency community relief participation and vocational skill-development workshops."
      ]
    },
    risk: {
      badge: "Risk & Resilience",
      title: "Operational & Climate Risk Management:",
      points: [
        "Proactive identification of supply chain disruptions, polymer feedstock price volatility, and regulatory shifts.",
        "Preventive maintenance protocols to avert unforeseen machine downtime, energy spikes, or hydraulic leakages.",
        "Comprehensive fire safety infrastructure, automated hydrants, and emergency response drills.",
        "Redundant power and water management systems ensuring uncompromised cleanroom packaging reliability."
      ]
    },
    whistle: {
      badge: "Ethics & Transparency",
      title: "Whistle Blower & Ethical Conduct Policy:",
      points: [
        "Confidential, retaliation-free reporting channels for any violations of environmental, safety, or ethical standards.",
        "Immediate independent inquiry protocols overseen by top governance and compliance heads.",
        "Zero-tolerance stance against unethical trade practices, product tampering, or data concealment.",
        "Open-door culture encouraging every employee to speak up for workplace dignity and environmental protection."
      ]
    }
  }

  const currentPolicy = policyData[activePolicyTab] || policyData.ehs

  const focusAreas = [
    {
      title: "Sustainable Packaging Solutions",
      desc: "Developing recyclable and resource-optimized primary pharma packaging, closures, and dispensers designed for circularity and reduced material intensity.",
      tag: "Product Circularity"
    },
    {
      title: "Eco-Efficient Operations",
      desc: "Deploying high-efficiency injection blow molding equipment, closed-loop cooling, and strict energy audits to minimize per-unit carbon output.",
      tag: "Energy & Emissions"
    },
    {
      title: "Responsible Supply Chain",
      desc: "Ethically sourcing high-purity medical-grade virgin polymers and collaborating with certified suppliers who share our ecological and social standards.",
      tag: "Sourcing & Ethics"
    },
    {
      title: "Circular Economy & Zero Landfill",
      desc: "Promoting 100% recyclability of clean industrial scrap, optimized purge reuse, and minimal waste-to-landfill across all production facilities.",
      tag: "Waste Minimization"
    }
  ]

  return (
    <div className="mfg-page-wrapper">

      {/* 1. HERO SECTION */}
      <section 
        className="mfg-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/sustainibility/1.webp')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`mfg-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
          style={{ 
            position: 'absolute',
            top: 'clamp(100px, 9.2vw, 132px)',
            left: 'clamp(24px, 8.3vw, 120px)',
            maxWidth: '852px',
            width: 'calc(100% - 48px)',
            minHeight: '238.729736328125px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transform: 'rotate(0deg)',
            opacity: 1,
            textAlign: 'left'
          }}
        >
          <nav className="mfg-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">SUSTAINABILITY</span>
          </nav>
          <h1 className="mfg-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Sustainability & EHS</h1>
          <p className="mfg-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            A core value that shapes every decision we make. We combine responsible manufacturing, workplace safety, and circular thinking to protect both healthcare products and the planet.
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION (Matching Manufacturing, Quality & R&D Pages) */}
      <section className="mfg-overview-section">
        <div className="container">
          <div ref={approachRef} className={`mfg-overview-grid fade-section ${approachVisible ? 'visible' : ''}`}>
            
            {/* Left Column: Copy */}
            <div className="mfg-overview-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Our Sustainability Approach</h2>
              <p className="mfg-overview-paragraph">
                At Ashirwad Plastics, sustainability is not an afterthought—it is a core value embedded into how we design, manufacture, and deliver primary pharmaceutical and consumer packaging solutions. We recognise that choices made today define the environmental legacy we leave for the future.
              </p>
              <p className="mfg-overview-paragraph">
                From disciplined raw material stewardship and energy-efficient cleanroom molding to closed-loop recycling and strict compliance with global EHS benchmarks, we continuously minimize our environmental footprint while maintaining absolute pharmaceutical-grade precision.
              </p>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="mfg-cta-link"
              >
                Learn More About Our Efforts <span className="mfg-cta-arrow">→</span>
              </a>
            </div>

            {/* Right Column: Prominent Facility / Eco Image */}
            <div className="mfg-overview-right">
              <div className="mfg-facility-img-box">
                <img 
                  src="/sustainibility/7.webp" 
                  alt="Our Sustainability Approach" 
                  onError={(e) => handleImageError(e, "Sustainability Approach")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SUSTAINABILITY FRAMEWORK HIGHLIGHTS (Responsive Checkpoint Card) */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '60px 0', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container">
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: 'clamp(24px, 3.5vw, 44px)',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)'
            }}
          >
            <div style={{ maxWidth: '720px', marginBottom: '28px' }}>
              <span 
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#2F67F6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  display: 'inline-block',
                  marginBottom: '8px'
                }}
              >
                Operational Pillars
              </span>
              <h3 style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Our sustainability-focused approach brings together:
              </h3>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '16px 28px'
              }}
            >
              {[
                "Carbon-conscious & energy-efficient manufacturing",
                "Renewable & solar energy resources",
                "Zero hazardous waste generation",
                "Closed-loop water and chiller systems",
                "100% recyclable virgin medical-grade polymers",
                "In-house clean scrap reclaim optimization",
                "Employee-driven sustainability & safety teams",
                "Continuous environmental audits & compliance"
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span 
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(47, 103, 246, 0.1)',
                      color: '#2F67F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span style={{ fontSize: '14.5px', fontWeight: 500, color: '#334155', lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. POLICIES & GOVERNANCE (Clean & Minimalist with Tabs Above) */}
      <section 
        className="mfg-capabilities-section" 
        style={{ 
          backgroundColor: '#0D1C3D', 
          color: '#FFFFFF',
          padding: 'clamp(60px, 7vw, 90px) 0',
          position: 'relative'
        }}
      >
        <div className="container">
          <div ref={ehsRef} className={`fade-section ${ehsVisible ? 'visible' : ''}`}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
              <div 
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(47, 103, 246, 0.18)',
                  color: '#60A5FA',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                  border: '1px solid rgba(47, 103, 246, 0.3)'
                }}
              >
                Governance &amp; Compliance
              </div>
              <h2 
                style={{ 
                  fontSize: 'clamp(26px, 3vw, 38px)', 
                  fontWeight: 700, 
                  color: '#FFFFFF',
                  letterSpacing: '-0.6px',
                  lineHeight: 1.25,
                  marginBottom: '12px'
                }}
              >
                Policies &amp; Corporate Governance
              </h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: '#94A3B8', margin: 0 }}>
                Explore our corporate policies, occupational health and safety commitments, and ethical governance standards.
              </p>
            </div>

            {/* TAB BAR ON TOP */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '32px'
              }}
            >
              {policyTabs.map((tab) => {
                const isActive = activePolicyTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePolicyTab(tab.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '100px',
                      fontSize: '13.5px',
                      fontWeight: isActive ? 600 : 500,
                      backgroundColor: isActive ? '#2F67F6' : 'rgba(255, 255, 255, 0.06)',
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      border: isActive ? '1px solid #2F67F6' : '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#FFFFFF'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#94A3B8'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'
                      }
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Clean Content Card */}
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: 'clamp(24px, 4vw, 44px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                maxWidth: '960px',
                margin: '0 auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span 
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#4ADE80',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600
                  }}
                >
                  {currentPolicy.badge}
                </span>
              </div>

              <h3 
                style={{ 
                  fontSize: 'clamp(20px, 2vw, 24px)', 
                  fontWeight: 700, 
                  color: '#FFFFFF', 
                  marginBottom: '24px',
                  lineHeight: 1.35
                }}
              >
                {currentPolicy.title}
              </h3>

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '16px 28px'
                }}
              >
                {currentPolicy.points.map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span 
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(47, 103, 246, 0.25)',
                        color: '#60A5FA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '3px'
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span style={{ fontSize: '14px', lineHeight: 1.6, color: '#CBD5E1' }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. SUSTAINABILITY FOCUS AREAS (Clean card layout without images or link buttons) */}
      <section className="mfg-capabilities-section" style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div ref={focusRef} className={`fade-section ${focusVisible ? 'visible' : ''}`}>
            
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
              <div className="mfg-accent-line" style={{ margin: '0 auto 16px auto' }} />
              <h2 className="mfg-section-title" style={{ margin: '0 0 16px 0' }}>
                Sustainability Focus Areas
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-gray)', margin: 0 }}>
                Our sustainability strategy advances responsible materials, low-emission processing, and ethical packaging solutions that protect consumers and preserve the environment.
              </p>
            </div>

            {/* 4 Cards Grid - Clean, Image-free, Minimalist */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}
            >
              {focusAreas.map((area, idx) => (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(15, 23, 42, 0.06)'
                    e.currentTarget.style.borderColor = '#CBD5E1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)'
                    e.currentTarget.style.borderColor = '#E2E8F0'
                  }}
                >
                  <span 
                    style={{ 
                      fontSize: '11.5px', 
                      fontWeight: 700, 
                      color: '#2F67F6', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.8px',
                      marginBottom: '10px'
                    }}
                  >
                    {area.tag}
                  </span>
                  <h3 
                    style={{ 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      color: '#0F172A', 
                      marginBottom: '12px',
                      lineHeight: 1.35
                    }}
                  >
                    {area.title}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: '14px', 
                      lineHeight: 1.65, 
                      color: '#64748B', 
                      margin: 0
                    }}
                  >
                    {area.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. SUSTAINABILITY PRACTICES GRID (3x2 Alternate Layout from Ashirwad Style) */}
      <section className="mfg-capabilities-section" style={{ backgroundColor: '#F8FAFC', padding: '100px 0' }}>
        <div className="container">
          <div ref={gridRef} className={`mfg-capabilities-grid fade-section ${gridVisible ? 'visible' : ''}`}>
            
            {/* Card 1: What We Do (Image) */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/sustainibility/3.webp" 
                alt="Recycled Materials Line" 
                onError={(e) => handleImageError(e, "Recycled Materials")}
              />
            </div>

            {/* Card 2: What We Do (Text) */}
            <div className="mfg-grid-card mfg-card-dark">
              <h3 className="mfg-card-heading">What We Do for a Sustainable Future</h3>
              <div className="mfg-benefits-list">
                
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>High-Yield Precision Molding</h4>
                    <p>We leverage advanced injection blow molding systems that cut raw material scrap to near zero, maintaining pharmaceutical wall consistency while optimizing resin weight.</p>
                  </div>
                </div>

                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <h4>Energy Optimization</h4>
                    <p>Our manufacturing floor utilizes microprocessor-controlled drives and variable-frequency cooling towers that continuously curtail electrical consumption per thousand units produced.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 3: Waste Reduction (Text) */}
            <div className="mfg-grid-card mfg-card-light">
              <h3 className="mfg-card-heading" style={{ color: '#1F2937' }}>Zero-Waste Generation</h3>
              <div className="mfg-benefits-list">
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6' }}>
                      Through closed-loop resource management and proactive cleanroom regrind protocols for non-pharma ancillary components, we minimize landfill contributions and ensure maximum circular polymer recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Waste Reduction (Image) */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/sustainibility/4.webp" 
                alt="Waste Reduction" 
                onError={(e) => handleImageError(e, "Waste Reduction")}
              />
            </div>

            {/* Card 5: Sustainable Practices (Image) */}
            <div className="mfg-grid-card mfg-img-card">
              <img 
                src="/sustainibility/5.webp" 
                alt="Sustainable Practices" 
                onError={(e) => handleImageError(e, "Sustainable Practices")}
              />
            </div>

            {/* Card 6: Sustainable Practices (Text) */}
            <div className="mfg-grid-card mfg-card-light">
              <h3 className="mfg-card-heading" style={{ color: '#1F2937' }}>Sustainable Packaging Design</h3>
              <div className="mfg-benefits-list">
                <div className="mfg-benefit-item">
                  <span className="mfg-check-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="mfg-benefit-content">
                    <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '1.6' }}>
                      From mono-material closures and dispensers to optimized neck geometries, our designs simplify downstream municipal and industrial recycling streams across all major consumer and pharmaceutical markets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. INITIATIVES & GREEN GALLERY */}
      <section 
        className="mfg-facility-section" 
        ref={galleryRef}
        style={{ 
          backgroundColor: '#FFFFFF', 
          padding: '90px 0', 
          borderTop: '1px solid var(--border-gray)',
          borderBottom: '1px solid var(--border-gray)'
        }}
      >
        <div className="container">
          <div className={`fade-section ${galleryVisible ? 'visible' : ''}`}>
            
            {/* Header: Exact match to website styling */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end', 
              marginBottom: '36px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <div className="mfg-accent-line" style={{ marginBottom: '14px' }} />
                <h2 className="mfg-section-title" style={{ margin: '0 0 8px 0' }}>Greening & Campus Initiatives</h2>
                <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>
                  Witness our green campus, plantation drives, and employee-led environmental activities.
                </p>
              </div>

              {/* Prev / Next circular buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2F67F6'
                    e.currentTarget.style.color = '#2F67F6'
                    e.currentTarget.style.transform = 'translateX(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#CBD5E1'
                    e.currentTarget.style.color = '#0F172A'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2F67F6'
                    e.currentTarget.style.color = '#2F67F6'
                    e.currentTarget.style.transform = 'translateX(2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#CBD5E1'
                    e.currentTarget.style.color = '#0F172A'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Image carousel */}
            <div 
              style={{ overflow: 'hidden', borderRadius: '20px' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                style={{
                  display: 'flex',
                  gap: '24px',
                  transform: `translateX(calc(-${currentSlide} * (100% / ${itemsPerView} + ${24 / itemsPerView}px)))`,
                  transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                {galleryImages.map((src, idx) => (
                  <div 
                    key={idx}
                    style={{
                      flex: `0 0 calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})`,
                      boxSizing: 'border-box'
                    }}
                  >
                    <div 
                      className="mfg-facility-img-box"
                      style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        aspectRatio: '1.45',
                        width: '100%',
                        backgroundColor: '#E2E8F0',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                        cursor: 'pointer'
                      }}
                      onClick={() => setLightboxImg(src)}
                    >
                      <img 
                        src={src} 
                        alt={`Sustainability Gallery ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onError={(e) => handleImageError(e, `Initiative ${idx + 1}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.04)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimalist Pagination Dots */}
            {maxSlide > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
                {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    style={{
                      width: currentSlide === idx ? '26px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: currentSlide === idx ? '#2F67F6' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Simple Clean Full-Screen Image Lightbox */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={() => setLightboxImg(null)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img 
            src={lightboxImg} 
            alt="Full Preview" 
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
            }} 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 7. COMMITMENT BEYOND THE ENVIRONMENT */}
      <section className="mfg-facility-section" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div ref={commitmentRef} className={`mfg-facility-grid fade-section ${commitmentVisible ? 'visible' : ''}`}>
            
            <div className="mfg-facility-left">
              <div className="mfg-facility-img-box">
                <img 
                  src="/sustainibility/2.webp" 
                  alt="Sustainable Workplace" 
                  onError={(e) => handleImageError(e, "Sustainable Workplace")}
                />
              </div>
            </div>

            <div className="mfg-facility-right">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Beyond the Environment: Social & Ethics</h2>
              <div className="mfg-facility-desc">
                <p>
                  Sustainability at Ashirwad Plastics extends beyond carbon metrics and tree plantation. We are equally dedicated to workforce safety, ethical conduct, equal opportunity, and meaningful social upliftment across our regional facilities.
                </p>
                <p>
                  We believe that long-term resilience requires creating measurable positive value across our three pillars: <strong>People, Planet, and Performance</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. JOURNEY FORWARD */}
      <section className="mfg-people-section" style={{ borderTop: '1px solid var(--border-gray)', padding: '100px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div ref={journeyRef} className={`mfg-people-grid fade-section ${journeyVisible ? 'visible' : ''}`}>
            
            <div className="mfg-people-left">
              <div className="mfg-accent-line" />
              <h2 className="mfg-section-title">Our Journey Forward</h2>
              <div className="mfg-people-desc">
                <p>
                  Sustainability is a continuous discipline of accountability and improvement. We hold our operations to world-class manufacturing standards, invest in next-generation cleanroom automation, and partner with leading healthcare brands to bring sustainable packaging to fruition.
                </p>
                <p>
                  Together with our customers, technical partners, and community members, we are building a safer, cleaner tomorrow.
                </p>
              </div>
            </div>

            <div className="mfg-people-right">
              <div className="mfg-people-img-box">
                <img 
                  src="/sustainibility/6.webp" 
                  alt="Our Journey Forward" 
                  onError={(e) => handleImageError(e, "Journey Forward")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="cta-dot-map-bg" />
        <div className="container">
          <div ref={ctaRef} className={`cta-banner-grid fade-section ${ctaVisible ? 'visible' : ''}`}>
            <h2 className="cta-banner-heading">Want to Learn More About Our Sustainability &amp; EHS Framework?</h2>
            <div className="cta-banner-right">
              <p className="cta-banner-desc">
                Connect with our technical and compliance team to understand how our sustainable packaging practices can support your environmental goals.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-banner-contact-link">
                Contact Us <span className="underline-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
