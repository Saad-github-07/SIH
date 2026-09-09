import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain, Sparkles, Compass, Music, ArrowRight, BookOpen,
  Flower2, ShoppingCart, Star, Coins, Calendar, Volume2, Type, Activity
} from 'lucide-react';

export const GameSelector = () => {
  const { t, setActiveGame, speakText } = useApp();
  const [filter, setFilter] = useState('ALL');

  const games = [
    {
      id: 'story',
      title: 'Cultural Story Recall',
      desc: 'Listen to personalized regional stories and practice gentle episodic memory recall.',
      iconComponent: <BookOpen size={28} color="#0f766e" />,
      color: '#0f766e',
      badge: 'Episodic Memory',
      category: 'MEMORY',
      stars: 3
    },
    {
      id: 'memory',
      title: t.game1Title || 'Arclight Memory Palace',
      desc: t.game1Desc || 'Match local items like tea baskets, gamusa & traditional pitha.',
      iconComponent: <Brain size={28} color="#0d9488" />,
      color: '#0d9488',
      badge: '5 Levels • Recall',
      category: 'MEMORY',
      stars: 3
    },
    {
      id: 'word',
      title: 'Regional Cultural Word Riddle',
      desc: 'Spell authentic regional words (Gamusa, Jaapi, Pitha, Loktak) with letter tiles.',
      iconComponent: <Type size={28} color="#2563eb" />,
      color: '#2563eb',
      badge: '4 Levels • Vocabulary',
      category: 'CULTURE',
      stars: 3
    },
    {
      id: 'garden',
      title: 'Bohag Floral Garden Focus',
      desc: 'Spot blooming Kopou orchids, golden tea leaves & lotus blossoms with quick focus.',
      iconComponent: <Flower2 size={28} color="#e11d48" />,
      color: '#e11d48',
      badge: '3 Stages • Focus',
      category: 'ATTENTION',
      stars: 3
    },
    {
      id: 'bazaar',
      title: 'Arclight Haat / Bazaar Counter',
      desc: 'Practice daily shopping by counting currency coins for Assam chai and crafts.',
      iconComponent: <Coins size={28} color="#d97706" />,
      color: '#d97706',
      badge: 'Math & Math Recall',
      category: 'DAILY',
      stars: 3
    },
    {
      id: 'pattern',
      title: t.game2Title || 'Assam Wildlife Pattern Matcher',
      desc: t.game2Desc || 'Spot Kaziranga rhino, sangai deer & hornbill patterns.',
      iconComponent: <Compass size={28} color="#0284c7" />,
      color: '#0284c7',
      badge: 'Visual Sequence',
      category: 'ATTENTION',
      stars: 2
    },
    {
      id: 'routine',
      title: t.game3Title || 'Daily Routine Sequencer',
      desc: t.game3Desc || 'Arrange morning prayers, meds, tea time & festive Bihu prep.',
      iconComponent: <Calendar size={28} color="#ea580c" />,
      color: '#ea580c',
      badge: '3 Routine Levels',
      category: 'DAILY',
      stars: 3
    },
    {
      id: 'sound',
      title: t.game4Title || 'Regional Sounds Sensory Quiz',
      desc: t.game4Desc || 'Listen to Dhol, rain on tin roof, flute, conch shell & temple bells.',
      iconComponent: <Volume2 size={28} color="#9333ea" />,
      color: '#9333ea',
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
    <div style={{ marginTop: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--primary-emerald)', letterSpacing: '-0.5px' }}>
            {t.gamesTitle || "Today's Cognitive Exercises"}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', fontWeight: '600', marginTop: '2px' }}>
            {t.gamesSubtitle || "Adapted to your comfort, memory speed and cultural familiarity"}
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'All 8 Exercises' },
            { id: 'MEMORY', label: 'Memory & Recall' },
            { id: 'CULTURE', label: 'Culture & Heritage' },
            { id: 'ATTENTION', label: 'Focus & Reflex' },
            { id: 'DAILY', label: 'Daily Living' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                border: filter === tab.id ? '1px solid #0f291e' : '1px solid #cbd5e1',
                background: filter === tab.id ? '#0f291e' : '#ffffff',
                color: filter === tab.id ? '#ffffff' : 'var(--text-dark)',
                boxShadow: filter === tab.id ? '0 2px 8px rgba(15, 41, 30, 0.15)' : 'none',
                minHeight: '42px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
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
              padding: '26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="game-card-icon" style={{ background: `${g.color}10`, borderColor: `${g.color}30` }}>
                  {g.iconComponent}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  background: '#f1f5f9',
                  color: 'var(--text-dark)',
                  border: '1px solid #e2e8f0'
                }}>
                  {g.badge}
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px', color: 'var(--text-dark)', lineHeight: '1.3' }}>
                {g.title}
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {g.desc}
              </p>
            </div>

            <div style={{
              marginTop: '20px',
              paddingTop: '14px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: '800',
              color: 'var(--primary-emerald)',
              fontSize: '16px'
            }}>
              <span>START EXERCISE</span>
              <ArrowRight size={20} color="#0d9488" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
