import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { speechService } from '../../services/speechService';
import { touchDynamicsInstance } from '../../services/touchDynamicsEngine';
import {
  Coins, Sparkles, ShoppingBag, CheckCircle, Lock,
  Award, Heart, Volume2, Palette, Gift, X, Star, Zap, Info
} from 'lucide-react';

export const BazaarRewardsModal = ({ onClose }) => {
  const {
    smritiCoins,
    spendCoins,
    unlockedItems,
    activeAvatar,
    setActiveAvatar,
    activeTheme,
    setActiveTheme,
    bazaarItems,
    speakText
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | 'AVATARS' | 'VOICES' | 'THEMES' | 'GIFTS'
  const [purchaseSuccessItem, setPurchaseSuccessItem] = useState(null);
  const telemetry = touchDynamicsInstance.getBiometricsAnalysis();

  const filteredItems = activeCategory === 'ALL'
    ? bazaarItems
    : bazaarItems.filter(item => item.category === activeCategory);

  const handlePurchase = (item) => {
    if (unlockedItems.includes(item.id)) {
      // Already unlocked - equip it
      if (item.category === 'AVATARS') {
        setActiveAvatar(item.id);
        speechService.playPopSound(700);
        speakText(`Equipped ${item.name}`);
      } else if (item.category === 'THEMES') {
        setActiveTheme(item.id);
        speechService.playPopSound(700);
        speakText(`Applied ${item.name}`);
      } else if (item.category === 'VOICES') {
        speechService.playPopSound(700);
        speakText(`Selected voice pack ${item.name}`);
      }
      return;
    }

    const success = spendCoins(item.cost, item.id);
    if (success) {
      setPurchaseSuccessItem(item);
      if (item.category === 'AVATARS') setActiveAvatar(item.id);
      if (item.category === 'THEMES') setActiveTheme(item.id);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card fade-in" style={{
        background: 'white',
        maxWidth: '860px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
        borderRadius: '28px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
        border: '2px solid rgba(233, 196, 106, 0.4)'
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '2px solid #f1f5f9',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #e9c46a, #f4a261)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 8px 18px rgba(233, 196, 106, 0.4)'
            }}>
              🪙
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
                NER Cultural Bazaar & Rewards
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Redeem your earned Smriti Coins from steady touch & cognitive games
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Top Wallet & AI Telemetry Earnings Summary Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(27,67,50,0.95), rgba(45,106,79,0.9))',
          color: 'white',
          padding: '20px 24px',
          borderRadius: '20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
              Your Smriti Coin Wallet
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#fef08a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🪙 {smritiCoins}</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#bbf7d0' }}>Coins</span>
            </div>
          </div>

          {/* AI Touch Telemetry Earnings Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            padding: '12px 18px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#fef08a', marginBottom: '2px' }}>
              <Zap size={15} />
              <span>AI Touch & Game Telemetry Bonus</span>
            </div>
            <div style={{ opacity: 0.9 }}>
              Steady Touch Motor Score: <strong>{telemetry.motorStabilityScore}/100</strong> (+{telemetry.monetization.coinsEarned} Coins)
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
          {[
            { id: 'ALL', label: 'All Items', icon: <ShoppingBag size={16} /> },
            { id: 'AVATARS', label: 'Regional Avatars', icon: <Sparkles size={16} /> },
            { id: 'VOICES', label: 'Folk Voice Guides', icon: <Volume2 size={16} /> },
            { id: 'THEMES', label: 'Festive Themes', icon: <Palette size={16} /> },
            { id: 'GIFTS', label: 'Wellness Hampers', icon: <Gift size={16} /> }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                speechService.playPopSound(600);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '14px',
                border: activeCategory === cat.id ? '2px solid var(--primary-emerald)' : '1px solid #e2e8f0',
                background: activeCategory === cat.id ? 'var(--primary-emerald)' : '#f8fafc',
                color: activeCategory === cat.id ? 'white' : 'var(--text-dark)',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '18px'
        }}>
          {filteredItems.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id);
            const isEquipped = (item.category === 'AVATARS' && activeAvatar === item.id) ||
                               (item.category === 'THEMES' && activeTheme === item.id);

            return (
              <div
                key={item.id}
                style={{
                  background: isUnlocked ? '#f0fdf4' : 'white',
                  border: isEquipped ? '2px solid #16a34a' : isUnlocked ? '1.5px solid #86efac' : '1px solid var(--card-border)',
                  borderRadius: '20px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isEquipped ? '0 8px 24px rgba(22, 163, 74, 0.15)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{
                      fontSize: '36px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      background: item.colorHex ? `${item.colorHex}22` : '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e2e8f0'
                    }}>
                      {item.icon}
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: '#fef3c7',
                      color: '#b45309'
                    }}>
                      {item.region}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    paddingTop: '8px',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#b45309' }}>
                      🪙 {item.cost} Coins
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
                      {item.previewBadge}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePurchase(item)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '14px',
                      border: 'none',
                      fontWeight: '800',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      background: isEquipped
                        ? '#16a34a'
                        : isUnlocked
                        ? '#0284c7'
                        : smritiCoins >= item.cost
                        ? 'linear-gradient(135deg, #e9c46a, #f4a261)'
                        : '#cbd5e1',
                      color: isEquipped || isUnlocked || smritiCoins < item.cost ? 'white' : '#1e293b'
                    }}
                  >
                    {isEquipped ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Active / Equipped</span>
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Sparkles size={16} />
                        <span>Equip / Use</span>
                      </>
                    ) : (
                      <>
                        <Coins size={16} />
                        <span>Unlock for {item.cost}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div style={{
          marginTop: '28px',
          padding: '14px 18px',
          borderRadius: '14px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <Info size={18} color="var(--primary-emerald)" />
          <span>
            <strong>How to earn more Smriti Coins:</strong> Tap calmly and accurately (+15 coins/session), drink water (+10 coins), complete daily cognitive games (+25 coins), and maintain your daily streaks!
          </span>
        </div>
      </div>
    </div>
  );
};
