import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';
import './styles/index.css';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main style={{ padding: '24px 16px', minHeight: 'calc(100vh - 140px)' }}>
      {activeTab === 'patient' ? (
        <PatientDashboard />
      ) : (
        <CaregiverDashboard />
      )}
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
          background: 'rgba(255, 255, 255, 0.9)',
          borderTop: '1px solid var(--card-border)',
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong>SmritiNER</strong> • AI Cognitive Therapy & Memory Assistance Platform for North East India (Assam, Manipur, Meghalaya, Mizoram, Nagaland, Arunachal Pradesh, Tripura, Sikkim)
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
