import { useState } from 'react'
import { inquiryService } from '../services/inquiryService'

const BROCHURE_FILE_URL = '/downloads/AP-Brochure.pdf'
const BROCHURE_FILENAME = 'AP-Brochure.pdf'

export default function BrochurePage({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const triggerDownload = () => {
    const link = document.createElement('a')
    link.href = BROCHURE_FILE_URL
    link.download = BROCHURE_FILENAME
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullName = formData.fullName.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const company = formData.company.trim()

    if (!fullName || !email || !phone) {
      setErrorMsg('Please enter your full name, email address, and phone number.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')
    try {
      await inquiryService.submitInquiry({
        type: 'PRODUCT_INQUIRY',
        fullName,
        email,
        phone,
        company,
        description: 'Downloaded AP-Brochure.pdf',
        source: 'Brochure Download'
      })
      setIsSubmitted(true)
      setFormData({ fullName: '', email: '', phone: '', company: '' })
      triggerDownload()
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit your details. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      style={{
        minHeight: 'calc(100vh - 160px)',
        padding: '120px 20px 72px',
        background: 'linear-gradient(180deg, #F4F7FC 0%, #FFFFFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#FFFFFF',
          borderRadius: '18px',
          padding: '36px 32px',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
          border: '1px solid #E2E8F0'
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#2456D3',
              marginBottom: '8px'
            }}
          >
            Ashirwad Plastics
          </span>
          <h1
            style={{
              margin: '0 0 8px',
              fontSize: '28px',
              fontWeight: '700',
              color: '#0F172A',
              lineHeight: 1.25
            }}
          >
            Download Company Brochure
          </h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
            Please fill in your details below. Your brochure download will start automatically upon submission.
          </p>
        </div>

        {isSubmitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '28px 16px',
              background: '#F8FAFC',
              borderRadius: '14px',
              border: '1px solid #E2E8F0'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#DBEAFE',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2456D3" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: '22px', color: '#0F172A' }}>
              Download Started
            </h2>
            <p style={{ margin: '0 0 22px', fontSize: '14.5px', color: '#475569', lineHeight: 1.55 }}>
              Thank you for your interest in Ashirwad Plastics. If your brochure did not download automatically, click below.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={triggerDownload}
                style={{
                  padding: '11px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#2456D3',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Download Brochure Again
              </button>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                style={{
                  padding: '11px 20px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#334155',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Visit Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {errorMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  fontSize: '13.5px',
                  fontWeight: '500'
                }}
              >
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="brochure-fullName" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Full Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                id="brochure-fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="brochure-email" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Email ID <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                id="brochure-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="brochure-phone" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Phone Number <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                id="brochure-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="brochure-company" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Company Name
              </label>
              <input
                id="brochure-company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company or organization"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: '4px',
                width: '100%',
                padding: '13px 20px',
                borderRadius: '10px',
                border: 'none',
                background: isSubmitting ? '#93C5FD' : '#2456D3',
                color: '#FFFFFF',
                fontSize: '15.5px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit & Download Brochure'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
