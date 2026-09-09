import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speechService';
import {
  X, Upload, Mic, Square, Play, Volume2, Heart,
  MapPin, Sparkles, User, UserCheck, AlertCircle, Check
} from 'lucide-react';

const AVATAR_PRESETS = [
  { label: 'Son', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { label: 'Daughter', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
  { label: 'Grandson', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80' },
  { label: 'Granddaughter', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { label: 'Spouse', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { label: 'Caregiver/Doctor', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80' },
];

const RELATION_OPTIONS = [
  'Son (পুত্র / ল’ৰা)',
  'Daughter (কন্যা / ছোৱালী)',
  'Grandchild (নাতি / নাতিনী)',
  'Spouse / Wife / Husband (পত্নী / পতি)',
  'Brother / Sister (ভাই / ভনী)',
  'Daughter-in-law / Son-in-law (বোৱাৰী / জোঁৱাই)',
  'Close Friend / Neighbor (মিত্ৰ / চুবুৰীয়া)',
  'Family Doctor / Nurse (চিকিৎসক)'
];

export const FamilyMemberModal = ({ isOpen, onClose, editingMember = null }) => {
  const { addFamilyMember, updateFamilyMember, speakText, language } = useApp();

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState(RELATION_OPTIONS[0]);
  const [location, setLocation] = useState('Guwahati, Assam');
  const [photo, setPhoto] = useState(AVATAR_PRESETS[0].url);
  const [voiceMemoText, setVoiceMemoText] = useState('');
  const [frequentMemory, setFrequentMemory] = useState('');

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name || '');
      setRelationship(editingMember.relationship || RELATION_OPTIONS[0]);
      setLocation(editingMember.location || 'Guwahati, Assam');
      setPhoto(editingMember.photo || AVATAR_PRESETS[0].url);
      setVoiceMemoText(editingMember.voiceMemoText || '');
      setFrequentMemory(editingMember.frequentMemory || '');
      setAudioUrl(editingMember.audioBlobUrl || null);
    } else {
      setName('');
      setRelationship(RELATION_OPTIONS[0]);
      setLocation('Guwahati, Assam');
      setPhoto(AVATAR_PRESETS[0].url);
      setVoiceMemoText('Kaka, sending you love! We are thinking of you today.');
      setFrequentMemory('Loves drinking morning Assam tea together and talking about old times');
      setAudioUrl(null);
    }
  }, [editingMember, isOpen]);

  if (!isOpen) return null;

  // File Upload to Data URL
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Live Audio Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      speakText('Recording voice message');
    } catch (err) {
      alert('Microphone access not permitted. You can still use the text voice assistant!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      speechService.playSuccessChime();
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else if (voiceMemoText) {
      speechService.speak(voiceMemoText, language);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter family member name');
      return;
    }

    const payload = {
      name: name.trim(),
      relationship,
      location: location.trim(),
      photo,
      photoUrl: photo,
      voiceMemoText: voiceMemoText.trim() || `Kaka, sending warm wishes from ${name}!`,
      frequentMemory: frequentMemory.trim() || 'Treasured family memory',
      audioBlobUrl: audioUrl
    };

    if (editingMember) {
      updateFamilyMember(editingMember.id, payload);
    } else {
      addFamilyMember(payload);
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
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '2px solid var(--primary-accent)'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#ffe4e6',
              color: '#e11d48',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
                {editingMember ? 'Edit Family Memory' : 'Add Family Member'}
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Help patient recognize loved ones with photo, voice & memories
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Photo Preview & Selection */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px', display: 'block' }}>
              Family Member Photo:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              <img
                src={photo}
                alt="Preview"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '3px solid var(--primary-emerald)'
                }}
              />
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  background: 'rgba(27, 67, 50, 0.08)',
                  color: 'var(--primary-emerald)',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>
                  <Upload size={16} />
                  <span>Upload Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Or pick from avatars below:
                </div>
              </div>
            </div>

            {/* Avatar presets */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {AVATAR_PRESETS.map((preset, idx) => (
                <img
                  key={idx}
                  src={preset.url}
                  alt={preset.label}
                  onClick={() => setPhoto(preset.url)}
                  title={preset.label}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: photo === preset.url ? '3px solid var(--primary-accent)' : '2px solid transparent',
                    opacity: photo === preset.url ? 1 : 0.7,
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Name & Relationship */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Phukan"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
                Relationship *
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {RELATION_OPTIONS.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
              City / Location (NER)
            </label>
            <input
              type="text"
              placeholder="e.g. Guwahati, Shillong, Jorhat, Imphal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Special Memory Note */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px', display: 'block' }}>
              💡 Frequent Memory / Uplifting Story:
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Loves drinking Assam tea together in the morning and singing old Bihu songs"
              value={frequentMemory}
              onChange={(e) => setFrequentMemory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                fontSize: '13px',
                resize: 'none'
              }}
            />
          </div>

          {/* Voice Note & Speech Message */}
          <div style={{
            background: 'rgba(27, 67, 50, 0.04)',
            padding: '14px',
            borderRadius: '16px',
            border: '1px solid rgba(27, 67, 50, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-emerald)' }}>
                🎙️ Audio / Voice Note Message:
              </label>

              {/* Record / Play buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      background: '#e11d48',
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    <Mic size={14} />
                    <span>Record Mic</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      background: '#1b4332',
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      animation: 'pulse 1s infinite'
                    }}
                  >
                    <Square size={14} />
                    <span>Stop Recording</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={playRecordedAudio}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'var(--primary-accent)',
                    color: 'var(--text-dark)',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <Volume2 size={14} />
                  <span>Test Voice</span>
                </button>
              </div>
            </div>

            <textarea
              rows={2}
              placeholder="Type what this family member says to elder (e.g. Kaka, this is Rahul! Remember we visited Kaziranga together?)"
              value={voiceMemoText}
              onChange={(e) => setVoiceMemoText(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid var(--card-border)',
                fontSize: '13px',
                background: 'white',
                resize: 'none'
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
              <span>{editingMember ? 'Save Changes' : 'Add to Family Wall'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
