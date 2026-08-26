import React from 'react';
import { useApp } from '../../context/AppContext';
import { GameSelector } from './GameSelector';
import { DailyRemindersCard } from './DailyRemindersCard';
import { ReminiscenceWall } from './ReminiscenceWall';
import { MemoryPalaceGame } from '../games/MemoryPalaceGame';
import { PatternMatcherGame } from '../games/PatternMatcherGame';
import { RoutineSequencerGame } from '../games/RoutineSequencerGame';
import { SoundQuizGame } from '../games/SoundQuizGame';
import { VoiceAssistant } from '../common/VoiceAssistant';
import { Cpu, Award, Heart, Sparkles, Sun } from 'lucide-react';

export const PatientDashboard = () => {
  const {
    t,
    activeGame,
    setActiveGame,
    cognitiveScore,
    aiDifficultyStage,
    speakText,
    patientInfo
  } = useApp();

  // If a game is active, render the specific game view
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

  return (
    <div className="fade-in" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(27, 67, 50, 0.95), rgba(45, 106, 79, 0.9))',
        color: 'white',
        padding: '32px',
        borderRadius: '24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e9c46a', marginBottom: '8px' }}>
            <Sun size={24} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Dispur, Guwahati • 24°C Pleasant</span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '6px' }}>
            {t.welcomeTitle}
          </h1>
          <p style={{ fontSize: '17px', opacity: 0.9 }}>
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* Cognitive Health & AI Meter Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '20px',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
              {t.cognitiveHealthScore}
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#e9c46a' }}>
              {cognitiveScore} <span style={{ fontSize: '16px' }}>/ 100</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.3)' }} />

          <div>
            <div style={{ fontSize: '12px', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Cpu size={14} />
              <span>{t.aiDifficulty}</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>
              Stage {aiDifficultyStage} ({aiDifficultyStage === 1 ? 'Mild' : aiDifficultyStage === 2 ? 'Moderate' : 'Advanced'})
            </div>
          </div>
        </div>
      </div>

      {/* 1. Cognitive Games Launcher */}
      <GameSelector />

      {/* 2. Daily Hydration & Medication Reminders */}
      <DailyRemindersCard />

      {/* 3. Family Reminiscence Wall */}
      <ReminiscenceWall />

      {/* Floating Voice Assistant Avatar */}
      <VoiceAssistant promptText={`${t.welcomeTitle} ${t.welcomeSubtitle}`} />
    </div>
  );
};
