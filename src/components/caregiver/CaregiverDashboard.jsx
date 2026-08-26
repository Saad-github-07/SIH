import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PATIENT_INFO, WEEKLY_COGNITIVE_TRENDS, CAREGIVER_RISK_ALERTS } from '../../data/sampleAnalytics';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import {
  ShieldAlert, Activity, AlertTriangle, FileText, CheckCircle2,
  Calendar, MapPin, User, Stethoscope, Download, Clock, Plus
} from 'lucide-react';

export const CaregiverDashboard = () => {
  const { t, cognitiveTrends, patientInfo, speakText } = useApp();
  const [alerts, setAlerts] = useState(CAREGIVER_RISK_ALERTS);
  const [showReportModal, setShowReportModal] = useState(false);

  const printClinicalReport = () => {
    window.print();
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1240px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top Caregiver Header */}
      <div className="glass-card" style={{ marginBottom: '24px', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-emerald)', marginBottom: '4px' }}>
              <ShieldAlert size={24} />
              <h1 style={{ fontSize: '26px', fontWeight: '800' }}>{t.caregiverTitle}</h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Real-time Neurological Progress & Dementia Risk Monitoring • NER Health Network
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn-primary"
              onClick={() => {
                setShowReportModal(true);
                speakText("Opening Medical Clinical Report");
              }}
              style={{ fontSize: '15px', padding: '10px 18px' }}
            >
              <FileText size={18} />
              {t.downloadReport}
            </button>
          </div>
        </div>
      </div>

      {/* Patient Profile Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: '#e8f5e9',
            color: 'var(--primary-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            👴
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>PATIENT PROFILE</div>
            <div style={{ fontSize: '18px', fontWeight: '800' }}>{patientInfo.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Age {patientInfo.age} • {patientInfo.gender} • {patientInfo.location}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: '#e0f2fe',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Stethoscope size={26} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>ATTENDING NEUROLOGIST</div>
            <div style={{ fontSize: '17px', fontWeight: '700' }}>{patientInfo.attendingNeurologist}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{patientInfo.phcCenter}</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: '#fff3e0',
            color: '#f4a261',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={26} />
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>MMSE EQUIVALENT SCORE</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
              24 / 30 <span style={{ fontSize: '13px', color: '#2b9348' }}>(Mild Stage)</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Adaptive AI Dynamic Stage 2</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* 1. Cognitive Performance Chart */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} style={{ color: 'var(--primary-emerald)' }} />
            7-Day Cognitive Performance Trajectory
          </h3>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cognitiveTrends}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#1b4332" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" name="Cognitive Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Reaction Time Latency Chart */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} style={{ color: '#0284c7' }} />
            Average Reaction Time Latency (Seconds)
          </h3>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cognitiveTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 6]} />
                <Tooltip />
                <Bar dataKey="reactionSec" fill="#0077b6" radius={[6, 6, 0, 0]} name="Reaction Speed (s)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Automated Dementia Risk Alerts */}
      <div className="glass-card">
        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={22} style={{ color: '#d90429' }} />
          {t.riskAlertsTitle}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {alerts.map((al) => (
            <div
              key={al.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '16px',
                background: al.severity === 'HIGH' ? '#fff1f2' : al.severity === 'MEDIUM' ? '#fffbe6' : '#f0fdf4',
                border: `1px solid ${al.severity === 'HIGH' ? '#fecdd3' : al.severity === 'MEDIUM' ? '#ffe58f' : '#bbf7d0'}`
              }}
            >
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: '800',
                  background: al.severity === 'HIGH' ? '#e11d48' : al.severity === 'MEDIUM' ? '#d97706' : '#16a34a',
                  color: 'white'
                }}>
                  {al.severity}
                </div>

                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    {al.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0' }}>
                    {al.description}
                  </p>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
                    🕒 {al.timestamp} • 📌 {al.recommendation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Medical Report Printable Modal */}
      {showReportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            background: 'white',
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            borderRadius: '24px'
          }}>
            <div style={{ borderBottom: '2px solid var(--primary-emerald)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
                    Cakes Clinical Assessment Report
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Cognitive & Behavioral Monitoring Summary for Neurological Consultation
                  </p>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', background: '#e2e8f0', padding: '4px 10px', borderRadius: '8px' }}>
                  CONFIDENTIAL MEDICAL RECORD
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px', marginBottom: '24px' }}>
              <div><strong>Patient Name:</strong> {patientInfo.name}</div>
              <div><strong>Age / Gender:</strong> {patientInfo.age} / {patientInfo.gender}</div>
              <div><strong>Location:</strong> {patientInfo.location}</div>
              <div><strong>Primary Language:</strong> {patientInfo.primaryLanguage}</div>
              <div><strong>CHC Hospital:</strong> {patientInfo.phcCenter}</div>
              <div><strong>Attending Doctor:</strong> {patientInfo.attendingNeurologist}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px' }}>
              <h4 style={{ fontWeight: '700', color: 'var(--primary-emerald)', marginBottom: '8px' }}>
                🧠 AI Cognitive & Behavioral Summary
              </h4>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li><strong>MMSE Equivalent Score:</strong> 24 / 30 (Mild Cognitive Impairment Stage)</li>
                <li><strong>7-Day Score Trajectory:</strong> +4% improvement in spatial item recall</li>
                <li><strong>Avg Reaction Speed:</strong> 3.4 seconds (Optimal range for age 74)</li>
                <li><strong>Medication Compliance Rate:</strong> 94% (1 missed dosage logged)</li>
                <li><strong>Hydration Rate:</strong> 7.3 / 8 glasses daily average</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setShowReportModal(false)}>
                Close
              </button>
              <button className="btn-primary" onClick={printClinicalReport}>
                <Download size={18} />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
