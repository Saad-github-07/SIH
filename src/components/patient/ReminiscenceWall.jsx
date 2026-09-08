import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Volume2, Plus, Sparkles, MapPin, Edit2, Trash2, Star, Search } from 'lucide-react';
import { FamilyMemberModal } from './FamilyMemberModal';

export const ReminiscenceWall = () => {
  const {
    t,
    familyMembers,
    deleteFamilyMember,
    toggleStarFamilyMember,
    speakText,
    language
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlayVoice = (card) => {
    setActiveVoiceId(card.id);
    if (card.audioBlobUrl) {
      const audio = new Audio(card.audioBlobUrl);
      audio.play();
    } else {
      speakText(card.voiceMemoText);
    }
    setTimeout(() => setActiveVoiceId(null), 4000);
  };

  const handleEdit = (card) => {
    setEditingMember(card);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this family member from the wall?')) {
      deleteFamilyMember(id);
    }
  };

  const filteredMembers = familyMembers.filter(m => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.relationship.toLowerCase().includes(q) ||
      (m.location && m.location.toLowerCase().includes(q))
    );
  }).sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));

  return (
    <div style={{ marginTop: '36px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={24} style={{ color: '#e11d48' }} />
            {t.reminiscenceTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            {t.reminiscenceSubtitle}
          </p>
        </div>

        {/* Search & Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '6px 12px'
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search family member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '13px', width: '160px' }}
            />
          </div>

          <button
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
            className="btn-primary"
            style={{ padding: '8px 16px' }}
          >
            <Plus size={18} />
            <span>Add Family Member</span>
          </button>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <Heart size={40} style={{ color: '#e11d48', margin: '0 auto 12px auto', opacity: 0.7 }} />
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>No family members found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
            Click "Add Family Member" to upload photos and save audio memories for your loved one.
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
            style={{ margin: '0 auto' }}
          >
            <Plus size={18} />
            <span>Add First Family Member</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredMembers.map((card) => (
            <div
              key={card.id}
              className="glass-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: card.starred ? '2px solid #e9c46a' : '1px solid var(--card-border)',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img
                    src={card.photo}
                    alt={card.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.65)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {card.relationship}
                  </span>

                  {/* Star Favorite Button */}
                  <button
                    onClick={() => toggleStarFamilyMember(card.id)}
                    title={card.starred ? "Unstar" : "Star favorite"}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.65)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: card.starred ? '#e9c46a' : 'white',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <Star size={16} fill={card.starred ? '#e9c46a' : 'none'} />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      {card.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 12px 0' }}>
                      <MapPin size={14} />
                      <span>{card.location || 'North East India'}</span>
                    </div>
                  </div>

                  {/* Edit / Delete Options */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => handleEdit(card)}
                      title="Edit family memory"
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
                      onClick={() => handleDelete(card.id)}
                      title="Remove from wall"
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
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'rgba(27, 67, 50, 0.04)', padding: '10px 14px', borderRadius: '12px' }}>
                  💡 <strong>Memory Note:</strong> {card.frequentMemory}
                </p>
              </div>

              <button
                className="btn-primary"
                onClick={() => handlePlayVoice(card)}
                style={{
                  marginTop: '18px',
                  width: '100%',
                  background: activeVoiceId === card.id ? '#e9c46a' : 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                  color: activeVoiceId === card.id ? 'black' : 'white',
                  justifyContent: 'center'
                }}
              >
                <Volume2 size={18} />
                {activeVoiceId === card.id ? "Playing Voice Note..." : (t.playVoiceNote || "Play Voice Note")}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Family Member Modal */}
      <FamilyMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingMember={editingMember}
      />
    </div>
  );
};

