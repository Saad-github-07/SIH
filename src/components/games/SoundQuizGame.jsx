import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { NER_SOUND_QUIZ_ITEMS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { Volume2, Play, CheckCircle, RotateCcw } from 'lucide-react';

export const SoundQuizGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const currentItem = NER_SOUND_QUIZ_ITEMS[currentIndex];

  const handlePlaySound = () => {
    setIsPlayingSound(true);
    const soundType = currentItem.id.includes('dhol') ? 'dhol' : currentItem.id.includes('bell') ? 'bell' : 'rain';
    speechService.playSoundQuizFreq(currentItem.audioFreq, soundType);
    speakText(`Listening to sound: ${currentItem.name}`);
    setTimeout(() => setIsPlayingSound(false), 1500);
  };

  const handleSelectOption = (optIdx) => {
    setSelectedAnswer(optIdx);
    const isCorrect = optIdx === currentItem.correct;

    if (isCorrect) {
      speakText(`Correct! That is ${currentItem.name}`);
      setCognitiveScore(prev => Math.min(100, prev + 3));

      setTimeout(() => {
        if (currentIndex < NER_SOUND_QUIZ_ITEMS.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setIsCompleted(true);
          try { confetti({ particleCount: 80 }); } catch (e) {}
        }
      }, 1500);
    } else {
      speakText("Not quite! Listen again.");
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
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
        <div>
          {/* Audio Trigger Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1b4332, #0077b6)',
            color: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ fontSize: '48px' }}>{currentItem.icon}</div>
            <button
              className="btn-primary"
              onClick={handlePlaySound}
              style={{ background: '#e9c46a', color: 'black', border: 'none' }}
            >
              <Volume2 size={24} />
              {isPlayingSound ? "Playing Audio..." : "Tap to Play Sound"}
            </button>
            <p style={{ fontSize: '13px', opacity: 0.9 }}>{currentItem.audioDescription}</p>
          </div>

          {/* Multiple choice options */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
            {currentItem.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = isSelected && idx === currentItem.correct;
              const isWrong = isSelected && idx !== currentItem.correct;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    border: '2px solid var(--card-border)',
                    cursor: 'pointer',
                    background: isCorrect ? '#e8f5e9' : isWrong ? '#ffebee' : 'white',
                    color: isCorrect ? '#2b9348' : isWrong ? '#d90429' : 'var(--text-dark)'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fade-in" style={{ padding: '24px 0' }}>
          <div style={{ fontSize: '64px' }}>🎵</div>
          <h3 style={{ fontSize: '24px', color: '#2b9348', marginTop: '12px' }}>
            Auditory Sensory Quiz Complete!
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            You identified all regional sounds correctly.
          </p>
          <button className="btn-primary" onClick={resetQuiz}>
            <RotateCcw size={20} />
            Replay Quiz
          </button>
        </div>
      )}
    </GameContainer>
  );
};
