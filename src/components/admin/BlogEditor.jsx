import { useState, useEffect, useRef } from 'react';
import GalleryModal from './GalleryModal';

// Preset packaging images available in the project for instant selection
const PRESET_IMAGES = [
  { label: '32mm Dispenser Pump', url: '/Product_Images/32.png' },
  { label: '36mm Nasal Spray', url: '/Product_Images/36.png' },
  { label: '38mm Tablet Container', url: '/Product_Images/38.png' },
  { label: 'Sustainability & ESG', url: '/sustanibility.webp' },
  { label: 'R&D Laboratory', url: '/reseach.webp' },
  { label: 'Quality Cleanroom', url: '/quality.webp' },
  { label: 'Ophthalmic Precision Dropper', url: '/ophthalmic_user.webp' },
  { label: 'Global Company Aerial', url: '/global/1.webp' },
  { label: 'High Speed Production', url: '/b4.webp' }
];

const CATEGORIES = [
  'Packaging Innovation',
  'Pharmaceuticals',
  'Sustainability',
  'Innovation & Tech',
  'Industry Insights',
  'Cosmetics Packaging',
  'Company News'
];

// Clean Vector Icons
const IconArrowLeft = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconLink = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconImage = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const IconTable = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

const IconQuote = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
  </svg>
);

const IconClose = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function BlogEditor({ blog, onSave, onCancel, token }) {
  const [title, setTitle] = useState(blog?.title || '');
  const [slug, setSlug] = useState(blog?.slug || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [category, setCategory] = useState(blog?.category || 'Packaging Innovation');
  const [coverImage, setCoverImage] = useState(blog?.coverImage || '/Product_Images/32.png');
  const [readTime, setReadTime] = useState(blog?.readTime || '1 min read');
  const [readTimeManual, setReadTimeManual] = useState(Boolean(blog?.readTime));
  const [authorName, setAuthorName] = useState(blog?.author?.name || 'Ashirwad Plastics Editorial Team');
  const [authorRole, setAuthorRole] = useState(blog?.author?.role || 'Packaging & R&D Specialist');
  const [tags, setTags] = useState(blog?.tags || ['Pharma', 'Innovation']);
  const [tagInput, setTagInput] = useState('');
  const [isPublished, setIsPublished] = useState(blog?.isPublished !== undefined ? blog.isPublished : true);
  const [featured, setFeatured] = useState(Boolean(blog?.featured));
  
  // Content & Editor states
  const [contentHtml, setContentHtml] = useState(blog?.contentHtml || '<p>Write your article introduction here...</p><h2>Overview</h2><p>Provide detailed analysis and technical specifications...</p>');
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'html' | 'split'
  const [isSaving, setIsSaving] = useState(false);
  
  // Modals for inserting Links, Images, and Tables
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkData, setLinkData] = useState({ text: '', url: '', newTab: true });
  
  const [showImageModal, setShowImageModal] = useState(false);
  const [galleryTarget, setGalleryTarget] = useState(null); // 'cover' | 'inline1' | 'inline2' | null
  const [imageData, setImageData] = useState({
    url: '/Product_Images/32.png',
    alt: '32mm Dispenser Pump',
    caption: '',
    url2: '/Product_Images/36.png',
    alt2: '36mm Nasal Spray',
    caption2: '',
    layout: 'full'
  }); // 'full' | 'grid2'
  
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableData, setTableData] = useState({ rows: 3, cols: 3, hasHeader: true });

  const visualEditorRef = useRef(null);
  const htmlTextareaRef = useRef(null);
  const savedSelectionRef = useRef(null);

  // Helper to find top-level block inside the editor
  const findTopBlock = (node, root) => {
    if (!node || !root) return null;
    let curr = node;
    while (curr && curr.parentNode !== root) {
      curr = curr.parentNode;
    }
    return curr === root ? null : curr;
  };

  // Keep a persistent snapshot of the user's cursor / range inside visualEditorRef
  const saveCurrentSelection = () => {
    if (typeof window === 'undefined' || !visualEditorRef.current) return;
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      if (visualEditorRef.current.contains(range.commonAncestorContainer)) {
        savedSelectionRef.current = range.cloneRange();
      }
    } catch (e) {
      // Ignore detached range errors
    }
  };

  // Continuously track caret changes in the editor
  useEffect(() => {
    const handleDocSelectionChange = () => {
      if (!visualEditorRef.current) return;
      try {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const r = sel.getRangeAt(0);
          if (visualEditorRef.current.contains(r.commonAncestorContainer)) {
            savedSelectionRef.current = r.cloneRange();
          }
        }
      } catch (e) {}
    };

    document.addEventListener('selectionchange', handleDocSelectionChange);
    return () => document.removeEventListener('selectionchange', handleDocSelectionChange);
  }, []);

  // Auto-generate slug from title
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!blog?.id && !blog?._id) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  // Auto calculate read time unless manually overridden
  const computeReadTime = (html) => {
    const textOnly = (html || '').replace(/<[^>]*>/g, ' ');
    const wordCount = textOnly.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  useEffect(() => {
    if (!readTimeManual) {
      setReadTime(computeReadTime(contentHtml));
    }
  }, [contentHtml, readTimeManual]);

  // Keep visual editor initialized with contentHtml
  useEffect(() => {
    if (visualEditorRef.current && visualEditorRef.current.innerHTML !== contentHtml) {
      visualEditorRef.current.innerHTML = contentHtml;
    }
  }, []);

  // Command execution for rich formatting
  const executeCommand = (command, value = null) => {
    if (editorMode === 'html') return;
    saveCurrentSelection();
    if (visualEditorRef.current) {
      visualEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    if (visualEditorRef.current) {
      setContentHtml(visualEditorRef.current.innerHTML);
      saveCurrentSelection();
    }
  };

  const handleVisualInput = () => {
    if (visualEditorRef.current) {
      setContentHtml(visualEditorRef.current.innerHTML);
      saveCurrentSelection();
    }
  };

  // Insert Custom HTML into editor directly at the cursor
  const insertHtmlAtCursor = (htmlSnippet, isBlock = false) => {
    // 1. In HTML Mode: insert at cursor in textarea
    if (editorMode === 'html') {
      if (htmlTextareaRef.current) {
        const ta = htmlTextareaRef.current;
        const start = ta.selectionStart || 0;
        const end = ta.selectionEnd || 0;
        const val = ta.value;
        const prefix = start > 0 && val[start - 1] !== '\n' ? '\n' : '';
        const suffix = end < val.length && val[end] !== '\n' ? '\n' : '';
        const insertion = isBlock ? `${prefix}${htmlSnippet.trim()}${suffix}` : htmlSnippet;
        const nextVal = val.substring(0, start) + insertion + val.substring(end);
        setContentHtml(nextVal);
        setTimeout(() => {
          ta.focus();
          const newPos = start + insertion.length;
          ta.setSelectionRange(newPos, newPos);
        }, 0);
        return;
      }
      setContentHtml((prev) => prev + '\n' + htmlSnippet);
      return;
    }

    // 2. Visual Mode
    const editor = visualEditorRef.current;
    if (!editor) return;

    editor.focus();
    const selection = window.getSelection();
    let range = null;

    // Restore saved range if valid and inside editor
    if (savedSelectionRef.current) {
      try {
        if (editor.contains(savedSelectionRef.current.commonAncestorContainer)) {
          range = savedSelectionRef.current.cloneRange();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } catch (err) {
        range = null;
      }
    }

    // If still no range, check active window selection
    if (!range && selection && selection.rangeCount > 0) {
      const activeRange = selection.getRangeAt(0);
      if (editor.contains(activeRange.commonAncestorContainer)) {
        range = activeRange;
      }
    }

    // CASE A: INLINE ELEMENT (Links, Spans, Inline Badges)
    if (!isBlock) {
      if (range) {
        range.deleteContents();
        const el = document.createElement('div');
        el.innerHTML = htmlSnippet.trim();
        const frag = document.createDocumentFragment();
        let node;
        let lastNode = null;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          const newRange = document.createRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
          savedSelectionRef.current = newRange.cloneRange();
        }
      } else {
        // Fallback: append to the last paragraph or element
        const el = document.createElement('div');
        el.innerHTML = htmlSnippet.trim();
        const lastChild = editor.lastElementChild || editor;
        while (el.firstChild) {
          lastChild.appendChild(el.firstChild);
        }
      }
    } 
    // CASE B: BLOCK ELEMENT (Images, Grids, Tables, Callouts)
    else {
      let targetBlock = null;
      if (range) {
        targetBlock = findTopBlock(range.commonAncestorContainer, editor);
      }

      // Parse the snippet into a DocumentFragment
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlSnippet.trim();
      const frag = document.createDocumentFragment();
      let lastBlockNode = null;
      while (tempDiv.firstChild) {
        lastBlockNode = frag.appendChild(tempDiv.firstChild);
      }

      // Create an empty continuation paragraph so the user can immediately continue typing
      const continuationP = document.createElement('p');
      continuationP.innerHTML = '<br>';

      if (targetBlock && targetBlock.parentNode === editor) {
        const isTargetEmpty = 
          targetBlock.tagName === 'P' && 
          (targetBlock.textContent.trim() === '' || targetBlock.innerHTML.trim() === '<br>');

        if (isTargetEmpty) {
          editor.replaceChild(frag, targetBlock);
        } else {
          if (targetBlock.nextSibling) {
            editor.insertBefore(frag, targetBlock.nextSibling);
          } else {
            editor.appendChild(frag);
          }
        }

        // Insert continuation paragraph right after the new block
        if (lastBlockNode && lastBlockNode.parentNode === editor) {
          if (lastBlockNode.nextSibling) {
            editor.insertBefore(continuationP, lastBlockNode.nextSibling);
          } else {
            editor.appendChild(continuationP);
          }
        } else {
          editor.appendChild(continuationP);
        }
      } else {
        // If no cursor was placed inside a block, append to the END of the article (NEVER at the top)
        editor.appendChild(frag);
        editor.appendChild(continuationP);
      }

      // Position cursor in the new continuation paragraph
      try {
        const newRange = document.createRange();
        newRange.setStart(continuationP, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        savedSelectionRef.current = newRange.cloneRange();
      } catch (e) {}
    }

    const updatedHtml = editor.innerHTML;
    setContentHtml(updatedHtml);
  };

  // Open Link Modal with pre-filled highlighted text
  const openLinkModal = () => {
    saveCurrentSelection();
    let selectedText = '';
    if (savedSelectionRef.current) {
      selectedText = savedSelectionRef.current.toString().trim();
    }
    setLinkData({
      text: selectedText || '',
      url: '',
      newTab: true
    });
    setShowLinkModal(true);
  };

  // Open Image Modal
  const openImageModal = () => {
    saveCurrentSelection();
    setImageData((prev) => ({
      ...prev,
      layout: prev.layout || 'full',
      url: prev.url || '/Product_Images/32.png',
      alt: prev.alt || '32mm Dispenser Pump',
      caption: prev.caption || '',
      url2: prev.url2 || '/Product_Images/36.png',
      alt2: prev.alt2 || '36mm Nasal Spray',
      caption2: prev.caption2 || ''
    }));
    setShowImageModal(true);
  };

  // Open Table Modal
  const openTableModal = () => {
    saveCurrentSelection();
    setShowTableModal(true);
  };

  // Insert Link
  const handleInsertLink = () => {
    if (!linkData.url) return;
    const targetAttr = linkData.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const displayText = linkData.text || linkData.url;
    const linkHtml = `<a href="${linkData.url}" style="color: #0F172A; text-decoration: underline; font-weight: 500;"${targetAttr}>${displayText}</a>`;
    insertHtmlAtCursor(linkHtml, false);
    setShowLinkModal(false);
    setLinkData({ text: '', url: '', newTab: true });
  };

  // Insert Image (Full or Side-by-Side Grid)
  const handleInsertImage = () => {
    if (!imageData.url) return;
    let snippet = '';
    if (imageData.layout === 'grid2') {
      const url1 = imageData.url || '/Product_Images/32.png';
      const url2 = imageData.url2 || '/Product_Images/36.png';
      const alt1 = imageData.alt || 'Packaging Component 1';
      const alt2 = imageData.alt2 || 'Packaging Component 2';
      const cap1 = imageData.caption;
      const cap2 = imageData.caption2;

      snippet = `
        <div class="blog-image-grid-2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 24px 0;">
          <figure style="margin: 0;">
            <img src="${url1}" alt="${alt1}" style="width: 100%; height: 240px; object-fit: cover; border-radius: 8px; display: block;" />
            ${cap1 ? `<figcaption style="font-size: 12px; color: #64748B; margin-top: 6px; text-align: center;">${cap1}</figcaption>` : ''}
          </figure>
          <figure style="margin: 0;">
            <img src="${url2}" alt="${alt2}" style="width: 100%; height: 240px; object-fit: cover; border-radius: 8px; display: block;" />
            ${cap2 ? `<figcaption style="font-size: 12px; color: #64748B; margin-top: 6px; text-align: center;">${cap2}</figcaption>` : ''}
          </figure>
        </div>
      `;
    } else {
      snippet = `
        <figure style="margin: 24px 0; text-align: center;">
          <img src="${imageData.url}" alt="${imageData.alt || 'Packaging'}" style="width: 100%; max-height: 440px; object-fit: cover; border-radius: 8px; display: block;" />
          ${imageData.caption ? `<figcaption style="font-size: 12px; color: #64748B; margin-top: 8px; font-style: italic;">${imageData.caption}</figcaption>` : ''}
        </figure>
      `;
    }
    insertHtmlAtCursor(snippet, true);
    setShowImageModal(false);
  };

  // Insert Table
  const handleInsertTable = () => {
    const { rows, cols, hasHeader } = tableData;
    let tableHtml = '<div class="blog-table-wrapper" style="overflow-x: auto; margin: 24px 0;">\n';
    tableHtml += '<table class="blog-data-table" style="width: 100%; border-collapse: collapse; font-size: 13.5px; text-align: left; background: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #E2E8F0;">\n';
    
    if (hasHeader) {
      tableHtml += '  <thead style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">\n    <tr>\n';
      for (let c = 1; c <= cols; c++) {
        tableHtml += `      <th style="padding: 10px 14px; font-weight: 600; color: #0F172A; border-right: 1px solid #E2E8F0;">Header ${c}</th>\n`;
      }
      tableHtml += '    </tr>\n  </thead>\n';
    }

    tableHtml += '  <tbody>\n';
    for (let r = 1; r <= rows; r++) {
      const bg = r % 2 === 0 ? 'background: #F8FAFC;' : '';
      tableHtml += `    <tr style="border-bottom: 1px solid #E2E8F0; ${bg}">\n`;
      for (let c = 1; c <= cols; c++) {
        tableHtml += `      <td style="padding: 10px 14px; color: #334155; border-right: 1px solid #E2E8F0;">Data ${r}-${c}</td>\n`;
      }
      tableHtml += '    </tr>\n';
    }
    tableHtml += '  </tbody>\n</table>\n</div>\n';

    insertHtmlAtCursor(tableHtml, true);
    setShowTableModal(false);
  };

  // Insert Callout Box
  const handleInsertCallout = (type = 'quote') => {
    if (type === 'quote') {
      const quoteHtml = `
        <div class="blog-callout" style="margin: 24px 0; padding: 16px 20px; border-left: 3px solid #0F172A; background: #F8FAFC; border-radius: 0 6px 6px 0;">
          <blockquote style="margin: 0; font-size: 15px; font-style: italic; color: #1E293B; line-height: 1.6;">
            "Enter compelling quote or key takeaway highlight from this section..."
          </blockquote>
        </div>
      `;
      insertHtmlAtCursor(quoteHtml, true);
    } else {
      const tipHtml = `
        <div class="blog-alert" style="margin: 20px 0; padding: 14px 18px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; color: #334155; font-size: 13.5px; line-height: 1.5;">
          <strong>Note:</strong> Describe critical compliance specifications or validation standards here.
        </div>
      `;
      insertHtmlAtCursor(tipHtml, true);
    }
  };

  // Handle Tags
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tToRemove) => {
    setTags(tags.filter((t) => t !== tToRemove));
  };

  // Handle Save
  const handleSave = async (publishStatus = isPublished) => {
    if (!title.trim()) {
      alert('Please enter an article title');
      return;
    }
    if (!excerpt.trim()) {
      alert('Please enter a short excerpt for card previews');
      return;
    }

    setIsSaving(true);
    const blogPayload = {
      ...(blog || {}),
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
      excerpt: excerpt.trim(),
      contentHtml,
      category,
      coverImage,
      readTime,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        avatar: '/logo-icon-192.png'
      },
      tags,
      isPublished: publishStatus,
      featured,
      publishedAt: publishStatus ? (blog?.publishedAt || new Date().toISOString()) : null
    };

    try {
      await onSave(blogPayload);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onCancel}
            type="button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer' }}
          >
            <IconArrowLeft size={14} color="#64748B" />
            <span>Articles</span>
          </button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: 0, letterSpacing: '-0.3px' }}>
              {blog ? 'Edit Article' : 'New Article'}
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handleSave(false)}
            disabled={isSaving}
            type="button"
            style={{ padding: '7px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer' }}
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            type="button"
            style={{ padding: '7px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
          >
            {isSaving ? 'Saving...' : isPublished ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </div>

      {/* Main Form & Editor Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Title, Excerpt, Rich Content Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Article Title */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '6px' }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Article title..."
              style={{ width: '100%', padding: '8px 0', border: 'none', borderBottom: '1px solid #E2E8F0', fontSize: '18px', fontWeight: '700', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
            />

            {/* Slug row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '12px', color: '#64748B' }}>
              <span style={{ fontWeight: '500' }}>Permalink:</span>
              <span style={{ color: '#94A3B8' }}>/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#0F172A', outline: 'none' }}
              />
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '6px' }}>
              Excerpt / Summary
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary for listings and search previews..."
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#334155', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          {/* Rich Content Editor */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            
            {/* Toolbar */}
            <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              
              {/* Primary Formatting Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                
                {/* Heading Options */}
                <select
                  onMouseDown={() => saveCurrentSelection()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'p') executeCommand('formatBlock', '<p>');
                    else if (val) executeCommand('formatBlock', `<${val}>`);
                    e.target.value = '';
                  }}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', fontSize: '12px', color: '#334155', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="">Format Block</option>
                  <option value="p">Paragraph</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="h4">Heading 4</option>
                </select>

                <div style={{ width: '1px', height: '16px', backgroundColor: '#E2E8F0', margin: '0 4px' }} />

                {/* Bold */}
                <button
                  type="button"
                  title="Bold"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={() => executeCommand('bold')}
                  style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
                >
                  B
                </button>

                {/* Italic */}
                <button
                  type="button"
                  title="Italic"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={() => executeCommand('italic')}
                  style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', fontStyle: 'italic', fontSize: '12px', cursor: 'pointer' }}
                >
                  I
                </button>

                {/* Underline */}
                <button
                  type="button"
                  title="Underline"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={() => executeCommand('underline')}
                  style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#0F172A', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                >
                  U
                </button>

                <div style={{ width: '1px', height: '16px', backgroundColor: '#E2E8F0', margin: '0 4px' }} />

                {/* Bullet List */}
                <button
                  type="button"
                  title="Bulleted List"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={() => executeCommand('insertUnorderedList')}
                  style={{ padding: '0 8px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                >
                  • List
                </button>

                {/* Numbered List */}
                <button
                  type="button"
                  title="Numbered List"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={() => executeCommand('insertOrderedList')}
                  style={{ padding: '0 8px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                >
                  1. List
                </button>

                <div style={{ width: '1px', height: '16px', backgroundColor: '#E2E8F0', margin: '0 4px' }} />

                {/* Insert Link */}
                <button
                  type="button"
                  title="Insert Link at Cursor"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={openLinkModal}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0 8px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                >
                  <IconLink size={12} color="#475569" />
                  <span>Link</span>
                </button>

                {/* Insert Image */}
                <button
                  type="button"
                  title="Insert Image at Cursor"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={openImageModal}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0 8px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                >
                  <IconImage size={12} color="#475569" />
                  <span>Image</span>
                </button>

                {/* Insert Table */}
                <button
                  type="button"
                  title="Insert Table at Cursor"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={openTableModal}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0 8px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                >
                  <IconTable size={12} color="#475569" />
                  <span>Table</span>
                </button>

                {/* Insert Quote Callout */}
                <button
                  type="button"
                  title="Insert Quote Callout at Cursor"
                  onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
                  onClick={() => handleInsertCallout('quote')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0 8px', height: '28px', borderRadius: '4px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '11.5px', cursor: 'pointer' }}
                >
                  <IconQuote size={12} color="#475569" />
                  <span>Quote</span>
                </button>
              </div>
            </div>

            {/* Visual Editor Workspace */}
            <div
              ref={visualEditorRef}
              className="blog-visual-editor"
              contentEditable
              onInput={handleVisualInput}
              onKeyUp={saveCurrentSelection}
              onMouseUp={saveCurrentSelection}
              onSelect={saveCurrentSelection}
              onFocus={saveCurrentSelection}
              style={{
                minHeight: '440px',
                maxHeight: '640px',
                overflowY: 'auto',
                padding: '24px 28px',
                outline: 'none',
                fontSize: '14.5px',
                lineHeight: '1.7',
                color: '#1E293B'
              }}
            />
            <style>{`
              .blog-visual-editor p { margin: 0 0 12px 0; }
              .blog-visual-editor h2 { font-size: 20px; font-weight: 700; color: #0F172A; margin: 20px 0 10px; }
              .blog-visual-editor h3 { font-size: 16.5px; font-weight: 700; color: #0F172A; margin: 16px 0 8px; }
              .blog-visual-editor ul { list-style-type: disc; list-style-position: outside; padding-left: 28px; margin: 10px 0 14px; }
              .blog-visual-editor ol { list-style-type: decimal; list-style-position: outside; padding-left: 28px; margin: 10px 0 14px; }
              .blog-visual-editor li { margin-bottom: 6px; padding-left: 4px; }
              .blog-visual-editor ul ul { list-style-type: circle; margin: 4px 0; }
            `}</style>
          </div>
        </div>

        {/* Right Column: Metadata, Cover Image, Category, Publishing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Status & Category */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>
                Status
              </span>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: isPublished ? '#ECFDF5' : '#F1F5F9',
                  color: isPublished ? '#065F46' : '#64748B',
                  fontWeight: '600',
                  fontSize: '11.5px',
                  cursor: 'pointer'
                }}
              >
                {isPublished ? '● Published' : '○ Draft'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <input
                type="checkbox"
                id="featuredCheck"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="featuredCheck" style={{ fontSize: '12.5px', color: '#334155', cursor: 'pointer' }}>
                Featured Article
              </label>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '6px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#0F172A', outline: 'none' }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>
                  Read Time {readTimeManual ? '(Manual)' : '(Auto)'}
                </label>
                {readTimeManual && (
                  <button
                    type="button"
                    onClick={() => {
                      setReadTimeManual(false);
                      setReadTime(computeReadTime(contentHtml));
                    }}
                    style={{ border: 'none', background: 'none', color: '#2563EB', fontSize: '11px', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                  >
                    Reset to Auto
                  </button>
                )}
              </div>
              <input
                type="text"
                value={readTime}
                onChange={(e) => {
                  setReadTimeManual(true);
                  setReadTime(e.target.value);
                }}
                placeholder="5 min read"
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#0F172A', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '8px' }}>
              Cover Image
            </label>

            <div style={{ width: '100%', height: '120px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: '10px' }}>
              {coverImage ? (
                <img src={coverImage} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  No image selected
                </div>
              )}
            </div>

            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Image path or URL..."
              style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#0F172A', boxSizing: 'border-box', marginBottom: '10px', outline: 'none' }}
            />

            <button
              type="button"
              onClick={() => setGalleryTarget('cover')}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Browse Full Image Gallery
            </button>
          </div>

          {/* Author Details */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', display: 'block', marginBottom: '10px' }}>
              Author Details
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                placeholder="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#0F172A', boxSizing: 'border-box', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Role / Title"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#0F172A', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '6px' }}>
              Tags
            </label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                placeholder="Add tag..."
                style={{ flex: 1, padding: '5px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', outline: 'none' }}
              />
              <button
                type="button"
                onClick={addTag}
                style={{ padding: '5px 10px', borderRadius: '4px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11.5px', fontWeight: '500', cursor: 'pointer' }}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#334155', fontSize: '11px', fontWeight: '500' }}
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    style={{ border: 'none', background: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==================== INSERT LINK MODAL ==================== */}
      {showLinkModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: '0 0 14px 0' }}>Insert Link</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>URL</label>
                <input
                  type="url"
                  value={linkData.url}
                  onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                  placeholder="https://example.com"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Text (optional)</label>
                <input
                  type="text"
                  value={linkData.text}
                  onChange={(e) => setLinkData({ ...linkData, text: e.target.value })}
                  placeholder="Link label"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  id="linkNewTab"
                  checked={linkData.newTab}
                  onChange={(e) => setLinkData({ ...linkData, newTab: e.target.checked })}
                />
                <label htmlFor="linkNewTab" style={{ fontSize: '12.5px', color: '#475569', cursor: 'pointer' }}>
                  Open in new tab
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#475569', fontSize: '12.5px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer' }}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== INSERT IMAGE MODAL (CLEAN & SPACIOUS) ==================== */}
      {showImageModal && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setShowImageModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '640px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '22px 24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.16)', maxHeight: '88vh', overflowY: 'auto' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                  Insert Image into Article
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Choose a layout and pick assets from the full website gallery.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
              >
                <IconClose size={16} />
              </button>
            </div>

            {/* Layout Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
              <button
                type="button"
                onClick={() => setImageData({ ...imageData, layout: 'full' })}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: imageData.layout === 'full' ? '#FFFFFF' : 'transparent',
                  color: imageData.layout === 'full' ? '#0F172A' : '#64748B',
                  fontSize: '12.5px',
                  fontWeight: imageData.layout === 'full' ? '600' : '500',
                  boxShadow: imageData.layout === 'full' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Single Image (Full Width)
              </button>
              <button
                type="button"
                onClick={() => setImageData({ ...imageData, layout: 'grid2' })}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: imageData.layout === 'grid2' ? '#FFFFFF' : 'transparent',
                  color: imageData.layout === 'grid2' ? '#0F172A' : '#64748B',
                  fontSize: '12.5px',
                  fontWeight: imageData.layout === 'grid2' ? '600' : '500',
                  boxShadow: imageData.layout === 'grid2' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer'
                }}
              >
                2 Images (Side-by-Side Grid)
              </button>
            </div>

            {/* Image Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: imageData.layout === 'grid2' ? '1fr 1fr' : '1fr', gap: '16px' }}>
              {/* Image 1 Card */}
              <div style={{ padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>
                    {imageData.layout === 'grid2' ? 'Left Image' : 'Selected Image'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGalleryTarget('inline1')}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Choose from Gallery
                  </button>
                </div>

                <div style={{ height: '140px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {imageData.url ? (
                    <img src={imageData.url} alt={imageData.alt || 'Preview'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>No image selected</span>
                  )}
                </div>

                <input
                  type="text"
                  value={imageData.url}
                  onChange={(e) => setImageData({ ...imageData, url: e.target.value })}
                  placeholder="/Product_Images/32.png"
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', outline: 'none' }}
                />

                <input
                  type="text"
                  value={imageData.caption}
                  onChange={(e) => setImageData({ ...imageData, caption: e.target.value })}
                  placeholder="Optional caption..."
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              {/* Image 2 Card (only in 2-col mode) */}
              {imageData.layout === 'grid2' && (
                <div style={{ padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A' }}>Right Image</span>
                    <button
                      type="button"
                      onClick={() => setGalleryTarget('inline2')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        fontSize: '11.5px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Choose from Gallery
                    </button>
                  </div>

                  <div style={{ height: '140px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imageData.url2 ? (
                      <img src={imageData.url2} alt={imageData.alt2 || 'Preview'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>No image selected</span>
                    )}
                  </div>

                  <input
                    type="text"
                    value={imageData.url2}
                    onChange={(e) => setImageData({ ...imageData, url2: e.target.value })}
                    placeholder="/Product_Images/36.png"
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', outline: 'none' }}
                  />

                  <input
                    type="text"
                    value={imageData.caption2}
                    onChange={(e) => setImageData({ ...imageData, caption2: e.target.value })}
                    placeholder="Optional caption..."
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                style={{ padding: '7px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#475569', fontSize: '12.5px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                style={{ padding: '7px 18px', borderRadius: '6px', border: 'none', background: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
              >
                {imageData.layout === 'grid2' ? 'Insert 2-Image Grid' : 'Insert Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FULL WEBSITE GALLERY MODAL ==================== */}
      <GalleryModal
        isOpen={Boolean(galleryTarget)}
        onClose={() => setGalleryTarget(null)}
        currentUrl={
          galleryTarget === 'cover'
            ? coverImage
            : galleryTarget === 'inline2'
              ? imageData.url2
              : imageData.url
        }
        title={
          galleryTarget === 'cover'
            ? 'Select Cover Image'
            : galleryTarget === 'inline2'
              ? 'Select Right Grid Image'
              : 'Select Article Image'
        }
        onSelect={(img) => {
          if (galleryTarget === 'cover') {
            setCoverImage(img.url);
          } else if (galleryTarget === 'inline1') {
            setImageData((prev) => ({ ...prev, url: img.url, alt: img.label }));
          } else if (galleryTarget === 'inline2') {
            setImageData((prev) => ({ ...prev, url2: img.url, alt2: img.label }));
          }
        }}
      />

      {/* ==================== INSERT TABLE MODAL ==================== */}
      {showTableModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '360px', backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: '0 0 14px 0' }}>Insert Data Table</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Columns</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={tableData.cols}
                  onChange={(e) => setTableData({ ...tableData, cols: parseInt(e.target.value) || 1 })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px' }}>Rows</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={tableData.rows}
                  onChange={(e) => setTableData({ ...tableData, rows: parseInt(e.target.value) || 1 })}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <input
                type="checkbox"
                id="tableHeaderCheck"
                checked={tableData.hasHeader}
                onChange={(e) => setTableData({ ...tableData, hasHeader: e.target.checked })}
              />
              <label htmlFor="tableHeaderCheck" style={{ fontSize: '12.5px', color: '#475569', cursor: 'pointer' }}>
                Include Header Row
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#475569', fontSize: '12.5px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '500', cursor: 'pointer' }}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
