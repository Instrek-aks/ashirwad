import { useState, useRef, useEffect } from 'react'
import FadeIn from './FadeIn'

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

export default function ReachOut() {
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
  const [formRef, formVisible] = useFadeIn()

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

  return (
    <section 
      className="reach-section-ref" 
      id="contact" 
    >
      {/* Seamless vertical gradient overlay fading to the footer's background color (#1e293b) */}
      <div 
        className="reach-overlay-ref" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.2) 0%, rgba(30, 41, 59, 0.6) 50%, #1e293b 100%)', 
          zIndex: 1 
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={formRef} className={`contact-grid-layout fade-section ${formVisible ? 'visible' : ''}`}>
          
          {/* Left Column: Title & Info */}
          <div className="contact-info-col" style={{ color: '#ffffff' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              Contact Us
            </span>
            <h2 className="reach-title-ref" style={{ color: '#ffffff', marginBottom: '24px' }}>
              Reach Out Today
            </h2>
            <p className="reach-desc-ref" style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '48px', lineHeight: '1.6' }}>
              Every question is an opportunity. Fill out the form and our pharmaceutical packaging experts will get in touch with you shortly.
            </p>

            <div className="contact-info-details">
              <div className="contact-info-item">
                <span className="contact-info-label" style={{ color: '#F59E0B' }}>EMAIL</span>
                <a href="mailto:info@ashirwadplastics.com" className="contact-info-link" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '500' }}>
                  info@ashirwadplastics.com
                </a>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-label" style={{ color: '#F59E0B' }}>PHONE NUMBER</span>
                <div className="contact-info-phones">
                  <a href="tel:01725014551" className="contact-info-link" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '500' }}>0172 5014551</a>
                  <a href="tel:7888697033" className="contact-info-link" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '500' }}>+91-7888697033</a>
                  <a href="tel:7888697034" className="contact-info-link" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '500' }}>+91-7888697034</a>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-label" style={{ color: '#F59E0B' }}>ADDRESS</span>
                <a 
                  href="https://maps.google.com/?q=Khasra+No+06+Village+Kondi+Tehsil+Baddi+Distt.+Solan+Himachal+Pradesh+173205" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-info-link"
                  style={{ color: '#ffffff', fontSize: '16px', fontWeight: '450', lineHeight: '1.6' }}
                >
                  Khasra No 06 Village Kondi Tehsil Baddi Distt.<br />
                  Solan, Himachal Pradesh, 173205
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Tabbed Form */}
          <div className="contact-form-col" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            {isSubmitted ? (
              <div className="form-success-message">
                <div className="success-icon-box" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ color: '#ffffff' }}>Thank You!</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Your enquiry has been submitted successfully. Our experts will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-query-form" style={{ margin: 0 }}>
                {/* Top Tabs */}
                <div className="form-tabs-container">
                  <button
                    type="button"
                    className={`form-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                    style={{ border: '1px solid rgba(255,255,255,0.2)', background: activeTab === 'products' ? '#2456D3' : 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                  >
                    Products
                  </button>
                  <button
                    type="button"
                    className={`form-tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('careers')}
                    style={{ border: '1px solid rgba(255,255,255,0.2)', background: activeTab === 'careers' ? '#2456D3' : 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                  >
                    Careers
                  </button>
                  <button
                    type="button"
                    className={`form-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                    style={{ border: '1px solid rgba(255,255,255,0.2)', background: activeTab === 'general' ? '#2456D3' : 'rgba(255,255,255,0.1)', color: '#ffffff' }}
                  >
                    General Enquiry
                  </button>
                </div>

                {/* Section Label */}
                <span className="form-section-title" style={{ color: '#F59E0B' }}>Your Details</span>

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
                      style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
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
                      style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
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
                      style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
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
                      style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
                    />
                  </div>
                </div>

                {/* Conditional Product Section */}
                {activeTab === 'products' && (
                  <div className="form-conditional-section">
                    <span className="form-section-title" style={{ color: '#F59E0B' }}>About the product</span>
                    <div className="form-field-group">
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        className="form-select-field"
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
                        required
                      >
                        <option value="" disabled>Product type*</option>
                        <option value="ophthalmic">Ophthalmic Delivery Systems</option>
                        <option value="nasal">Nasal Delivery Systems</option>
                        <option value="tablet">Tablet Containers &amp; Closures</option>
                        <option value="flipoff">Flip-Off Seals</option>
                        <option value="measuring">Measuring Caps &amp; Oral Droppers</option>
                        <option value="glass-dropper">Glass Droppers</option>
                        <option value="dispenser">Dispenser Pumps</option>
                        <option value="trigger">Trigger Pumps</option>
                        <option value="mist-cream">Mist &amp; Cream Pumps</option>
                        <option value="caps-closures">Caps &amp; Closures</option>
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
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
                      />
                    </div>
                  </div>
                )}

                {/* Conditional Careers Section */}
                {activeTab === 'careers' && (
                  <div className="form-conditional-section">
                    <span className="form-section-title" style={{ color: '#F59E0B' }}>Career Preferences</span>
                    <div className="form-field-group">
                      <select
                        name="careerDept"
                        value={formData.careerDept}
                        onChange={handleInputChange}
                        className="form-select-field"
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
                        required
                      >
                        <option value="" disabled>Preferred Department*</option>
                        <option value="manufacturing">Manufacturing &amp; Operations</option>
                        <option value="quality">Quality Assurance &amp; Labs</option>
                        <option value="rnd">Research &amp; Development</option>
                        <option value="sales">Sales &amp; Marketing</option>
                        <option value="admin">Administration &amp; HR</option>
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
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
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
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
                      />
                    </div>
                  </div>
                )}

                {/* Conditional General Enquiry Section */}
                {activeTab === 'general' && (
                  <div className="form-conditional-section">
                    <span className="form-section-title" style={{ color: '#F59E0B' }}>Enquiry Details</span>
                    <div className="form-field-group">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please enter your enquiry here*"
                        rows="6"
                        required
                        className="form-textarea-field"
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#1E293B', border: '1px solid rgba(255,255,255,0.2)' }}
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
                    <span className="checkbox-checkmark" style={{ background: formData.agree ? '#2456D3' : 'rgba(255,255,255,0.9)' }}></span>
                    <span className="checkbox-text" style={{ color: 'rgba(255,255,255,0.85)' }}>
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
  )
}
