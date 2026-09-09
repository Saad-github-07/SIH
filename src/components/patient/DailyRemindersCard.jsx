import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Droplet, Pill, Calendar, CheckCircle, Plus, Edit2, Trash2, Clock, Sparkles, Filter } from 'lucide-react';
import { MedicineModal } from './MedicineModal';

export const DailyRemindersCard = () => {
  const {
    t,
    hydrationCount,
    hydrationGoal,
    addHydration,
    removeHydration,
    resetHydration,
    reminders,
    toggleReminder,
    deleteReminder,
    speakText
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [activeSlot, setActiveSlot] = useState('ALL');

  const percentage = Math.round((hydrationCount / hydrationGoal) * 100);

  const filteredReminders = reminders.filter(rem => {
    if (activeSlot === 'ALL') return true;
    return rem.slot === activeSlot || (rem.type === 'APPOINTMENT' && activeSlot === 'ALL');
  });

  const completedCount = reminders.filter(r => r.taken).length;

  const handleEdit = (e, rem) => {
    e.stopPropagation();
    setEditingMed(rem);
    setIsModalOpen(true);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this medication reminder?')) {
      deleteReminder(id);
    }
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '32px' }}>
        {/* 1. Hydration Tracker Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  background: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Droplet size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text-dark)' }}>{t.hydrationGoal || "Water Hydration Goal"}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '600' }}>Daily Hydration Target: {hydrationGoal} glasses</p>
                </div>
              </div>

              <span style={{ fontSize: '28px', fontWeight: '900', color: '#0284c7' }}>
                {hydrationCount}/{hydrationGoal}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '14px',
              background: '#e2e8f0',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '14px'
            }}>
              <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
                borderRadius: '10px',
                transition: 'width 0.4s ease'
              }} />
            </div>

            {/* Visual Glass Indicators */}
            <div style={{
              display: 'flex',
              gap: '6px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '14px',
              padding: '8px',
              background: 'rgba(2, 132, 199, 0.05)',
              borderRadius: '14px'
            }}>
              {Array.from({ length: hydrationGoal }).map((_, idx) => {
                const isFilled = idx < hydrationCount;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx < hydrationCount) {
                        removeHydration();
                      } else {
                        addHydration();
                      }
                    }}
                    title={isFilled ? `Glass ${idx + 1} logged (Click to undo)` : `Glass ${idx + 1} (Click to log)`}
                    style={{
                      width: '36px',
                      height: '42px',
                      borderRadius: '10px',
                      border: isFilled ? '2px solid #0284c7' : '1px solid #cbd5e1',
                      background: isFilled ? '#f0f9ff' : 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Droplet size={20} color={isFilled ? '#0284c7' : '#94a3b8'} fill={isFilled ? '#0284c7' : 'none'} />
                  </button>
                );
              })}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', textAlign: 'center', fontWeight: '600' }}>
              {hydrationCount >= hydrationGoal ? (
                <strong style={{ color: '#16a34a' }}>Daily hydration goal achieved ({hydrationCount}/{hydrationGoal} glasses)!</strong>
              ) : hydrationCount === 0 ? (
                <span>Start your day with a fresh glass of water.</span>
              ) : (
                <span><strong>{hydrationGoal - hydrationCount} glasses</strong> remaining to reach your target.</span>
              )}
            </p>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-primary"
              onClick={addHydration}
              disabled={hydrationCount >= hydrationGoal}
              style={{
                flex: 3,
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                opacity: hydrationCount >= hydrationGoal ? 0.6 : 1,
                justifyContent: 'center',
                padding: '12px 16px',
                fontSize: '15px'
              }}
            >
              <Plus size={18} />
              <span>Log Glass (+1)</span>
            </button>

            <button
              onClick={removeHydration}
              disabled={hydrationCount === 0}
              title="Undo last glass"
              style={{
                flex: 1,
                borderRadius: '16px',
                border: '1px solid var(--card-border)',
                background: 'white',
                color: 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '13px',
                cursor: hydrationCount === 0 ? 'not-allowed' : 'pointer',
                opacity: hydrationCount === 0 ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              -1 Undo
            </button>

            <button
              onClick={resetHydration}
              title="Reset hydration counter to 0"
              style={{
                flex: 1,
                borderRadius: '16px',
                border: '1px solid var(--card-border)',
                background: 'white',
                color: '#dc2626',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* 2. Medication Schedule & Customization Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: '#ffe4e6',
                color: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Pill size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text-dark)' }}>{t.medicationTitle}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {completedCount} of {reminders.length} doses completed today
                </p>
              </div>
            </div>

            {/* Add New Custom Medicine Button */}
            <button
              onClick={() => {
                setEditingMed(null);
                setIsModalOpen(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(27,67,50,0.18)'
              }}
            >
              <Plus size={18} />
              <span>Add Medicine</span>
            </button>
          </div>

          {/* Slot Filter Chips */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '14px', paddingBottom: '4px' }}>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'Morning', label: '🌅 Morning' },
              { id: 'Afternoon', label: '☀️ Afternoon' },
              { id: 'Evening', label: '🌇 Evening' },
              { id: 'Night', label: '🌙 Night' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSlot(tab.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: activeSlot === tab.id ? '2px solid var(--primary-emerald)' : '1px solid var(--card-border)',
                  background: activeSlot === tab.id ? 'rgba(27, 67, 50, 0.1)' : 'white',
                  color: activeSlot === tab.id ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Medicine List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredReminders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
                No medicines scheduled for this slot. Click "Add Medicine" to add one!
              </div>
            ) : (
              filteredReminders.map((rem) => (
                <div
                  key={rem.id}
                  onClick={() => toggleReminder(rem.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    background: rem.taken ? 'rgba(56, 176, 0, 0.08)' : 'white',
                    border: `2px solid ${rem.taken ? '#a7c957' : 'var(--card-border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span style={{ fontSize: '24px' }}>{rem.icon}</span>
                    <div>
                      <div style={{
                        fontWeight: '700',
                        fontSize: '14px',
                        color: rem.taken ? '#2b9348' : 'var(--text-dark)',
                        textDecoration: rem.taken ? 'line-through' : 'none'
                      }}>
                        {rem.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{rem.time}</span>
                        <span>•</span>
                        <span>{rem.dose}</span>
                      </div>
                      {rem.notes && (
                        <div style={{ fontSize: '11px', color: 'var(--primary-emerald)', fontStyle: 'italic', marginTop: '2px' }}>
                          ℹ️ {rem.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={(e) => handleEdit(e, rem)}
                      title="Edit medicine details"
                      style={{
                        background: '#f1f5f9',
                        border: 'none',
                        borderRadius: '8px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <Edit2 size={13} />
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, rem.id)}
                      title="Delete medicine reminder"
                      style={{
                        background: '#fee2e2',
                        border: 'none',
                        borderRadius: '8px',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#dc2626'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>

                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: rem.taken ? '#38b000' : '#f1f5f9',
                      color: rem.taken ? 'white' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '4px'
                    }}>
                      <CheckCircle size={18} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Medicine Modal */}
      <MedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingMed={editingMed}
      />
    </>
  );
};

