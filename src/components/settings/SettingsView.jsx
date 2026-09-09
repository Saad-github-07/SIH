import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/translations';
import { Settings, Eye, Volume2, VolumeX, Wifi, WifiOff, RefreshCw, User, Droplet, Globe, Save, Check } from 'lucide-react';
import { AppwriteAuthModal } from '../common/AppwriteAuthModal';

export const SettingsView = () => {
  const {
    language,
    setLanguage,
    t,
    highContrast,
    setHighContrast,
    voiceEnabled,
    setVoiceEnabled,
    hydrationGoal,
    setHydrationGoal,
    patientInfo,
    setPatientInfo,
    syncStatus,
    triggerCloudSync,
    speakText
  } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form local state for patient profile
  const [profile, setProfile] = useState({
    name: patientInfo?.name || 'Biren Phukan',
    age: patientInfo?.age || 74,
    gender: patientInfo?.gender || 'Male',
    location: patientInfo?.location || 'Guwahati, Assam',
    phcCenter: patientInfo?.phcCenter || 'Guwahati CHC & PHC Health Hub',
    attendingNeurologist: patientInfo?.attendingNeurologist || 'Dr. H. K. Sarma, MD'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setPatientInfo) {
      setPatientInfo(profile);
    }
    setSavedSuccess(true);
    speakText("Patient profile settings updated successfully");
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
        color: 'white',
        padding: '32px',
        borderRadius: '28px',
        marginBottom: '28px',
        boxShadow: '0 12px 30px rgba(27,67,50,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <Settings size={32} style={{ color: '#e9c46a' }} />
          <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px' }}>
            System & Accessibility Settings
          </h1>
        </div>
        <p style={{ fontSize: '17px', opacity: 0.9, maxWidth: '750px' }}>
          Customize regional language, elderly high-contrast vision, voice audio read-aloud, hydration goals, and cloud synchronization.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
        {/* 1. Language & Accessibility Settings */}
        <div className="glass-card">
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={24} />
            Regional Language & Accessibility
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Language Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '8px' }}>
                Primary Interface Language (8 NER Regional Languages)
              </label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  speakText(LANGUAGES.find(l => l.code === e.target.value)?.name || '');
                }}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  border: '2px solid var(--card-border)',
                  background: 'white',
                  fontSize: '17px',
                  fontWeight: '700',
                  color: 'var(--primary-emerald)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.englishName} • {lang.region})
                  </option>
                ))}
              </select>
            </div>

            {/* High Contrast Mode Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: '18px',
              background: '#f8fafc',
              border: '2px solid var(--card-border)'
            }}>
              <div>
                <div style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={20} color="var(--primary-emerald)" />
                  High-Contrast Elderly Mode
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Enlarges text outlines and increases black/white visual contrast ratio.
                </div>
              </div>

              <button
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
                style={{
                  padding: '10px 20px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  border: 'none',
                  background: highContrast ? 'var(--primary-emerald)' : '#cbd5e1',
                  color: highContrast ? 'white' : 'var(--text-dark)'
                }}
              >
                {highContrast ? 'Active ON' : 'OFF'}
              </button>
            </div>

            {/* Voice Assistant Read-Aloud Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: '18px',
              background: '#f8fafc',
              border: '2px solid var(--card-border)'
            }}>
              <div>
                <div style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {voiceEnabled ? <Volume2 size={20} color="var(--primary-emerald)" /> : <VolumeX size={20} color="var(--text-muted)" />}
                  Voice Assistant Read-Aloud
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Speaks button instructions in regional language upon interaction.
                </div>
              </div>

              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  border: 'none',
                  background: voiceEnabled ? 'var(--primary-emerald)' : '#cbd5e1',
                  color: voiceEnabled ? 'white' : 'var(--text-dark)'
                }}
              >
                {voiceEnabled ? 'Enabled ON' : 'Disabled OFF'}
              </button>
            </div>

            {/* Hydration Daily Goal Customization */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '18px',
              background: '#f0f9ff',
              border: '2px solid #bae6fd'
            }}>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#0369a1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplet size={20} />
                Daily Water Hydration Goal Target
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {[6, 8, 10, 12].map(goal => (
                  <button
                    key={goal}
                    onClick={() => {
                      if (setHydrationGoal) setHydrationGoal(goal);
                      speakText(`Hydration target updated to ${goal} glasses`);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: '800',
                      border: hydrationGoal === goal ? '2px solid #0284c7' : '1px solid #94a3b8',
                      background: hydrationGoal === goal ? '#0284c7' : 'white',
                      color: hydrationGoal === goal ? 'white' : 'var(--text-dark)',
                      cursor: 'pointer'
                    }}
                  >
                    {goal} Glasses
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Patient Profile & Cloud Settings */}
        <div className="glass-card">
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={24} />
            Patient Profile & Cloud Account
          </h2>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Patient Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '16px', fontWeight: '600' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Age
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 74 })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '16px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '16px', fontWeight: '600' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Location / Village / Town
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '16px', fontWeight: '600' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Attending Neurologist & CHC PHC Hospital
              </label>
              <input
                type="text"
                value={profile.attendingNeurologist}
                onChange={(e) => setProfile({ ...profile, attendingNeurologist: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '16px', fontWeight: '600' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '8px', fontSize: '16px', padding: '12px 20px', borderRadius: '16px' }}
            >
              {savedSuccess ? <Check size={20} /> : <Save size={20} />}
              <span>{savedSuccess ? 'Profile Saved Successfully!' : 'Save Profile Changes'}</span>
            </button>
          </form>

          {/* Cloud Account & Offline Sync Section */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px dashed var(--card-border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-dark)' }}>
              Appwrite Cloud Synchronization
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '700', color: syncStatus.isOnline ? '#2b9348' : '#dc2626' }}>
                {syncStatus.isOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
                <span>{syncStatus.isOnline ? 'Cloud Sync Active & Online' : 'Offline Mode Active'}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={triggerCloudSync}
                  className="btn-secondary"
                  style={{ fontSize: '14px', padding: '8px 14px', borderRadius: '12px' }}
                >
                  <RefreshCw size={16} className={syncStatus.pendingCount > 0 ? 'spin' : ''} />
                  <span>Force Sync</span>
                </button>

                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="btn-primary"
                  style={{ fontSize: '14px', padding: '8px 14px', borderRadius: '12px' }}
                >
                  <User size={16} />
                  <span>Account Modal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppwriteAuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};
