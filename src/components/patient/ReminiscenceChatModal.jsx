import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { llmServiceInstance } from '../../services/llmService';
import { speechService } from '../../services/speechService';
import {
  MessageSquareHeart, Mic, Send, Volume2, Sparkles, X,
  Heart, Activity, RefreshCw, User, Bot, HelpCircle
} from 'lucide-react';

export const ReminiscenceChatModal = ({ onClose }) => {
  const { language, speakText, earnCoins, patientInfo } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Nomoskar, ${patientInfo.name || "Kaka"}! I am your Smriti Sathi (স্মৃতি সাথী). I love listening to your wonderful stories and memories. Tell me, what was your favorite festival or memory growing up?`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [engagementHistory, setEngagementHistory] = useState([85]);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "Tell me about Assam tea gardens",
    "How did you celebrate Bihu as a child?",
    "What was your favorite village dish?",
    "Tell me about family gatherings"
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    speechService.playPopSound(700);
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Call LLM Reminiscence Engine
    await new Promise(r => setTimeout(r, 600));
    const response = llmServiceInstance.generateReminiscenceReply({
      userMessage: query,
      patientName: patientInfo.name || "Kaka",
      location: patientInfo.location || "Assam",
      language
    });

    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: response.replyText,
      followUp: response.suggestedFollowUp,
      timestamp: response.timestamp
    };

    setIsThinking(false);
    setMessages(prev => [...prev, aiMsg]);
    setEngagementHistory(prev => [...prev.slice(-4), response.engagementScore]);
    earnCoins(10, 'Sharing a valuable memory with Smriti Sathi');

    // Read AI response aloud
    speakText(response.replyText);
  };

  const toggleMicListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      handleSendMessage("I remember harvesting tea leaves with my family in Upper Assam");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'as' ? 'as-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        speechService.playPopSound(800);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      handleSendMessage("I loved the sound of rain on our village home");
    }
  };

  const avgEngagement = Math.round(engagementHistory.reduce((a, b) => a + b, 0) / engagementHistory.length);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card fade-in" style={{
        background: 'white',
        maxWidth: '780px',
        width: '100%',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '28px',
        padding: '24px',
        boxShadow: '0 25px 65px rgba(0,0,0,0.3)',
        border: '2px solid rgba(27,67,50,0.2)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '14px',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2d6a4f, #1b4332)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🌸
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  Smriti Sathi (স্মৃতি সাথী)
                </h3>
                <span style={{ fontSize: '10px', fontWeight: '800', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '8px' }}>
                  AI REMINISCENCE THERAPY
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Gentle Conversational Companion for Meaningful Emotional Recall
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Live Engagement Badge */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '12px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Activity size={13} />
              <span>Engagement: {avgEngagement}%</span>
            </div>

            <button
              onClick={onClose}
              style={{
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '14px 18px',
                borderRadius: '20px',
                background: m.sender === 'user'
                  ? 'linear-gradient(135deg, #1b4332, #2d6a4f)'
                  : '#f8fafc',
                color: m.sender === 'user' ? 'white' : 'var(--text-dark)',
                border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                fontSize: '15px',
                lineHeight: 1.5,
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}>
                <div>{m.text}</div>
                {m.followUp && (
                  <div style={{
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px dashed #cbd5e1',
                    fontSize: '13px',
                    color: '#0284c7',
                    fontWeight: '600'
                  }}>
                    💭 {m.followUp}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', marginInline: '6px' }}>
                {m.timestamp}
              </span>
            </div>
          ))}

          {isThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <RefreshCw size={14} className="spin" />
              <span>Smriti Sathi is listening and reflecting...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Topic Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '8px' }}>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              style={{
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-dark)',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              💬 {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Share a story, memory, or feeling..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '16px',
              border: '1.5px solid #cbd5e1',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <button
            onClick={toggleMicListening}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              background: isListening ? '#ef4444' : '#f1f5f9',
              color: isListening ? 'white' : '#1e293b',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Speak your memory"
          >
            <Mic size={20} />
          </button>

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: inputText.trim() ? 1 : 0.6
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
