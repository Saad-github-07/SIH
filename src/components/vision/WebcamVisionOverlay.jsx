import React, { useState, useEffect, useRef } from 'react';
import { visionEngineInstance } from '../../services/visionEngine';
import { speechService } from '../../services/speechService';
import {
  Camera, CameraOff, Eye, Smile, Frown, Sparkles, Shield,
  Activity, ChevronDown, ChevronUp, AlertCircle, Hand
} from 'lucide-react';

export const WebcamVisionOverlay = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [telemetry, setTelemetry] = useState(() => visionEngineInstance.getVisionTelemetry());
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const unsubscribe = visionEngineInstance.subscribe((data) => {
      setTelemetry(data);
    });
    return unsubscribe;
  }, []);

  const toggleCamera = async () => {
    speechService.playPopSound(700);
    if (isCameraActive) {
      visionEngineInstance.stopWebcam();
      setIsCameraActive(false);
    } else {
      const success = await visionEngineInstance.startWebcam(videoRef.current, canvasRef.current);
      setIsCameraActive(true);
    }
  };

  const getEmotionDisplay = (emotion) => {
    switch (emotion) {
      case 'HAPPY_ENGAGED':
        return { emoji: '😊', label: 'Happy & Engaged', color: '#16a34a', bg: '#dcfce7' };
      case 'CALM_FOCUSED':
        return { emoji: '😌', label: 'Calm & Focused', color: '#0284c7', bg: '#e0f2fe' };
      case 'CONFUSED_HESITATING':
        return { emoji: '😕', label: 'Confused / Hesitating', color: '#d97706', bg: '#fef3c7' };
      case 'DISTRACTED_LOOKING_AWAY':
        return { emoji: '👀', label: 'Looking Away / Distracted', color: '#dc2626', bg: '#fee2e2' };
      default:
        return { emoji: '😐', label: 'Neutral & Attentive', color: '#475569', bg: '#f1f5f9' };
    }
  };

  const emotionInfo = getEmotionDisplay(telemetry.currentEmotion);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 900,
      maxWidth: '320px',
      width: '100%',
      background: 'white',
      borderRadius: '22px',
      border: '2px solid rgba(2, 132, 199, 0.35)',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
      padding: '16px',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isCollapsed ? 0 : '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '10px',
            background: isCameraActive ? '#dcfce7' : '#f1f5f9',
            color: isCameraActive ? '#16a34a' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Eye size={16} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dark)' }}>
              AI Vision & Emotion Tracker
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              100% On-Device • Privacy Safe
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={toggleCamera}
            style={{
              background: isCameraActive ? '#ef4444' : '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title={isCameraActive ? "Turn off camera" : "Enable webcam vision tracking"}
          >
            {isCameraActive ? <CameraOff size={12} /> : <Camera size={12} />}
            <span>{isCameraActive ? 'Stop' : 'Start'}</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px'
            }}
          >
            {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Hidden Video & Canvas for processing */}
      <video
        ref={videoRef}
        playsInline
        muted
        style={{ display: 'none' }}
      />

      {!isCollapsed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Canvas Preview with Face Landmarks */}
          <div style={{
            width: '100%',
            height: '140px',
            background: '#0f172a',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <canvas
              ref={canvasRef}
              width={280}
              height={140}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: isCameraActive ? 'block' : 'none'
              }}
            />

            {!isCameraActive && (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '10px' }}>
                <Eye size={28} style={{ margin: '0 auto 6px auto', display: 'block', color: '#38bdf8' }} />
                <div style={{ fontSize: '11px', fontWeight: '700' }}>AI Vision Telemetry Simulated</div>
                <div style={{ fontSize: '9px', opacity: 0.8 }}>Click 'Start' to enable live webcam stream</div>
              </div>
            )}

            {/* Live Tracking HUD Overlay */}
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(4px)',
              padding: '3px 8px',
              borderRadius: '8px',
              color: '#38bdf8',
              fontSize: '10px',
              fontWeight: '700',
              fontFamily: 'monospace'
            }}>
              {telemetry.attentionScore}% FOCUS
            </div>
          </div>

          {/* Real-time Emotion Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: '12px',
            background: emotionInfo.bg,
            border: `1px solid ${emotionInfo.color}40`,
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>{emotionInfo.emoji}</span>
              <span style={{ fontWeight: '700', color: emotionInfo.color }}>
                {emotionInfo.label}
              </span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: emotionInfo.color }}>
              {telemetry.emotionConfidence}%
            </span>
          </div>

          {/* Gaze & Gesture Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
            <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: '700' }}>GAZE STATE</div>
              <div style={{ fontWeight: '800', color: telemetry.isLookingAtScreen ? '#16a34a' : '#dc2626', marginTop: '2px' }}>
                {telemetry.isLookingAtScreen ? '✓ Screen Focused' : '⚠️ Looking Away'}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: '700' }}>HAND GESTURE</div>
              <div style={{ fontWeight: '800', color: '#0284c7', marginTop: '2px' }}>
                {telemetry.detectedGesture === 'WAVE_GESTURE' ? '👋 Wave Detected' : telemetry.detectedGesture === 'HAND_POINT' ? '👉 Point Detected' : '✋ Stationary'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
