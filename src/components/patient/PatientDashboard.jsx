import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameSelector } from './GameSelector';
import { DailyRemindersCard } from './DailyRemindersCard';
import { ReminiscenceWall } from './ReminiscenceWall';
import { BazaarRewardsModal } from './BazaarRewardsModal';
import { ReminiscenceChatModal } from './ReminiscenceChatModal';
import { WebcamVisionOverlay } from '../vision/WebcamVisionOverlay';
import { A2ALiveCoPilot } from '../a2a/A2ALiveCoPilot';
import { StoryRecallGame } from '../games/StoryRecallGame';
import { MemoryPalaceGame } from '../games/MemoryPalaceGame';
import { PatternMatcherGame } from '../games/PatternMatcherGame';
import { RoutineSequencerGame } from '../games/RoutineSequencerGame';
import { SoundQuizGame } from '../games/SoundQuizGame';
import { CulturalWordRiddleGame } from '../games/CulturalWordRiddleGame';
import { FloralGardenTapGame } from '../games/FloralGardenTapGame';
import { BazaarCoinCounterGame } from '../games/BazaarCoinCounterGame';
import { VoiceAssistant } from '../common/VoiceAssistant';
import { Cpu, Award, Heart, Sparkles, Sun, Star, Flame, Trophy, Coins, ShoppingBag, MessageSquareHeart } from 'lucide-react';

export const PatientDashboard = () => {
  const {
    t,
    activeGame,
    setActiveGame,
    cognitiveScore,
    aiDifficultyStage,
    dailyStars,
    dailyStreak,
    smritiCoins,
    badges,
    speakText,
    patientInfo
  } = useApp();

  const [showBazaarModal, setShowBazaarModal] = useState(false);
  const [showReminiscenceChat, setShowReminiscenceChat] = useState(false);

  // If a game is active, render the specific game view
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
    <div className="fade-in" style={{ maxWidth: '1240px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(27, 67, 50, 0.95), rgba(45, 106, 79, 0.9))',
        color: 'white',
        padding: '32px',
        borderRadius: '28px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 12px 30px rgba(27,67,50,0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e9c46a', marginBottom: '8px' }}>
            <Sun size={24} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Dispur, Guwahati • 24°C Pleasant & Sunny</span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '6px' }}>
            {t.welcomeTitle || "Good Morning, Kaka!"}
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>
            {t.welcomeSubtitle || "Let's keep your mind active, sharp, and joyful today with fun activities."}
          </p>
        </div>

        {/* Cognitive Health, Coins & Companion Meter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '20px',
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap'
        }}>
          {/* Cognitive Score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
              {t.cognitiveHealthScore || "Cognitive Health"}
            </div>
            <div style={{ fontSize: '30px', fontWeight: '800', color: '#e9c46a' }}>
              {cognitiveScore} <span style={{ fontSize: '14px' }}>/ 100</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.3)' }} />

          {/* Smriti Sathi LLM Companion Button */}
          <button
            onClick={() => {
              setShowReminiscenceChat(true);
              speakText("Opening Smriti Sathi AI Reminiscence Companion");
            }}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '16px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '800',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            title="Talk with AI Memory Companion"
          >
            <MessageSquareHeart size={18} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', opacity: 0.9 }}>AI Companion</div>
              <div style={{ fontSize: '14px', fontWeight: '800' }}>Smriti Sathi 🌸</div>
            </div>
          </button>

          <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.3)' }} />

          {/* Smriti Coins & Bazaar Rewards */}
          <button
            onClick={() => {
              setShowBazaarModal(true);
              speakText("Opening NER Cultural Bazaar Rewards Store");
            }}
            style={{
              background: 'linear-gradient(135deg, #e9c46a, #f4a261)',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '16px',
              color: '#1e293b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '800',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}
            title="Open Rewards Bazaar"
          >
            <Coins size={18} color="#78350f" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#78350f' }}>Smriti Wallet</div>
              <div style={{ fontSize: '15px', fontWeight: '900', color: '#451a03' }}>{smritiCoins} Coins</div>
            </div>
          </button>

          <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.3)' }} />

          {/* Stars & Streak */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '800', color: '#fef08a' }}>
              <Star size={14} fill="#fef08a" />
              <span>{dailyStars} Stars</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '700', color: '#ffedd5' }}>
              <Flame size={14} color="#fb923c" fill="#fb923c" />
              <span>{dailyStreak}-Day Streak!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Google A2A Active Multi-Agent Co-Pilot Widget */}
      <A2ALiveCoPilot />

      {/* 1. Cognitive Games Launcher (Includes LLM Story Recall Game) */}
      <GameSelector />

      {/* 2. Daily Hydration & Custom Medication Reminders */}
      <DailyRemindersCard />

      {/* 3. Family Reminiscence Wall */}
      <ReminiscenceWall />

      {/* 4. Trophies & Badges Showcase */}
      <div style={{ marginTop: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={24} style={{ color: '#f59e0b' }} />
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
              Your Achievement Trophies & Badges
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowReminiscenceChat(true)}
              style={{
                background: '#e0f2fe',
                border: '1px solid #bae6fd',
                color: '#0369a1',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <MessageSquareHeart size={16} />
              <span>Talk with Smriti Sathi</span>
            </button>

            <button
              onClick={() => setShowBazaarModal(true)}
              style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                color: '#92400e',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={16} />
              <span>Open Cultural Bazaar</span>
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {badges.map((b) => (
            <div
              key={b.id}
              className="glass-card"
              style={{
                padding: '16px',
                textAlign: 'center',
                background: b.unlocked ? 'white' : 'rgba(241, 245, 249, 0.6)',
                border: b.unlocked ? `2px solid ${b.color}` : '1px dashed #cbd5e1',
                opacity: b.unlocked ? 1 : 0.65,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '6px', filter: b.unlocked ? 'none' : 'grayscale(100%)' }}>
                {b.icon}
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
                {b.title}
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {b.desc}
              </p>
              <div style={{
                marginTop: '8px',
                fontSize: '10px',
                fontWeight: '800',
                textTransform: 'uppercase',
                color: b.unlocked ? b.color : '#94a3b8'
              }}>
                {b.unlocked ? 'Unlocked ⭐' : 'In Progress'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Voice Assistant Avatar */}
      <VoiceAssistant promptText={`${t.welcomeTitle || "Good Morning"} ${t.welcomeSubtitle || ""}`} />

      {/* Real-time Computer Vision Emotion & Gaze Tracking Overlay */}
      <WebcamVisionOverlay />

      {/* Bazaar Rewards Modal */}
      {showBazaarModal && (
        <BazaarRewardsModal onClose={() => setShowBazaarModal(false)} />
      )}

      {/* Conversational Memory Companion Modal */}
      {showReminiscenceChat && (
        <ReminiscenceChatModal onClose={() => setShowReminiscenceChat(false)} />
      )}
    </div>
  );
};
