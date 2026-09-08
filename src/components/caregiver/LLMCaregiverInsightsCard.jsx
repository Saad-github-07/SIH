import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { llmServiceInstance } from '../../services/llmService';
import { touchDynamicsInstance } from '../../services/touchDynamicsEngine';
import { speechService } from '../../services/speechService';
import {
  Sparkles, FileText, CheckCircle2, Clock, Brain,
  RefreshCw, TrendingUp, Compass, HeartHandshake, Stethoscope
} from 'lucide-react';

export const LLMCaregiverInsightsCard = () => {
  const { patientInfo, cognitiveTrends, speakText } = useApp();
  const touchTelemetry = touchDynamicsInstance.getBiometricsAnalysis();

  const [digest, setDigest] = useState(() => llmServiceInstance.generateCaregiverDigest({
    patientInfo,
    cognitiveTrends,
    touchTelemetry,
    complianceRate: 94,
    hydrationAverage: 7.3
  }));

  const [isGenerating, setIsGenerating] = useState(false);

  const handleRefreshDigest = async () => {
    setIsGenerating(true);
    speechService.playPopSound(700);

    await new Promise(r => setTimeout(r, 600));
    const newDigest = llmServiceInstance.generateCaregiverDigest({
      patientInfo,
      cognitiveTrends,
      touchTelemetry,
      complianceRate: 96,
      hydrationAverage: 7.5
    });

    setDigest(newDigest);
    setIsGenerating(false);
    speechService.playSuccessChime();
    speakText("Updated AI Plain-Language Clinical Caregiver Digest");
  };

  return (
    <div className="glass-card" style={{ marginTop: '28px', padding: '28px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
            color: '#fef08a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Brain size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                LLM Plain-Language Clinical Insights & Caregiver Digest
              </h3>
              <span style={{ fontSize: '11px', fontWeight: '800', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '8px' }}>
                AI SYNTHESIS
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Translates raw session graphs and motor biometrics into compassionate, actionable caregiver guidance
            </p>
          </div>
        </div>

        <button
          className="btn-secondary"
          onClick={handleRefreshDigest}
          disabled={isGenerating}
          style={{
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px'
          }}
        >
          <RefreshCw size={14} className={isGenerating ? "spin" : ""} />
          <span>{isGenerating ? "Synthesizing..." : "Re-Analyze Digest"}</span>
        </button>
      </div>

      {/* Main Narrative Summary Box */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(27,67,50,0.03), rgba(0,119,182,0.06))',
        border: '1.5px solid rgba(27,67,50,0.15)',
        borderRadius: '20px',
        padding: '22px',
        marginBottom: '22px',
        lineHeight: 1.6
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-emerald)', fontWeight: '800', fontSize: '14px', marginBottom: '8px' }}>
          <Sparkles size={18} />
          <span>Weekly Behavioral & Cognitive Narrative</span>
        </div>
        <p style={{ fontSize: '15px', color: '#1e293b' }}>
          {digest.narrativeSummary}
        </p>
      </div>

      {/* Clinical Highlights Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '14px',
        marginBottom: '24px'
      }}>
        {digest.clinicalHighlights.map((hl, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--card-border)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {hl.label}
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-emerald)', margin: '4px 0' }}>
              {hl.value}
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#0284c7' }}>
              ✓ {hl.badge}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Care Adjustments */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid #e2e8f0'
      }}>
        <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} color="#0284c7" />
          <span>Recommended Next-Step Care Adjustments</span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {digest.recommendations.map((rec, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13px',
                color: '#334155'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '800',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                {idx + 1}
              </div>
              <div>{rec}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #e2e8f0',
          fontSize: '12px',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <span>{digest.doctorNote}</span>
          <span>Generated: {digest.generatedTimestamp}</span>
        </div>
      </div>
    </div>
  );
};
