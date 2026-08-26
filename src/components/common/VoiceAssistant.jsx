import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, Sparkles, MessageCircle } from 'lucide-react';

export const VoiceAssistant = ({ promptText }) => {
  const { t, speakText, voiceEnabled } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    const textToSpeak = promptText || t.welcomeSubtitle || t.voicePrompt;
    setIsSpeaking(true);
    speakText(textToSpeak);
    setTimeout(() => setIsSpeaking(false), 4000);
  };

  if (!voiceEnabled) return null;

  return (
    <div
      className="voice-widget"
      onClick={handleSpeak}
      title="Click for Smriti-Mitra Voice Guidance"
    >
      <div className={`voice-avatar-pulse ${isSpeaking ? 'active' : ''}`}>
        👵
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontWeight: '700', fontSize: '15px' }}>{t.voiceAssistantName}</span>
          <Sparkles size={14} style={{ color: '#e9c46a' }} />
        </div>
        <div style={{ fontSize: '12px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Volume2 size={12} />
          <span>{t.voicePrompt}</span>
        </div>
      </div>
    </div>
  );
};
