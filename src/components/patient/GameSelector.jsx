import React from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, Sparkles, Compass, Music, ArrowRight } from 'lucide-react';

export const GameSelector = () => {
  const { t, setActiveGame, speakText } = useApp();

  const games = [
    {
      id: 'memory',
      title: t.game1Title,
      desc: t.game1Desc,
      icon: '🧠',
      color: '#1b4332',
      badge: 'Memory Recall'
    },
    {
      id: 'pattern',
      title: t.game2Title,
      desc: t.game2Desc,
      icon: '🌿',
      color: '#0077b6',
      badge: 'Pattern Recognition'
    },
    {
      id: 'routine',
      title: t.game3Title,
      desc: t.game3Desc,
      icon: '📅',
      color: '#f4a261',
      badge: 'Executive Function'
    },
    {
      id: 'sound',
      title: t.game4Title,
      desc: t.game4Desc,
      icon: '🎵',
      color: '#e76f51',
      badge: 'Sensory Auditory'
    }
  ];

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
          {t.gamesTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          {t.gamesSubtitle}
        </p>
      </div>

      <div className="game-grid">
        {games.map((g) => (
          <div
            key={g.id}
            className="game-card"
            onClick={() => {
              setActiveGame(g.id);
              speakText(g.title);
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div className="game-card-icon">{g.icon}</div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'rgba(27, 67, 50, 0.08)',
                  color: 'var(--primary-emerald)'
                }}>
                  {g.badge}
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-dark)' }}>
                {g.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {g.desc}
              </p>
            </div>

            <div style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: '700',
              color: 'var(--primary-emerald)',
              fontSize: '15px'
            }}>
              <span>Start Exercise</span>
              <ArrowRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
