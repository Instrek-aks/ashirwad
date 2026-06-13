import FadeIn from './FadeIn'

export default function ReachOut() {
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
          background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0) 0%, rgba(30, 41, 59, 0.4) 50%, #1e293b 100%)', 
          zIndex: 1 
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
        <FadeIn>
          <h2 className="reach-title-ref">
            Reach Out Today
          </h2>
          <p className="reach-desc-ref" style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontWeight: 500 }}>
            Every question is an opportunity. Let's find the answers together.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
