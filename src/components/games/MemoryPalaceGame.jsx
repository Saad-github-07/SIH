import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { MEMORY_PALACE_ITEMS } from '../../data/nerThemes';
import { aiEngineInstance } from '../../services/aiEngine';
import { offlineSyncEngine } from '../../services/offlineStorage';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, CheckCircle2, Star, Award, ArrowRight } from 'lucide-react';

export const MemoryPalaceGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, setAiDifficultyStage, awardStars, language } = useApp();
  const [level, setLevel] = useState(1); // 1 = 4 cards (2 pairs), 2 = 6 cards (3 pairs), 3 = 8 cards (4 pairs), 4 = 12 cards (6 pairs), 5 = 16 cards (8 pairs)
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [lastActionTime, setLastActionTime] = useState(Date.now());
  const [aiMessage, setAiMessage] = useState("");

  // Initialize Cards based on Level
  const initGame = (targetLevel = level) => {
    aiEngineInstance.startSession();
    const pairCount = targetLevel === 1 ? 2 : targetLevel === 2 ? 3 : targetLevel === 3 ? 4 : targetLevel === 4 ? 6 : 8;
    const selectedItems = MEMORY_PALACE_ITEMS.slice(0, pairCount);

    const deck = [...selectedItems, ...selectedItems].map((item, idx) => ({
      ...item,
      uniqueId: `${item.id}_${idx}`
    })).sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setIsCompleted(false);
    setMoveCount(0);
    setLastActionTime(Date.now());
    setAiMessage("");
    speakText(`Memory Palace Level ${targetLevel}`);
  };

  useEffect(() => {
    initGame(level);
  }, [level]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    speechService.playPopSound(600);
    const now = Date.now();
    const timeTakenMs = now - lastActionTime;
    setLastActionTime(now);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    speakText(cards[index].name);

    if (newFlipped.length === 2) {
      setMoveCount(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const isMatch = cards[firstIdx].id === cards[secondIdx].id;

      // Feed ML Engine action data
      aiEngineInstance.recordAction(isMatch, timeTakenMs);
      const { newLevel, metrics } = aiEngineInstance.evaluateAndAdjust();

      if (isMatch) {
        speechService.playSuccessChime();
        const nextMatched = [...matched, firstIdx, secondIdx];
        setMatched(nextMatched);
        setFlipped([]);
        speakText("Wonderful match!");

        // Update Cognitive Score in global context
        setCognitiveScore(metrics.cognitiveScore);

        // Check Victory
        if (nextMatched.length === cards.length) {
          setIsCompleted(true);
          try { confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
          speakText("Congratulations Kaka! Memory session completed successfully!");
          awardStars(4);

          // Save session offline
          offlineSyncEngine.saveGameSession({
            game: 'MemoryPalace',
            level,
            moves: moveCount + 1,
            score: metrics.cognitiveScore
          });

          // Check if AI recommends level up
          if (newLevel > level) {
            setAiMessage("AI evaluated high memory precision: Scaled to Next Level!");
            setAiDifficultyStage(newLevel);
          }
        }
      } else {
        // Mis-match flip back
        setTimeout(() => setFlipped([]), 1200);

        if (metrics.recommendation === 'SCALE_DOWN' && level > 1) {
          setAiMessage("AI gently scaling difficulty down for better comfort");
        }
      }
    }
  };

  const handleHint = () => {
    const unmatchedIndices = cards.map((c, i) => matched.includes(i) ? null : i).filter(i => i !== null);
    if (unmatchedIndices.length >= 2) {
      const first = unmatchedIndices[0];
      const matchIdx = cards.findIndex((c, i) => i !== first && c.id === cards[first].id && !matched.includes(i));
      if (matchIdx !== -1) {
        setFlipped([first, matchIdx]);
        speakText(`Smriti Hint: Here is ${cards[first].name}`);
        setTimeout(() => setFlipped([]), 2000);
      }
    }
  };

  return (
    <GameContainer
      title={t.game1Title}
      subtitle={t.game1Desc}
      onBack={onBack}
      onHint={handleHint}
      level={level}
    >
      {/* Level Selectors */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { lvl: 1, label: 'Level 1 (4 Cards)' },
          { lvl: 2, label: 'Level 2 (6 Cards)' },
          { lvl: 3, label: 'Level 3 (8 Cards)' },
          { lvl: 4, label: 'Level 4 (12 Cards)' },
          { lvl: 5, label: 'Level 5 (16 Cards)' },
        ].map(item => (
          <button
            key={item.lvl}
            onClick={() => {
              setLevel(item.lvl);
              initGame(item.lvl);
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

      {/* AI Feedback Banner */}
      {aiMessage && (
        <div style={{
          background: 'rgba(233, 196, 106, 0.25)',
          color: 'var(--primary-emerald)',
          padding: '10px 18px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '700',
          marginBottom: '20px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          {aiMessage}
        </div>
      )}

      {/* Memory Card Grid */}
      {!isCompleted ? (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${level === 1 ? 2 : level === 2 ? 3 : level === 3 ? 4 : 4}, minmax(110px, 1fr))`,
            gap: '16px',
            maxWidth: level >= 4 ? '680px' : '520px',
            margin: '0 auto'
          }}>
            {cards.map((card, idx) => {
              const isFlipped = flipped.includes(idx);
              const isMatched = matched.includes(idx);

              return (
                <div
                  key={card.uniqueId}
                  className={`card-flip ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                  onClick={() => handleCardClick(idx)}
                  style={{
                    height: '130px',
                    perspective: '1000px',
                    cursor: isMatched ? 'default' : 'pointer'
                  }}
                >
                  <div className="card-inner" style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}>
                    <div className="card-front" style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                      color: '#e9c46a',
                      borderRadius: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{ fontSize: '32px' }}>🧠</span>
                      <span style={{ fontSize: '11px', fontWeight: '700', marginTop: '4px', opacity: 0.9 }}>TAP ME</span>
                    </div>

                    <div className="card-back" style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: isMatched ? 'rgba(56, 176, 0, 0.15)' : 'white',
                      border: isMatched ? '2px solid #38b000' : '2px solid var(--card-border)',
                      borderRadius: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{ fontSize: '36px' }}>{card.icon}</span>
                      <span style={{ fontSize: '12px', fontWeight: '800', marginTop: '4px', textAlign: 'center', color: 'var(--text-dark)' }}>
                        {card.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '24px', fontSize: '15px', color: 'var(--text-muted)' }}>
            Total Flips: <strong>{moveCount}</strong> • Matches Found: <strong>{matched.length / 2} / {cards.length / 2}</strong>
          </div>
        </div>
      ) : (
        /* Victory View */
        <div className="fade-in" style={{ padding: '24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉⭐⭐⭐</div>
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#2b9348', marginBottom: '8px' }}>
            Excellent Memory Exercise!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
            You completed Level {level} in {moveCount} moves! Your brain retention is active today!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => initGame(level)}>
              <RotateCcw size={20} />
              <span>Play Level {level} Again</span>
            </button>
            {level < 5 && (
              <button
                className="btn-secondary"
                onClick={() => {
                  const nxt = level + 1;
                  setLevel(nxt);
                  initGame(nxt);
                }}
                style={{ background: '#e9c46a', color: 'black', border: 'none' }}
              >
                <ArrowRight size={20} />
                <span>Next Level (Level {level + 1})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </GameContainer>
  );
};

