import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { NER_WORD_RIDDLE_ITEMS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Volume2, HelpCircle, CheckCircle2, ArrowRight, Award, Star } from 'lucide-react';

export const CulturalWordRiddleGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, awardStars, language } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);

  const currentItem = NER_WORD_RIDDLE_ITEMS[currentIdx];

  const initWordRound = (idx = currentIdx) => {
    const item = NER_WORD_RIDDLE_ITEMS[idx];
    setSelectedLetters([]);
    setShowHint(false);
    // Shuffle the letters
    const shuffled = [...item.scrambled].map((char, i) => ({
      id: `${char}_${i}`,
      char,
      used: false
    }));
    setAvailableLetters(shuffled);
    speakText(`Spell the word: ${item.word}. ${item.hint}`);
  };

  useEffect(() => {
    initWordRound(currentIdx);
  }, [currentIdx]);

  const handleLetterClick = (letterObj) => {
    if (letterObj.used || isCompleted) return;

    speechService.playPopSound(700 + selectedLetters.length * 50);
    speakText(letterObj.char);

    // Mark as used in available
    const nextAvail = availableLetters.map(l => l.id === letterObj.id ? { ...l, used: true } : l);
    setAvailableLetters(nextAvail);

    const nextSelected = [...selectedLetters, letterObj];
    setSelectedLetters(nextSelected);

    // Check if word is complete
    if (nextSelected.length === currentItem.letters.length) {
      const formedWord = nextSelected.map(l => l.char).join('');
      if (formedWord === currentItem.word) {
        // Success!
        speechService.playSuccessChime();
        try { confetti({ particleCount: 80, spread: 70 }); } catch (e) {}
        speakText(`Superb! ${currentItem.word}, ${currentItem.translation || ''}! ${currentItem.meaning}`);
        
        const newScore = score + (10 * combo);
        setScore(newScore);
        setCombo(c => c + 1);
        awardStars(3);
        setCognitiveScore(prev => Math.min(100, prev + 3));

        setTimeout(() => {
          if (currentIdx < NER_WORD_RIDDLE_ITEMS.length - 1) {
            setCurrentIdx(prev => prev + 1);
          } else {
            setIsCompleted(true);
            speakText("Outstanding! You completed all North East word riddles!");
          }
        }, 1800);
      } else {
        // Wrong spelling -> gentle reset
        speakText("Let's try that spelling again!");
        setTimeout(() => {
          setSelectedLetters([]);
          setAvailableLetters(prev => prev.map(l => ({ ...l, used: false })));
          setCombo(1);
        }, 1000);
      }
    }
  };

  const handleRemoveLetter = (index) => {
    const itemToRemove = selectedLetters[index];
    setSelectedLetters(prev => prev.filter((_, idx) => idx !== index));
    setAvailableLetters(prev => prev.map(l => l.id === itemToRemove.id ? { ...l, used: false } : l));
  };

  const restartAll = () => {
    setCurrentIdx(0);
    setScore(0);
    setCombo(1);
    setIsCompleted(false);
    initWordRound(0);
  };

  return (
    <GameContainer
      title="NER Cultural Word Riddle (শব্দ-খেল)"
      subtitle="Spell traditional words like Gamusa, Jaapi, Pitha & Loktak"
      onBack={onBack}
      level={currentItem.level || currentIdx + 1}
    >
      {!isCompleted ? (
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Score & Combo Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(27, 67, 50, 0.08)',
            padding: '10px 20px',
            borderRadius: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
              <Award size={20} />
              <span>Word {currentIdx + 1} / {NER_WORD_RIDDLE_ITEMS.length}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#f59e0b' }}>
              <Star size={20} fill="#f59e0b" />
              <span>Score: {score} pts</span>
            </div>
            {combo > 1 && (
              <span style={{
                background: '#e11d48',
                color: 'white',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '800',
                animation: 'bounce 1s infinite'
              }}>
                🔥 {combo}x Combo
              </span>
            )}
          </div>

          {/* Cultural Visual Card */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
            color: 'white',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '24px',
            position: 'relative'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>{currentItem.icon}</div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
              {currentItem.translation ? `${currentItem.translation} • ` : ''}
              {currentItem.meaning}
            </h3>

            <button
              onClick={() => {
                setShowHint(!showHint);
                speakText(currentItem.hint);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '12px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: '#e9c46a',
                color: 'black',
                border: 'none',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <HelpCircle size={16} />
              <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
            </button>

            {showHint && (
              <div style={{
                marginTop: '12px',
                background: 'rgba(0,0,0,0.3)',
                padding: '8px 14px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#fef08a'
              }}>
                💡 {currentItem.hint}
              </div>
            )}
          </div>

          {/* Target Word Slots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '28px',
            flexWrap: 'wrap'
          }}>
            {currentItem.letters.map((_, idx) => {
              const selected = selectedLetters[idx];
              return (
                <div
                  key={idx}
                  onClick={() => selected && handleRemoveLetter(idx)}
                  style={{
                    width: '54px',
                    height: '60px',
                    borderRadius: '14px',
                    border: selected ? '3px solid var(--primary-emerald)' : '2px dashed #94a3b8',
                    background: selected ? 'white' : 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    fontWeight: '800',
                    color: 'var(--primary-emerald)',
                    boxShadow: selected ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                    cursor: selected ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                >
                  {selected?.char || ''}
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Tap the letters below to assemble the word:
          </p>

          {/* Available Letter Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '28px'
          }}>
            {availableLetters.map((l) => (
              <button
                key={l.id}
                onClick={() => handleLetterClick(l)}
                disabled={l.used}
                style={{
                  width: '56px',
                  height: '60px',
                  borderRadius: '16px',
                  background: l.used ? '#e2e8f0' : 'linear-gradient(135deg, #2d6a4f, #1b4332)',
                  color: l.used ? '#94a3b8' : 'white',
                  border: 'none',
                  fontSize: '24px',
                  fontWeight: '800',
                  cursor: l.used ? 'default' : 'pointer',
                  transform: l.used ? 'scale(0.9)' : 'scale(1)',
                  boxShadow: l.used ? 'none' : '0 4px 12px rgba(27,67,50,0.25)',
                  transition: 'all 0.15s ease'
                }}
              >
                {l.char}
              </button>
            ))}
          </div>

          {/* Clear & Reset */}
          <button
            onClick={() => {
              setSelectedLetters([]);
              setAvailableLetters(prev => prev.map(l => ({ ...l, used: false })));
            }}
            className="btn-secondary"
            style={{ margin: '0 auto', fontSize: '14px' }}
          >
            <RotateCcw size={16} />
            <span>Reset Word Letters</span>
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '10px' }}>
            Outstanding Vocabulary & Memory!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
            You solved all North Eastern cultural word riddles with a score of <strong>{score} points</strong>!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={restartAll}>
              <RotateCcw size={18} />
              Play Again
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
