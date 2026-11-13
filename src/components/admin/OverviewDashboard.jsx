import { useState, useEffect } from 'react';

const IconInbox = ({ size = 18, color = '#2563EB' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const IconUsers = ({ size = 18, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBook = ({ size = 18, color = '#7C3AED' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconSend = ({ size = 18, color = '#D97706' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconRefresh = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M21 21v-5h-5" />
  </svg>
);

export default function OverviewDashboard({ apiBaseUrl, token, systemStatus, onNavigateTab, onCreateNewBlog }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/auth/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const totalSent = stats?.campaigns?.totalSent ?? 0;
  const totalFailed = stats?.campaigns?.totalFailed ?? 0;
  const deliveryRate =
    totalSent + totalFailed > 0 ? Math.round((totalSent / (totalSent + totalFailed)) * 100) : 100;

  const kpis = [
    {
      label: 'New Inquiries',
      value: stats?.inquiries?.newCount ?? 0,
      sub: `${stats?.inquiries?.total ?? 0} total submissions`,
      accent: '#2563EB',
      iconBg: '#EFF6FF',
      icon: <IconInbox size={18} color="#2563EB" />,
      tab: 'inquiries'
    },
    {
      label: 'Active Contacts',
      value: stats?.contacts?.subscribed ?? 0,
      sub: `${stats?.contacts?.total ?? 0} total • ${stats?.contacts?.unsubscribed ?? 0} unsubscribed`,
      accent: '#059669',
      iconBg: '#ECFDF5',
      icon: <IconUsers size={18} color="#059669" />,
      tab: 'contacts'
    },
    {
      label: 'Published Articles',
      value: stats?.blogs?.published ?? 0,
      sub: `${stats?.blogs?.totalViews ?? 0} readers • ${stats?.blogs?.drafts ?? 0} drafts`,
      accent: '#7C3AED',
      iconBg: '#F5F3FF',
      icon: <IconBook size={18} color="#7C3AED" />,
      tab: 'blogs'
    },
    {
      label: 'Emails Delivered',
      value: totalSent,
      sub: `${stats?.campaigns?.total ?? 0} campaigns • ${deliveryRate}% delivery rate`,
      accent: '#D97706',
      iconBg: '#FFFBEB',
      icon: <IconSend size={18} color="#D97706" />,
      tab: 'history'
    }
  ];

  const getTypeBadge = (type) => {
    if (type === 'CAREER_APPLICATION') return { label: 'Career', bg: '#F3E8FF', color: '#6B21A8' };
    if (type === 'EVENT_UPDATE') return { label: 'Event', bg: '#FEF3C7', color: '#92400E' };
    return { label: 'Product', bg: '#DBEAFE', color: '#1E40AF' };
  };

  const getStatusBadge = (status) => {
    if (status === 'NEW') return { bg: '#DBEAFE', color: '#1D4ED8' };
    if (status === 'IN_REVIEW') return { bg: '#FEF3C7', color: '#92400E' };
    if (status === 'REPLIED') return { bg: '#DCFCE7', color: '#166534' };
    return { bg: '#F1F5F9', color: '#475569' };
  };

  const totalInq = Math.max(1, stats?.inquiries?.total || 0);
  const inqBreakdown = [
    { label: 'Product Inquiries', count: stats?.inquiries?.byType?.PRODUCT_INQUIRY || 0, color: '#2563EB' },
    { label: 'Career Applications', count: stats?.inquiries?.byType?.CAREER_APPLICATION || 0, color: '#7C3AED' },
    { label: 'Event Signups', count: stats?.inquiries?.byType?.EVENT_UPDATE || 0, color: '#D97706' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Clean Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          paddingBottom: '4px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: '21px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.3px' }}>
              Overview
            </h1>
            {/* <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '600',
                backgroundColor: systemStatus.database === 'CONNECTED' ? '#ECFDF5' : '#FEF2F2',
                color: systemStatus.database === 'CONNECTED' ? '#065F46' : '#991B1B',
                border: `1px solid ${systemStatus.database === 'CONNECTED' ? '#A7F3D0' : '#FECACA'}`
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: systemStatus.database === 'CONNECTED' ? '#10B981' : '#EF4444'
                }}
              />
              DB {systemStatus.database === 'CONNECTED' ? 'Online' : 'Offline'}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '600',
                backgroundColor: systemStatus.smtp?.configured ? '#EFF6FF' : '#FFFBEB',
                color: systemStatus.smtp?.configured ? '#1E40AF' : '#92400E',
                border: `1px solid ${systemStatus.smtp?.configured ? '#BFDBFE' : '#FDE68A'}`
              }}
            >
              SMTP {systemStatus.smtp?.configured ? 'Ready' : 'Pending'}
            </span> */}
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Live summary of website inquiries, audience contacts, published articles, and email broadcasts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={fetchDashboard}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <IconRefresh size={13} color="#64748B" />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('campaign')}
            style={{
              padding: '7px 13px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Compose Email
          </button>
          <button
            type="button"
            onClick={onCreateNewBlog}
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
            + New Article
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {kpis.map((card) => (
          <div
            key={card.label}
            onClick={() => onNavigateTab(card.tab)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '18px 20px',
              cursor: 'pointer',
              transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = card.accent;
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#64748B' }}>{card.label}</span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: card.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {card.icon}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                {loading && !stats ? '—' : card.value.toLocaleString()}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '5px' }}>{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-Column Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', alignItems: 'start' }}>
        {/* Left Column: Recent Inquiries & Recent Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Recent Inquiries */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: '700', color: '#0F172A' }}>
                  Recent Inquiries & Applications
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '11.5px', color: '#64748B' }}>
                  Latest leads and job applications from public forms
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('inquiries')}
                style={{ border: 'none', background: 'none', color: '#2563EB', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                View All →
              </button>
            </div>

            {!stats?.recentInquiries?.length ? (
              <div style={{ padding: '28px 0', textAlign: 'center', color: '#94A3B8', fontSize: '12.5px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #E2E8F0' }}>
                No website inquiries received yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stats.recentInquiries.map((inq) => {
                  const tb = getTypeBadge(inq.type);
                  const sb = getStatusBadge(inq.status);
                  const initials = (inq.fullName || inq.email || '?').slice(0, 2).toUpperCase();
                  return (
                    <div
                      key={inq._id}
                      onClick={() => onNavigateTab('inquiries')}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #F1F5F9',
                        backgroundColor: '#F8FAFC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#E2E8F0',
                            color: '#334155',
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
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {inq.fullName || inq.email}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: '600', padding: '1px 6px', borderRadius: '4px', backgroundColor: tb.bg, color: tb.color }}>
                              {tb.label}
                            </span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {inq.company ? `${inq.company} · ` : ''}{inq.email}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '10.5px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', backgroundColor: sb.bg, color: sb.color, flexShrink: 0 }}>
                        {inq.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Articles */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: '700', color: '#0F172A' }}>Recent Articles</h3>
              <button
                type="button"
                onClick={() => onNavigateTab('blogs')}
                style={{ border: 'none', background: 'none', color: '#2563EB', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                Manage All →
              </button>
            </div>

            {!stats?.recentBlogs?.length ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#94A3B8', fontSize: '12.5px' }}>
                No articles created yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stats.recentBlogs.map((b) => (
                  <div
                    key={b._id}
                    onClick={() => onNavigateTab('blogs')}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '7px',
                      border: '1px solid #F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {b.category} · {b.views || 0} views
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '600',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        backgroundColor: b.isPublished ? '#ECFDF5' : '#F1F5F9',
                        color: b.isPublished ? '#065F46' : '#475569',
                        flexShrink: 0
                      }}
                    >
                      {b.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Breakdown + Broadcasts + Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Inquiry Breakdown */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14.5px', fontWeight: '700', color: '#0F172A' }}>
              Submission Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {inqBreakdown.map((row) => {
                const pct = stats?.inquiries?.total ? Math.round((row.count / totalInq) * 100) : 0;
                return (
                  <div key={row.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span style={{ color: '#334155', fontWeight: '500' }}>{row.label}</span>
                      <span style={{ color: '#0F172A', fontWeight: '700' }}>
                        {row.count} <span style={{ color: '#94A3B8', fontWeight: '500' }}>({pct}%)</span>
                      </span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '999px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', backgroundColor: row.color, borderRadius: '999px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Broadcasts */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: '700', color: '#0F172A' }}>Recent Broadcasts</h3>
              <button
                type="button"
                onClick={() => onNavigateTab('history')}
                style={{ border: 'none', background: 'none', color: '#2563EB', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                History →
              </button>
            </div>

            {!stats?.recentCampaigns?.length ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#94A3B8', fontSize: '12.5px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #E2E8F0' }}>
                No campaigns sent yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stats.recentCampaigns.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => onNavigateTab('history')}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '7px',
                      border: '1px solid #F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.subject}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {c.sentCount || 0} delivered · {c.failedCount || 0} failed
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '600',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        backgroundColor: c.status === 'COMPLETED' ? '#ECFDF5' : c.status === 'DRAFT' ? '#F1F5F9' : '#FEF3C7',
                        color: c.status === 'COMPLETED' ? '#065F46' : c.status === 'DRAFT' ? '#475569' : '#92400E',
                        flexShrink: 0
                      }}
                    >
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Navigation Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>Quick Shortcuts</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Inquiries Inbox', tab: 'inquiries' },
                { label: 'Contacts Directory', tab: 'contacts' },
                { label: 'Email Studio', tab: 'campaign' },
                { label: 'System Settings', tab: 'settings' }
              ].map((item) => (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => onNavigateTab(item.tab)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {item.label} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
