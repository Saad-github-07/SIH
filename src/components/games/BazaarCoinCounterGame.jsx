import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GameContainer } from './GameContainer';
import { NER_BAZAAR_ITEMS } from '../../data/nerThemes';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';
import { ShoppingBag, RotateCcw, Check, ArrowRight, Award, Star, DollarSign, Store } from 'lucide-react';

const COIN_DENOMINATIONS = [
  { value: 5, label: '₹5 Coin', icon: '🪙', color: '#cbd5e1', textColor: '#1e293b' },
  { value: 10, label: '₹10 Coin', icon: '🪙', color: '#f59e0b', textColor: '#78350f' },
  { value: 20, label: '₹20 Note', icon: '💵', color: '#f97316', textColor: '#7c2d12' },
  { value: 50, label: '₹50 Note', icon: '💵', color: '#06b6d4', textColor: '#164e63' },
  { value: 100, label: '₹100 Note', icon: '💵', color: '#8b5cf6', textColor: '#4c1d95' },
];

export const BazaarCoinCounterGame = ({ onBack }) => {
  const { t, speakText, setCognitiveScore, awardStars } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const currentItem = NER_BAZAAR_ITEMS[currentIdx];
  const currentTotal = selectedCoins.reduce((sum, c) => sum + c.value, 0);

  const initItemRound = (idx = currentIdx) => {
    setSelectedCoins([]);
    setFeedback('');
    const item = NER_BAZAAR_ITEMS[idx];
    speakText(`Welcome to ${item.seller}! ${item.name} costs ${item.price} rupees. Count the coins to pay.`);
  };

  useEffect(() => {
    initItemRound(currentIdx);
  }, [currentIdx]);

  const handleAddCoin = (coin) => {
    speechService.playCoinSound();
    const newCoins = [...selectedCoins, { ...coin, uniqueId: `${coin.value}_${Date.now()}` }];
    setSelectedCoins(newCoins);
    const newTotal = newCoins.reduce((sum, c) => sum + c.value, 0);
    speakText(`${newTotal} rupees`);
  };

  const handleRemoveCoin = (index) => {
    speechService.playPopSound(400);
    const newCoins = selectedCoins.filter((_, idx) => idx !== index);
    setSelectedCoins(newCoins);
  };

  const handlePayShopkeeper = () => {
    if (currentTotal === currentItem.price) {
      // Exact Match!
      speechService.playSuccessChime();
      try { confetti({ particleCount: 80, spread: 60 }); } catch (e) {}
      speakText(`Thank you! Exactly ${currentItem.price} rupees for ${currentItem.name}!`);

      const nextScore = score + 20;
      setScore(nextScore);
      awardStars(3);
      setCognitiveScore(prev => Math.min(100, prev + 3));

      setTimeout(() => {
        if (currentIdx < NER_BAZAAR_ITEMS.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setIsCompleted(true);
          speakText("Congratulations Kaka! You completed your morning bazaar shopping perfectly!");
        }
      }, 1600);
    } else if (currentTotal < currentItem.price) {
      speechService.playPopSound(300);
      const diff = currentItem.price - currentTotal;
      setFeedback(`Need ₹${diff} more to buy ${currentItem.name}`);
      speakText(`Need ${diff} more rupees`);
    } else {
      speechService.playPopSound(300);
      const excess = currentTotal - currentItem.price;
      setFeedback(`You gave ₹${excess} extra. Remove some coins or reset!`);
      speakText(`That is ${excess} rupees extra`);
    }
  };

  const restartBazaar = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsCompleted(false);
    initItemRound(0);
  };

  return (
    <GameContainer
      title="NER Haat / Bazaar Coin Counter (বজাৰৰ হিচাপ)"
      subtitle="Count traditional currency to buy Assam tea, pitha & handloom crafts"
      onBack={onBack}
      level={currentIdx + 1}
    >
      {!isCompleted ? (
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          {/* Top Score */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(27, 67, 50, 0.08)',
            padding: '10px 20px',
            borderRadius: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: 'var(--primary-emerald)' }}>
              <Store size={20} />
              <span>Stall {currentIdx + 1} / {NER_BAZAAR_ITEMS.length}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#f59e0b' }}>
              <Star size={20} fill="#f59e0b" />
              <span>Score: {score} pts</span>
            </div>
          </div>

          {/* Shop Item Card */}
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
            color: 'white',
            borderRadius: '24px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 8px 24px rgba(27,67,50,0.2)'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>{currentItem.icon}</div>
            <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>
              {currentItem.seller}
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '4px 0 8px 0' }}>
              {currentItem.name}
            </h3>
            <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '14px' }}>
              {currentItem.desc}
            </p>

            {/* Price Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#e9c46a',
              color: '#1b4332',
              padding: '8px 24px',
              borderRadius: '20px',
              fontSize: '22px',
              fontWeight: '800'
            }}>
              <span>Price: ₹{currentItem.price}</span>
            </div>
          </div>

          {/* Tray: Selected Coins */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '2px dashed var(--card-border)',
            borderRadius: '20px',
            padding: '16px',
            marginBottom: '20px',
            minHeight: '90px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>
                Your Payment Tray (Tap coin to remove):
              </span>
              <span style={{
                fontSize: '18px',
                fontWeight: '800',
                color: currentTotal === currentItem.price ? '#16a34a' : currentTotal > currentItem.price ? '#dc2626' : 'var(--primary-emerald)'
              }}>
                Current Total: ₹{currentTotal}
              </span>
            </div>

            {selectedCoins.length === 0 ? (
              <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                Tap the currency coins/notes below to place them in your payment tray
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {selectedCoins.map((coin, idx) => (
                  <div
                    key={coin.uniqueId || idx}
                    onClick={() => handleRemoveCoin(idx)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '12px',
                      background: coin.color,
                      color: coin.textColor,
                      fontWeight: '800',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      transform: 'scale(1)',
                      transition: 'transform 0.15s'
                    }}
                    title="Tap to remove"
                  >
                    <span>{coin.icon}</span>
                    <span>₹{coin.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {feedback && (
            <div style={{ color: '#e11d48', fontWeight: '700', fontSize: '14px', marginBottom: '14px' }}>
              ⚠️ {feedback}
            </div>
          )}

          {/* Currency Denomination Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {COIN_DENOMINATIONS.map((coin) => (
              <button
                key={coin.value}
                onClick={() => handleAddCoin(coin)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '16px',
                  background: 'white',
                  border: '2px solid var(--card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: '800',
                  fontSize: '16px',
                  color: 'var(--text-dark)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{coin.icon}</span>
                <span>+ ₹{coin.value}</span>
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedCoins([])}
              className="btn-secondary"
            >
              <RotateCcw size={16} />
              <span>Clear Tray</span>
            </button>

            <button
              onClick={handlePayShopkeeper}
              className="btn-primary"
              style={{
                padding: '12px 28px',
                fontSize: '16px',
                background: currentTotal === currentItem.price
                  ? 'linear-gradient(135deg, #16a34a, #15803d)'
                  : 'linear-gradient(135deg, #1b4332, #2d6a4f)'
              }}
            >
              <Check size={20} />
              <span>Hand Over & Pay (₹{currentTotal})</span>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛍️🪙</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '10px' }}>
            Bazaar Shopping Master!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '24px' }}>
            You managed your coins and bought all traditional North East bazaar items with <strong>{score} points</strong>!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={restartBazaar}>
              <RotateCcw size={18} />
              <span>Shop Again</span>
            </button>
            <button className="btn-primary" onClick={onBack}>
              Return to Hub
            </button>
          </div>
        </div>
      )}
    </GameContainer>
  );
};
