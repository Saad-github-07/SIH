import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameSelector } from '../patient/GameSelector';
import { StoryRecallGame } from './StoryRecallGame';
import { MemoryPalaceGame } from './MemoryPalaceGame';
import { PatternMatcherGame } from './PatternMatcherGame';
import { RoutineSequencerGame } from './RoutineSequencerGame';
import { SoundQuizGame } from './SoundQuizGame';
import { CulturalWordRiddleGame } from './CulturalWordRiddleGame';
import { FloralGardenTapGame } from './FloralGardenTapGame';
import { BazaarCoinCounterGame } from './BazaarCoinCounterGame';
import { Gamepad2, Trophy, Star, Sparkles } from 'lucide-react';

export const GamesView = () => {
  const { activeGame, setActiveGame, dailyStars, smritiCoins, t } = useApp();

  // If a game is currently active, render the specific game component
  if (activeGame === 'story') {
    return <StoryRecallGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'memory') {
    return <MemoryPalaceGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'pattern') {
    return <PatternMatcherGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'routine') {
    return <RoutineSequencerGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'sound') {
    return <SoundQuizGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'word') {
    return <CulturalWordRiddleGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'garden') {
    return <FloralGardenTapGame onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'bazaar') {
    return <BazaarCoinCounterGame onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="fade-in" style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top Games Hub Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #0f291e 0%, #1b4332 100%)',
        color: 'white',
        padding: '30px 32px',
        borderRadius: '24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 10px 25px rgba(15, 41, 30, 0.2)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#14b8a6', marginBottom: '8px' }}>
            <Gamepad2 size={28} />
            <span style={{ fontWeight: '800', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Cognitive Exercise Center
            </span>
          </div>

          <h1 style={{ fontSize: '34px', fontWeight: '900', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            Regional Cognitive Games & Memory Exercises
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.92, maxWidth: '750px', lineHeight: '1.6' }}>
            Engage your mind with 8 fun, culturally familiar exercises tailored for recall, attention, pattern recognition, and sensory stimulation.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '24px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
              Total Stars
            </div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#fef08a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={22} fill="#fef08a" />
              <span>{dailyStars}</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.3)' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
              Coins Earned
            </div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#e9c46a' }}>
              🪙 {smritiCoins}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Selector Grid & Category Filters */}
      <GameSelector />
    </div>
  );
};
