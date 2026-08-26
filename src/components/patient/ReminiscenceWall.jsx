import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_REMINISCENCE_CARDS } from '../../data/nerThemes';
import { Heart, Volume2, Plus, Sparkles, MapPin } from 'lucide-react';

export const ReminiscenceWall = () => {
  const { t, speakText } = useApp();
  const [cards, setCards] = useState(INITIAL_REMINISCENCE_CARDS);
  const [activeVoiceId, setActiveVoiceId] = useState(null);

  const handlePlayVoice = (card) => {
    setActiveVoiceId(card.id);
    speakText(card.voiceMemoText);
    setTimeout(() => setActiveVoiceId(null), 4000);
  };

  return (
    <div style={{ marginTop: '36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={24} style={{ color: '#e11d48' }} />
            {t.reminiscenceTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            {t.reminiscenceSubtitle}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ position: 'relative', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                <img
                  src={card.photo}
                  alt={card.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.65)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backdropFilter: 'blur(4px)'
                }}>
                  {card.relationship}
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                {card.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 12px 0' }}>
                <MapPin size={14} />
                <span>{card.location}</span>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-muted)', background: 'rgba(27, 67, 50, 0.04)', padding: '10px 14px', borderRadius: '12px' }}>
                💡 <strong>Memory Note:</strong> {card.frequentMemory}
              </p>
            </div>

            <button
              className="btn-primary"
              onClick={() => handlePlayVoice(card)}
              style={{
                marginTop: '18px',
                width: '100%',
                background: activeVoiceId === card.id ? '#e9c46a' : 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                color: activeVoiceId === card.id ? 'black' : 'white'
              }}
            >
              <Volume2 size={18} />
              {activeVoiceId === card.id ? "Playing Voice Note..." : t.playVoiceNote}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
