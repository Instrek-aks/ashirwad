import { useState, useEffect } from 'react';
import { downloadAuthorizedFile, exportTableToPdf } from '../../utils/exportUtils';
import ExportDropdown from './ExportDropdown';

const TYPE_OPTIONS = [
  { value: 'ALL', label: 'All Submissions' },
  { value: 'PRODUCT_INQUIRY', label: 'Product Inquiries' },
  { value: 'CAREER_APPLICATION', label: 'Career Applications' },
  { value: 'EVENT_UPDATE', label: 'Event Signups' }
];

const STATUS_OPTIONS = ['ALL', 'NEW', 'IN_REVIEW', 'REPLIED', 'ARCHIVED'];

export default function InquiriesManager({ apiBaseUrl, token, onContactsUpdated }) {
  const [inquiries, setInquiries] = useState([]);
  const [counts, setCounts] = useState({ total: 0, NEW: 0, IN_REVIEW: 0, REPLIED: 0 });
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        type: typeFilter,
        status: statusFilter,
        search,
        limit: '100'
      });
      const res = await fetch(`${apiBaseUrl}/inquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data.inquiries || []);
        setCounts(data.data.counts || { total: 0, NEW: 0, IN_REVIEW: 0, REPLIED: 0 });
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [typeFilter, statusFilter]);

  const openModal = (item) => {
    setSelectedInquiry(item);
    setNotesDraft(item.notes || '');
  };

  const handleUpdateStatus = async (id, status, notes) => {
    setSavingId(id);
    try {
      const res = await fetch(`${apiBaseUrl}/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, notes })
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: 'Submission updated.' });
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(data.inquiry);
        }
        fetchInquiries();
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to update submission.' });
    } finally {
      setSavingId(null);
    }
  };

  const handleAddToContacts = async (id) => {
    setSavingId(id);
    try {
      const res = await fetch(`${apiBaseUrl}/inquiries/${id}/add-to-contacts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: data.message });
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(data.inquiry);
        }
        fetchInquiries();
        if (onContactsUpdated) onContactsUpdated();
      } else {
        setFeedback({ type: 'error', message: data.message });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Unable to add to contacts.' });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission permanently?')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        setFeedback({ type: 'success', message: 'Submission deleted.' });
        fetchInquiries();
      }
    } catch (err) {
      alert('Error deleting submission');
    }
  };

  const handleExportExcel = async () => {
    try {
      const params = new URLSearchParams({ type: typeFilter, status: statusFilter });
      await downloadAuthorizedFile(
        `${apiBaseUrl}/inquiries/export?${params.toString()}`,
        token,
        'Ashirwad_Inquiries_Export.xlsx'
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExportPdf = () => {
    exportTableToPdf({
      title: 'Website Inquiries & Career Applications Report',
      subtitle: `Filter: ${typeFilter} • Status: ${statusFilter}`,
      summary: [
        { label: 'Total Shown', value: inquiries.length },
        { label: 'New', value: counts.NEW || 0 },
        { label: 'In Review', value: counts.IN_REVIEW || 0 },
        { label: 'Replied', value: counts.REPLIED || 0 }
      ],
      columns: [
        { label: 'Type', accessor: (r) => r.type.replace('_', ' ') },
        { label: 'Name', accessor: (r) => r.fullName || '-' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', accessor: (r) => r.phone || '-' },
        { label: 'Company', accessor: (r) => r.company || '-' },
        { label: 'Product / Dept', accessor: (r) => r.productType || r.careerDept || '-' },
        { label: 'Status', key: 'status' },
        { label: 'Submitted', accessor: (r) => new Date(r.createdAt).toLocaleDateString() }
      ],
      rows: inquiries
    });
  };

  const getStatusStyle = (status) => {
    if (status === 'NEW') return { bg: '#DBEAFE', color: '#1D4ED8' };
    if (status === 'IN_REVIEW') return { bg: '#FEF3C7', color: '#92400E' };
    if (status === 'REPLIED') return { bg: '#DCFCE7', color: '#166534' };
    return { bg: '#F1F5F9', color: '#475569' };
  };

  const getTypeBadge = (type) => {
    if (type === 'CAREER_APPLICATION') return { label: 'Career', bg: '#F3E8FF', color: '#6B21A8' };
    if (type === 'EVENT_UPDATE') return { label: 'Event', bg: '#FEF3C7', color: '#92400E' };
    return { label: 'Product', bg: '#DBEAFE', color: '#1E40AF' };
  };

  const renderTableHeaders = () => {
    if (typeFilter === 'PRODUCT_INQUIRY') {
      return (
        <>
          <th style={{ padding: '10px 14px' }}>Contact</th>
          <th style={{ padding: '10px 12px' }}>Company</th>
          <th style={{ padding: '10px 12px' }}>Product Interest</th>
          <th style={{ padding: '10px 12px' }}>Source</th>
          <th style={{ padding: '10px 12px' }}>Status</th>
          <th style={{ padding: '10px 12px' }}>Date</th>
          <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
        </>
      );
    }
    if (typeFilter === 'CAREER_APPLICATION') {
      return (
        <>
          <th style={{ padding: '10px 14px' }}>Applicant</th>
          <th style={{ padding: '10px 12px' }}>Department</th>
          <th style={{ padding: '10px 12px' }}>Experience</th>
          <th style={{ padding: '10px 12px' }}>Resume</th>
          <th style={{ padding: '10px 12px' }}>Status</th>
          <th style={{ padding: '10px 12px' }}>Date</th>
          <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
        </>
      );
    }
    if (typeFilter === 'EVENT_UPDATE') {
      return (
        <>
          <th style={{ padding: '10px 14px' }}>Subscriber Email</th>
          <th style={{ padding: '10px 12px' }}>Source</th>
          <th style={{ padding: '10px 12px' }}>Status</th>
          <th style={{ padding: '10px 12px' }}>Date</th>
          <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
        </>
      );
    }
    return (
      <>
        <th style={{ padding: '10px 14px' }}>Type</th>
        <th style={{ padding: '10px 12px' }}>Contact</th>
        <th style={{ padding: '10px 12px' }}>Details</th>
        <th style={{ padding: '10px 12px' }}>Source</th>
        <th style={{ padding: '10px 12px' }}>Status</th>
        <th style={{ padding: '10px 12px' }}>Date</th>
        <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
      </>
    );
  };

  const renderRowCells = (item) => {
    const st = getStatusStyle(item.status);
    const tb = getTypeBadge(item.type);

    const statusCell = (
      <td style={{ padding: '10px 12px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', backgroundColor: st.bg, color: st.color }}>
          {item.status}
        </span>
      </td>
    );

    const dateCell = (
      <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
    );

    const viewCell = (
      <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openModal(item);
          }}
          style={{
            padding: '5px 12px',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            fontSize: '11.5px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          View
        </button>
      </td>
    );

    if (typeFilter === 'PRODUCT_INQUIRY') {
      return (
        <>
          <td style={{ padding: '10px 14px' }}>
            <div style={{ fontWeight: '600', color: '#0F172A' }}>{item.fullName || '—'}</div>
            <div style={{ fontSize: '11.5px', color: '#64748B' }}>{item.email}</div>
            {item.phone && <div style={{ fontSize: '11px', color: '#94A3B8' }}>{item.phone}</div>}
          </td>
          <td style={{ padding: '10px 12px', color: '#334155' }}>{item.company || '—'}</td>
          <td style={{ padding: '10px 12px', color: '#475569' }}>{item.productType || '—'}</td>
          <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '11.5px' }}>{item.source}</td>
          {statusCell}
          {dateCell}
          {viewCell}
        </>
      );
    }

    if (typeFilter === 'CAREER_APPLICATION') {
      return (
        <>
          <td style={{ padding: '10px 14px' }}>
            <div style={{ fontWeight: '600', color: '#0F172A' }}>{item.fullName || '—'}</div>
            <div style={{ fontSize: '11.5px', color: '#64748B' }}>{item.email}</div>
            {item.phone && <div style={{ fontSize: '11px', color: '#94A3B8' }}>{item.phone}</div>}
          </td>
          <td style={{ padding: '10px 12px', color: '#334155', fontWeight: '500' }}>{item.careerDept || '—'}</td>
          <td style={{ padding: '10px 12px', color: '#475569' }}>{item.yearsExperience || '—'}</td>
          <td style={{ padding: '10px 12px', fontSize: '11.5px' }}>
            {item.resumeUrl ? (
              <a
                href={item.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}
              >
                Open Link ↗
              </a>
            ) : (
              <span style={{ color: '#94A3B8' }}>—</span>
            )}
          </td>
          {statusCell}
          {dateCell}
          {viewCell}
        </>
      );
    }

    if (typeFilter === 'EVENT_UPDATE') {
      return (
        <>
          <td style={{ padding: '10px 14px', fontWeight: '600', color: '#0F172A' }}>{item.email}</td>
          <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '12px' }}>{item.source}</td>
          {statusCell}
          {dateCell}
          {viewCell}
        </>
      );
    }

    // ALL view
    return (
      <>
        <td style={{ padding: '10px 14px' }}>
          <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', backgroundColor: tb.bg, color: tb.color }}>
            {tb.label}
          </span>
        </td>
        <td style={{ padding: '10px 12px' }}>
          <div style={{ fontWeight: '600', color: '#0F172A' }}>{item.fullName || item.email}</div>
          {item.fullName && <div style={{ fontSize: '11.5px', color: '#64748B' }}>{item.email}</div>}
        </td>
        <td style={{ padding: '10px 12px', color: '#475569' }}>
          {item.type === 'CAREER_APPLICATION' ? (
            <div>
              <span>{item.careerDept || 'General'}</span>
              {item.yearsExperience && <span style={{ color: '#94A3B8' }}> · {item.yearsExperience}</span>}
            </div>
          ) : item.type === 'EVENT_UPDATE' ? (
            <span style={{ color: '#64748B' }}>Event newsletter signup</span>
          ) : (
            <div>
              <span>{item.company || '—'}</span>
              {item.productType && <div style={{ fontSize: '11px', color: '#64748B' }}>{item.productType}</div>}
            </div>
          )}
        </td>
        <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '11.5px' }}>{item.source}</td>
        {statusCell}
        {dateCell}
        {viewCell}
      </>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>
            Inquiries & Applications
          </h1>
          <p style={{ margin: '3px 0 0 0', fontSize: '12.5px', color: '#64748B' }}>
            Live submissions from Contact, Career, Home Reach-Out, and Event pages. Click any row to inspect or manage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <ExportDropdown
            onExportExcel={handleExportExcel}
            onExportPdf={handleExportPdf}
          />
        </div>
      </div>

      {feedback && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '7px',
            fontSize: '12.5px',
            backgroundColor: feedback.type === 'success' ? '#F0FDF4' : '#FEF2F2',
            border: feedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA',
            color: feedback.type === 'success' ? '#166534' : '#991B1B',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>{feedback.message}</span>
          <button type="button" onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
            ✕
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          padding: '14px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {TYPE_OPTIONS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTypeFilter(t.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: typeFilter === t.value ? '1px solid #0F172A' : '1px solid #E2E8F0',
                backgroundColor: typeFilter === t.value ? '#0F172A' : '#FFFFFF',
                color: typeFilter === t.value ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', backgroundColor: '#FFFFFF' }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchInquiries();
            }}
            style={{ display: 'flex', gap: '6px' }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, company..."
              style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', width: '210px' }}
            />
            <button
              type="submit"
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', fontSize: '12px', cursor: 'pointer' }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Type-Adapted Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>Loading submissions...</div>
        ) : inquiries.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94A3B8', fontSize: '13px' }}>
            No submissions match the selected filters.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11.5px' }}>
                {renderTableHeaders()}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => openModal(item)}
                  style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer', transition: 'background-color 0.12s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {renderRowCells(item)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Type-Adapted Detail Modal (Houses Add to Contacts + Delete) */}
      {selectedInquiry && (() => {
        const tb = getTypeBadge(selectedInquiry.type);
        return (
          <div
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={() => setSelectedInquiry(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '600px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '22px 24px', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.18)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', backgroundColor: tb.bg, color: tb.color }}>
                      {selectedInquiry.type.replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: '#0F172A' }}>
                    {selectedInquiry.fullName || selectedInquiry.email}
                  </h3>
                </div>
                <button type="button" onClick={() => setSelectedInquiry(null)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748B' }}>
                  ✕
                </button>
              </div>

              {/* Type-Specific Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px', backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
                <div><strong>Email:</strong> {selectedInquiry.email}</div>
                <div><strong>Source:</strong> {selectedInquiry.source || '—'}</div>

                {selectedInquiry.type !== 'EVENT_UPDATE' && (
                  <div><strong>Phone:</strong> {selectedInquiry.phone || '—'}</div>
                )}

                {selectedInquiry.type === 'PRODUCT_INQUIRY' && (
                  <>
                    <div><strong>Company:</strong> {selectedInquiry.company || '—'}</div>
                    <div style={{ gridColumn: '1 / -1' }}><strong>Product Interest:</strong> {selectedInquiry.productType || '—'}</div>
                  </>
                )}

                {selectedInquiry.type === 'CAREER_APPLICATION' && (
                  <>
                    <div><strong>Department:</strong> {selectedInquiry.careerDept || '—'}</div>
                    <div><strong>Experience:</strong> {selectedInquiry.yearsExperience || '—'}</div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <strong>Resume / Portfolio:</strong>{' '}
                      {selectedInquiry.resumeUrl ? (
                        <a href={selectedInquiry.resumeUrl} target="_blank" rel="noreferrer" style={{ color: '#2563EB', fontWeight: '600' }}>
                          {selectedInquiry.resumeUrl} ↗
                        </a>
                      ) : (
                        '—'
                      )}
                    </div>
                  </>
                )}

                {selectedInquiry.description && (
                  <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '2px' }}>
                    <strong>Message / Cover Note:</strong>
                    <p style={{ margin: '4px 0 0 0', whiteSpace: 'pre-wrap', color: '#334155', lineHeight: '1.5' }}>
                      {selectedInquiry.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Status & Notes */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                  Status
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleUpdateStatus(selectedInquiry._id, e.target.value, notesDraft)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                >
                  <option value="NEW">NEW</option>
                  <option value="IN_REVIEW">IN_REVIEW</option>
                  <option value="REPLIED">REPLIED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                  Internal Admin Notes
                </label>
                <textarea
                  rows={3}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Add follow-up notes..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Modal Footer Actions (Add to Contacts + Delete + Save Notes) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    disabled={selectedInquiry.addedToContacts || savingId === selectedInquiry._id}
                    onClick={() => handleAddToContacts(selectedInquiry._id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      border: '1px solid #BFDBFE',
                      backgroundColor: selectedInquiry.addedToContacts ? '#F1F5F9' : '#EFF6FF',
                      color: selectedInquiry.addedToContacts ? '#64748B' : '#1D4ED8',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: selectedInquiry.addedToContacts ? 'default' : 'pointer'
                    }}
                  >
                    {selectedInquiry.addedToContacts ? '✓ Added to Contacts' : '+ Add to Contacts'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedInquiry._id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      border: '1px solid #FECACA',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>

                <button
                  type="button"
                  disabled={savingId === selectedInquiry._id}
                  onClick={() => handleUpdateStatus(selectedInquiry._id, selectedInquiry.status, notesDraft)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
