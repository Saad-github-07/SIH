import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { llmServiceInstance } from '../../services/llmService';
import { speechService } from '../../services/speechService';
import { GameContainer } from './GameContainer';
import {
  BookOpen, Volume2, CheckCircle2, XCircle, Sparkles,
  ArrowRight, RefreshCw, Star, Coins, Brain
} from 'lucide-react';

export const StoryRecallGame = ({ onBack }) => {
  const { language, speakText, awardStars, earnCoins, familyMembers, patientInfo } = useApp();

  const [storyData, setStoryData] = useState(null);
  const [currentStep, setCurrentStep] = useState('READING'); // 'READING' | 'QUESTIONS' | 'COMPLETED'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNewPersonalizedStory();
  }, [language]);

  const loadNewPersonalizedStory = async () => {
    setIsLoading(true);
    speechService.playPopSound(600);

    const generated = await llmServiceInstance.generatePersonalizedStoryRecall({
      patientName: patientInfo.name || "Kaka",
      location: patientInfo.location || "Dispur, Assam",
      language,
      familyMembers
    });

    setStoryData(generated);
    setCurrentStep('READING');
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsLoading(false);

    // Read aloud story passage automatically if voice enabled
    setTimeout(() => {
      speakText(`${generated.activeTitle}. ${generated.activePassage}`);
    }, 600);
  };

  const handleOptionSelect = (idx) => {
    if (isAnswerChecked) return;
    speechService.playPopSound(700);
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    const currentQ = storyData.questions[currentQuestionIdx];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    setIsAnswerChecked(true);

    if (isCorrect) {
      speechService.playSuccessChime();
      setScore(s => s + 1);
      speakText("Correct recall! Excellent memory.");
    } else {
      speechService.playPopSound(400);
      speakText(`Not quite. The correct answer was ${currentQ.options[currentQ.correctAnswer]}.`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < storyData.questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      speechService.playPopSound(600);
    } else {
      // Completed game
      setCurrentStep('COMPLETED');
      speechService.playLevelUpSound();
      awardStars(score + 1);
      earnCoins((score + 1) * 15, 'Completing AI Story Recall Therapy');
    }
  };

  if (isLoading || !storyData) {
    return (
      <GameContainer
        title="AI Personalized Story Recall"
        subtitle="LLM-Powered Cultural Memory Passage"
        gameIcon="📖"
        onBack={onBack}
        score={0}
      >
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <RefreshCw size={36} className="spin" style={{ margin: '0 auto 12px auto', display: 'block', color: 'var(--primary-emerald)' }} />
          <p style={{ fontSize: '16px', fontWeight: '700' }}>
            LLM is generating a personalized cultural memory story for you...
          </p>
        </div>
      </GameContainer>
    );
  }

  return (
    <GameContainer
      title="AI Story Recall Therapy"
      subtitle="LLM Dynamic Episodic Memory Exercise"
      gameIcon="📖"
      onBack={onBack}
      score={score * 30}
    >
      {/* 1. Reading & Audio Listening Phase */}
      {currentStep === 'READING' && (
        <div className="fade-in" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(27,67,50,0.04), rgba(233,196,106,0.12))',
            border: '2px solid rgba(233,196,106,0.5)',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                background: '#fef3c7',
                color: '#b45309',
                padding: '4px 10px',
                borderRadius: '10px'
              }}>
                ✨ LLM PERSONALIZED PASSAGE
              </span>

              <button
                onClick={() => speakText(`${storyData.activeTitle}. ${storyData.activePassage}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'white',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--primary-emerald)',
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={15} />
                <span>Read Aloud</span>
              </button>
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '12px' }}>
              {storyData.activeTitle}
            </h3>

            <p style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--text-dark)', marginBottom: '16px' }}>
              {storyData.activePassage}
            </p>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              💡 Read or listen carefully. When you are ready, click below to answer 3 gentle questions!
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button
              className="btn-secondary"
              onClick={loadNewPersonalizedStory}
              style={{ fontSize: '14px' }}
            >
              <RefreshCw size={16} />
              <span>Generate Another Story</span>
            </button>

            <button
              className="btn-primary"
              onClick={() => {
                setCurrentStep('QUESTIONS');
                speechService.playPopSound(700);
              }}
              style={{ fontSize: '16px', padding: '12px 28px' }}
            >
              <span>I Am Ready for Questions</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Interactive Questions Phase */}
      {currentStep === 'QUESTIONS' && (
        <div className="fade-in" style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Progress header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>
              Question {currentQuestionIdx + 1} of {storyData.questions.length}
            </span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
              Score: {score} Correct
            </span>
          </div>

          {/* Question Card */}
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid var(--card-border)',
            marginBottom: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '20px' }}>
              {storyData.questions[currentQuestionIdx].question}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {storyData.questions[currentQuestionIdx].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === storyData.questions[currentQuestionIdx].correctAnswer;

                let btnBg = 'white';
                let btnBorder = '1px solid #cbd5e1';
                let btnColor = 'var(--text-dark)';

                if (isAnswerChecked) {
                  if (isCorrect) {
                    btnBg = '#dcfce7';
                    btnBorder = '2px solid #16a34a';
                    btnColor = '#166534';
                  } else if (isSelected && !isCorrect) {
                    btnBg = '#fee2e2';
                    btnBorder = '2px solid #dc2626';
                    btnColor = '#991b1b';
                  }
                } else if (isSelected) {
                  btnBg = '#e0f2fe';
                  btnBorder = '2px solid #0284c7';
                  btnColor = '#0369a1';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswerChecked}
                    style={{
                      background: btnBg,
                      border: btnBorder,
                      color: btnColor,
                      padding: '14px 18px',
                      borderRadius: '14px',
                      textAlign: 'left',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: isAnswerChecked ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswerChecked && isCorrect && <CheckCircle2 size={20} color="#16a34a" />}
                    {isAnswerChecked && isSelected && !isCorrect && <XCircle size={20} color="#dc2626" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {isAnswerChecked && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '13px',
                color: 'var(--text-dark)'
              }}>
                <strong>Memory Note:</strong> {storyData.questions[currentQuestionIdx].explanation}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            {!isAnswerChecked ? (
              <button
                className="btn-primary"
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                style={{
                  fontSize: '15px',
                  padding: '10px 24px',
                  opacity: selectedOption === null ? 0.6 : 1
                }}
              >
                Confirm Answer
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={handleNextQuestion}
                style={{ fontSize: '15px', padding: '10px 24px' }}
              >
                <span>{currentQuestionIdx < storyData.questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Completed Phase */}
      {currentStep === 'COMPLETED' && (
        <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎉</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '8px' }}>
            Wonderful Story Recall!
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            You recalled {score} out of {storyData.questions.length} questions correctly.
          </p>

          <div style={{
            background: '#f0fdf4',
            border: '2px solid #86efac',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#166534', textTransform: 'uppercase' }}>Stars Awarded</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>
                ⭐ +{score + 1}
              </div>
            </div>

            <div style={{ width: '1px', background: '#bbf7d0' }} />

            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#166534', textTransform: 'uppercase' }}>Smriti Coins</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#b45309', marginTop: '4px' }}>
                🪙 +{(score + 1) * 15}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
            <button
              className="btn-secondary"
              onClick={loadNewPersonalizedStory}
              style={{ fontSize: '14px' }}
            >
              Play Another Story
            </button>
            <button
              className="btn-primary"
              onClick={onBack}
              style={{ fontSize: '14px' }}
            >
              Return to Games Hub
            </button>
          </div>
        </div>
      )}
    </GameContainer>
  );
};
