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
    <div style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={28} style={{ color: '#e11d48' }} />
            {t.reminiscenceTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', fontWeight: '600', marginTop: '4px' }}>
            {t.reminiscenceSubtitle}
          </p>
        </div>

        {/* Search & Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            border: '2px solid var(--card-border)',
            borderRadius: '14px',
            padding: '8px 16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search family member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '15px', width: '180px', fontWeight: '600' }}
            />
          </div>

          <button
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '16px' }}
          >
            <Plus size={20} />
            <span>Add Family Member</span>
          </button>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: '600' }}>No family members found matching "{searchQuery}".</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredMembers.map((card) => (
            <div key={card.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', height: '220px', marginBottom: '16px', border: '2px solid var(--card-border)' }}>
                  <img
                    src={card.photoUrl || card.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={card.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <button
                      onClick={() => toggleStarFamilyMember(card.id)}
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Star favorite family member"
                    >
                      <Star size={18} fill={card.starred ? '#f59e0b' : 'none'} color={card.starred ? '#f59e0b' : '#64748b'} />
                    </button>

                    <button
                      onClick={() => handleEdit(card)}
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Edit details"
                    >
                      <Edit2 size={16} color="#0f172a" />
                    </button>

                    <button
                      onClick={() => handleDelete(card.id)}
                      style={{
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Delete card"
                    >
                      <Trash2 size={16} color="#dc2626" />
                    </button>
                  </div>

                  <span style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(27, 67, 50, 0.85)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '800'
                  }}>
                    {card.relationship}
                  </span>
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
                  {card.name}
                </h3>

                {card.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px', fontWeight: '600' }}>
                    <MapPin size={16} color="#0077b6" />
                    <span>{card.location}</span>
                  </div>
                )}

                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.5', fontStyle: 'italic', marginBottom: '18px' }}>
                  "{card.voiceMemoText}"
                </p>
              </div>

              <button
                onClick={() => handlePlayVoice(card)}
                className="btn-primary"
                style={{
                  width: '100%',
                  background: activeVoiceId === card.id ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #1b4332, #2d6a4f)',
                  fontSize: '16px',
                  padding: '12px 18px',
                  borderRadius: '16px'
                }}
              >
                <Volume2 size={20} className={activeVoiceId === card.id ? 'spin' : ''} />
                <span>{activeVoiceId === card.id ? 'Playing Voice Clip...' : 'Play Voice Note 🔊'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <FamilyMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          memberToEdit={editingMember}
        />
      )}
    </div>
  );
};
