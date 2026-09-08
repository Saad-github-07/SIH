import React, { useState, useEffect } from 'react';
import { touchDynamicsInstance } from '../../services/touchDynamicsEngine';
import { speechService } from '../../services/speechService';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Activity, Hand, Zap, ShieldCheck, AlertCircle, Info, Sparkles, RefreshCw, Cpu, DollarSign, Coins, TrendingUp
} from 'lucide-react';

export const TouchBiometricsMonitor = () => {
  const [telemetry, setTelemetry] = useState(() => touchDynamicsInstance.getBiometricsAnalysis());
  const [testTaps, setTestTaps] = useState([]);
  const [lastTestResult, setLastTestResult] = useState(null);
  const [activeViewTab, setActiveViewTab] = useState('LIVE_TELEMETRY'); // 'LIVE_TELEMETRY' | 'AI_NEURAL_WEIGHTS' | 'CLINICAL_MONETIZATION'

  useEffect(() => {
    const unsubscribe = touchDynamicsInstance.subscribe((data) => {
      setTelemetry(data);
    });
    return unsubscribe;
  }, []);

  const handleCalibrationTap = (e) => {
    speechService.playPopSound(700);
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const clickY = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offset = Math.round(Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)));

    const result = {
      x: Math.round(clickX),
      y: Math.round(clickY),
      offsetPx: offset,
      timestamp: new Date().toLocaleTimeString(),
      accuracy: Math.max(0, 100 - offset * 2)
    };

    setTestTaps(prev => [...prev.slice(-4), result]);
    setLastTestResult(result);
  };

  const neuralWeightsData = [
    { feature: 'Micro-Jitter Variance', weight: 40, impact: 'High (Parkinsonian Tremor)' },
    { feature: 'Touch Dwell Hold', weight: 35, impact: 'Moderate (Bradykinesia)' },
    { feature: 'Tap Center Offset', weight: 25, impact: 'Fine Motor Precision' },
    { feature: 'Hesitation Latency', weight: 30, impact: 'Cognitive Processing' }
  ];

  return (
    <div className="glass-card" style={{ marginTop: '28px', padding: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: '#fef3c7',
            color: '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Hand size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
              AI Touch Dynamics & Neurological Motor Biometrics Model
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Continuous real-time telemetry analyzing finger dwell time, tremor micro-jitter & clinical value monetization
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: telemetry.tremorSeverity === 'NORMAL' ? 'rgba(56, 176, 0, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          color: telemetry.tremorSeverity === 'NORMAL' ? '#2b9348' : '#dc2626',
          border: `1px solid ${telemetry.tremorSeverity === 'NORMAL' ? '#a7c957' : '#fca5a5'}`,
          fontSize: '13px',
          fontWeight: '700'
        }}>
          <Cpu size={15} />
          <span>{telemetry.motorClassification.replace(/_/g, ' ')}</span>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveViewTab('LIVE_TELEMETRY')}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            border: activeViewTab === 'LIVE_TELEMETRY' ? '2px solid var(--primary-emerald)' : '1px solid #e2e8f0',
            background: activeViewTab === 'LIVE_TELEMETRY' ? 'var(--primary-emerald)' : '#f8fafc',
            color: activeViewTab === 'LIVE_TELEMETRY' ? 'white' : 'var(--text-dark)',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          📊 Live Touch Telemetry
        </button>

        <button
          onClick={() => setActiveViewTab('AI_NEURAL_WEIGHTS')}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            border: activeViewTab === 'AI_NEURAL_WEIGHTS' ? '2px solid var(--primary-emerald)' : '1px solid #e2e8f0',
            background: activeViewTab === 'AI_NEURAL_WEIGHTS' ? 'var(--primary-emerald)' : '#f8fafc',
            color: activeViewTab === 'AI_NEURAL_WEIGHTS' ? 'white' : 'var(--text-dark)',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          🧠 Neural Feature Weights & AI Learning
        </button>

        <button
          onClick={() => setActiveViewTab('CLINICAL_MONETIZATION')}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            border: activeViewTab === 'CLINICAL_MONETIZATION' ? '2px solid var(--primary-emerald)' : '1px solid #e2e8f0',
            background: activeViewTab === 'CLINICAL_MONETIZATION' ? 'var(--primary-emerald)' : '#f8fafc',
            color: activeViewTab === 'CLINICAL_MONETIZATION' ? 'white' : 'var(--text-dark)',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          💼 Clinical Telehealth Monetization & Coding
        </button>
      </div>

      {activeViewTab === 'LIVE_TELEMETRY' && (
        <>
          {/* 4 Telemetry Metrics Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {/* Metric 1: Motor Stability */}
            <div style={{ background: 'white', padding: '18px', borderRadius: '18px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Motor Stability Score
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-emerald)', margin: '4px 0' }}>
                {telemetry.motorStabilityScore} <span style={{ fontSize: '14px' }}>/ 100</span>
              </div>
              <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>
                {telemetry.motorStabilityScore > 80 ? '✓ Steady Hand Stability' : '⚠️ Minor Tremor Detected'}
              </div>
            </div>

            {/* Metric 2: Micro-Jitter (Tremor) */}
            <div style={{ background: 'white', padding: '18px', borderRadius: '18px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Micro-Jitter (Tremor)
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0284c7', margin: '4px 0' }}>
                {telemetry.avgJitterVariance} <span style={{ fontSize: '14px' }}>px</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Normative Range: &lt; 5.5 px
              </div>
            </div>

            {/* Metric 3: Touch Dwell Hold Duration */}
            <div style={{ background: 'white', padding: '18px', borderRadius: '18px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Average Touch Dwell Time
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#e76f51', margin: '4px 0' }}>
                {telemetry.avgDwellTimeMs} <span style={{ fontSize: '14px' }}>ms</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Fluid Contact Response
              </div>
            </div>

            {/* Metric 4: Tap Center Precision */}
            <div style={{ background: 'white', padding: '18px', borderRadius: '18px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Center Hit Precision
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#8b5cf6', margin: '4px 0' }}>
                {Math.max(50, Math.round(100 - telemetry.avgPrecisionOffsetPx * 1.5))}%
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Avg Offset: ±{telemetry.avgPrecisionOffsetPx}px
              </div>
            </div>
          </div>

          {/* Grid: Live Trajectory Graph + Interactive Touch Calibration Pad */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Real-time Trajectory Chart */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '20px',
              border: '1px solid var(--card-border)'
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={18} color="var(--primary-emerald)" />
                <span>Touch Telemetry & Micro-Jitter Timeline</span>
              </h4>

              <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetry.recentTelemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dwellGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0077b6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0077b6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="dwell" stroke="#0077b6" fillOpacity={1} fill="url(#dwellGradient)" name="Dwell Time (ms)" />
                    <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={2} name="Precision Score (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Live Touch Test & Calibration Pad */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(27,67,50,0.03), rgba(0,119,182,0.05))',
              border: '2px dashed var(--primary-accent)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center'
            }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '4px' }}>
                  🎯 Live Motor Precision Calibration Pad
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Tap anywhere inside the bullseye circle to measure hand stability in real-time
                </p>
              </div>

              {/* Interactive Bullseye */}
              <div
                onClick={handleCalibrationTap}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #e9c46a 0%, #e9c46a 20%, #2d6a4f 21%, #2d6a4f 50%, #1b4332 51%, #1b4332 100%)',
                  boxShadow: '0 8px 24px rgba(27,67,50,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  transition: 'transform 0.1s ease',
                  transform: 'scale(1)'
                }}
                title="Tap the center"
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#e11d48',
                  border: '2px solid white'
                }} />
              </div>

              {/* Test Feedback */}
              <div style={{ marginTop: '14px', fontSize: '13px' }}>
                {lastTestResult ? (
                  <div style={{ color: 'var(--primary-emerald)', fontWeight: '700' }}>
                    ⭐ Tap Precision: {lastTestResult.accuracy}% (Offset: {lastTestResult.offsetPx}px from center)
                  </div>
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    Awaiting touch calibration input...
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {activeViewTab === 'AI_NEURAL_WEIGHTS' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="var(--primary-emerald)" />
              Neural Classifier Feature Importance Weights
            </h4>
            <div style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={neuralWeightsData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 50]} unit="%" />
                  <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="weight" fill="var(--primary-emerald)" radius={[0, 6, 6, 0]} name="Weight Factor (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-dark)' }}>
              Continuous Adaptive Calibration
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', color: 'var(--primary-emerald)' }}>Adaptive Hitbox Scaling</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  Current Scale Factor: <strong>{telemetry.adaptiveHitboxScale}x</strong> (Expanded touch targets if tremor detected)
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', color: '#0284c7' }}>Tremor Spectral Decomposition</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  Resting / Intentional Ratio: <strong>1.12</strong> • Normal Range (No Parkinsonian spike)
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '700', color: '#e76f51' }}>Cognitive Fatigue Accumulator</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>
                  Fatigue State: <strong>{telemetry.fatigueIndex}</strong> • Recommended session duration: 15 mins
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeViewTab === 'CLINICAL_MONETIZATION' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Telehealth Reimbursement Tier Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
            color: 'white',
            padding: '24px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(27,67,50,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#fef08a' }}>
              <TrendingUp size={20} />
              <span style={{ fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>
                Clinical Telehealth Value Engine
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0', color: '#fef08a' }}>
              ₹{telemetry.monetization.telehealthValueINR} <span style={{ fontSize: '14px', color: '#bbf7d0' }}>/ Session Value</span>
            </div>
            <p style={{ fontSize: '12px', opacity: 0.9, lineHeight: 1.4 }}>
              Eligible for Remote Neurological Telemonitoring (CPT Code 99453 / Ayushman Bharat Digital Health Mission).
            </p>
          </div>

          {/* Diagnostic Coding Card */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '10px', color: 'var(--text-dark)' }}>
              📋 Medical Diagnostic & Coding Cross-Walk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>ICD-10 Code:</span>
                <span style={{ fontWeight: '700', color: 'var(--primary-emerald)' }}>{telemetry.monetization.icdCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>CPT Telemetry Code:</span>
                <span style={{ fontWeight: '700', color: '#0284c7' }}>{telemetry.monetization.cptCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Steady Touch Bonus:</span>
                <span style={{ fontWeight: '700', color: '#b45309' }}>+{telemetry.monetization.steadyBonusCount} Tokens</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
