import { useState, useRef, useEffect } from 'react';

export default function EmailRichEditor({
  value = '',
  onChange,
  minHeight = '240px',
  maxHeight = '400px',
  showCodeToggle = true,
  rightExtra = null
}) {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [tablePopoverOpen, setTablePopoverOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  const visualEditorRef = useRef(null);
  const inlineImageInputRef = useRef(null);

  // Sync external value changes (e.g., template applied, modal opened, switching from Code to Visual)
  useEffect(() => {
    if (!isHtmlMode && visualEditorRef.current) {
      if (visualEditorRef.current.innerHTML !== (value || '')) {
        visualEditorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isHtmlMode]);

  const executeCommand = (command, cmdValue = null) => {
    if (isHtmlMode) return;
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    document.execCommand(command, false, cmdValue);
    if (visualEditorRef.current && onChange) {
      onChange(visualEditorRef.current.innerHTML);
    }
  };

  const handleVisualInput = () => {
    if (visualEditorRef.current && onChange) {
      onChange(visualEditorRef.current.innerHTML);
    }
  };

  const insertMergeTag = (tag) => {
    if (isHtmlMode) {
      if (onChange) onChange(`${value || ''}${tag}`);
      return;
    }
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      const inserted = document.execCommand('insertText', false, tag);
      if (!inserted) {
        visualEditorRef.current.innerHTML += tag;
      }
      if (onChange) onChange(visualEditorRef.current.innerHTML);
    }
  };

  const handleAddLink = () => {
    if (isHtmlMode) return;
    const url = window.prompt('Enter link URL:', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleInsertTable = (rows = tableRows, cols = tableCols) => {
    const rCount = Math.max(1, Math.min(20, parseInt(rows, 10) || 3));
    const cCount = Math.max(1, Math.min(10, parseInt(cols, 10) || 3));

    const headerCells = Array.from({ length: cCount })
      .map((_, i) => `<th style="border: 1px solid #CBD5E1; padding: 8px 10px; background-color: #F8FAFC; font-weight: 600; text-align: left;">Header ${i + 1}</th>`)
      .join('');
    const bodyRows = Array.from({ length: Math.max(1, rCount - 1) })
      .map(() => {
        const cells = Array.from({ length: cCount })
          .map(() => `<td style="border: 1px solid #CBD5E1; padding: 8px 10px;">Cell</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    const tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px;"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table><p><br/></p>`;

    if (isHtmlMode) {
      if (onChange) onChange(`${value || ''}\n${tableHtml}`);
    } else if (visualEditorRef.current) {
      visualEditorRef.current.focus();
      document.execCommand('insertHTML', false, tableHtml);
      if (onChange) onChange(visualEditorRef.current.innerHTML);
    }
    setTablePopoverOpen(false);
  };

  const compressImageToDataUrl = (file, maxWidth = 800, quality = 0.82) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.onload = () => {
        const rawDataUrl = reader.result;
        if (file.type === 'image/gif') {
          resolve(rawDataUrl);
          return;
        }
        const img = new Image();
        img.onerror = () => resolve(rawDataUrl);
        img.onload = () => {
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;
          const width = Math.round(img.width * scale);
          const height = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const outMime = file.type === 'image/png' && file.size < 250 * 1024 ? 'image/png' : 'image/jpeg';
          resolve(canvas.toDataURL(outMime, quality));
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const insertInlineImageFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 8 * 1024 * 1024) {
      alert(`Image "${file.name}" exceeds 8MB limit.`);
      return;
    }
    try {
      const dataUrl = await compressImageToDataUrl(file);
      const safeAlt = (file.name || 'image').replace(/"/g, '&quot;');
      const imgHtml = `<img src="${dataUrl}" alt="${safeAlt}" style="max-width: 100%; height: auto; border-radius: 6px; margin: 10px 0; display: block;" />`;
      if (isHtmlMode) {
        if (onChange) onChange(`${value || ''}\n${imgHtml}`);
      } else if (visualEditorRef.current) {
        visualEditorRef.current.focus();
        document.execCommand('insertHTML', false, imgHtml);
        if (onChange) onChange(visualEditorRef.current.innerHTML);
      }
    } catch (err) {
      alert('Could not insert image: ' + err.message);
    }
  };

  const handleInlineImageSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      await insertInlineImageFile(file);
    }
    if (inlineImageInputRef.current) inlineImageInputRef.current.value = '';
  };

  const handleEditorPaste = async (e) => {
    const items = Array.from(e.clipboardData?.items || []);
    const imageItem = items.find((item) => item.type.startsWith('image/'));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (file) await insertInlineImageFile(file);
    }
  };

  const handleEditorDrop = async (e) => {
    const files = Array.from(e.dataTransfer?.files || []).filter((f) => f.type.startsWith('image/'));
    if (files.length > 0) {
      e.preventDefault();
      for (const file of files) {
        await insertInlineImageFile(file);
      }
    }
  };

  const toggleEditorMode = () => {
    if (!isHtmlMode) {
      setIsHtmlMode(true);
    } else {
      setIsHtmlMode(false);
    }
  };

  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'visible' }}>
      {/* Toolbar */}
      <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', borderTopLeftRadius: '6px', borderTopRightRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexWrap: 'wrap' }}>
          <select
            onChange={(e) => executeCommand('formatBlock', e.target.value)}
            defaultValue="<p>"
            disabled={isHtmlMode}
            style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '11.5px', color: '#334155', outline: 'none' }}
          >
            <option value="<p>">Normal</option>
            <option value="<h2>">Heading 2</option>
            <option value="<h3>">Heading 3</option>
          </select>

          <div style={{ height: '14px', width: '1px', backgroundColor: '#E2E8F0', margin: '0 3px' }} />

          <button
            type="button"
            title="Bold"
            disabled={isHtmlMode}
            onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
            style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isHtmlMode ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '12px' }}
          >
            B
          </button>

          <button
            type="button"
            title="Italic"
            disabled={isHtmlMode}
            onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
            style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isHtmlMode ? 'not-allowed' : 'pointer', fontStyle: 'italic', fontSize: '12px' }}
          >
            I
          </button>

          <button
            type="button"
            title="Underline"
            disabled={isHtmlMode}
            onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
            style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isHtmlMode ? 'not-allowed' : 'pointer', textDecoration: 'underline', fontSize: '12px' }}
          >
            U
          </button>

          <div style={{ height: '14px', width: '1px', backgroundColor: '#E2E8F0', margin: '0 3px' }} />

          <button
            type="button"
            title="Bullet List"
            disabled={isHtmlMode}
            onMouseDown={(e) => { e.preventDefault(); executeCommand('insertUnorderedList'); }}
            style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isHtmlMode ? 'not-allowed' : 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            title="Numbered List"
            disabled={isHtmlMode}
            onMouseDown={(e) => { e.preventDefault(); executeCommand('insertOrderedList'); }}
            style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isHtmlMode ? 'not-allowed' : 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <path d="M4 6h1v4" />
              <path d="M4 10h2" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </button>

          <button
            type="button"
            title="Link"
            disabled={isHtmlMode}
            onMouseDown={(e) => { e.preventDefault(); handleAddLink(); }}
            style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isHtmlMode ? 'not-allowed' : 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>

          <div style={{ position: 'relative' }}>
            <button
              type="button"
              title="Insert Table"
              onMouseDown={(e) => {
                e.preventDefault();
                setTablePopoverOpen((prev) => !prev);
              }}
              style={{ height: '26px', padding: '0 7px', borderRadius: '4px', border: tablePopoverOpen ? '1px solid #0F172A' : '1px solid #E2E8F0', backgroundColor: tablePopoverOpen ? '#F1F5F9' : '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '500', cursor: 'pointer' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              <span>Table</span>
            </button>

            {tablePopoverOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  zIndex: 60,
                  width: '190px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  padding: '10px',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#0F172A', marginBottom: '6px' }}>
                  Insert Table
                </div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>Rows</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={tableRows}
                      onChange={(e) => setTableRows(e.target.value)}
                      style={{ width: '100%', padding: '4px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '10px', color: '#64748B', marginBottom: '2px' }}>Cols</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={tableCols}
                      onChange={(e) => setTableCols(e.target.value)}
                      style={{ width: '100%', padding: '4px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                  <button
                    type="button"
                    onClick={() => setTablePopoverOpen(false)}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#64748B', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertTable(tableRows, tableCols)}
                    style={{ padding: '4px 9px', borderRadius: '4px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Insert
                  </button>
                </div>
              </div>
            )}
          </div>

          <input
            ref={inlineImageInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleInlineImageSelect}
          />
          <button
            type="button"
            title="Insert Inline Image (no storage needed)"
            onMouseDown={(e) => { e.preventDefault(); inlineImageInputRef.current && inlineImageInputRef.current.click(); }}
            style={{ height: '26px', padding: '0 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '500', cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Image</span>
          </button>
        </div>

        {/* Merge tags, Code mode, and optional extra action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{name}}'); }}
            style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', cursor: 'pointer' }}
          >
            + Name
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{company}}'); }}
            style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', cursor: 'pointer' }}
          >
            + Company
          </button>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{email}}'); }}
            style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', cursor: 'pointer' }}
          >
            + Email
          </button>

          {showCodeToggle && (
            <button
              type="button"
              onClick={toggleEditorMode}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: isHtmlMode ? '#0F172A' : '#FFFFFF', color: isHtmlMode ? '#FFFFFF' : '#475569', fontSize: '11px', cursor: 'pointer' }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isHtmlMode ? '#FFFFFF' : '#475569'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>{isHtmlMode ? 'Visual' : 'Code'}</span>
            </button>
          )}

          {rightExtra}
        </div>
      </div>

      {!isHtmlMode ? (
        <div
          ref={visualEditorRef}
          className="email-rich-content"
          contentEditable
          onInput={handleVisualInput}
          onPaste={handleEditorPaste}
          onDrop={handleEditorDrop}
          style={{
            minHeight,
            maxHeight,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            fontSize: '13.5px',
            lineHeight: '1.6',
            outline: 'none',
            boxSizing: 'border-box',
            borderBottomLeftRadius: '6px',
            borderBottomRightRadius: '6px'
          }}
        />
      ) : (
        <textarea
          rows="10"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          style={{
            width: '100%',
            minHeight,
            maxHeight,
            padding: '14px',
            border: 'none',
            outline: 'none',
            fontSize: '12px',
            color: '#0F172A',
            fontFamily: 'monospace',
            boxSizing: 'border-box',
            backgroundColor: '#F8FAFC',
            borderBottomLeftRadius: '6px',
            borderBottomRightRadius: '6px'
          }}
        />
      )}
    </div>
  );
}

