import { useState, useMemo, useRef, useEffect } from 'react';

const EMAIL_VALID_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecipientAutocomplete({
  value = '',
  onChange,
  allContacts = [],
  apiBaseUrl = '',
  authHeaders = null,
  placeholder = 'Type name, company, or email...'
}) {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [remoteContacts, setRemoteContacts] = useState([]);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const selectedEmails = useMemo(() => {
    return value
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [value]);

  const selectedSet = useMemo(() => new Set(selectedEmails.map((e) => e.toLowerCase())), [selectedEmails]);

  // Live backend search fallback so suggestions work even with >500 contacts or newly added contacts
  useEffect(() => {
    const q = inputText.trim();
    if (!isFocused || !q || !apiBaseUrl || !authHeaders) {
      setRemoteContacts([]);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoadingRemote(true);
      try {
        const res = await fetch(
          `${apiBaseUrl}/contacts?page=1&limit=10&search=${encodeURIComponent(q)}`,
          { headers: authHeaders }
        );
        const data = await res.json();
        if (!cancelled && data.success) {
          setRemoteContacts(data.data?.contacts || []);
        }
      } catch {
        // Silent fallback to local allContacts
      } finally {
        if (!cancelled) setLoadingRemote(false);
      }
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inputText, isFocused, apiBaseUrl, authHeaders]);

  const combinedContacts = useMemo(() => {
    const seen = new Set();
    const merged = [];
    for (const c of [...allContacts, ...remoteContacts]) {
      const email = (c?.email || '').toLowerCase().trim();
      if (!email || seen.has(email)) continue;
      seen.add(email);
      merged.push(c);
    }
    return merged;
  }, [allContacts, remoteContacts]);

  const suggestions = useMemo(() => {
    const q = inputText.trim().toLowerCase();
    if (!q) {
      return isFocused
        ? combinedContacts.filter((c) => !selectedSet.has((c.email || '').toLowerCase())).slice(0, 6)
        : [];
    }
    return combinedContacts
      .filter((c) => {
        const email = (c.email || '').toLowerCase();
        if (selectedSet.has(email)) return false;
        return (
          email.includes(q) ||
          (c.name || '').toLowerCase().includes(q) ||
          (c.company || '').toLowerCase().includes(q)
        );
      })
      .slice(0, 8);
  }, [inputText, combinedContacts, selectedSet, isFocused]);

  useEffect(() => {
    setActiveIndex(0);
  }, [suggestions.length, inputText]);

  const addEmail = (email) => {
    const clean = email.trim();
    if (!clean || selectedSet.has(clean.toLowerCase())) {
      setInputText('');
      return;
    }
    const next = [...selectedEmails, clean].join(', ');
    onChange(next);
    setInputText('');
  };

  const removeEmail = (emailToRemove) => {
    const next = selectedEmails.filter((e) => e !== emailToRemove).join(', ');
    onChange(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    } else if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputText.trim()) {
        if (suggestions.length > 0 && (!inputText.includes('@') || e.key === 'Enter')) {
          const chosen = suggestions[activeIndex] || suggestions[0];
          if (chosen && !EMAIL_VALID_REGEX.test(inputText.trim())) {
            addEmail(chosen.email);
            return;
          }
        }
        addEmail(inputText);
      }
    } else if (e.key === 'Backspace' && !inputText && selectedEmails.length > 0) {
      removeEmail(selectedEmails[selectedEmails.length - 1]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      const trimmed = inputText.trim();
      if (trimmed && EMAIL_VALID_REGEX.test(trimmed)) {
        addEmail(trimmed);
      }
      setIsFocused(false);
    }, 180);
  };

  const getContactLabel = (email) => {
    const found = combinedContacts.find((c) => (c.email || '').toLowerCase() === email.toLowerCase());
    return found?.name ? `${found.name} <${email}>` : email;
  };

  const showDropdown = isFocused && (suggestions.length > 0 || inputText.trim().length > 0);

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => inputRef.current && inputRef.current.focus()}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '5px',
          padding: '6px 8px',
          borderRadius: '6px',
          border: isFocused ? '1px solid #2563EB' : '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          minHeight: '36px',
          cursor: 'text'
        }}
      >
        {selectedEmails.map((email) => (
          <span
            key={email}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '2px 8px',
              borderRadius: '14px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1E3A8A',
              fontSize: '11.5px',
              fontWeight: '500'
            }}
          >
            <span>{getContactLabel(email)}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeEmail(email);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: 0,
                fontSize: '12px',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={selectedEmails.length === 0 ? placeholder : 'Add another...'}
          style={{
            flex: 1,
            minWidth: '150px',
            border: 'none',
            outline: 'none',
            fontSize: '12px',
            color: '#0F172A',
            padding: '2px 4px',
            backgroundColor: 'transparent'
          }}
        />
      </div>

      {/* Gmail-style Autocomplete Dropdown */}
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.14)',
            zIndex: 1200,
            maxHeight: '230px',
            overflowY: 'auto'
          }}
        >
          {suggestions.length > 0 ? (
            suggestions.map((c, idx) => {
              const initials = (c.name || c.email || '?').slice(0, 2).toUpperCase();
              const isActive = idx === activeIndex;
              return (
                <button
                  key={c._id || c.email}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addEmail(c.email);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    border: 'none',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: isActive ? '#F8FAFC' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.name || c.email}
                      {c.company && <span style={{ fontWeight: '400', color: '#64748B' }}> · {c.company}</span>}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>{c.email}</div>
                  </div>
                </button>
              );
            })
          ) : (
            <div style={{ padding: '10px 12px', fontSize: '12px', color: '#64748B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                {loadingRemote
                  ? 'Searching contacts...'
                  : `No saved contact matching "${inputText.trim()}"`}
              </span>
              {EMAIL_VALID_REGEX.test(inputText.trim()) && (
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addEmail(inputText);
                  }}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add {inputText.trim()}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
