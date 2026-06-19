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

export default function ContactPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('products')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    productType: '',
    description: '',
    careerDept: '',
    resumeUrl: '',
    agree: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [heroRef, heroVisible] = useFadeIn()
  const [formRef, formVisible] = useFadeIn()
  const [galleryRef, galleryVisible] = useFadeIn()
  const [locRef, locVisible] = useFadeIn()
  const [ctaRef, ctaVisible] = useFadeIn()

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
        agree: false
      })
    }, 4000)
  }

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.facility-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'facility-img-fallback-badge'
      badge.style.width = '100%'
      badge.style.height = '100%'
      badge.style.display = 'flex'
      badge.style.flexDirection = 'column'
      badge.style.alignItems = 'center'
      badge.style.justifyContent = 'center'
      badge.style.background = 'linear-gradient(135deg, #2456D3 0%, #163A9B 100%)'
      badge.style.color = '#FFFFFF'
      badge.style.padding = '20px'
      badge.style.textAlign = 'center'
      
      badge.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.85;">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span style="font-size: 14px; font-weight: 600; letter-spacing: 0.5px;">${label}</span>
      `
      parent.appendChild(badge)
    }
  }

  return (
    <div className="contact-page-wrapper">
      
      <section 
        className="contact-hero" 
        id="contact-top"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.45) 100%), url('/m.webp')",
          position: 'relative',
          minHeight: '480px'
        }}
      >
        <div className="contact-hero-overlay" />
        <div 
          ref={heroRef} 
          className={`contact-hero-content fade-section ${heroVisible ? 'visible' : ''}`}
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
          <nav className="contact-breadcrumb" style={{ margin: 0 }}>
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>HOME</span>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-active">CONTACT US</span>
          </nav>
          <h1 className="contact-hero-title" style={{ margin: 0, lineHeight: 1.15 }}>
            Get in Touch with Our Team Today
          </h1>
          <p className="contact-hero-desc" style={{ margin: 0, maxWidth: '640px' }}>
            We offer innovative products and services and make every effort to conserve resources for future generations.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFO & FORM SECTION */}
      <section className="contact-form-section">
        <div className="container">
          <div ref={formRef} className={`contact-grid-layout fade-section ${formVisible ? 'visible' : ''}`}>
            
            {/* Left Column: Contact Information */}
            <div className="contact-info-col">
              <h2 className="contact-info-heading">
                Fill out the form and wait for our experts to get back.
              </h2>
              
              <div className="contact-info-details">
                <div className="contact-info-item">
                  <span className="contact-info-label">EMAIL</span>
                  <a href="mailto:info@ashirwadplastics.com" className="contact-info-link">
                    info@ashirwadplastics.com
                  </a>
                </div>

                <div className="contact-info-item">
                  <span className="contact-info-label">PHONE NUMBER</span>
                  <div className="contact-info-phones">
                    <a href="tel:01725014551" className="contact-info-link">0172 5014551</a>
                    <a href="tel:7888697033" className="contact-info-link">7888697033</a>
                    <a href="tel:7888697034" className="contact-info-link">7888697034</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <span className="contact-info-label">ADDRESS</span>
                  <a 
                    href="https://maps.google.com/?q=Khasra+No+06+Village+Kondi+Tehsil+Baddi+Distt.+Solan+Himachal+Pradesh+173205" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-info-link"
                    style={{ fontSize: '18px', fontWeight: '450', lineHeight: '1.6' }}
                  >
                    Khasra No 06 Village Kondi Tehsil Baddi Distt.<br />
                    Solan, Himachal Pradesh, 173205
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Modern Inquiry Form */}
            <div className="contact-form-col">
              {isSubmitted ? (
                <div className="form-success-message">
                  <div className="success-icon-box">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2456D3" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your enquiry has been submitted successfully. Our experts will get in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-query-form">
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

                  {/* Section Label */}
                  <span className="form-section-title">Your Details</span>

                  {/* Details Grid (2 columns on desktop) */}
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
                        placeholder="enter your phone number**"
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

                  {/* Conditional Product Section */}
                  {activeTab === 'products' && (
                    <div className="form-conditional-section">
                      <span className="form-section-title">About the product</span>
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
                    </div>
                  )}

                  {/* Conditional Careers Section */}
                  {activeTab === 'careers' && (
                    <div className="form-conditional-section">
                      <span className="form-section-title">Careers Preferences</span>
                      <div className="form-field-group">
                        <select
                          name="careerDept"
                          value={formData.careerDept}
                          onChange={handleInputChange}
                          className="form-select-field"
                          required
                        >
                          <option value="" disabled>Preferred Department*</option>
                          <option value="manufacturing">Manufacturing & Operations</option>
                          <option value="quality">Quality Assurance & Labs</option>
                          <option value="rnd">Research & Development</option>
                          <option value="sales">Sales & Marketing</option>
                          <option value="admin">Administration & HR</option>
                        </select>
                      </div>
                      <div className="form-field-group" style={{ marginTop: '16px' }}>
                        <input
                          type="text"
                          name="resumeUrl"
                          value={formData.resumeUrl}
                          onChange={handleInputChange}
                          placeholder="Link to your resume/portfolio*"
                          required
                          className="form-input-field"
                        />
                      </div>
                      <div className="form-field-group" style={{ marginTop: '16px' }}>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your experience and skills"
                          rows="4"
                          className="form-textarea-field"
                        />
                      </div>
                    </div>
                  )}

                  {/* Conditional General Enquiry Section */}
                  {activeTab === 'general' && (
                    <div className="form-conditional-section">
                      <span className="form-section-title">Enquiry Details</span>
                      <div className="form-field-group">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Please enter your enquiry here*"
                          rows="6"
                          required
                          className="form-textarea-field"
                        />
                      </div>
                    </div>
                  )}

                  {/* Consent Checkbox */}
                  <div className="form-consent-group">
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
                  <button type="submit" className="form-submit-btn">
                    Send your query
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. FACILITY GALLERY SECTION */}
      <section className="facility-gallery-section">
        <div className="container-fluid" style={{ padding: '0 24px' }}>
          <div ref={galleryRef} className={`facility-gallery-grid fade-section ${galleryVisible ? 'visible' : ''}`}>
            
            <div className="facility-image-card">
              <div className="facility-img-wrapper">
                <img 
                  src="/f2.webp" 
                  alt="Manufacturing Facility" 
                  onError={(e) => handleImageError(e, "Manufacturing Facility")}
                />
                <div className="facility-img-overlay">
                  <span>Manufacturing Facility</span>
                </div>
              </div>
            </div>

            <div className="facility-image-card">
              <div className="facility-img-wrapper">
                <img 
                  src="/reseach.webp" 
                  alt="Laboratory" 
                  onError={(e) => handleImageError(e, "Laboratory")}
                />
                <div className="facility-img-overlay">
                  <span>Laboratory</span>
                </div>
              </div>
            </div>

            <div className="facility-image-card">
              <div className="facility-img-wrapper">
                <img 
                  src="/g1.webp" 
                  alt="Production Floor" 
                  onError={(e) => handleImageError(e, "Production Floor")}
                />
                <div className="facility-img-overlay">
                  <span>Production Floor</span>
                </div>
              </div>
            </div>

            <div className="facility-image-card">
              <div className="facility-img-wrapper">
                <img 
                  src="/g2.webp" 
                  alt="Clean Room" 
                  onError={(e) => handleImageError(e, "Clean Room")}
                />
                <div className="facility-img-overlay">
                  <span>Clean Room</span>
                </div>
              </div>
            </div>

            <div className="facility-image-card">
              <div className="facility-img-wrapper">
                <img 
                  src="/quality.webp" 
                  alt="Quality Testing" 
                  onError={(e) => handleImageError(e, "Quality Testing")}
                />
                <div className="facility-img-overlay">
                  <span>Quality Testing</span>
                </div>
              </div>
            </div>

            <div className="facility-image-card">
              <div className="facility-img-wrapper">
                <img 
                  src="/f1.webp" 
                  alt="Production Facility" 
                  onError={(e) => handleImageError(e, "Production Facility")}
                />
                <div className="facility-img-overlay">
                  <span>Production Facility</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LOCATION SECTION */}
      <section className="location-heading-section">
        <div className="container">
          <div ref={locRef} className={`location-heading-content fade-section ${locVisible ? 'visible' : ''}`}>
            <span className="location-small-label">Our Single Location</span>
            <h2 className="location-large-title">
              Our Team is Solely based in Himachal Pradesh, India.
            </h2>
          </div>
        </div>
      </section>

      {/* 5. MAP SECTION */}
      <section className="interactive-map-section" style={{ height: '500px', width: '100%', overflow: 'hidden' }}>
        <img 
          src="/m1.webp" 
          alt="Ashirwad Plastics Location Map" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </section>

    </div>
  )
}
