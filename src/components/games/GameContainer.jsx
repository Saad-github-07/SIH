import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Cpu, Award, Zap, HelpCircle } from 'lucide-react';

export const GameContainer = ({
  title,
  subtitle,
  children,
  onBack,
  onHint,
  score,
  level = 1
}) => {
  const { t, speakText } = useApp();

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Top Game Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button
          className="btn-secondary"
          onClick={() => {
            speakText("Back to main menu");
            onBack();
          }}
          style={{ fontSize: '16px' }}
        >
          <ArrowLeft size={20} />
          Back to Games Menu
        </button>

        {/* AI Dynamic Scaling Meter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'white',
          padding: '8px 18px',
          borderRadius: '20px',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-emerald)' }}>
            <Cpu size={18} className="pulse" />
            <span style={{ fontWeight: '700', fontSize: '14px' }}>{t.aiDifficulty}:</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3].map((stg) => (
              <div
                key={stg}
                style={{
                  width: '24px',
                  height: '10px',
                  borderRadius: '4px',
                  background: stg <= level
                    ? (stg === 1 ? '#38b000' : stg === 2 ? '#ffb703' : '#d90429')
                    : '#e2e8f0',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>
            {level === 1 ? 'Mild (2x2)' : level === 2 ? 'Moderate (3x2)' : 'Advanced (4x4)'}
          </span>
        </div>

        {/* Hint Action Button */}
        {onHint && (
          <button
            className="btn-secondary"
            onClick={onHint}
            style={{ background: '#fff3e0', color: '#b5838d', border: '1px solid #ffe0b2' }}
          >
            <HelpCircle size={18} />
            Voice Hint
          </button>
        )}
      </div>

      {/* Main Game Surface Card */}
      <div className="glass-card" style={{ textAlign: 'center', padding: '32px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--primary-emerald)', marginBottom: '6px' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
};
