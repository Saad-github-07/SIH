import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { A2ALiveCoPilot } from '../a2a/A2ALiveCoPilot';
import { A2AAgentNetworkExplorer } from '../a2a/A2AAgentNetworkExplorer';
import { WebcamVisionOverlay } from '../vision/WebcamVisionOverlay';
import { LLMCaregiverInsightsCard } from '../caregiver/LLMCaregiverInsightsCard';
import { ReminiscenceChatModal } from '../patient/ReminiscenceChatModal';
import { Bot, Network, Eye, MessageSquareHeart, FileText, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

export const AIHubView = () => {
  const { speakText } = useApp();
  const [showA2AModal, setShowA2AModal] = useState(false);
  const [showReminiscenceChat, setShowReminiscenceChat] = useState(false);

  return (
    <div className="fade-in" style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Top AI Hub Header Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0284c7 100%)',
        color: 'white',
        padding: '32px',
        borderRadius: '28px',
        marginBottom: '28px',
        boxShadow: '0 14px 32px rgba(15, 23, 42, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', marginBottom: '8px' }}>
              <Bot size={28} />
              <span style={{ fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Arclight AI & Multi-Agent Intelligence Suite
              </span>
            </div>

            <h1 style={{ fontSize: '34px', fontWeight: '900', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Dedicated AI Innovations Hub
            </h1>
            <p style={{ fontSize: '18px', opacity: 0.92, maxWidth: '800px', lineHeight: '1.6' }}>
              Access Google A2A Agent-to-Agent protocol telemetry, real-time computer vision emotion/gaze tracking, AI memory companions, and plain-language clinical digests.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setShowA2AModal(true);
                speakText("Opening Arclight A2A Agent Protocol Hub");
              }}
              style={{
                background: 'linear-gradient(135deg, #0077b6, #023e8a)',
                color: 'white',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '18px',
                fontSize: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(0, 119, 182, 0.3)'
              }}
            >
              <Network size={22} />
              <span>Explore A2A Protocol</span>
            </button>

            <button
              onClick={() => {
                setShowReminiscenceChat(true);
                speakText("Opening Arclight Sathi AI Memory Companion");
              }}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '18px',
                fontSize: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.3)'
              }}
            >
              <MessageSquareHeart size={22} />
              <span>Launch AI Sathi</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Google A2A Multi-Agent Coordination Hub */}
      <div style={{ marginBottom: '32px' }}>
        <A2ALiveCoPilot />
      </div>

      {/* 2. Grid of AI Engines: Computer Vision & LLM Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Computer Vision Feature Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Eye size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Computer Vision & Gaze Tracking
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Real-time facial micro-expression, fatigue detection & attention telemetry
              </p>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '18px' }}>
            The WebCam vision engine monitors patient gaze stabilization, center-of-focus hit rates, and facial confusion markers during game play to assess cognitive fatigue.
          </p>

          <WebcamVisionOverlay />
        </div>

        {/* LLM Clinical Digest Card */}
        <div>
          <LLMCaregiverInsightsCard />
        </div>
      </div>

      {/* Modals */}
      {showA2AModal && <A2AAgentNetworkExplorer onClose={() => setShowA2AModal(false)} />}
      {showReminiscenceChat && <ReminiscenceChatModal onClose={() => setShowReminiscenceChat(false)} />}
    </div>
  );
};
