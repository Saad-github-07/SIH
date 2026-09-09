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
      {/* Top Executive Patient Banner */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#14b8a6', marginBottom: '6px' }}>
            <Sun size={20} />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Dispur, Guwahati • 24°C Pleasant & Sunny</span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '4px', letterSpacing: '-0.5px' }}>
            {t.welcomeTitle || "Good Morning, Kaka!"}
          </h1>
          <p style={{ fontSize: '17px', opacity: 0.9 }}>
            {t.welcomeSubtitle || "Let's keep your mind active, sharp, and joyful today with fun activities."}
          </p>
        </div>

        {/* Cognitive Health, Coins & Companion Meter */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          {/* Cognitive Score */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
              {t.cognitiveHealthScore || "Cognitive Health"}
            </div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#14b8a6' }}>
              {cognitiveScore} <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>/ 100</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Arclight Sathi Companion Button */}
          <button
            onClick={() => {
              setShowReminiscenceChat(true);
              speakText("Opening Arclight Sathi Reminiscence Companion");
            }}
            style={{
              background: '#0d9488',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '14px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '700',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            title="Talk with Memory Companion"
          >
            <MessageSquareHeart size={20} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.85, letterSpacing: '0.5px' }}>Memory Companion</div>
              <div style={{ fontSize: '15px', fontWeight: '800' }}>Arclight Sathi</div>
            </div>
          </button>

          <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Arclight Coins & Bazaar Rewards */}
          <button
            onClick={() => {
              setShowBazaarModal(true);
              speakText("Opening Arclight Cultural Bazaar Rewards Store");
            }}
            style={{
              background: '#d97706',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '14px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '700',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            title="Open Rewards Bazaar"
          >
            <Coins size={20} color="#ffffff" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.85, letterSpacing: '0.5px' }}>Arclight Wallet</div>
              <div style={{ fontSize: '15px', fontWeight: '800' }}>{smritiCoins} Coins</div>
            </div>
          </button>

          <div style={{ width: '1px', height: '36px', background: 'rgba(255, 255, 255, 0.2)' }} />

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

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowReminiscenceChat(true)}
              style={{
                background: '#e0f2fe',
                border: '2px solid #bae6fd',
                color: '#0369a1',
                padding: '10px 18px',
                borderRadius: '14px',
                fontWeight: '800',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <MessageSquareHeart size={18} />
              <span>Talk with Arclight Sathi</span>
            </button>

            <button
              onClick={() => setShowBazaarModal(true)}
              style={{
                background: '#fef3c7',
                border: '2px solid #fde68a',
                color: '#92400e',
                padding: '10px 18px',
                borderRadius: '14px',
                fontWeight: '800',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={18} />
              <span>Open Arclight Bazaar</span>
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
