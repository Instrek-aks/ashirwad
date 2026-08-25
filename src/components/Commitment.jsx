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

export default function Commitment() {
  const [overviewRef, overviewVisible] = useFadeIn()
  const [processRef, processVisible] = useFadeIn()

  // Graceful fallback for missing local images
  const handleImageError = (e, label) => {
    e.target.style.display = 'none'
    const parent = e.target.parentElement
    if (parent && !parent.querySelector('.dev-img-fallback-badge')) {
      const badge = document.createElement('div')
      badge.className = 'dev-img-fallback-badge'
      badge.style.width = '100%'
      badge.style.height = '100%'
      badge.style.display = 'flex'
      badge.style.flexDirection = 'column'
      badge.style.alignItems = 'center'
      badge.style.justifyContent = 'center'
      badge.style.background = 'rgba(255, 255, 255, 0.15)'
      badge.style.color = '#FFFFFF'
      badge.style.padding = '20px'
      badge.style.textAlign = 'center'
      badge.style.borderRadius = '20px'
      badge.style.backdropFilter = 'blur(10px)'
      badge.style.border = '1px solid rgba(255, 255, 255, 0.2)'
      
      badge.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; opacity: 0.85;">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        <span style="font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">${label}</span>
      `
      parent.appendChild(badge)
    }
  }

  return (
    <>
      {/* 2. PROCESS OVERVIEW SECTION */}
      <section className="dev-overview-section">
        <div className="container">
          <div ref={overviewRef} className={`dev-overview-content fade-section ${overviewVisible ? 'visible' : ''}`}>
            <h2 className="dev-overview-title">Our Commitment to Precision and Excellence!</h2>
            <p className="dev-overview-subtitle">Check out our videos for straightforward guidance.</p>
          </div>
        </div>
      </section>

      {/* 3. FIVE-STEP DEVELOPMENT PROCESS CONTAINER */}
      <section className="dev-process-section">
        <div className="container">
          <div ref={processRef} className={`dev-process-gradient-box fade-section ${processVisible ? 'visible' : ''}`}>
            
            {/* Step 1 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 1</div>
                <h3 className="dev-step-heading">Initial Expert Consultation</h3>
                <div className="dev-step-desc">
                  <p>
                    Initial Expert Consultation Every successful packaging solution begins with a thorough understanding of your needs. In this first step, our experts consult with you on the type of product, its packaging methods, storage and transportation requirements, and any specific design considerations to be met. This ensures that your expectations are clearly understood and fully addressed from the outset.
                  </p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a0.webp" 
                    alt="Initial Expert Consultation" 
                    onError={(e) => handleImageError(e, "Consultation Team")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 2 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 2</div>
                <h3 className="dev-step-heading">Customized Design Development</h3>
                <div className="dev-step-desc">
                  <p>
                    Customized Design Development Based on your brief, our team of skilled designers develops a packaging solution tailored specifically to your requirements. Using advanced design software, we create packaging that is both functionally effective and aesthetically considered. Your close involvement throughout this stage ensures the design reaches its full potential before moving forward.
                  </p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a1.webp" 
                    alt="Customized Design Development" 
                    onError={(e) => handleImageError(e, "Design & Development Team")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 3 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 3</div>
                <h3 className="dev-step-heading">Prototype Creation and Approval</h3>
                <div className="dev-step-desc">
                  <p>
                    Prototype Creation & Approval Before any production begins, a prototype is created for your review. Our team works closely with you through any refinements until you are fully satisfied and ready to sign-off. This step helps to eliminate surprises, ensuring complete alignment between your vision and the final product.
                  </p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a3.webp" 
                    alt="Prototype Creation and Approval" 
                    onError={(e) => handleImageError(e, "Prototype Inspection")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 4 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 4</div>
                <h3 className="dev-step-heading">High-Quality Production</h3>
                <div className="dev-step-desc">
                  <p>
                    High-Quality Production With the prototype approved, production begins. Our advanced machinery and high-grade materials ensure that your packaging is manufactured to the highest standards of quality, consistency, and design integrity. Our production processes are built to be efficient without ever compromising on the quality of the finished product.
                  </p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a4 (2).webp" 
                    alt="High-Quality Production" 
                    onError={(e) => handleImageError(e, "Automated Production")}
                  />
                </div>
              </div>
            </div>

            <div className="dev-step-divider" />

            {/* Step 5 */}
            <div className="dev-step-row">
              <div className="dev-step-left">
                <div className="dev-step-number">Step 5</div>
                <h3 className="dev-step-heading">Comprehensive Quality Check</h3>
                <div className="dev-step-desc">
                  <p>
                    Comprehensive Quality Check Quality assurance is non-negotiable. Before your packaging leaves our facility, it undergoes a thorough inspection by our quality control team to verify that every unit meets our strict standards. We are committed to delivering products you can rely on, every single time.
                  </p>
                </div>
              </div>
              <div className="dev-step-right">
                <div className="dev-step-img-box">
                  <img 
                    src="/a5.webp" 
                    alt="Comprehensive Quality Check" 
                    onError={(e) => handleImageError(e, "Quality Assurance")}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
