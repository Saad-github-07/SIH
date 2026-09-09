import React from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, Volume2, VolumeX, Eye, Wifi, WifiOff, RefreshCw, UserCheck, ShieldAlert, User, Gamepad2, Bot, Settings, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const {
    language,
    t,
    activeTab,
    setActiveTab,
    highContrast,
    setHighContrast,
    syncStatus,
    triggerCloudSync,
    speakText
  } = useApp();

  return (
    <header className="app-navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="brand-logo" onClick={() => setActiveTab('patient')}>
          <div className="brand-icon">
            <Brain size={26} color="#14b8a6" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="brand-title">{t.appTitle}</span>
              <span className="brand-badge">COGNITIVE HEALTH</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>{t.tagline}</p>
          </div>
        </div>

        {/* 5 Primary Navigation Tabs */}
        <div className="tab-switcher" style={{ flexWrap: 'wrap' }}>
          {/* 1. Games Tab */}
          <button
            className={`tab-btn ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('games');
              speakText("Games & Cognitive Exercises");
            }}
          >
            <Gamepad2 size={19} />
            <span>Games</span>
          </button>

          {/* 2. Patient Mode Tab */}
          <button
            className={`tab-btn ${activeTab === 'patient' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('patient');
              speakText(t.patientMode);
            }}
          >
            <UserCheck size={19} />
            <span>{t.patientMode}</span>
          </button>

          {/* 3. Caregiver Portal Tab */}
          <button
            className={`tab-btn ${activeTab === 'caregiver' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('caregiver');
              speakText(t.caregiverDashboard);
            }}
          >
            <ShieldAlert size={19} />
            <span>Caregiver & Doctor</span>
          </button>

          {/* 4. Dedicated AI Hub Tab */}
          <button
            className={`tab-btn ${activeTab === 'ai-hub' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('ai-hub');
              speakText("AI Innovations Hub");
            }}
          >
            <Bot size={19} />
            <span>AI Hub</span>
          </button>

          {/* 5. Settings Tab */}
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              speakText("System & Accessibility Settings");
            }}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </div>

        {/* Quick Utility Controls: Sync Status & High Contrast */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
              fontWeight: '700',
              cursor: 'pointer',
              background: syncStatus.isOnline ? '#f0fdf4' : '#fef2f2',
              color: syncStatus.isOnline ? '#15803d' : '#b91c1c',
              border: `1px solid ${syncStatus.isOnline ? '#bbf7d0' : '#fecaca'}`
            }}
            title="Click to force cloud sync"
          >
            {syncStatus.isOnline ? <Wifi size={15} /> : <WifiOff size={15} />}
            <span>{syncStatus.isOnline ? t.onlineStatus : t.offlineStatus}</span>
            {syncStatus.pendingCount > 0 && (
              <RefreshCw size={13} className="spin" style={{ marginLeft: '4px' }} />
            )}
          </div>

          {/* High Contrast Quick Toggle */}
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
            style={{ padding: '6px 12px', minHeight: '38px', borderRadius: '10px' }}
            title="Toggle Accessible High Contrast Mode"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
