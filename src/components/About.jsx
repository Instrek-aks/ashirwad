import FadeIn from './FadeIn'

export default function About() {
  return (
    <section className="about-section" id="about">
      {/* 1. Global Presence Sub-section */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <div className="about-grid">
          <div>
            <span className="section-tag">Global Presence</span>
            <h2 className="section-title">Auto-validation<br />Global Presence</h2>
            <p className="section-desc">
              We have an extensive global presence serving clients across Europe, North America,
              Middle East, and Asia. Our products comply with strict international regulatory
              standards, ensuring seamless integration into your supply chain.
            </p>
            <a href="#products" className="btn-primary" style={{ marginTop: '16px' }}>Our Products</a>
          </div>
          <FadeIn>
            <div className="map-img-box">
              <img src="/images/world_map_blue.png" alt="Global Presence Map" className="map-img" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 2. About Us / Innovation & Precision Sub-section */}
      <div className="container">
        <div className="about-intro-header">
          <span className="section-tag-center">About Us</span>
          <h2 className="section-title-center">
            Exceeding expectations<br />through continuous<br />Innovation & Precision
          </h2>
        </div>
        
        <div className="about-intro-grid" style={{ marginTop: '30px' }}>
          <div className="about-intro-text">
            <p>
              We are committed to delivering state-of-the-art packaging solutions tailored to our customers' specific needs. Our focus on quality and advanced manufacturing technology ensures that every product meets the highest standards of safety, durability, and functionality.
            </p>
            <p>
              With over 15 years of industry experience, we continue to innovate and expand our product offerings to serve various sectors, including pharmaceuticals, personal care, cosmetics, and food packaging.
            </p>
          </div>
          <FadeIn>
            <div className="factory-aerial-box">
              <img src="/images/factory_aerial.png" alt="Factory Aerial View" className="factory-aerial-img" />
              {/* Optional small red indicator pin matching the visual in reference */}
              <div className="factory-pin"></div>
            </div>
          </FadeIn>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#products" className="btn-primary">Our Products</a>
        </div>
      </div>
    </section>
  )
}

