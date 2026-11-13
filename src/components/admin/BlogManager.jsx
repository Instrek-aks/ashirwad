import { useState, useEffect } from 'react';
import { blogService } from '../../services/blogService';
import { exportTableToExcel, exportTableToPdf } from '../../utils/exportUtils';
import ExportDropdown from './ExportDropdown';

// Clean SVG Icons
const IconSearch = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconPlus = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconExternalLink = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconEdit = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconEye = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconTrash = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const IconFileText = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export default function BlogManager({ onEditBlog, onCreateNew, token, onNavigate }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'published' | 'draft'

  const CATEGORIES = [
    'All',
    'Packaging Innovation',
    'Pharmaceuticals',
    'Sustainability',
    'Innovation & Tech',
    'Industry Insights',
    'Cosmetics Packaging'
  ];

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.getAdminBlogs(token);
      setBlogs(data || []);
    } catch (err) {
      console.error('Error fetching admin blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTogglePublish = async (id) => {
    try {
      await blogService.togglePublish(id, token);
      fetchBlogs();
    } catch (err) {
      alert('Error updating article status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Permanently delete "${title}"?`)) return;
    try {
      await blogService.deleteBlog(id, token);
      fetchBlogs();
    } catch (err) {
      alert('Error deleting article');
    }
  };

  // Filtered blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      !search.trim() ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'All' ||
      b.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'published' && b.isPublished) ||
      (selectedStatus === 'draft' && !b.isPublished);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.isPublished).length;
  const draftCount = blogs.filter((b) => !b.isPublished).length;
  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Page Header & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>
            Articles
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '3px 0 0 0' }}>
            Manage technical articles, product documentation, and industry insights.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <ExportDropdown
            onExportExcel={() =>
              exportTableToExcel(
                'Ashirwad_Articles_Export.xls',
                'Articles',
                [
                  { label: 'Title', key: 'title' },
                  { label: 'Slug', key: 'slug' },
                  { label: 'Category', key: 'category' },
                  { label: 'Status', accessor: (b) => (b.isPublished ? 'Published' : 'Draft') },
                  { label: 'Views', accessor: (b) => b.views || 0 },
                  { label: 'Read Time', key: 'readTime' },
                  { label: 'Date', accessor: (b) => new Date(b.publishedAt || b.createdAt).toLocaleDateString() }
                ],
                filteredBlogs
              )
            }
            onExportPdf={() =>
              exportTableToPdf({
                title: 'Articles & Technical Publications',
                subtitle: `Category: ${selectedCategory} • Status: ${selectedStatus}`,
                summary: [
                  { label: 'Total', value: totalCount },
                  { label: 'Published', value: publishedCount },
                  { label: 'Drafts', value: draftCount },
                  { label: 'Total Readers', value: totalViews }
                ],
                columns: [
                  { label: 'Title', key: 'title' },
                  { label: 'Category', key: 'category' },
                  { label: 'Status', accessor: (b) => (b.isPublished ? 'Published' : 'Draft') },
                  { label: 'Views', accessor: (b) => b.views || 0 },
                  { label: 'Read Time', key: 'readTime' }
                ],
                rows: filteredBlogs
              })
            }
          />
          <button
            onClick={onCreateNew}
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <IconPlus size={14} color="#FFFFFF" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', display: 'block' }}>Total Articles</span>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>
            {totalCount}
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', display: 'block' }}>Published Live</span>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{publishedCount}</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', display: 'block' }}>Drafts</span>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>
            {draftCount}
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748B', display: 'block' }}>Total Readers</span>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>
            {totalViews.toLocaleString()}
          </div>
        </div>

      </div>

      {/* 3. Filter Toolbar */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: '#94A3B8' }}>
            <IconSearch size={14} color="#94A3B8" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            style={{ width: '100%', padding: '7px 10px 7px 32px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          
          {/* Status Tabs */}
          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '2px', borderRadius: '6px' }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'published', label: 'Published' },
              { id: 'draft', label: 'Drafts' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStatus(st.id)}
                style={{
                  border: 'none',
                  backgroundColor: selectedStatus === st.id ? '#FFFFFF' : 'transparent',
                  color: selectedStatus === st.id ? '#0F172A' : '#64748B',
                  fontSize: '12px',
                  fontWeight: selectedStatus === st.id ? '600' : '500',
                  padding: '4px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  boxShadow: selectedStatus === st.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                  transition: 'all 0.15s'
                }}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '12.5px', color: '#334155', cursor: 'pointer', outline: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {(search || selectedCategory !== 'All' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setSelectedStatus('all');
              }}
              type="button"
              style={{ border: 'none', background: 'none', color: '#64748B', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Reset
            </button>
          )}
        </div>

      </div>

      {/* 4. Articles Data Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
            Loading articles...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#F1F5F9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', marginBottom: '10px' }}>
              <IconFileText size={20} color="#94A3B8" />
            </div>
            <p style={{ fontSize: '13.5px', fontWeight: '600', color: '#334155', margin: '0 0 4px 0' }}>No articles found</p>
            <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '0 0 14px 0' }}>No articles match your current search or filter criteria.</p>
            <button
              onClick={onCreateNew}
              type="button"
              style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer' }}
            >
              Create Article
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <tr>
                  <th style={{ padding: '10px 16px', color: '#64748B', fontWeight: '600', fontSize: '12px' }}>Article</th>
                  <th style={{ padding: '10px 14px', color: '#64748B', fontWeight: '600', fontSize: '12px' }}>Category</th>
                  <th style={{ padding: '10px 14px', color: '#64748B', fontWeight: '600', fontSize: '12px' }}>Read Time</th>
                  <th style={{ padding: '10px 14px', color: '#64748B', fontWeight: '600', fontSize: '12px' }}>Views</th>
                  <th style={{ padding: '10px 14px', color: '#64748B', fontWeight: '600', fontSize: '12px' }}>Status</th>
                  <th style={{ padding: '10px 16px', color: '#64748B', fontWeight: '600', fontSize: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((b) => (
                  <tr
                    key={b._id || b.id}
                    style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    
                    {/* Thumbnail & Title */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '48px', height: '36px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#F1F5F9', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                          <img
                            src={b.coverImage || '/Product_Images/32.png'}
                            alt={b.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: '600', color: '#0F172A', lineHeight: '1.3', marginBottom: '2px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {b.title}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>{new Date(b.publishedAt || b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            {b.featured && (
                              <span style={{ padding: '1px 5px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '10.5px', fontWeight: '600' }}>
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155', fontSize: '11.5px', fontWeight: '500' }}>
                        {b.category || 'General'}
                      </span>
                    </td>

                    {/* Read Time */}
                    <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '12px' }}>
                      {b.readTime || '5 min read'}
                    </td>

                    {/* Views */}
                    <td style={{ padding: '12px 14px', fontWeight: '500', color: '#0F172A', fontSize: '12.5px' }}>
                      {(b.views || 0).toLocaleString()}
                    </td>

                    {/* Status Toggle */}
                    <td style={{ padding: '12px 14px' }}>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(b._id || b.id)}
                        title="Click to toggle status"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          border: 'none',
                          backgroundColor: b.isPublished ? '#ECFDF5' : '#F1F5F9',
                          color: b.isPublished ? '#065F46' : '#64748B',
                          fontSize: '11px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: b.isPublished ? '#10B981' : '#94A3B8' }} />
                        <span>{b.isPublished ? 'Live' : 'Draft'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => onEditBlog(b)}
                          title="Edit article"
                          style={{ padding: '5px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', fontWeight: '500', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <IconEdit size={12} color="#475569" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (onNavigate) {
                              onNavigate('blog-detail', b.slug);
                            } else {
                              window.open(`/#blog/${b.slug}`, '_blank');
                            }
                          }}
                          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', cursor: 'pointer', display: 'inline-flex' }}
                          title="Preview public view"
                        >
                          <IconEye size={13} color="#64748B" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(b._id || b.id, b.title)}
                          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #FEE2E2', backgroundColor: '#FFFFFF', color: '#DC2626', cursor: 'pointer', display: 'inline-flex' }}
                          title="Delete article"
                        >
                          <IconTrash size={13} color="#DC2626" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
