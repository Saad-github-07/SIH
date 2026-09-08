import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Brain, Sparkles, Compass, Music, ArrowRight, BookOpen, Flower2, ShoppingCart, Star } from 'lucide-react';

export const GameSelector = () => {
  const { t, setActiveGame, speakText } = useApp();
  const [filter, setFilter] = useState('ALL');

  const games = [
    {
      id: 'story',
      title: 'LLM Cultural Story Recall',
      desc: 'Listen to personalized cultural stories and test gentle episodic recall memory.',
      icon: '📖',
      color: '#047857',
      badge: 'LLM Generated • Episodic Memory',
      category: 'MEMORY',
      stars: 3
    },
    {
      id: 'memory',
      title: t.game1Title || 'NER Memory Palace',
      desc: t.game1Desc || 'Match local items like tea baskets, gamusa & traditional pitha.',
      icon: '🧠',
      color: '#1b4332',
      badge: '5 Levels • Memory Recall',
      category: 'MEMORY',
      stars: 3
    },
    {
      id: 'word',
      title: 'NER Cultural Word Riddle',
      desc: 'Spell authentic regional words (Gamusa, Jaapi, Pitha, Loktak) with letter tiles.',
      icon: '🔤',
      color: '#2d6a4f',
      badge: '4 Levels • Cultural Recall',
      category: 'CULTURE',
      stars: 3
    },
    {
      id: 'garden',
      title: 'Bohag Floral Garden Tap',
      desc: 'Spot blooming Kopou orchids, golden tea leaves & lotus blossoms with quick focus.',
      icon: '🌸',
      color: '#e11d48',
      badge: '3 Stages • Visual Attention',
      category: 'ATTENTION',
      stars: 3
    },
    {
      id: 'bazaar',
      title: 'NER Haat / Bazaar Counter',
      desc: 'Practice daily shopping by counting currency coins for Assam chai and crafts.',
      icon: '🪙',
      color: '#0284c7',
      badge: 'Interactive Math & Recall',
      category: 'DAILY',
      stars: 3
    },
    {
      id: 'pattern',
      title: t.game2Title || 'Assam Wildlife Pattern Matcher',
      desc: t.game2Desc || 'Spot Kaziranga rhino, sangai deer & hornbill patterns.',
      icon: '🌿',
      color: '#0077b6',
      badge: 'Progressive Sequence',
      category: 'ATTENTION',
      stars: 2
    },
    {
      id: 'routine',
      title: t.game3Title || 'Daily Routine Sequencer',
      desc: t.game3Desc || 'Arrange morning prayers, meds, tea time & festive Bihu prep.',
      icon: '📅',
      color: '#f4a261',
      badge: '3 Routine Levels',
      category: 'DAILY',
      stars: 3
    },
    {
      id: 'sound',
      title: t.game4Title || 'Regional Sounds Sensory Quiz',
      desc: t.game4Desc || 'Listen to Dhol, rain on tin roof, flute, conch shell & temple bells.',
      icon: '🎵',
      color: '#e76f51',
      badge: '6 Audio Instruments',
      category: 'CULTURE',
      stars: 2
    }
  ];

  const filteredGames = games.filter(g => {
    if (filter === 'ALL') return true;
    return g.category === filter;
  });

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
            {t.gamesTitle || "Today's Cognitive Exercises"}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            {t.gamesSubtitle || "AI-adapted to your comfort, memory speed and cultural familiarity"}
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'All 8 Games' },
            { id: 'MEMORY', label: '🧠 Memory' },
            { id: 'CULTURE', label: '🌸 Culture & Music' },
            { id: 'ATTENTION', label: '⚡ Focus & Reflex' },
            { id: 'DAILY', label: '🪙 Daily Living' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                border: filter === tab.id ? '2px solid var(--primary-emerald)' : '1px solid var(--card-border)',
                background: filter === tab.id ? 'linear-gradient(135deg, #1b4332, #2d6a4f)' : 'white',
                color: filter === tab.id ? 'white' : 'var(--text-dark)',
                boxShadow: filter === tab.id ? '0 4px 10px rgba(27,67,50,0.15)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {filteredGames.map((g) => (
          <div
            key={g.id}
            className="game-card"
            onClick={() => {
              setActiveGame(g.id);
              speakText(g.title);
            }}
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div className="game-card-icon" style={{ fontSize: '32px' }}>{g.icon}</div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: 'rgba(27, 67, 50, 0.08)',
                  color: 'var(--primary-emerald)'
                }}>
                  {g.badge}
                </span>
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-dark)' }}>
                {g.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {g.desc}
              </p>
            </div>

            <div style={{
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: '800',
              color: 'var(--primary-emerald)',
              fontSize: '14px'
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

