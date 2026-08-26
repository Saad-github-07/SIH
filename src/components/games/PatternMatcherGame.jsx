import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { NER_FAUNA_PATTERNS } from '../../data/nerThemes';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Award } from 'lucide-react';

export const PatternMatcherGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore } = useApp();
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const startNewPattern = () => {
    setIsCompleted(false);
    setUserSequence([]);
    setScore(0);
    generateNextStep([]);
  };

  const generateNextStep = (currentSeq) => {
    const nextItem = NER_FAUNA_PATTERNS[Math.floor(Math.random() * NER_FAUNA_PATTERNS.length)];
    const newSeq = [...currentSeq, nextItem];
    setSequence(newSeq);
    playSequence(newSeq);
  };

  const playSequence = async (seq) => {
    setIsPlaying(true);
    setUserSequence([]);
    speakText("Watch the pattern carefully!");

    for (let i = 0; i < seq.length; i++) {
      await new Promise(res => setTimeout(res, 600));
      setActiveHighlight(seq[i].id);
      speakText(seq[i].name);
      await new Promise(res => setTimeout(res, 800));
      setActiveHighlight(null);
    }

    setIsPlaying(false);
  };

  const handleTileClick = (item) => {
    if (isPlaying || isCompleted) return;

    speakText(item.name);
    const nextUserSeq = [...userSequence, item];
    setUserSequence(nextUserSeq);

    const stepIdx = nextUserSeq.length - 1;
    if (nextUserSeq[stepIdx].id !== sequence[stepIdx].id) {
      speakText("Oh! Wrong tile. Let's try again!");
      setTimeout(() => startNewPattern(), 1000);
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      const nextScore = score + 1;
      setScore(nextScore);
      setCognitiveScore(prev => Math.min(100, prev + 2));

      if (nextScore >= 3) {
        setIsCompleted(true);
        try { confetti({ particleCount: 80, spread: 60 }); } catch (e) {}
        speakText("Fantastic pattern recognition!");
      } else {
        setTimeout(() => generateNextStep(sequence), 1000);
      }
    }
  };

  return (
    <GameContainer
      title={t.game2Title}
      subtitle={t.game2Desc}
      onBack={onBack}
      level={score + 1}
    >
      {!isCompleted ? (
        <div>
          <div style={{ marginBottom: '24px', fontSize: '18px', fontWeight: '700', color: 'var(--primary-emerald)' }}>
            {sequence.length === 0 ? "Click Start to Watch Pattern" : `Sequence Length: ${sequence.length} / 3`}
          </div>

          {sequence.length === 0 ? (
            <button className="btn-primary" onClick={startNewPattern}>
              <Play size={20} />
              Start Pattern Round
            </button>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {NER_FAUNA_PATTERNS.map((item) => {
                const isActive = activeHighlight === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTileClick(item)}
                    disabled={isPlaying}
                    style={{
                      background: isActive ? 'var(--tea-gold)' : 'white',
                      border: isActive ? '4px solid var(--primary-emerald)' : '2px solid var(--card-border)',
                      borderRadius: '16px',
                      padding: '20px 12px',
                      cursor: isPlaying ? 'not-allowed' : 'pointer',
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.15)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '36px' }}>{item.icon}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', marginTop: '6px', color: 'var(--text-dark)' }}>
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="fade-in" style={{ padding: '24px 0' }}>
          <div style={{ fontSize: '64px' }}>🦌</div>
          <h3 style={{ fontSize: '24px', color: '#2b9348', marginTop: '12px' }}>
            Pattern Sequence Mastered!
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Your visual attention and spatial memory score upgraded!
          </p>
          <button className="btn-primary" onClick={startNewPattern}>
            <RotateCcw size={20} />
            Try Next Round
          </button>
        </div>
      )}
    </GameContainer>
  );
};
