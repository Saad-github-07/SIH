import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Pill, Clock, AlertCircle, Check, Sparkles, Calendar } from 'lucide-react';

const ICON_PRESETS = [
  { icon: '💊', label: 'Tablet / Pill' },
  { icon: '🧪', label: 'Syrup / Tonic' },
  { icon: '💧', label: 'Eye/Ear Drops' },
  { icon: '💉', label: 'Injection / Insulin' },
  { icon: '🍵', label: 'Herbal Kadha' },
  { icon: '🩺', label: 'Doctor Visit' },
  { icon: '🍏', label: 'Dietary Nutrition' },
  { icon: '🌙', label: 'Bedtime Med' },
];

const TIME_SLOTS = [
  { id: 'Morning', label: '🌅 Morning (06:00 - 11:00 AM)' },
  { id: 'Afternoon', label: '☀️ Afternoon (12:00 - 04:00 PM)' },
  { id: 'Evening', label: '🌇 Evening (05:00 - 08:00 PM)' },
  { id: 'Night', label: '🌙 Night (08:30 - 11:00 PM)' },
  { id: 'AsNeeded', label: '⚡ As Needed (SOS)' }
];

export const MedicineModal = ({ isOpen, onClose, editingMed = null }) => {
  const { addReminder, updateReminder, speakText } = useApp();

  const [title, setTitle] = useState('');
  const [dose, setDose] = useState('1 Tablet after food');
  const [time, setTime] = useState('08:00 AM');
  const [slot, setSlot] = useState('Morning');
  const [icon, setIcon] = useState('💊');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingMed) {
      setTitle(editingMed.title || '');
      setDose(editingMed.dose || '1 Tablet');
      setTime(editingMed.time || '08:00 AM');
      setSlot(editingMed.slot || 'Morning');
      setIcon(editingMed.icon || '💊');
      setNotes(editingMed.notes || '');
    } else {
      setTitle('');
      setDose('1 Tablet with water after breakfast');
      setTime('08:00 AM');
      setSlot('Morning');
      setIcon('💊');
      setNotes('Take regularly every morning');
    }
  }, [editingMed, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter medication name');
      return;
    }

    const payload = {
      title: title.trim(),
      dose: dose.trim(),
      time,
      slot,
      icon,
      notes: notes.trim(),
      type: icon === '🩺' ? 'APPOINTMENT' : 'MEDICATION'
    };

    if (editingMed) {
      updateReminder(editingMed.id, payload);
    } else {
      addReminder(payload);
    }

    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div className="glass-card fade-in" style={{
        background: 'white',
        maxWidth: '520px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '2px solid var(--primary-accent)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Pill size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
                {editingMed ? 'Edit Medication / Reminder' : 'Add Medication Reminder'}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Customize medicine name, schedule & voice reminder
              </p>
            </div>
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
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Icon Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px', display: 'block' }}>
              Select Medicine / Reminder Type:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {ICON_PRESETS.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setIcon(item.icon)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '12px',
                    border: icon === item.icon ? '2px solid var(--primary-emerald)' : '1px solid var(--card-border)',
                    background: icon === item.icon ? 'rgba(27, 67, 50, 0.08)' : 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '22px' }}>{item.icon}</span>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-dark)' }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Medicine Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
              Medicine Name & Strength *
            </label>
            <input
              type="text"
              placeholder="e.g. Donepezil 5mg, Memantine 10mg, Vitamin D"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                fontSize: '14px',
                fontWeight: '600'
              }}
            />
          </div>

          {/* Dosage & Timing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
                Dosage & Form *
              </label>
              <input
                type="text"
                placeholder="e.g. 1 Tablet, 5ml syrup"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
                Scheduled Time *
              </label>
              <input
                type="text"
                placeholder="e.g. 08:00 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Time Slot Category */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
              Time Category / Slot
            </label>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {TIME_SLOTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Special Instructions */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
              Special Instructions / Caregiver Note:
            </label>
            <input
              type="text"
              placeholder="e.g. Take with warm water after food. Do not skip."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                fontSize: '13px'
              }}
            />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 2, justifyContent: 'center' }}
            >
              <Check size={18} />
              <span>{editingMed ? 'Update Medicine' : 'Save Medicine'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
