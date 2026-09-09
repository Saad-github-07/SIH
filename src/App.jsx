import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import { GamesView } from './components/games/GamesView';
import { AIHubView } from './components/ai/AIHubView';
import { SettingsView } from './components/settings/SettingsView';
import './styles/index.css';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main style={{ padding: '28px 16px', minHeight: 'calc(100vh - 140px)' }}>
      {activeTab === 'games' && <GamesView />}
      {activeTab === 'patient' && <PatientDashboard />}
      {activeTab === 'caregiver' && <CaregiverDashboard />}
      {activeTab === 'ai-hub' && <AIHubView />}
      {activeTab === 'settings' && <SettingsView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <MainContent />
        <footer style={{
          background: 'rgba(255, 255, 255, 0.94)',
          borderTop: '2px solid var(--card-border)',
          padding: '18px 24px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong>Arclight AI</strong> • Cognitive Health & Memory Assistance Platform for North East India (Assam, Manipur, Meghalaya, Mizoram, Nagaland, Arunachal Pradesh, Tripura, Sikkim)
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
