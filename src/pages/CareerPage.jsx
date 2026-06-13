import { useState, useEffect, useRef } from 'react'
import ReachOut from '../components/ReachOut'

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

export default function CareerPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('careers')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    productType: '',
    description: '',
    careerDept: '',
    resumeUrl: '',
    yearsExperience: '',
    agree: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [heroRef, heroVisible] = useFadeIn()
  const [whyRef, whyVisible] = useFadeIn()
  const [promiseRef, promiseVisible] = useFadeIn()
  const [formRef, formVisible] = useFadeIn()
  const [certRef, certVisible] = useFadeIn()
  const [footerCtaRef, footerCtaVisible] = useFadeIn()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone || !formData.email || !formData.agree) {
      alert('Please fill out all required fields and accept the terms.')
      return
    }
    console.log('Form Submitted:', { tab: activeTab, ...formData })
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        productType: '',
        description: '',
        careerDept: '',
        resumeUrl: '',
        yearsExperience: '',
        agree: false
      })
    }, 4000)
  }

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.career-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'career-img-fallback-badge'
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

  return (
    <div className="career-page-wrapper">

      <section 
        className="career-hero"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url('/c0.png')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div 
          ref={heroRef} 
          className={`career-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="career-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">CAREER</span>
          </nav>
          <h1 className="career-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>Career</h1>
          <p className="career-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            With a focus on innovation and solidity, we offer you a perfect place for your professional development. Through our corporate culture and increased capabilities, discover yourself with Ashirwad Plastics and find out what we have in store for you in our Ashirwad world.
          </p>
        </div>
      </section>

      {/* 2. WHY JOIN US SECTION */}
      <section className="why-join-section">
        <div className="container">
          <div ref={whyRef} className={`why-join-content fade-section ${whyVisible ? 'visible' : ''}`}>
            
            {/* Top Layout: Two columns */}
            <div className="why-join-top-grid">
              <h2 className="why-join-title">Ashirwad Plastics Creating a World For a Better Life</h2>
              <p className="why-join-desc-para">
                Ashirwad Plastics is a leading pharmaceutical packaging manufacturer, focused on innovation and cost-effective solutions. We are always looking for passionate individuals to join our team and grow in a collaborative, learning-driven environment. Start your career with us and be part of excellence.
              </p>
            </div>

            {/* Benefits Cards Grid (4 equal cards) */}
            <div className="benefits-grid">
              
              {/* Card 1: Learning & Growth */}
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  {/* Lightbulb Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2">
                    <path d="M9 21h6" />
                    <path d="M9 18h6" />
                    <path d="M10 15H14" />
                    <path d="M12 2a7 7 0 0 0-7 7c0 2.3 1 4.3 2.7 5.7c1.3 1.1 2.3 2.6 2.3 4.3v1h4v-1c0-1.7 1-3.2 2.3-4.3A6.98 6.98 0 0 0 19 9c0-3.8-3.1-7-7-7z" />
                  </svg>
                </div>
                <h3>Learning and Growth</h3>
                <p>Get financial help for courses and training referred to your job in order to become more employable.</p>
              </div>

              {/* Card 2: Balanced Life */}
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  {/* Scales/Balance Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="5" y1="7" x2="19" y2="7" />
                    <path d="M5 7L2 17h6L5 7z" />
                    <path d="M19 7l-3 10h6l-3-10z" />
                  </svg>
                </div>
                <h3>Balanced Life</h3>
                <p>Enjoy a friendly atmosphere with flexible hours and lots of personal freedom, together with challenging work for all employees.</p>
              </div>

              {/* Card 3: Employee Recognition */}
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  {/* Badge Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                  </svg>
                </div>
                <h3>Employee Recognition</h3>
                <p>We value hard work and dedication by implementing regular employee recognition programs and motivate staff to excel further in their roles.</p>
              </div>

              {/* Card 4: Our Team Culture */}
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  {/* Teamwork Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3>Our Team Culture</h3>
                <p>Be part of a company with equally smart coworkers and enjoy working together to create a better tomorrow.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. EMPLOYEE PROMISE SECTION */}
      <section className="employee-promise-section">
        <div className="container">
          <div ref={promiseRef} className={`employee-promise-container fade-section ${promiseVisible ? 'visible' : ''}`}>
            
            {/* Left Side: Copy & checklist */}
            <div className="promise-left">
              <h2 className="promise-title">Innovation, Teamwork, and Quality-The Ashirwad Plastics Promise</h2>
              <div className="promise-checklist">
                
                <div className="promise-item">
                  <span className="promise-check-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="promise-text">Advanced packaging for contact and aqueous pediatric injectables.</span>
                </div>

                <div className="promise-item">
                  <span className="promise-check-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="promise-text">High-quality plastic containers for tablet and capsule filling.</span>
                </div>

                <div className="promise-item">
                  <span className="promise-check-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="promise-text">Customized solutions for pharmaceutical companies all over India.</span>
                </div>

                <div className="promise-item">
                  <span className="promise-check-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="promise-text">Environment friendly strategies for packaging systems to ensure zero toxic waste across the country.</span>
                </div>

              </div>
            </div>

            {/* Right Side: Image */}
            <div className="promise-right">
              <div className="promise-img-box">
                <img 
                  src="/c.png" 
                  alt="Ashirwad laboratory testing" 
                  onError={(e) => handleImageError(e, "Laboratory Testing")}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CAREER APPLICATION SECTION */}
      <section className="career-apply-section">
        <div className="container">
          <div ref={formRef} className={`career-apply-grid fade-section ${formVisible ? 'visible' : ''}`}>
            
            {/* Left Side: Contact Information */}
            <div className="apply-left">
              <h2 className="apply-heading">Fill out the form and wait for our experts to get back.</h2>
              <div className="apply-info-details">
                
                <div className="apply-info-item">
                  <span className="apply-info-label">EMAIL</span>
                  <a href="mailto:info@ashirwadplastics.com" className="apply-info-link">info@ashirwadplastics.com</a>
                </div>

                <div className="apply-info-item">
                  <span className="apply-info-label">PHONE NUMBER</span>
                  <div className="apply-info-phones">
                    <a href="tel:01725014551" className="apply-info-link">0172 5014551</a>
                    <a href="tel:7888697033" className="apply-info-link">7888697033</a>
                    <a href="tel:7888697034" className="apply-info-link">7888697034</a>
                  </div>
                </div>

                <div className="apply-info-item">
                  <span className="apply-info-label">ADDRESS</span>
                  <span className="apply-address-text">
                    Khasra No 06 Village Kondi Tehsil Baddi Distt.<br />
                    Solan, Himachal Pradesh, 173205
                  </span>
                </div>

              </div>
            </div>

            {/* Right Side: Tabbed Application Form */}
            <div className="apply-right">
              {isSubmitted ? (
                <div className="form-success-message">
                  <div className="success-icon-box">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2F67F6" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your application details have been submitted successfully. Our HR team will review your profile and contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="apply-query-form">
                  {/* Top Tabs */}
                  <div className="form-tabs-container">
                    <button
                      type="button"
                      className={`form-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                      onClick={() => setActiveTab('products')}
                    >
                      Products
                    </button>
                    <button
                      type="button"
                      className={`form-tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
                      onClick={() => setActiveTab('careers')}
                    >
                      Careers
                    </button>
                    <button
                      type="button"
                      className={`form-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                      onClick={() => setActiveTab('general')}
                    >
                      General Enquiry
                    </button>
                  </div>

                  {/* Tab Careers Fields */}
                  {activeTab === 'careers' && (
                    <>
                      <span className="form-section-title">Your Details</span>
                      <div className="form-fields-grid">
                        <div className="form-field-group">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="enter your full name*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="enter your phone number*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="enter your email*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="text"
                            name="yearsExperience"
                            value={formData.yearsExperience}
                            onChange={handleInputChange}
                            placeholder="year of experience"
                            className="form-input-field"
                          />
                        </div>
                      </div>

                      <span className="form-section-title" style={{ marginTop: '24px' }}>About the position</span>
                      <div className="form-field-group">
                        <select
                          name="careerDept"
                          value={formData.careerDept}
                          onChange={handleInputChange}
                          className="form-select-field"
                          required
                        >
                          <option value="" disabled>In which position, you are applying for?*</option>
                          <option value="manufacturing">Manufacturing Operations Analyst</option>
                          <option value="quality">Quality Assurance Inspector</option>
                          <option value="rnd">Research &amp; Design Engineer</option>
                          <option value="sales">Executive B2B Sales Representative</option>
                          <option value="hr">HR Administrator</option>
                        </select>
                      </div>
                      <div className="form-field-group" style={{ marginTop: '16px' }}>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Cover letter"
                          rows="4"
                          className="form-textarea-field"
                        />
                      </div>
                    </>
                  )}

                  {/* Tab Products Fields */}
                  {activeTab === 'products' && (
                    <>
                      <span className="form-section-title">Your Details</span>
                      <div className="form-fields-grid">
                        <div className="form-field-group">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="enter your full name*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="enter your phone number*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="enter your email*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="company / brand name"
                            className="form-input-field"
                          />
                        </div>
                      </div>

                      <span className="form-section-title" style={{ marginTop: '24px' }}>About the product</span>
                      <div className="form-field-group">
                        <select
                          name="productType"
                          value={formData.productType}
                          onChange={handleInputChange}
                          className="form-select-field"
                          required
                        >
                          <option value="" disabled>Product type*</option>
                          <option value="nasal">Nasal Dispensing Solutions</option>
                          <option value="injection">Injection Seals & Closures</option>
                          <option value="ophthalmic">Ophthalmic Droppers</option>
                          <option value="tablet">Tablet Containers</option>
                          <option value="dropper">Oral Droppers & Caps</option>
                        </select>
                      </div>
                      <div className="form-field-group" style={{ marginTop: '16px' }}>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Product description"
                          rows="4"
                          className="form-textarea-field"
                        />
                      </div>
                    </>
                  )}

                  {/* Tab General Enquiry Fields */}
                  {activeTab === 'general' && (
                    <>
                      <span className="form-section-title">Your Details</span>
                      <div className="form-fields-grid">
                        <div className="form-field-group">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="enter your full name*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="enter your phone number*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="enter your email*"
                            required
                            className="form-input-field"
                          />
                        </div>
                        <div className="form-field-group">
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="company / brand name"
                            className="form-input-field"
                          />
                        </div>
                      </div>

                      <span className="form-section-title" style={{ marginTop: '24px' }}>Enquiry Details</span>
                      <div className="form-field-group">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Please enter your enquiry here*"
                          rows="4"
                          required
                          className="form-textarea-field"
                        />
                      </div>
                    </>
                  )}

                  {/* Consent Checkbox */}
                  <div className="form-consent-group" style={{ marginTop: '20px' }}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="checkbox-checkmark"></span>
                      <span className="checkbox-text">
                        I agree to be contacted by Ashirwad Plastics and confirm that my information is accurate.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="form-submit-btn" style={{ width: '100%', borderRadius: '30px', marginTop: '24px' }}>
                    Submit Now
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 5. CERTIFICATIONS SECTION */}
      <section className="gp-cert-section">
        <div className="container">
          <div ref={certRef} className={`gp-cert-content fade-section ${certVisible ? 'visible' : ''}`}>
            <h2 className="gp-cert-title">We are Certified By</h2>
            <div className="gp-cert-row">
              {/* Badge 1: ISO 9001:2015 */}
              <div className="gp-cert-badge">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#2F67F6" strokeWidth="2.5" fill="none" />
                  <circle cx="30" cy="30" r="24" stroke="#2F67F6" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                  <text x="50%" y="42%" dominantBaseline="central" textAnchor="middle" fill="#2F67F6" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="9" fontWeight="800">ISO</text>
                  <text x="50%" y="58%" dominantBaseline="central" textAnchor="middle" fill="#2F67F6" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="7" fontWeight="600">9001:2015</text>
                </svg>
              </div>

              {/* Badge 2: ISO Certified */}
              <div className="gp-cert-badge">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#122A5C" strokeWidth="2.5" fill="none" />
                  <path d="M20 30L27 37L40 22" stroke="#122A5C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="50%" y="78%" dominantBaseline="central" textAnchor="middle" fill="#122A5C" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="6.5" fontWeight="700">ISO CERTIFIED</text>
                </svg>
              </div>

              {/* Badge 3: FDA */}
              <div className="gp-cert-badge">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#1F2937" fontFamily="Georgia, serif" fontSize="26" fontWeight="900" letterSpacing="2">FDA</text>
                </svg>
              </div>

              {/* Badge 4: Health Canada */}
              <div className="gp-cert-badge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E11D48">
                    <path d="M12 2L13.5 7.5L18.5 6L17 11L22 12.5L16.5 14L18 19L13.5 17.5L12 22L10.5 17.5L6 19L7.5 14L2 12.5L7 11L5.5 6L10.5 7.5L12 2Z" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#1F2937', fontFamily: 'system-ui' }}>Health</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', fontFamily: 'system-ui' }}>Canada</span>
                  </div>
                </div>
              </div>

              {/* Badge 5: GMP */}
              <div className="gp-cert-badge">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="28" stroke="#22C55E" strokeWidth="2.5" fill="none" />
                  <rect x="16" y="22" width="28" height="16" rx="3" fill="#22C55E" />
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#FFFFFF" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="9" fontWeight="800">GMP</text>
                  <text x="50%" y="78%" dominantBaseline="central" textAnchor="middle" fill="#22C55E" fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif" fontSize="6.5" fontWeight="700">CERTIFIED</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REACH OUT TODAY */}
      <ReachOut />

    </div>
  )
}
