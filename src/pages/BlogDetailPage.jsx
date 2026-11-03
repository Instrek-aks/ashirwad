import { useState, useEffect, useMemo } from 'react';
import { blogService } from '../services/blogService';

export default function BlogDetailPage({ slug, onNavigate }) {
  const [blogData, setBlogData] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); if (document.documentElement) document.documentElement.scrollTop = 0; if (document.body) document.body.scrollTop = 0;
      try {
        const data = await blogService.getBlogBySlug(slug);
        if (data && data.blog) {
          setBlogData(data.blog);
          setRelatedBlogs(data.related || []);
        } else {
          // If slug not found, load featured blog as graceful fallback
          const all = await blogService.getAllBlogs();
          if (all && all.length > 0) {
            setBlogData(all[0]);
            setRelatedBlogs(all.slice(1, 4));
          }
        }
      } catch (err) {
        console.error('Failed to load article details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Extract table of contents (H2 headings) from the content HTML
  const dynamicTOC = useMemo(() => {
    if (!blogData?.contentHtml) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(blogData.contentHtml, 'text/html');
    const h2Elements = doc.querySelectorAll('h2');
    const items = [];
    h2Elements.forEach((h2, idx) => {
      const text = h2.textContent.trim();
      const id = `section-${idx + 1}`;
      items.push({ id, text });
    });
    return items;
  }, [blogData?.contentHtml]);

  // Fallback 4 TOC items matching reference mockup if article doesn't have custom H2s
  const tableOfContents = useMemo(() => {
    if (dynamicTOC.length >= 2) return dynamicTOC;
    return [
      { id: 'section-1', text: 'Lorem ipsum dolor sit amet consectetur. Lobortis magna aliquam massa dis donec. Imperdiet elit.' },
      { id: 'section-2', text: 'Lorem ipsum dolor sit amet consectetur. Lectus sit elementum feugiat nibh massa sed massa sed nec.' },
      { id: 'section-3', text: 'Lorem ipsum dolor sit amet consectetur. Amet massa pharetra vitae in tellus. Adipiscing convallis.' },
      { id: 'section-4', text: 'Lorem ipsum dolor sit amet consectetur. Mauris pulvinar in venenatis neque nisi malesuada fames.' }
    ];
  }, [dynamicTOC]);

  // Inject IDs into the content HTML so TOC links smoothly scroll to them
  const formattedHtml = useMemo(() => {
    if (!blogData?.contentHtml) return '';
    let counter = 0;
    return blogData.contentHtml.replace(/<h2([^>]*)>/gi, (match, attrs) => {
      counter += 1;
      return `<h2 id="section-${counter}"${attrs}>`;
    });
  }, [blogData?.contentHtml]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Default recommendation cards matching Ashirwad Plastics articles if relatedBlogs is empty
  const defaultRecommended = [
    {
      _id: 'rec-1',
      title: 'Advancing Ophthalmic & Nasal Delivery: Precision Cleanroom Molding in Healthcare',
      slug: 'advancing-ophthalmic-nasal-delivery-precision-cleanroom-molding',
      category: 'Pharmaceutical Packaging',
      coverImage: '/blog-stethoscope.webp',
      readTime: '6 min read',
      publishedAt: '2026-01-20T09:00:00.000Z'
    },
    {
      _id: 'rec-2',
      title: 'The Future of Sustainable Polymers: Mono-Material Barrier Systems in Pharma',
      slug: 'future-of-sustainable-polymers-mono-material-barrier-systems',
      category: 'Sustainability & R&D',
      coverImage: '/blog-card-1.webp',
      readTime: '5 min read',
      publishedAt: '2026-01-18T10:00:00.000Z'
    },
    {
      _id: 'rec-3',
      title: 'Regulatory Compliance & DMF Filings: Safeguarding Child-Resistant Closures',
      slug: 'regulatory-compliance-dmf-filings-child-resistant-closures',
      category: 'Quality & Compliance',
      coverImage: '/blog-card-2.webp',
      readTime: '6 min read',
      publishedAt: '2026-01-15T10:00:00.000Z'
    }
  ];

  const displayRecommended = (relatedBlogs && relatedBlogs.length >= 3) ? relatedBlogs.slice(0, 3) : defaultRecommended;

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', color: '#64748B' }}>
        <p>Loading article...</p>
      </div>
    );
  }

  const article = blogData || {
    title: 'Lorem ipsum dolor sit amet consectetur. Nisl lorem vulputate.',
    excerpt: 'Lorem ipsum dolor sit amet consectetur. Risus ultrices eleifend dolor lacus ullamcorper. In magna lobortis adipiscing sed purus vel neque a amet. Quisque purus tincidunt risus consectetur pulvinar faucibus tincidunt massa. Turpis quis cras bibendum lorem ac ipsum phasellus at.',
    coverImage: '/blog-stethoscope.webp',
    publishedAt: '2026-01-20T09:00:00.000Z',
    readTime: '6 min read'
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ==================== 1. HERO SECTION (MATCHING SCREENSHOT 1) ==================== */}
      <section
        style={{
          backgroundColor: '#0C1322',
          padding: '105px 0 65px',
          color: '#FFFFFF'
        }}
      >
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '44px',
              alignItems: 'center'
            }}
          >
            {/* Left Cover Image */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#1E293B',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                height: '320px'
              }}
            >
              <img
                src={article.coverImage || '/blog-stethoscope.webp'}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Right Headline & Abstract */}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  fontWeight: '700',
                  lineHeight: '1.28',
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                  letterSpacing: '-0.3px'
                }}
              >
                {article.title}
              </h1>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.65',
                  color: 'rgba(255, 255, 255, 0.78)',
                  margin: '0 0 24px 0'
                }}
              >
                {article.excerpt}
              </p>

              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontWeight: '400'
                }}
              >
                {new Date(article.publishedAt || article.createdAt || '2026-01-20').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                <span style={{ margin: '0 8px' }}>·</span>
                {article.readTime || '6 min read'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. MAIN BODY & SIDEBAR (MATCHING SCREENSHOTS 1 & 2) ==================== */}
      <section style={{ padding: '60px 0 80px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 310px',
              gap: '56px',
              alignItems: 'start'
            }}
          >
            {/* Left Main Article Column */}
            <main className="blog-detail-content" style={{ minWidth: 0 }}>
              <div
                dangerouslySetInnerHTML={{ __html: formattedHtml }}
                style={{
                  fontSize: '14.5px',
                  lineHeight: '1.75',
                  color: '#4B5563'
                }}
              />

              <style>{`
                .blog-detail-content p {
                  margin-bottom: 20px;
                  line-height: 1.75;
                  color: #4B5563;
                }
                .blog-detail-content h2 {
                  font-size: 21px;
                  font-weight: 700;
                  color: #111827;
                  margin: 36px 0 16px;
                  line-height: 1.35;
                }
                .blog-detail-content .blog-full-image {
                  margin: 26px 0 32px;
                }
                .blog-detail-content .blog-full-image img {
                  width: 100%;
                  height: 280px;
                  object-fit: cover;
                  border-radius: 16px;
                  display: block;
                }
                .blog-detail-content .blog-two-images {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 16px;
                  margin: 30px 0 20px;
                }
                .blog-detail-content .blog-two-images img {
                  width: 100%;
                  height: 220px;
                  object-fit: cover;
                  border-radius: 16px;
                  display: block;
                }
                @media (max-width: 640px) {
                  .blog-detail-content .blog-two-images {
                    grid-template-columns: 1fr;
                  }
                }
              `}</style>
            </main>

            {/* Right Sticky Sidebar */}
            <aside style={{ position: 'sticky', top: '90px' }}>
              
              {/* Reading Time Header Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '20px',
                  color: '#111827'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                  {article.readTime || '6 min read'}
                </span>
              </div>

              {/* Table of Contents list */}
              <nav aria-label="Table of contents" style={{ marginBottom: '20px' }}>
                {tableOfContents.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      borderBottom: '1px solid #E5E7EB',
                      paddingBottom: '14px',
                      marginBottom: '14px'
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHeading(item.id);
                      }}
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        color: '#4B5563',
                        textDecoration: 'none',
                        transition: 'color 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#2563EB'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#4B5563'; }}
                    >
                      {idx + 1}. {item.text}
                    </a>
                  </div>
                ))}
              </nav>

              {/* Promo Card (Matching Screenshot 2) */}
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#0C1322',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                <img
                  src="/blog-stethoscope.webp"
                  alt="Ready to elevate team strategy"
                  style={{
                    width: '100%',
                    height: '145px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      lineHeight: '1.35',
                      color: '#FFFFFF',
                      margin: '0 0 10px 0'
                    }}
                  >
                    Ready to elevate your team strategy?
                  </h4>
                  <span
                    onClick={() => onNavigate && onNavigate('contact')}
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#93C5FD',
                      cursor: 'pointer',
                      display: 'inline-block'
                    }}
                  >
                    Book a Consultation →
                  </span>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>

      {/* ==================== 3. RECOMMEND INSIGHTS (MATCHING SCREENSHOT 3) ==================== */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          padding: '60px 0 85px',
          borderTop: '1px solid #F3F4F6'
        }}
      >
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#6B7280',
                display: 'block',
                marginBottom: '6px'
              }}
            >
              Recommend Insights
            </span>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.2vw, 32px)',
                fontWeight: '700',
                color: '#111827',
                margin: 0
              }}
            >
              Recent Updates from Ashirwad Plastics
            </h2>
          </div>

          {/* 3-Card Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '24px'
            }}
          >
            {displayRecommended.map((item, idx) => (
              <article
                key={item._id || item.id || idx}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('blog-detail', item.slug);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); if (document.documentElement) document.documentElement.scrollTop = 0; if (document.body) document.body.scrollTop = 0;
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
              >
                {/* Image Container with Badge */}
                <div
                  style={{
                    position: 'relative',
                    height: '185px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#F1F5F9'
                  }}
                >
                  <img
                    src={item.coverImage || `/blog-card-${(idx % 3) + 1}.webp`}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {item.category && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(30, 41, 59, 0.72)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: '500',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '14.5px',
                    fontWeight: '600',
                    color: '#111827',
                    lineHeight: '1.45',
                    marginTop: '14px',
                    marginBottom: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {item.title}
                </h3>

                {/* Footer Meta Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#6B7280',
                    marginTop: 'auto'
                  }}
                >
                  <span>
                    {new Date(item.publishedAt || '2026-01-20').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    <span style={{ margin: '0 6px' }}>·</span>
                    {item.readTime || '5 min read'}
                  </span>
                  <span style={{ color: '#111827', fontWeight: '500' }}>
                    Read Article
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
