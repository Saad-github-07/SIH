import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { MEMORY_PALACE_ITEMS } from '../../data/nerThemes';
import { aiEngineInstance } from '../../services/aiEngine';
import { offlineSyncEngine } from '../../services/offlineStorage';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';

export const MemoryPalaceGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, setAiDifficultyStage, language } = useApp();
  const [level, setLevel] = useState(1); // 1 = 2 pairs (4 cards), 2 = 3 pairs (6 cards), 3 = 4 pairs (8 cards)
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
    const pairCount = targetLevel === 1 ? 2 : targetLevel === 2 ? 3 : 4;
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
    speakText(t.game1Title);
  };

  useEffect(() => {
    initGame(level);
  }, [level]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

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
        const nextMatched = [...matched, firstIdx, secondIdx];
        setMatched(nextMatched);
        setFlipped([]);
        speakText("Wonderful match!");

        // Update Cognitive Score in global context
        setCognitiveScore(metrics.cognitiveScore);

        // Check Victory
        if (nextMatched.length === cards.length) {
          setIsCompleted(true);
          try { confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
          speakText("Congratulations Kaka! Memory session completed successfully!");

          // Save session offline
          offlineSyncEngine.saveGameSession({
            game: 'MemoryPalace',
            level,
            moves: moveCount + 1,
            score: metrics.cognitiveScore
          });

          // Check if AI recommends level up
          if (newLevel > level) {
            setAiMessage("AI auto-scaled difficulty to Next Level!");
            setAiDifficultyStage(newLevel);
          }
        }
      } else {
        // Mis-match flip back
        setTimeout(() => setFlipped([]), 1200);

        if (metrics.recommendation === 'SCALE_DOWN' && level > 1) {
          setAiMessage("AI gently scaling difficulty down for better comfort");
          setLevel(prev => Math.max(1, prev - 1));
          setAiDifficultyStage(Math.max(1, level - 1));
        }
      }
    }
  };

  const handleHint = () => {
    // Reveal an un-matched pair hint
    const unmatchedIndices = cards.map((c, i) => matched.includes(i) ? null : i).filter(i => i !== null);
    if (unmatchedIndices.length >= 2) {
      const first = unmatchedIndices[0];
      const matchIdx = cards.findIndex((c, i) => i !== first && c.id === cards[first].id && !matched.includes(i));
      if (matchIdx !== -1) {
        setFlipped([first, matchIdx]);
        speakText(`Smriti-Mitra Hint: Here is ${cards[first].name}`);
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
          <div className={`memory-grid level-${level}`}>
            {cards.map((card, idx) => {
              const isFlipped = flipped.includes(idx);
              const isMatched = matched.includes(idx);

              return (
                <div
                  key={card.uniqueId}
                  className={`card-flip ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                  onClick={() => handleCardClick(idx)}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <span>🧠</span>
                    </div>
                    <div className="card-back">
                      <span style={{ fontSize: '36px' }}>{card.icon}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>
                        {card.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '20px', fontSize: '15px', color: 'var(--text-muted)' }}>
            Total Flips: <strong>{moveCount}</strong>
          </div>
        </div>
      ) : (
        /* Victory View */
        <div className="fade-in" style={{ padding: '24px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h3 style={{ fontSize: '24px', color: '#2b9348', marginBottom: '8px' }}>
            Excellent Memory Exercise!
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            You completed the routine cards in {moveCount} moves. Your brain retention is active today!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn-primary" onClick={() => initGame(level)}>
              <RotateCcw size={20} />
              Play Again
            </button>
            {level < 3 && (
              <button
                className="btn-secondary"
                onClick={() => setLevel(prev => prev + 1)}
                style={{ background: 'var(--tea-gold)', color: 'black', border: 'none' }}
              >
                Next Level (Stage {level + 1})
              </button>
            )}
          </div>
        </div>
      )}
    </GameContainer>
  );
};
