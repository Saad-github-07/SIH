import React from 'react';
import { useApp } from '../../context/AppContext';
import { Droplet, Pill, Calendar, CheckCircle, Plus } from 'lucide-react';

export const DailyRemindersCard = () => {
  const {
    t,
    hydrationCount,
    hydrationGoal,
    addHydration,
    reminders,
    toggleReminder,
    speakText
  } = useApp();

  const percentage = Math.round((hydrationCount / hydrationGoal) * 100);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '32px' }}>
      {/* Hydration Tracker Card */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Droplet size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{t.hydrationGoal}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Target: 8 glasses daily</p>
            </div>
          </div>

          <span style={{ fontSize: '20px', fontWeight: '800', color: '#0284c7' }}>
            {hydrationCount}/{hydrationGoal}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '14px',
          background: '#e2e8f0',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
            borderRadius: '10px',
            transition: 'width 0.4s ease'
          }} />
        </div>

        <button
          className="btn-primary"
          onClick={addHydration}
          disabled={hydrationCount >= hydrationGoal}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
            opacity: hydrationCount >= hydrationGoal ? 0.6 : 1
          }}
        >
          <Plus size={20} />
          Log Glass of Water (+1)
        </button>
      </div>

      {/* Medication Schedule Card */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: '#ffe4e6',
            color: '#e11d48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Pill size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{t.medicationTitle}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Today's doses & alerts</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reminders.map((rem) => (
            <div
              key={rem.id}
              onClick={() => toggleReminder(rem.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '14px',
                background: rem.taken ? 'rgba(56, 176, 0, 0.08)' : 'white',
                border: `2px solid ${rem.taken ? '#a7c957' : 'var(--card-border)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{rem.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: rem.taken ? '#2b9348' : 'var(--text-dark)' }}>
                    {rem.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {rem.time} • {rem.dose}
                  </div>
                </div>
              </div>

              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: rem.taken ? '#38b000' : '#f1f5f9',
                color: rem.taken ? 'white' : '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
