import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { a2aProtocolInstance } from '../../services/a2aProtocol';
import { speechService } from '../../services/speechService';
import {
  Network, Cpu, Send, CheckCircle2, Zap, Play, Sparkles,
  Volume2, ShieldCheck, Heart, Terminal, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';

export const A2ALiveCoPilot = () => {
  const {
    dispatchA2ATask,
    aiDifficultyStage,
    cognitiveScore,
    smritiCoins,
    hydrationCount,
    speakText,
    language
  } = useApp();

  const [isExecuting, setIsExecuting] = useState(false);
  const [activeAgentExecuting, setActiveAgentExecuting] = useState(null);
  const [latestActionResult, setLatestActionResult] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [taskFeed, setTaskFeed] = useState(() => a2aProtocolInstance.getTaskHistory().slice(0, 4));

  useEffect(() => {
    const unsubscribe = a2aProtocolInstance.subscribe((event) => {
      setTaskFeed(a2aProtocolInstance.getTaskHistory().slice(0, 4));
    });
    return unsubscribe;
  }, []);

  const triggerAgentAction = async (targetAgentId, skillId, customParams = {}) => {
    setIsExecuting(true);
    setActiveAgentExecuting(targetAgentId);
    speechService.playPopSound(700);

    const result = await dispatchA2ATask({
      targetAgentId,
      skillId,
      parameters: {
        language,
        currentStage: aiDifficultyStage,
        cognitiveScore,
        ...customParams
      }
    });

    setIsExecuting(false);
    setActiveAgentExecuting(null);
    if (result?.responsePayload?.result) {
      setLatestActionResult({
        agentId: targetAgentId,
        action: result.responsePayload.result.actionExecuted || "Task executed successfully",
        timestamp: new Date().toLocaleTimeString()
      });
    }
  };

  return (
    <div className="glass-card fade-in" style={{
      marginTop: '28px',
      marginBottom: '28px',
      padding: '24px',
      borderRadius: '24px',
      background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95), rgba(224, 242, 254, 0.9))',
      border: '2px solid rgba(2, 132, 199, 0.35)',
      boxShadow: '0 12px 32px rgba(2, 132, 199, 0.12)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: isCollapsed ? 'none' : '1px solid rgba(2, 132, 199, 0.2)',
        paddingBottom: isCollapsed ? '0' : '14px',
        marginBottom: isCollapsed ? '0' : '18px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
          }}>
            <Network size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Google A2A Active Multi-Agent Co-Pilot
              </h3>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '8px',
                background: '#22c55e',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
                5 AGENTS ACTIVE
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475569' }}>
              Click any agent to execute autonomous in-app interventions (Difficulty scaling, Touch stabilization, Folk narration)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              background: 'white',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#0284c7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isCollapsed ? <><ChevronDown size={14} /> Expand Co-Pilot</> : <><ChevronUp size={14} /> Collapse</>}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Action Trigger Buttons Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px',
            marginBottom: '18px'
          }}>
            {/* 1. Biometrics Agent Trigger */}
            <button
              onClick={() => triggerAgentAction('smriti.ner.biometrics', 'analyze_touch_biometrics')}
              disabled={isExecuting}
              style={{
                background: activeAgentExecuting === 'smriti.ner.biometrics' ? '#e0f2fe' : 'white',
                border: activeAgentExecuting === 'smriti.ner.biometrics' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                padding: '14px',
                borderRadius: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>✋</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '6px' }}>
                  +20 COINS
                </span>
              </div>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>
                Biometrics Agent
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Calibrate touch steadiness & auto-scale UI hitboxes
              </div>
            </button>

            {/* 2. Therapy Agent Trigger */}
            <button
              onClick={() => triggerAgentAction('smriti.ner.therapy', 'generate_cognitive_exercise', { requestedStage: aiDifficultyStage === 1 ? 2 : aiDifficultyStage === 2 ? 3 : 1 })}
              disabled={isExecuting}
              style={{
                background: activeAgentExecuting === 'smriti.ner.therapy' ? '#f0fdf4' : 'white',
                border: activeAgentExecuting === 'smriti.ner.therapy' ? '2px solid #16a34a' : '1px solid #cbd5e1',
                padding: '14px',
                borderRadius: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>🎮</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '6px' }}>
                  +3 STARS
                </span>
              </div>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>
                Therapy Agent
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Auto-tune cognitive stage & rebalance games
              </div>
            </button>

            {/* 3. Reminiscence Agent Trigger */}
            <button
              onClick={() => triggerAgentAction('smriti.ner.reminiscence', 'retrieve_family_reminiscence')}
              disabled={isExecuting}
              style={{
                background: activeAgentExecuting === 'smriti.ner.reminiscence' ? '#fff1f2' : 'white',
                border: activeAgentExecuting === 'smriti.ner.reminiscence' ? '2px solid #e11d48' : '1px solid #cbd5e1',
                padding: '14px',
                borderRadius: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>🌸</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#e11d48', background: '#ffe4e6', padding: '2px 6px', borderRadius: '6px' }}>
                  FOLK TALE
                </span>
              </div>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>
                Reminiscence Agent
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Play Bihu dhol instrument & narrate cultural story
              </div>
            </button>

            {/* 4. Caregiver Agent Trigger */}
            <button
              onClick={() => triggerAgentAction('smriti.ner.caregiver', 'dispatch_caregiver_alert')}
              disabled={isExecuting}
              style={{
                background: activeAgentExecuting === 'smriti.ner.caregiver' ? '#fefce8' : 'white',
                border: activeAgentExecuting === 'smriti.ner.caregiver' ? '2px solid #ca8a04' : '1px solid #cbd5e1',
                padding: '14px',
                borderRadius: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>🏥</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#ca8a04', background: '#fef9c3', padding: '2px 6px', borderRadius: '6px' }}>
                  HEALTH CHECK
                </span>
              </div>
              <div style={{ fontWeight: '800', fontSize: '13px', color: '#0f172a' }}>
                Caregiver Agent
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Log hydration vitals & verify medication schedule
              </div>
            </button>

            {/* 5. Orchestrator Full Cycle Trigger */}
            <button
              onClick={() => triggerAgentAction('smriti.ner.orchestrator', 'run_full_multiagent_synthesis')}
              disabled={isExecuting}
              style={{
                background: activeAgentExecuting === 'smriti.ner.orchestrator' ? '#f5f3ff' : 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                color: activeAgentExecuting === 'smriti.ner.orchestrator' ? '#0f172a' : 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '16px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(27,67,50,0.25)',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>🌐</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#451a03', background: '#fef08a', padding: '2px 6px', borderRadius: '6px' }}>
                  +50 COINS ⭐
                </span>
              </div>
              <div style={{ fontWeight: '800', fontSize: '13px' }}>
                Run Full Orchestration
              </div>
              <div style={{ fontSize: '11px', opacity: 0.85 }}>
                Trigger all 4 agents in sequential care workflow
              </div>
            </button>
          </div>

          {/* Live Action Execution Feedback Box */}
          {latestActionResult && (
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              padding: '12px 16px',
              border: '1.5px solid #22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              fontSize: '13px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span style={{ fontWeight: '700', color: '#166534' }}>
                  [A2A Inter-Agent Action Executed]: {latestActionResult.action}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                {latestActionResult.timestamp}
              </span>
            </div>
          )}

          {/* Real-time Agent Dialogue Feed */}
          <div style={{
            background: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '16px',
            padding: '14px 18px',
            fontSize: '12px',
            fontFamily: 'monospace',
            maxHeight: '130px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: '700', marginBottom: '6px' }}>
              <Terminal size={14} />
              <span>LIVE A2A PROTOCOL AUDIT STREAM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {taskFeed.map((task) => (
                <div key={task.taskId} style={{ opacity: 0.9 }}>
                  <span style={{ color: '#a78bfa' }}>[{task.timestamp}]</span>{' '}
                  <span style={{ color: '#38bdf8' }}>{task.senderAgent}</span> ➔{' '}
                  <span style={{ color: '#4ade80' }}>{task.targetAgent}</span>:{' '}
                  <span style={{ color: '#fde047' }}>{task.requestPayload?.params?.skill || task.requestPayload?.params?.skillId || 'execute_skill'}</span>{' '}
                  ({task.status})
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
