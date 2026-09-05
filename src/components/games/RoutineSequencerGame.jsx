import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { ROUTINE_LEVELS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, ArrowRight, Star, Award, Sparkles } from 'lucide-react';

export const RoutineSequencerGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, awardStars } = useApp();
  const [levelIdx, setLevelIdx] = useState(0); // 0 = Morning, 1 = Afternoon, 2 = Festive Bihu
  const [currentLevelData, setCurrentLevelData] = useState(ROUTINE_LEVELS[0]);
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const initRoutine = (idx = levelIdx) => {
    const data = ROUTINE_LEVELS[idx];
    setCurrentLevelData(data);
    setSelectedOrder([]);
    setShuffledSteps([...data.steps].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
    speakText(`Routine Sequencer: ${data.title}`);
  };

  useEffect(() => {
    initRoutine(levelIdx);
  }, [levelIdx]);

  const handleStepSelect = (step) => {
    if (selectedOrder.some(s => s.id === step.id)) return;

    speechService.playPopSound(600 + selectedOrder.length * 80);
    speakText(step.title);
    const nextOrder = [...selectedOrder, step];
    setSelectedOrder(nextOrder);

    // Check completeness
    if (nextOrder.length === currentLevelData.steps.length) {
      const isCorrect = nextOrder.every((item, idx) => item.id === currentLevelData.steps[idx].id);
      if (isCorrect) {
        setIsCompleted(true);
        speechService.playSuccessChime();
        try { confetti({ particleCount: 90, spread: 70 }); } catch (e) {}
        speakText(`Superb! Correct sequence for ${currentLevelData.title}!`);
        awardStars(4);
        setCognitiveScore(prev => Math.min(100, prev + 3));
      } else {
        speechService.playPopSound(300);
        speakText("Almost right! Let's reset the sequence and try again.");
        setTimeout(() => setSelectedOrder([]), 1500);
      }
    }
  };

  const resetGame = () => {
    initRoutine(levelIdx);
  };

  return (
    <GameContainer
      title={t.game3Title}
      subtitle={t.game3Desc}
      onBack={onBack}
      level={levelIdx + 1}
    >
      {/* Level Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {ROUTINE_LEVELS.map((lvl, idx) => (
          <button
            key={lvl.id}
            onClick={() => setLevelIdx(idx)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              border: levelIdx === idx ? '2px solid var(--primary-emerald)' : '1px solid var(--card-border)',
              background: levelIdx === idx ? 'linear-gradient(135deg, #1b4332, #2d6a4f)' : 'white',
              color: levelIdx === idx ? 'white' : 'var(--text-dark)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{lvl.icon}</span>
            <span>{lvl.title}</span>
          </button>
        ))}
      </div>

      {!isCompleted ? (
        <div>
          <div style={{
            background: 'rgba(27, 67, 50, 0.06)',
            padding: '12px 20px',
            borderRadius: '16px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{ fontWeight: '700', color: 'var(--primary-emerald)', margin: 0 }}>
              Tap the daily activities in chronological order:
            </p>
            <span style={{ fontSize: '12px', fontWeight: '800', background: 'var(--tea-gold)', color: 'black', padding: '4px 10px', borderRadius: '12px' }}>
              {currentLevelData.badge}
            </span>
          </div>

          {/* User selected sequence tray */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minHeight: '68px',
            background: 'white',
            border: '2px dashed var(--card-border)',
            padding: '14px',
            borderRadius: '18px',
            marginBottom: '24px'
          }}>
            {selectedOrder.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>👆 Tap activities below to place them in sequence</span>
              </div>
            ) : (
              selectedOrder.map((step) => (
                <div
                  key={step.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(27,67,50,0.08), rgba(45,106,79,0.12))',
                    border: '2px solid var(--primary-emerald)',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    fontWeight: '700',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--primary-emerald)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                  }}
                >
                  <span>{step.icon}</span>
                  <span>{step.title}</span>
                </div>
              ))
            )}
          </div>

          {/* Shuffled choices */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {shuffledSteps.map((step) => {
              const isSelected = selectedOrder.some(s => s.id === step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(step)}
                  disabled={isSelected}
                  style={{
                    background: isSelected ? '#f1f5f9' : 'white',
                    opacity: isSelected ? 0.45 : 1,
                    border: isSelected ? '2px solid #cbd5e1' : '2px solid var(--card-border)',
                    borderRadius: '18px',
                    padding: '18px',
                    cursor: isSelected ? 'default' : 'pointer',
                    textAlign: 'left',
                    boxShadow: isSelected ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
                    transform: isSelected ? 'scale(0.96)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{step.icon}</div>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--text-dark)' }}>{step.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{step.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fade-in" style={{ padding: '32px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>{currentLevelData.icon}⭐</div>
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#2b9348', marginBottom: '8px' }}>
            {currentLevelData.title} Mastered!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
            Great job! Daily routine recall strengthens neural pathways and executive functioning.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={resetGame}>
              <RotateCcw size={18} />
              <span>Practice Again</span>
            </button>
            {levelIdx < ROUTINE_LEVELS.length - 1 && (
              <button
                className="btn-primary"
                onClick={() => setLevelIdx(idx => idx + 1)}
                style={{ background: '#e9c46a', color: 'black', border: 'none' }}
              >
                <ArrowRight size={18} />
                <span>Next Routine: {ROUTINE_LEVELS[levelIdx + 1].title}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </GameContainer>
  );
};

