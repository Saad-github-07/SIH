import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { NER_FAUNA_PATTERNS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Award, Star, ArrowRight } from 'lucide-react';

export const PatternMatcherGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, awardStars } = useApp();
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [targetLevel, setTargetLevel] = useState(3); // Sequence target length (3 to 5)

  const startNewPattern = (targetLen = targetLevel) => {
    setIsCompleted(false);
    setUserSequence([]);
    setScore(0);
    generateNextStep([], targetLen);
  };

  const generateNextStep = (currentSeq, targetLen = targetLevel) => {
    const nextItem = NER_FAUNA_PATTERNS[Math.floor(Math.random() * NER_FAUNA_PATTERNS.length)];
    const newSeq = [...currentSeq, nextItem];
    setSequence(newSeq);
    playSequence(newSeq);
  };

  const playSequence = async (seq) => {
    setIsPlaying(true);
    setUserSequence([]);
    speakText("Watch and listen to the wildlife sequence!");

    for (let i = 0; i < seq.length; i++) {
      await new Promise(res => setTimeout(res, 500));
      setActiveHighlight(seq[i].id);
      speechService.playPopSound(500 + i * 100);
      speakText(seq[i].name);
      await new Promise(res => setTimeout(res, 750));
      setActiveHighlight(null);
    }

    setIsPlaying(false);
  };

  const handleTileClick = (item) => {
    if (isPlaying || isCompleted) return;

    speechService.playPopSound(600);
    speakText(item.name);
    const nextUserSeq = [...userSequence, item];
    setUserSequence(nextUserSeq);

    const stepIdx = nextUserSeq.length - 1;
    if (nextUserSeq[stepIdx].id !== sequence[stepIdx].id) {
      speechService.playPopSound(250);
      speakText("Oh! Wrong tile. Let's try again!");
      setTimeout(() => startNewPattern(targetLevel), 1000);
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      const nextScore = score + 1;
      setScore(nextScore);
      speechService.playSuccessChime();
      awardStars(2);
      setCognitiveScore(prev => Math.min(100, prev + 2));

      if (nextScore >= targetLevel) {
        setIsCompleted(true);
        try { confetti({ particleCount: 90, spread: 70 }); } catch (e) {}
        speakText(`Fantastic! You matched the complete ${targetLevel}-animal pattern!`);
      } else {
        setTimeout(() => generateNextStep(sequence, targetLevel), 1000);
      }
    }
  };

  return (
    <GameContainer
      title={t.game2Title}
      subtitle={t.game2Desc}
      onBack={onBack}
      level={targetLevel}
    >
      {/* Target Length Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
        {[
          { len: 3, label: 'Stage 1: 3 Steps (Mild)' },
          { len: 4, label: 'Stage 2: 4 Steps (Moderate)' },
          { len: 5, label: 'Stage 3: 5 Steps (Advanced)' },
        ].map(item => (
          <button
            key={item.len}
            onClick={() => {
              setTargetLevel(item.len);
              startNewPattern(item.len);
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              border: targetLevel === item.len ? '2px solid var(--primary-emerald)' : '1px solid var(--card-border)',
              background: targetLevel === item.len ? 'linear-gradient(135deg, #1b4332, #2d6a4f)' : 'white',
              color: targetLevel === item.len ? 'white' : 'var(--text-dark)',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {!isCompleted ? (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(27, 67, 50, 0.08)',
            padding: '10px 20px',
            borderRadius: '16px',
            marginBottom: '20px',
            maxWidth: '520px',
            margin: '0 auto 20px auto'
          }}>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
              {sequence.length === 0 ? "Click Start to Watch Pattern" : `Sequence Step: ${sequence.length} / ${targetLevel}`}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800', color: '#f59e0b' }}>
              <Star size={18} fill="#f59e0b" />
              <span>Score: {score}</span>
            </div>
          </div>

          {sequence.length === 0 ? (
            <button className="btn-primary" onClick={() => startNewPattern(targetLevel)} style={{ margin: '0 auto' }}>
              <Play size={20} />
              <span>Start Wildlife Pattern</span>
            </button>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              maxWidth: '520px',
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
                      background: isActive ? '#e9c46a' : 'white',
                      border: isActive ? '4px solid var(--primary-emerald)' : '2px solid var(--card-border)',
                      borderRadius: '20px',
                      padding: '20px 12px',
                      cursor: isPlaying ? 'not-allowed' : 'pointer',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: isActive ? '0 10px 24px rgba(27,67,50,0.25)' : '0 4px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{ fontSize: '40px' }}>{item.icon}</div>
                    <div style={{ fontSize: '13px', fontWeight: '800', marginTop: '6px', color: 'var(--text-dark)' }}>
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="fade-in" style={{ padding: '32px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🦏⭐</div>
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#2b9348', marginBottom: '8px' }}>
            Pattern Sequence Mastered!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '20px' }}>
            Your visual attention and spatial memory score have been upgraded!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button className="btn-primary" onClick={() => startNewPattern(targetLevel)}>
              <RotateCcw size={20} />
              <span>Try Again</span>
            </button>
            <button className="btn-secondary" onClick={onBack}>
              Return to Hub
            </button>
          </div>
        </div>
      )}
    </GameContainer>
  );
};

