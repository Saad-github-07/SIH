import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

const ROUTINE_STEPS = [
  { id: 1, title: '1. Morning Prayer / Naam', icon: '📿', desc: 'Tulsi beads & morning remembrance' },
  { id: 2, title: '2. Glass of Water', icon: '🥛', desc: 'Hydrate right after waking up' },
  { id: 3, title: '3. Morning Medicine', icon: '💊', desc: 'Pill taken with breakfast' },
  { id: 4, title: '4. Light Garden Walk', icon: '🏞️', desc: '15 minute walk in fresh tea air' },
  { id: 5, title: '5. Evening Tea & Pitha', icon: '☕', desc: 'Rest with family members' },
];

export const RoutineSequencerGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore } = useApp();
  const [shuffledSteps, setShuffledSteps] = useState(() =>
    [...ROUTINE_STEPS].sort(() => Math.random() - 0.5)
  );
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStepSelect = (step) => {
    if (selectedOrder.some(s => s.id === step.id)) return;

    speakText(step.title);
    const nextOrder = [...selectedOrder, step];
    setSelectedOrder(nextOrder);

    // Check completeness
    if (nextOrder.length === ROUTINE_STEPS.length) {
      const isCorrect = nextOrder.every((item, idx) => item.id === ROUTINE_STEPS[idx].id);
      if (isCorrect) {
        setIsCompleted(true);
        try { confetti({ particleCount: 80 }); } catch (e) {}
        speakText("Perfect daily routine sequence!");
        setCognitiveScore(prev => Math.min(100, prev + 3));
      } else {
        speakText("Almost right! Let's reset the sequence and try again.");
        setTimeout(() => setSelectedOrder([]), 1500);
      }
    }
  };

  const resetGame = () => {
    setSelectedOrder([]);
    setShuffledSteps([...ROUTINE_STEPS].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
  };

  return (
    <GameContainer
      title={t.game3Title}
      subtitle={t.game3Desc}
      onBack={onBack}
      level={1}
    >
      {!isCompleted ? (
        <div>
          <p style={{ fontWeight: '600', color: 'var(--primary-emerald)', marginBottom: '16px' }}>
            Tap the activities in correct order from Morning to Evening:
          </p>

          {/* User selected sequence tray */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minHeight: '64px',
            background: 'rgba(27, 67, 50, 0.05)',
            padding: '12px',
            borderRadius: '16px',
            marginBottom: '24px'
          }}>
            {selectedOrder.map((step, idx) => (
              <div
                key={step.id}
                style={{
                  background: 'white',
                  border: '2px solid var(--primary-accent)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontWeight: '700',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{step.icon}</span>
                <span>{step.title}</span>
              </div>
            ))}
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
                    background: isSelected ? '#e2e8f0' : 'white',
                    opacity: isSelected ? 0.5 : 1,
                    border: '2px solid var(--card-border)',
                    borderRadius: '16px',
                    padding: '18px',
                    cursor: isSelected ? 'default' : 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{step.icon}</div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>{step.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{step.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fade-in" style={{ padding: '24px 0' }}>
          <div style={{ fontSize: '64px' }}>🌅</div>
          <h3 style={{ fontSize: '24px', color: '#2b9348', marginTop: '12px' }}>
            Daily Routine Mastered!
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Great job! Routine recall aids executive brain functioning.
          </p>
          <button className="btn-primary" onClick={resetGame}>
            <RotateCcw size={20} />
            Practice Again
          </button>
        </div>
      )}
    </GameContainer>
  );
};
