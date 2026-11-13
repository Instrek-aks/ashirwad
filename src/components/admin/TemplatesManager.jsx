import { useState, useRef, useEffect } from 'react';

const DEFAULT_CATEGORIES = ['General', 'Newsletter', 'Product Launch', 'Trade Show', 'Follow-up', 'Festive'];

export default function TemplatesManager({
  savedTemplates = [],
  builtInTemplates = [],
  apiBaseUrl,
  authHeaders,
  onTemplatesChanged,
  onUseTemplate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [feedback, setFeedback] = useState(null);

  // Create / Edit Modal State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null => create new
  const [tplName, setTplName] = useState('');
  const [tplCategory, setTplCategory] = useState('General');
  const [tplSubject, setTplSubject] = useState('');
  const [tplHtml, setTplHtml] = useState('<p>Dear Partner,</p><p>Write your email template content here...</p>');
  const [showEditorPreview, setShowEditorPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef(null);

  // Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => {
    if (editorOpen && !showEditorPreview && editorRef.current) {
      editorRef.current.innerHTML = tplHtml || '';
    }
  }, [editorOpen, showEditorPreview, editingId]);

  const allCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...savedTemplates.map((t) => t.category).filter(Boolean)
    ])
  );

  const filterList = (list, isBuiltIn = false) => {
    const q = searchQuery.trim().toLowerCase();
    return list.filter((t) => {
      const cat = t.category || 'General';
      if (categoryFilter !== 'ALL' && cat !== categoryFilter) return false;
      if (!q) return true;
      const html = isBuiltIn ? t.html : t.contentHtml;
      return (
        (t.name || '').toLowerCase().includes(q) ||
        (t.subject || '').toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        (html || '').toLowerCase().includes(q)
      );
    });
  };

  const filteredSaved = filterList(savedTemplates, false);
  const filteredBuiltIn = filterList(builtInTemplates, true);

  const openCreateModal = () => {
    setEditingId(null);
    setTplName('');
    setTplCategory('General');
    setTplSubject('');
    setTplHtml('<p>Dear Partner,</p><p>Write your email template content here...</p>');
    setShowEditorPreview(false);
    setEditorOpen(true);
  };

  const openEditModal = (tpl) => {
    setEditingId(tpl._id);
    setTplName(tpl.name || '');
    setTplCategory(tpl.category || 'General');
    setTplSubject(tpl.subject || '');
    setTplHtml(tpl.contentHtml || '');
    setShowEditorPreview(false);
    setEditorOpen(true);
  };

  const openDuplicateModal = (tpl, isBuiltIn = false) => {
    setEditingId(null);
    setTplName(`${tpl.name} (Copy)`);
    setTplCategory(tpl.category || 'General');
    setTplSubject(tpl.subject || '');
    setTplHtml(isBuiltIn ? tpl.html : tpl.contentHtml);
    setShowEditorPreview(false);
    setEditorOpen(true);
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setTplHtml(editorRef.current.innerHTML);
      editorRef.current.focus();
    }
  };

  const insertMergeTag = (tag) => {
    if (showEditorPreview) return;
    if (editorRef.current) {
      editorRef.current.focus();
      const inserted = document.execCommand('insertText', false, tag);
      if (!inserted) {
        editorRef.current.innerHTML += tag;
      }
      setTplHtml(editorRef.current.innerHTML);
    } else {
      setTplHtml((prev) => `${prev}${tag}`);
    }
  };

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    const currentHtml = editorRef.current ? editorRef.current.innerHTML : tplHtml;
    if (!tplName.trim() || !tplSubject.trim() || !currentHtml.trim()) {
      setFeedback({ type: 'error', message: 'Template name, subject, and body content are required.' });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      const url = editingId
        ? `${apiBaseUrl}/campaigns/templates/${editingId}`
        : `${apiBaseUrl}/campaigns/templates`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tplName.trim(),
          category: tplCategory.trim() || 'General',
          subject: tplSubject.trim(),
          contentHtml: currentHtml
        })
      });
      const data = await res.json();
      if (data.success) {
        setEditorOpen(false);
        setFeedback({
          type: 'success',
          message: editingId ? `Template "${tplName.trim()}" updated.` : `Template "${tplName.trim()}" created.`
        });
        if (onTemplatesChanged) onTemplatesChanged();
      } else {
        setFeedback({ type: 'error', message: data.message || 'Failed to save template.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error saving template: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (tpl) => {
    if (!window.confirm(`Delete template "${tpl.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${apiBaseUrl}/campaigns/templates/${tpl._id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: `Template "${tpl.name}" deleted.` });
        if (previewTemplate?._id === tpl._id) setPreviewTemplate(null);
        if (onTemplatesChanged) onTemplatesChanged();
      } else {
        setFeedback({ type: 'error', message: data.message || 'Failed to delete template.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Delete failed: ' + err.message });
    }
  };

  const stripHtml = (html = '') => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Controls */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
            Campaign Templates
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0' }}>
            Create, edit, preview, and organize reusable email templates for your campaigns.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              fontSize: '12.5px',
              width: '200px',
              outline: 'none'
            }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '7px 10px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              fontSize: '12.5px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="ALL">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={openCreateModal}
            style={{
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
            + New Template
          </button>
        </div>
      </div>

      {feedback && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '12.5px',
            backgroundColor: feedback.type === 'success' ? '#F0FDF4' : '#FEF2F2',
            border: feedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA',
            color: feedback.type === 'success' ? '#166534' : '#991B1B',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '14px' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Custom Saved Templates */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
            Saved Custom Templates ({filteredSaved.length})
          </h3>
        </div>

        {filteredSaved.length === 0 ? (
          <div
            style={{
              padding: '28px 16px',
              textAlign: 'center',
              borderRadius: '8px',
              border: '1px dashed #CBD5E1',
              backgroundColor: '#F8FAFC'
            }}
          >
            <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
              {savedTemplates.length === 0 ? 'No custom templates yet' : 'No templates match your filter'}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>
              {savedTemplates.length === 0
                ? 'Create a custom template from scratch or duplicate one of the starter templates below.'
                : 'Try clearing your search or switching category.'}
            </div>
            {savedTemplates.length === 0 && (
              <button
                type="button"
                onClick={openCreateModal}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Create First Template
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
            {filteredSaved.map((tpl) => (
              <div
                key={tpl._id}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '10px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0F172A' }}>
                      {tpl.name}
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '600',
                        padding: '2px 7px',
                        borderRadius: '10px',
                        backgroundColor: '#EFF6FF',
                        color: '#1D4ED8',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {tpl.category || 'General'}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                    Subject: {tpl.subject}
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: '#64748B',
                      lineHeight: '1.45',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {stripHtml(tpl.contentHtml)}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => onUseTemplate && onUseTemplate({ subject: tpl.subject, html: tpl.contentHtml, name: tpl.name })}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '5px',
                      border: 'none',
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Use in Campaign
                  </button>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate({ ...tpl, html: tpl.contentHtml, isBuiltIn: false })}
                      style={{ padding: '4px 8px', borderRadius: '5px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(tpl)}
                      style={{ padding: '4px 8px', borderRadius: '5px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#1D4ED8', fontSize: '11.5px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openDuplicateModal(tpl, false)}
                      style={{ padding: '4px 8px', borderRadius: '5px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11.5px', cursor: 'pointer' }}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTemplate(tpl)}
                      style={{ padding: '4px 8px', borderRadius: '5px', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '11.5px', fontWeight: '500', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Built-in Starter Templates */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '18px 20px' }}>
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
            Built-in Starter Templates ({filteredBuiltIn.length})
          </h3>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>
            Ready-to-send corporate templates. Use directly or customize a copy into your saved library.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
          {filteredBuiltIn.map((tpl) => (
            <div
              key={tpl.name}
              style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                backgroundColor: '#F8FAFC'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0F172A' }}>
                    {tpl.name}
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '600',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      backgroundColor: '#E2E8F0',
                      color: '#334155'
                    }}
                  >
                    Starter
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                  Subject: {tpl.subject}
                </div>
                <div
                  style={{
                    fontSize: '11.5px',
                    color: '#64748B',
                    lineHeight: '1.45',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {stripHtml(tpl.html)}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => onUseTemplate && onUseTemplate({ subject: tpl.subject, html: tpl.html, name: tpl.name })}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Use in Campaign
                </button>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate({ ...tpl, isBuiltIn: true })}
                    style={{ padding: '4px 8px', borderRadius: '5px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => openDuplicateModal(tpl, true)}
                    style={{ padding: '4px 8px', borderRadius: '5px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#1D4ED8', fontSize: '11.5px', fontWeight: '500', cursor: 'pointer' }}
                  >
                    Save & Edit Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create / Edit Template Modal */}
      {editorOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '760px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)'
            }}
          >
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                {editingId ? 'Edit Campaign Template' : 'New Campaign Template'}
              </h3>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#64748B', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} style={{ padding: '18px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                    Template Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={tplName}
                    onChange={(e) => setTplName(e.target.value)}
                    placeholder="e.g., Q3 Packaging Brochure Launch"
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={tplCategory}
                    onChange={(e) => setTplCategory(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }}
                  >
                    {allCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '600', color: '#334155' }}>
                    Email Subject Line *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10.5px', color: '#64748B' }}>Insert in subject:</span>
                    <button
                      type="button"
                      onClick={() => setTplSubject((prev) => `${prev}${prev && !prev.endsWith(' ') ? ' ' : ''}{{name}}`)}
                      style={{ padding: '1px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '10.5px', cursor: 'pointer' }}
                    >
                      + Name
                    </button>
                    <button
                      type="button"
                      onClick={() => setTplSubject((prev) => `${prev}${prev && !prev.endsWith(' ') ? ' ' : ''}{{company}}`)}
                      style={{ padding: '1px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', color: '#475569', fontSize: '10.5px', cursor: 'pointer' }}
                    >
                      + Company
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  required
                  value={tplSubject}
                  onChange={(e) => setTplSubject(e.target.value)}
                  placeholder="Subject line..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', fontWeight: '600', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                    <select
                      onChange={(e) => execCmd('formatBlock', e.target.value)}
                      defaultValue="p"
                      disabled={showEditorPreview}
                      style={{ padding: '3px 6px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '11.5px', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="p">Normal</option>
                      <option value="h2">Heading</option>
                      <option value="h3">Subheading</option>
                    </select>
                    <button type="button" disabled={showEditorPreview} onClick={() => execCmd('bold')} style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontWeight: '700', fontSize: '11.5px', cursor: 'pointer' }}>B</button>
                    <button type="button" disabled={showEditorPreview} onClick={() => execCmd('italic')} style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontStyle: 'italic', fontSize: '11.5px', cursor: 'pointer' }}>I</button>
                    <button type="button" disabled={showEditorPreview} onClick={() => execCmd('underline')} style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', textDecoration: 'underline', fontSize: '11.5px', cursor: 'pointer' }}>U</button>
                    <button type="button" disabled={showEditorPreview} onClick={() => execCmd('insertUnorderedList')} style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '11.5px', cursor: 'pointer' }}>• List</button>
                    <button type="button" disabled={showEditorPreview} onClick={() => execCmd('insertOrderedList')} style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '11.5px', cursor: 'pointer' }}>1. List</button>
                    <button
                      type="button"
                      disabled={showEditorPreview}
                      onClick={() => {
                        const url = window.prompt('Enter link URL:');
                        if (url) execCmd('createLink', url);
                      }}
                      style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '11.5px', cursor: 'pointer' }}
                    >
                      Link
                    </button>
                    <button type="button" disabled={showEditorPreview} onClick={() => execCmd('removeFormat')} style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '11.5px', cursor: 'pointer', color: '#64748B' }}>Clear</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      disabled={showEditorPreview}
                      onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{name}}'); }}
                      style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', fontWeight: '600', cursor: showEditorPreview ? 'not-allowed' : 'pointer' }}
                    >
                      + Name
                    </button>
                    <button
                      type="button"
                      disabled={showEditorPreview}
                      onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{company}}'); }}
                      style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', fontWeight: '600', cursor: showEditorPreview ? 'not-allowed' : 'pointer' }}
                    >
                      + Company
                    </button>
                    <button
                      type="button"
                      disabled={showEditorPreview}
                      onMouseDown={(e) => { e.preventDefault(); insertMergeTag('{{email}}'); }}
                      style={{ padding: '3px 7px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '11px', fontWeight: '600', cursor: showEditorPreview ? 'not-allowed' : 'pointer' }}
                    >
                      + Email
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!showEditorPreview && editorRef.current) {
                          setTplHtml(editorRef.current.innerHTML);
                        }
                        setShowEditorPreview(!showEditorPreview);
                      }}
                      style={{
                        padding: '4px 9px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: showEditorPreview ? '#0F172A' : '#FFFFFF',
                        color: showEditorPreview ? '#FFFFFF' : '#334155',
                        fontSize: '11.5px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {showEditorPreview ? 'Back to Edit' : 'Preview'}
                    </button>
                  </div>
                </div>

                {showEditorPreview ? (
                  <div
                    className="email-rich-content"
                    style={{ minHeight: '220px', maxHeight: '340px', overflowY: 'auto', padding: '14px', fontSize: '13.5px', lineHeight: '1.6', color: '#1E293B', backgroundColor: '#FFFFFF' }}
                    dangerouslySetInnerHTML={{ __html: tplHtml }}
                  />
                ) : (
                  <div
                    ref={editorRef}
                    className="email-rich-content"
                    contentEditable
                    onInput={(e) => setTplHtml(e.currentTarget.innerHTML)}
                    style={{ minHeight: '220px', maxHeight: '340px', overflowY: 'auto', padding: '14px', fontSize: '13.5px', lineHeight: '1.6', color: '#1E293B', outline: 'none' }}
                  />
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  style={{ padding: '7px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ padding: '7px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer' }}
                >
                  {saving ? 'Saving...' : editingId ? 'Update Template' : 'Save Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '660px',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)'
            }}
          >
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>
                  {previewTemplate.name}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  Subject: {previewTemplate.subject}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', color: '#64748B', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <div
              className="email-rich-content"
              style={{ padding: '20px', overflowY: 'auto', fontSize: '13.5px', lineHeight: '1.6', color: '#1E293B', backgroundColor: '#FFFFFF' }}
              dangerouslySetInnerHTML={{ __html: previewTemplate.html || previewTemplate.contentHtml || '' }}
            />

            <div style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              {!previewTemplate.isBuiltIn && (
                <button
                  type="button"
                  onClick={() => {
                    const tpl = previewTemplate;
                    setPreviewTemplate(null);
                    openEditModal(tpl);
                  }}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#1D4ED8', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Edit Template
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const tpl = previewTemplate;
                  setPreviewTemplate(null);
                  if (onUseTemplate) {
                    onUseTemplate({ subject: tpl.subject, html: tpl.html || tpl.contentHtml, name: tpl.name });
                  }
                }}
                style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                Use in Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

