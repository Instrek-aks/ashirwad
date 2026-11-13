import { useState } from 'react';

export default function SettingsPanel({
  apiBaseUrl,
  token,
  user,
  onUserUpdated,
  systemStatus,
  onRefreshDiagnostics,
  totalContacts,
  totalCampaigns,
  purgeLoading,
  purgeFeedback,
  onPurgeData
}) {
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMsg, setPwMsg] = useState(null);
  const [pwSaving, setPwSaving] = useState(false);

  const [diagEmail, setDiagEmail] = useState(user?.email || '');
  const [diagSending, setDiagSending] = useState(false);
  const [diagResult, setDiagResult] = useState(null);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const res = await fetch(`${apiBaseUrl}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: profileName, email: profileEmail })
      });
      const data = await res.json();
      if (data.success) {
        setProfileMsg({ type: 'success', text: data.message });
        if (onUserUpdated) onUserUpdated(data.user);
      } else {
        setProfileMsg({ type: 'error', text: data.message || 'Update failed.' });
      }
    } catch (err) {
      setProfileMsg({ type: 'error', text: 'Network error updating profile.' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMsg(null);
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch(`${apiBaseUrl}/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setPwMsg({ type: 'success', text: data.message });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPwMsg({ type: 'error', text: data.message || 'Password change failed.' });
      }
    } catch (err) {
      setPwMsg({ type: 'error', text: 'Network error changing password.' });
    } finally {
      setPwSaving(false);
    }
  };

  const handleSendDiagnosticEmail = async () => {
    setDiagSending(true);
    setDiagResult(null);
    try {
      const res = await fetch(`${apiBaseUrl}/auth/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ to: diagEmail })
      });
      const data = await res.json();
      setDiagResult({
        type: data.success ? 'success' : 'error',
        text: data.message
      });
    } catch (err) {
      setDiagResult({ type: 'error', text: 'Failed to send diagnostic email.' });
    } finally {
      setDiagSending(false);
    }
  };

  const smtp = systemStatus?.smtp || {};

  return (
    <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Live Environment & SMTP Diagnostics */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>
              Live Environment & SMTP Diagnostics
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#64748B' }}>
              Real-time backend configuration and mail server verification.
            </p>
          </div>
          <button
            type="button"
            onClick={onRefreshDiagnostics}
            style={{
              padding: '7px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Run Diagnostics
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px', marginBottom: '16px' }}>
          <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Database</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: systemStatus.database === 'CONNECTED' ? '#059669' : '#DC2626', marginTop: '2px' }}>
              {systemStatus.database || 'UNKNOWN'}
            </div>
          </div>
          <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>SMTP Status</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: smtp.configured ? '#059669' : '#D97706', marginTop: '2px' }}>
              {smtp.configured ? 'VERIFIED' : 'NOT CONFIGURED'}
            </div>
          </div>
          <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>SMTP Host / Port</div>
            <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', marginTop: '2px' }}>
              {smtp.host || '—'}:{smtp.port || '—'}
            </div>
          </div>
          <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Sender Account</div>
            <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#0F172A', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {smtp.userMasked || '—'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
          <input
            type="email"
            value={diagEmail}
            onChange={(e) => setDiagEmail(e.target.value)}
            placeholder="recipient@example.com"
            style={{ flex: 1, minWidth: '220px', padding: '7px 11px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }}
          />
          <button
            type="button"
            disabled={diagSending}
            onClick={handleSendDiagnosticEmail}
            style={{
              padding: '7px 14px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              color: '#0F172A',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: diagSending ? 'wait' : 'pointer'
            }}
          >
            {diagSending ? 'Sending...' : 'Send Diagnostic Email'}
          </button>
        </div>
        {diagResult && (
          <div style={{ marginTop: '10px', fontSize: '12px', color: diagResult.type === 'success' ? '#059669' : '#DC2626' }}>
            {diagResult.text}
          </div>
        )}
      </div>

      {/* 2. Admin Profile & Change Password (Single User) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <form onSubmit={handleSaveProfile} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>Admin Profile</h3>
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>Display Name</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>Admin Email</label>
            <input
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          {profileMsg && (
            <div style={{ fontSize: '12px', color: profileMsg.type === 'success' ? '#059669' : '#DC2626' }}>
              {profileMsg.text}
            </div>
          )}
          <button
            type="submit"
            disabled={profileSaving}
            style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}
          >
            {profileSaving ? 'Saving...' : 'Update Profile'}
          </button>
        </form>

        <form onSubmit={handleChangePassword} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>Change Password</h3>
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '600', color: '#64748B', marginBottom: '4px' }}>Confirm New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          {pwMsg && (
            <div style={{ fontSize: '12px', color: pwMsg.type === 'success' ? '#059669' : '#DC2626' }}>
              {pwMsg.text}
            </div>
          )}
          <button
            type="submit"
            disabled={pwSaving}
            style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}
          >
            {pwSaving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* 3. Maintenance & Data Reset */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #FEE2E2', padding: '20px 24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#991B1B', margin: '0 0 4px 0' }}>
          Maintenance & Data Reset
        </h3>
        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 14px 0' }}>
          Clear test contacts and broadcast history. Admin account and articles remain untouched.
        </p>

        {purgeFeedback && (
          <div style={{ margin: '0 0 14px 0', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', backgroundColor: purgeFeedback.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: purgeFeedback.type === 'success' ? '1px solid #BBF7D0' : '1px solid #FECACA', color: purgeFeedback.type === 'success' ? '#166534' : '#991B1B' }}>
            {purgeFeedback.message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            disabled={purgeLoading}
            onClick={() => onPurgeData('contacts')}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12px', cursor: purgeLoading ? 'wait' : 'pointer' }}
          >
            Clear Contacts ({totalContacts})
          </button>
          <button
            type="button"
            disabled={purgeLoading}
            onClick={() => onPurgeData('history')}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#334155', fontSize: '12px', cursor: purgeLoading ? 'wait' : 'pointer' }}
          >
            Clear History ({totalCampaigns})
          </button>
          <button
            type="button"
            disabled={purgeLoading}
            onClick={() => onPurgeData('all')}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #FCA5A5', backgroundColor: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: '600', cursor: purgeLoading ? 'wait' : 'pointer' }}
          >
            {purgeLoading ? 'Clearing...' : 'Clear All Test Data'}
          </button>
        </div>
      </div>
    </div>
  );
}

