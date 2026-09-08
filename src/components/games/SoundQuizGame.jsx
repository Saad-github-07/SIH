import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { NER_SOUND_QUIZ_ITEMS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { Volume2, Play, CheckCircle, RotateCcw, Star, Award, HelpCircle } from 'lucide-react';

export const SoundQuizGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, awardStars } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentItem = NER_SOUND_QUIZ_ITEMS[currentIndex];

  const handlePlaySound = () => {
    setIsPlayingSound(true);
    speechService.playSoundQuizFreq(currentItem.audioFreq, currentItem.soundType || 'dhol');
    speakText(`Listen carefully: What makes this sound?`);
    setTimeout(() => setIsPlayingSound(false), 1600);
  };

  const handleSelectOption = (optIdx) => {
    setSelectedAnswer(optIdx);
    const isCorrect = optIdx === currentItem.correct;

    if (isCorrect) {
      speechService.playSuccessChime();
      speakText(`Correct! That is ${currentItem.name}`);
      awardStars(2);
      setCognitiveScore(prev => Math.min(100, prev + 3));

      setTimeout(() => {
        if (currentIndex < NER_SOUND_QUIZ_ITEMS.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowHint(false);
        } else {
          setIsCompleted(true);
          try { confetti({ particleCount: 90, spread: 70 }); } catch (e) {}
          speakText("Congratulations Kaka! You recognized all North Eastern folk sounds!");
        }
      }, 1600);
    } else {
      speechService.playPopSound(300);
      speakText("Not quite! Listen again.");
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setIsCompleted(false);
  };

  return (
    <GameContainer
      title={t.game4Title}
      subtitle={t.game4Desc}
      onBack={onBack}
      level={currentIndex + 1}
    >
      {!isCompleted ? (
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {/* Progress Banner */}
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
              Sound Round {currentIndex + 1} / {NER_SOUND_QUIZ_ITEMS.length}
            </div>
            <button
              onClick={() => {
                setShowHint(!showHint);
                speakText(currentItem.hint);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#e9c46a',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <HelpCircle size={14} />
              <span>Hint</span>
            </button>
          </div>

          {/* Audio Trigger Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1b4332, #0077b6)',
            color: 'white',
            borderRadius: '24px',
            padding: '30px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 8px 24px rgba(27,67,50,0.2)'
          }}>
            <div style={{ fontSize: '56px' }}>{currentItem.icon}</div>
            <button
              className="btn-primary"
              onClick={handlePlaySound}
              style={{
                background: isPlayingSound ? '#ec4899' : '#e9c46a',
                color: isPlayingSound ? 'white' : 'black',
                border: 'none',
                padding: '14px 28px',
                fontSize: '17px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
              }}
            >
              <Volume2 size={24} />
              <span>{isPlayingSound ? "Playing Regional Sound..." : "Tap to Play Sound 🔊"}</span>
            </button>
            <p style={{ fontSize: '13px', opacity: 0.9, textAlign: 'center' }}>
              {currentItem.audioDescription}
            </p>

            {showHint && (
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                color: '#fef08a'
              }}>
                💡 Hint: {currentItem.hint}
              </div>
            )}
          </div>

          <p style={{ textAlign: 'center', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '14px', fontSize: '15px' }}>
            What regional sound is this?
          </p>

          {/* Multiple choice options */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {currentItem.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = isSelected && idx === currentItem.correct;
              const isWrong = isSelected && idx !== currentItem.correct;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    padding: '20px 16px',
                    borderRadius: '18px',
                    fontSize: '15px',
                    fontWeight: '800',
                    border: isCorrect ? '3px solid #2b9348' : isWrong ? '3px solid #d90429' : '2px solid var(--card-border)',
                    cursor: 'pointer',
                    background: isCorrect ? '#e8f5e9' : isWrong ? '#ffebee' : 'white',
                    color: isCorrect ? '#2b9348' : isWrong ? '#d90429' : 'var(--text-dark)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fade-in" style={{ padding: '32px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎵🏆</div>
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#2b9348', marginBottom: '8px' }}>
            Auditory Sensory Quiz Complete!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
            You identified all North Eastern folk sounds and instruments with high auditory recognition!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={resetQuiz}>
              <RotateCcw size={20} />
              <span>Replay Quiz</span>
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

