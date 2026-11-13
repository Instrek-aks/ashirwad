import { useState, useMemo } from 'react';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '../../utils/galleryImages';

export default function GalleryModal({ isOpen, onClose, onSelect, currentUrl = '', title = 'Select Image from Gallery' }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GALLERY_IMAGES.filter((img) => {
      const matchesCat = activeCategory === 'All' || img.category === activeCategory;
      const matchesSearch =
        !q || img.label.toLowerCase().includes(q) || img.url.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, activeCategory]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 10050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '940px',
          maxHeight: '86vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>{title}</h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
              {filteredImages.length} of {GALLERY_IMAGES.length} website assets available
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div
          style={{
            padding: '14px 22px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            backgroundColor: '#FFFFFF'
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images by name, folder, or category (e.g., nasal, cleanroom, pump)..."
            autoFocus
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {GALLERY_CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '20px',
                    border: active ? '1px solid #0F172A' : '1px solid #E2E8F0',
                    backgroundColor: active ? '#0F172A' : '#F8FAFC',
                    color: active ? '#FFFFFF' : '#475569',
                    fontSize: '11.5px',
                    fontWeight: active ? '600' : '500',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px 22px',
            backgroundColor: '#F8FAFC'
          }}
        >
          {filteredImages.length === 0 ? (
            <div style={{ padding: '48px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
              No images match "{search}". Try clearing the search or switching categories.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(156px, 1fr))',
                gap: '12px'
              }}
            >
              {filteredImages.map((img) => {
                const isSelected = currentUrl === img.url;
                return (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => {
                      onSelect(img);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '8px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'transform 0.12s, box-shadow 0.12s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 14px rgba(15, 23, 42, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '104px',
                        borderRadius: '6px',
                        backgroundColor: '#F1F5F9',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px'
                      }}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#0F172A',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%'
                      }}
                    >
                      {img.label}
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>{img.category}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

