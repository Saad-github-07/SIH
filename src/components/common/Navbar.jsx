import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/translations';
import { Volume2, VolumeX, Eye, Wifi, WifiOff, RefreshCw, UserCheck, ShieldAlert } from 'lucide-react';

export const Navbar = () => {
  const {
    language,
    setLanguage,
    t,
    activeTab,
    setActiveTab,
    highContrast,
    setHighContrast,
    voiceEnabled,
    setVoiceEnabled,
    syncStatus,
    triggerCloudSync,
    speakText
  } = useApp();

  return (
    <header className="app-navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="brand-logo">
          <div className="brand-icon">🧠</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="brand-title">{t.appTitle}</span>
              <span className="brand-badge">NER AI</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.tagline}</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === 'patient' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('patient');
              speakText(t.patientMode);
            }}
          >
            <UserCheck size={18} />
            {t.patientMode}
          </button>

          <button
            className={`tab-btn ${activeTab === 'caregiver' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('caregiver');
              speakText(t.caregiverDashboard);
            }}
          >
            <ShieldAlert size={18} />
            {t.caregiverDashboard}
          </button>
        </div>

        {/* Controls: Language, High Contrast, Offline Sync */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Offline Sync Status */}
          <div
            onClick={triggerCloudSync}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              background: syncStatus.isOnline ? 'rgba(56, 176, 0, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              color: syncStatus.isOnline ? '#2b9348' : '#dc2626',
              border: `1px solid ${syncStatus.isOnline ? '#a7c957' : '#fca5a5'}`
            }}
            title="Click to manually force cloud sync"
          >
            {syncStatus.isOnline ? <Wifi size={15} /> : <WifiOff size={15} />}
            <span>{syncStatus.isOnline ? t.onlineStatus : t.offlineStatus}</span>
            {syncStatus.pendingCount > 0 && (
              <RefreshCw size={13} className="spin" style={{ marginLeft: '4px' }} />
            )}
          </div>

          {/* Regional Language Picker */}
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              speakText(LANGUAGES.find(l => l.code === e.target.value)?.name || '');
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'white',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--primary-emerald)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.region})
              </option>
            ))}
          </select>

          {/* High Contrast Toggle */}
          <button
            className="btn-secondary"
            onClick={() => {
              const next = !highContrast;
              setHighContrast(next);
              if (next) {
                document.body.classList.add('high-contrast');
              } else {
                document.body.classList.remove('high-contrast');
              }
              speakText(t.highContrast);
            }}
            style={{ padding: '8px 12px' }}
            title="Toggle Accessible High Contrast Mode"
          >
            <Eye size={18} />
          </button>

          {/* Voice Assistant Toggle */}
          <button
            className="btn-secondary"
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            style={{
              padding: '8px 12px',
              background: voiceEnabled ? 'rgba(45, 106, 79, 0.1)' : '#f1f5f9',
              color: voiceEnabled ? 'var(--primary-emerald)' : 'var(--text-muted)'
            }}
            title="Toggle Voice Read-Aloud"
          >
            {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
