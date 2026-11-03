import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';

export default function BlogPage({ onNavigate }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await blogService.getPublishedBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to load published blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];
  const gridBlogs = blogs.filter((b) => (b._id || b.id) !== (featuredBlog?._id || featuredBlog?.id));
  const displayedGrid = gridBlogs.slice(0, visibleCount);

  const handleOpenBlog = (slug) => {
    if (onNavigate) {
      onNavigate('blog-detail', slug);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ==================== 1. HERO BANNER (MATCHING MOCKUP 1) ==================== */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#0A1C2A',
          backgroundImage: 'linear-gradient(180deg, rgba(7, 18, 28, 0.38) 0%, rgba(10, 25, 38, 0.58) 100%), url(/blog-hero-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '130px 24px 85px',
          color: '#FFFFFF',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Overline */}
          <span
            style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.85)',
              letterSpacing: '0.4px',
              display: 'inline-block',
              marginBottom: '14px'
            }}
          >
            Knowledge Center &amp; Insights
          </span>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(32px, 4.8vw, 48px)',
              fontWeight: '700',
              lineHeight: '1.2',
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)'
            }}
          >
            Pioneering Excellence in Pharmaceutical & Healthcare Packaging
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.65',
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '640px',
              margin: '0 auto',
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            Explore scientific breakthroughs, regulatory compliance standards, and sustainable polymer innovations from the Ashirwad Plastics technical team.
          </p>
        </div>
      </section>

      {/* ==================== 2. FEATURED ARTICLE SECTION (MATCHING MOCKUP 1) ==================== */}
      {featuredBlog && (
        <section style={{ backgroundColor: '#FFFFFF', padding: '70px 24px 60px' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            
            {/* Top Row: Title on Left, Abstract on Right */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px 48px',
                alignItems: 'flex-end',
                marginBottom: '28px'
              }}
            >
              <div>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                  {featuredBlog.category || 'Mustadam Update'}
                </span>
                <h2
                  onClick={() => handleOpenBlog(featuredBlog.slug)}
                  style={{
                    fontSize: 'clamp(26px, 3.4vw, 36px)',
                    fontWeight: '700',
                    color: '#111827',
                    lineHeight: '1.25',
                    margin: 0,
                    letterSpacing: '-0.4px',
                    cursor: 'pointer'
                  }}
                >
                  {featuredBlog.title}
                </h2>
              </div>

              <div>
                <p style={{ fontSize: '13.5px', lineHeight: '1.65', color: '#4B5563', margin: 0 }}>
                  {featuredBlog.excerpt}
                </p>
              </div>
            </div>

            {/* Featured Image Banner */}
            <div
              onClick={() => handleOpenBlog(featuredBlog.slug)}
              style={{
                width: '100%',
                height: 'clamp(280px, 42vw, 460px)',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#E0F2FE',
                cursor: 'pointer',
                marginBottom: '18px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
              }}
            >
              <img
                src={featuredBlog.coverImage || '/blog-stethoscope.webp'}
                alt={featuredBlog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </div>

            {/* Footer Row: Date & Read Time on Left, Read Article Button on Right */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>
                January 2026 · {featuredBlog.readTime || '5 min read'}
              </span>

              <button
                type="button"
                onClick={() => handleOpenBlog(featuredBlog.slug)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: '#2F65E3',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(47, 101, 227, 0.3)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1D4ED8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2F65E3'; }}
              >
                <span>Read Article</span>
                <span style={{ fontSize: '15px', lineHeight: 1 }}>↗</span>
              </button>
            </div>

          </div>
        </section>
      )}

      {/* ==================== 3. LATEST UPDATES (3x3 GRID - MATCHING MOCKUP 2) ==================== */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '30px 24px 80px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
              Latest Updates
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: '700', color: '#111827', margin: 0, letterSpacing: '-0.3px' }}>
              Latest Updates from Ashirwad Plastics
            </h2>
          </div>

          {/* 3-Column Card Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '36px 30px'
            }}
          >
            {displayedGrid.map((post) => (
              <article
                key={post._id || post.id}
                onClick={() => handleOpenBlog(post.slug)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '100%',
                    height: '210px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#E0F2FE',
                    marginBottom: '14px'
                  }}
                >
                  <img
                    src={post.coverImage || '/blog-stethoscope.webp'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#111827',
                    lineHeight: '1.4',
                    margin: '0 0 12px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {post.title}
                </h3>

                {/* Meta Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    fontSize: '12px'
                  }}
                >
                  <span style={{ color: '#9CA3AF', fontWeight: '500' }}>
                    January 2026 · {post.readTime || '5 min read'}
                  </span>
                  <span style={{ color: '#2563EB', fontWeight: '600' }}>
                    Read Article
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Centered Read More Articles Button */}
          {gridBlogs.length > visibleCount && (
            <div style={{ textAlign: 'center', marginTop: '52px' }}>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                style={{
                  padding: '12px 30px',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: '#2F65E3',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(47, 101, 227, 0.3)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1D4ED8'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2F65E3'; }}
              >
                <span>Read More Articles</span>
                <span style={{ fontSize: '15px', lineHeight: 1 }}>↗</span>
              </button>
            </div>
          )}

        </div>
      </section>



    </div>
  );
}
