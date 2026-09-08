import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { FLORAL_GARDEN_ITEMS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Award, Star, Heart, Play, Clock } from 'lucide-react';

export const FloralGardenTapGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, awardStars } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1); // 1 = 6 items, 2 = 9 items, 3 = 12 items
  const [targetItem, setTargetItem] = useState(FLORAL_GARDEN_ITEMS[0]);
  const [gardenGrid, setGardenGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const TARGET_ROUNDS = 5;

  const startRound = (currentLevel = level) => {
    // Pick random target
    const target = FLORAL_GARDEN_ITEMS[Math.floor(Math.random() * FLORAL_GARDEN_ITEMS.length)];
    setTargetItem(target);

    const gridSize = currentLevel === 1 ? 6 : currentLevel === 2 ? 8 : 10;
    const targetCount = currentLevel === 1 ? 2 : 3;

    // Create array with targets + random others
    const items = [];
    for (let i = 0; i < targetCount; i++) {
      items.push({ ...target, uniqueId: `${target.id}_${i}_${Date.now()}`, isTarget: true, tapped: false });
    }

    const otherItems = FLORAL_GARDEN_ITEMS.filter(f => f.id !== target.id);
    while (items.length < gridSize) {
      const randomOther = otherItems[Math.floor(Math.random() * otherItems.length)];
      items.push({ ...randomOther, uniqueId: `${randomOther.id}_${items.length}_${Date.now()}`, isTarget: false, tapped: false });
    }

    setGardenGrid(items.sort(() => Math.random() - 0.5));
    setIsPlaying(true);
    setFeedbackMsg(`Find and tap all ${target.name} ${target.icon}!`);
    speakText(`Tap all ${target.name}`);
  };

  const handleItemTap = (item, index) => {
    if (item.tapped || !isPlaying) return;

    if (item.isTarget) {
      speechService.playPopSound(700 + streak * 50);
      const nextGrid = gardenGrid.map((g, idx) => idx === index ? { ...g, tapped: true } : g);
      setGardenGrid(nextGrid);

      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const pointsEarned = item.points * (1 + Math.floor(nextStreak / 3));
      setScore(s => s + pointsEarned);

      // Check if all targets are tapped
      const remainingTargets = nextGrid.filter(g => g.isTarget && !g.tapped);
      if (remainingTargets.length === 0) {
        speechService.playSuccessChime();
        const nextRounds = roundsCompleted + 1;
        setRoundsCompleted(nextRounds);
        awardStars(2);
        setCognitiveScore(prev => Math.min(100, prev + 2));

        if (nextRounds >= TARGET_ROUNDS) {
          setIsVictory(true);
          setIsPlaying(false);
          try { confetti({ particleCount: 90, spread: 70 }); } catch (e) {}
          speakText("Wonderful garden focus! All floral rounds completed!");
        } else {
          setFeedbackMsg("🌸 Great Job! Next garden blooming...");
          setTimeout(() => {
            startRound(level);
          }, 1200);
        }
      }
    } else {
      // Tapped wrong flower
      speechService.playPopSound(300);
      setStreak(0);
      setFeedbackMsg(`Oops! That's a ${item.name}. Look for ${targetItem.name}!`);
      speakText(`Look for ${targetItem.name}`);
    }
  };

  const restartGame = () => {
    setScore(0);
    setStreak(0);
    setRoundsCompleted(0);
    setIsVictory(false);
    startRound(level);
  };

  return (
    <GameContainer
      title="Bohag Floral & Tea Garden Tap"
      subtitle="Spot blooming Kopou orchids, golden tea leaves & lotus flowers"
      onBack={onBack}
      level={level}
    >
      {/* Level Selectors */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        {[
          { lvl: 1, label: 'Stage 1: Calm Garden (6 Items)' },
          { lvl: 2, label: 'Stage 2: Blooming Valley (8 Items)' },
          { lvl: 3, label: 'Stage 3: Festive Meadow (10 Items)' },
        ].map(item => (
          <button
            key={item.lvl}
            onClick={() => {
              setLevel(item.lvl);
              setRoundsCompleted(0);
              setScore(0);
              startRound(item.lvl);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              border: level === item.lvl ? '2px solid var(--primary-emerald)' : '1px solid var(--card-border)',
              background: level === item.lvl ? 'linear-gradient(135deg, #1b4332, #2d6a4f)' : 'white',
              color: level === item.lvl ? 'white' : 'var(--text-dark)',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {!isVictory ? (
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Status */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(27, 67, 50, 0.08)',
            padding: '10px 20px',
            borderRadius: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-emerald)' }}>
              Wave {roundsCompleted + 1} / {TARGET_ROUNDS}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#f59e0b' }}>
              <Star size={20} fill="#f59e0b" />
              <span>Score: {score}</span>
            </div>
            {streak > 1 && (
              <span style={{ background: '#ec4899', color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '800' }}>
                ✨ {streak}x Combo
              </span>
            )}
          </div>

          {/* Goal Banner */}
          {!isPlaying ? (
            <div className="glass-card" style={{ padding: '36px', textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>🌸🍃</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '8px' }}>
                Ready to explore the North East Garden?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                Listen to the voice prompt and tap the matching orchids, tea leaves, and blossoms.
              </p>
              <button className="btn-primary" onClick={() => startRound(level)} style={{ margin: '0 auto' }}>
                <Play size={20} />
                <span>Start Garden Exercise</span>
              </button>
            </div>
          ) : (
            <div>
              {/* Active Target Banner */}
              <div style={{
                background: 'linear-gradient(135deg, #1b4332, #0077b6)',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                <span style={{ fontSize: '36px' }}>{targetItem.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>
                    Target Item to Tap
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800' }}>
                    {targetItem.name}
                  </div>
                </div>
              </div>

              {/* Garden Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${level === 1 ? 3 : level === 2 ? 4 : 5}, 1fr)`,
                gap: '14px',
                marginBottom: '20px'
              }}>
                {gardenGrid.map((item, idx) => (
                  <button
                    key={item.uniqueId}
                    onClick={() => handleItemTap(item, idx)}
                    disabled={item.tapped}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '20px',
                      border: item.tapped
                        ? '2px solid #a7c957'
                        : '2px solid var(--card-border)',
                      background: item.tapped
                        ? 'rgba(56, 176, 0, 0.15)'
                        : 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: item.tapped ? 'default' : 'pointer',
                      transform: item.tapped ? 'scale(0.85)' : 'scale(1)',
                      opacity: item.tapped ? 0.4 : 1,
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                    }}
                  >
                    <span style={{ fontSize: '40px', marginBottom: '4px' }}>{item.icon}</span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-dark)' }}>
                      {item.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-emerald)' }}>
                {feedbackMsg}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌸🏆</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '10px' }}>
            Garden Bloom Champion!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
            You demonstrated sharp visual attention and collected all garden blossoms with <strong>{score} points</strong>!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={restartGame}>
              <RotateCcw size={18} />
              <span>Play Another Round</span>
            </button>
            <button className="btn-primary" onClick={onBack}>
              Return to Hub
            </button>
          </div>
        </div>
      )}
    </GameContainer>
  );
};
