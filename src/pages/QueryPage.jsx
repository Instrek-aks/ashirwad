import { useState } from 'react'
import { inquiryService } from '../services/inquiryService'

export default function QueryPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullName = formData.fullName.trim()
    const email = formData.email.trim()
    const description = formData.description.trim()

    if (!fullName || !email || !description) {
      setErrorMsg('Please enter your name, email address, and query.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')
    try {
      await inquiryService.submitInquiry({
        type: 'GENERAL_QUERY',
        fullName,
        email,
        description,
        source: 'QR Query Page'
      })
      setIsSubmitted(true)
      setFormData({ fullName: '', email: '', description: '' })
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit your query. Please try again.')
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
            Submit a Query
          </h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: 1.55 }}>
            Have a question for us? Share your details below and our team will get back to you.
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
              Query Submitted
            </h2>
            <p style={{ margin: '0 0 22px', fontSize: '14.5px', color: '#475569', lineHeight: 1.55 }}>
              Thank you for reaching out. Your query has been received and our team will respond shortly.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
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
                Submit Another Query
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
              <label htmlFor="query-fullName" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                id="query-fullName"
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
              <label htmlFor="query-email" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Email ID <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                id="query-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
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
              <label htmlFor="query-description" style={{ fontSize: '13.5px', fontWeight: '600', color: '#1E293B' }}>
                Your Query <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <textarea
                id="query-description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Type your query here..."
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  color: '#0F172A',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
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
              {isSubmitting ? 'Submitting...' : 'Submit Query'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
