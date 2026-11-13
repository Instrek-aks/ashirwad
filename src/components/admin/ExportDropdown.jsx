import { useState, useRef, useEffect } from 'react';

export default function ExportDropdown({ onExportExcel, onExportPdf, loading = false, label = 'Export' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        disabled={loading}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #CBD5E1',
          backgroundColor: '#FFFFFF',
          color: loading ? '#94A3B8' : '#0F172A',
          fontSize: '12px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
        <span>{loading ? 'Exporting...' : label}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            minWidth: '160px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)',
            zIndex: 60,
            padding: '4px'
          }}
        >
          {onExportExcel && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onExportExcel();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#0F172A',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span>Excel Sheet</span>
              <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: '700' }}>.xlsx</span>
            </button>
          )}

          {onExportPdf && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onExportPdf();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#0F172A',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span>PDF Report</span>
              <span style={{ fontSize: '10.5px', color: '#DC2626', fontWeight: '700' }}>.pdf</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

