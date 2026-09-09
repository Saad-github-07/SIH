import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_REMINDERS, WEEKLY_COGNITIVE_TRENDS, PATIENT_INFO } from '../data/sampleAnalytics';
import { INITIAL_REMINISCENCE_CARDS, ACHIEVEMENT_BADGES } from '../data/nerThemes';
import { BAZAAR_ITEMS } from '../data/bazaarItems';
import { speechService } from '../services/speechService';
import { offlineSyncEngine } from '../services/offlineStorage';
import { touchDynamicsInstance } from '../services/touchDynamicsEngine';
import { a2aProtocolInstance } from '../services/a2aProtocol';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('smriti_lang') || 'en';
  });
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'caregiver'
  const [activeGame, setActiveGame] = useState(null); // null | 'memory' | 'pattern' | 'routine' | 'sound' | 'word' | 'garden' | 'bazaar'
  const [highContrast, setHighContrast] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Patient Progress & Gamification State
  const [cognitiveScore, setCognitiveScore] = useState(76);
  const [aiDifficultyStage, setAiDifficultyStage] = useState(2); // 1 = Easy, 2 = Medium, 3 = High
  const [dailyStars, setDailyStars] = useState(12);
  const [dailyStreak, setDailyStreak] = useState(4);
  
  // Smriti Coins & Bazaar Rewards Economy
  const [smritiCoins, setSmritiCoins] = useState(() => {
    try {
      const saved = localStorage.getItem('smriti_coins_balance');
      return saved !== null ? parseInt(saved, 10) : 340;
    } catch (e) {
      return 340;
    }
  });

  const [unlockedItems, setUnlockedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('smriti_unlocked_items');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['avatar_bihu_dhol', 'voice_aie_folk', 'theme_muga_gold'];
    } catch (e) {
      return ['avatar_bihu_dhol', 'voice_aie_folk', 'theme_muga_gold'];
    }
  });

  const [activeAvatar, setActiveAvatar] = useState('avatar_bihu_dhol');
  const [activeTheme, setActiveTheme] = useState('theme_muga_gold');

  // Hydration State (starts at 0)
  const [hydrationCount, setHydrationCount] = useState(() => {
    try {
      const saved = localStorage.getItem('smriti_hydration_count');
      return saved !== null ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [hydrationGoal, setHydrationGoal] = useState(() => {
    try {
      const saved = localStorage.getItem('smriti_hydration_goal');
      return saved !== null ? parseInt(saved, 10) : 8;
    } catch (e) {
      return 8;
    }
  });
  const [badges, setBadges] = useState(ACHIEVEMENT_BADGES);

  // Persistent Medications / Reminders
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('smriti_reminders');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REMINDERS;
    } catch (e) {
      return INITIAL_REMINDERS;
    }
  });

  // Persistent Family Members (Reminiscence Wall)
  const [familyMembers, setFamilyMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('smriti_family_members');
      const parsed = saved ? JSON.parse(saved) : null;
      const list = Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REMINISCENCE_CARDS;
      return list.map(m => ({
        ...m,
        photo: m.photo || m.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        photoUrl: m.photoUrl || m.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }));
    } catch (e) {
      return INITIAL_REMINISCENCE_CARDS;
    }
  });

  // Network & Sync State
  const [syncStatus, setSyncStatus] = useState({
    isOnline: offlineSyncEngine.isOnline,
    pendingCount: offlineSyncEngine.getPendingSyncQueue().length
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('smriti_coins_balance', smritiCoins.toString());
    } catch (e) {}
  }, [smritiCoins]);

  useEffect(() => {
    try {
      localStorage.setItem('smriti_unlocked_items', JSON.stringify(unlockedItems));
    } catch (e) {}
  }, [unlockedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('smriti_reminders', JSON.stringify(reminders));
    } catch (e) {}
  }, [reminders]);

  useEffect(() => {
    try {
      localStorage.setItem('smriti_family_members', JSON.stringify(familyMembers));
    } catch (e) {}
  }, [familyMembers]);

  useEffect(() => {
    try {
      localStorage.setItem('smriti_lang', language);
    } catch (e) {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('smriti_hydration_count', hydrationCount.toString());
    } catch (e) {}
  }, [hydrationCount]);

  useEffect(() => {
    try {
      localStorage.setItem('smriti_hydration_goal', hydrationGoal.toString());
    } catch (e) {}
  }, [hydrationGoal]);

  useEffect(() => {
    const unsubscribe = offlineSyncEngine.subscribe((status) => {
      setSyncStatus(status);
    });
    return unsubscribe;
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const speakText = (text) => {
    if (voiceEnabled && text) {
      speechService.speak(text, language);
    }
  };

  // Coin and Reward Economy Methods
  const earnCoins = (amount, reason = '') => {
    setSmritiCoins(prev => prev + amount);
    speechService.playCoinSound();
    if (reason) {
      speakText(`Earned ${amount} Smriti Coins for ${reason}`);
    }
  };

  const spendCoins = (amount, itemId) => {
    if (smritiCoins >= amount) {
      setSmritiCoins(prev => prev - amount);
      setUnlockedItems(prev => [...new Set([...prev, itemId])]);
      speechService.playSuccessChime();
      speakText('Item unlocked in your Bazaar collection!');
      return true;
    } else {
      speechService.playErrorSound();
      speakText('Not enough Smriti Coins yet. Play more games to earn coins!');
      return false;
    }
  };

  // Medicine Management
  const toggleReminder = (id) => {
    setReminders(prev => prev.map(item => {
      if (item.id === id) {
        const updated = !item.taken;
        if (updated) {
          speechService.playSuccessChime();
          speakText(`${item.title} ${t.medTaken || 'completed'}`);
          setDailyStars(s => s + 1);
          earnCoins(15, 'Taking medication on time');
        }
        return { ...item, taken: updated };
      }
      return item;
    }));
  };

  const addReminder = (newMed) => {
    const medItem = {
      id: `med_${Date.now()}`,
      type: newMed.type || 'MEDICATION',
      title: newMed.title,
      time: newMed.time || '08:00 AM',
      taken: false,
      dose: newMed.dose || '1 Dose',
      icon: newMed.icon || '💊',
      slot: newMed.slot || 'Morning',
      notes: newMed.notes || ''
    };
    setReminders(prev => [medItem, ...prev]);
    speechService.playSuccessChime();
    speakText(`Added medicine ${medItem.title}`);
  };

  const updateReminder = (id, updatedFields) => {
    setReminders(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    speechService.playSuccessChime();
    speakText('Medicine updated');
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(item => item.id !== id));
    speakText('Medicine removed');
  };

  // Family Members Management
  const addFamilyMember = (newMember) => {
    const member = {
      id: `fam_${Date.now()}`,
      name: newMember.name,
      relationship: newMember.relationship || 'Family Member',
      location: newMember.location || 'Assam',
      photo: newMember.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      voiceMemoText: newMember.voiceMemoText || `Kaka, sending you much love and warm wishes today!`,
      frequentMemory: newMember.frequentMemory || 'Loves celebrating festivals and talking about family memories together',
      starred: false,
      audioBlobUrl: newMember.audioBlobUrl || null
    };
    setFamilyMembers(prev => [member, ...prev]);
    speechService.playSuccessChime();
    speakText(`Added family member ${member.name}`);
    earnCoins(25, 'Adding a beloved family memory');
  };

  const updateFamilyMember = (id, updatedFields) => {
    setFamilyMembers(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    speechService.playSuccessChime();
    speakText('Family memory updated');
  };

  const deleteFamilyMember = (id) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
    speakText('Family member removed');
  };

  const toggleStarFamilyMember = (id) => {
    setFamilyMembers(prev => prev.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  // Hydration Actions
  const addHydration = () => {
    if (hydrationCount < hydrationGoal) {
      const nextCount = hydrationCount + 1;
      setHydrationCount(nextCount);
      speechService.playPopSound(750);
      speakText(`${nextCount} ${t.glasses || 'glasses'}`);
      setDailyStars(s => s + 1);
      earnCoins(10, 'Drinking water');
    }
  };

  const removeHydration = () => {
    if (hydrationCount > 0) {
      const nextCount = hydrationCount - 1;
      setHydrationCount(nextCount);
      speechService.playPopSound(450);
      speakText(`${nextCount} ${t.glasses || 'glasses'}`);
    }
  };

  const resetHydration = () => {
    setHydrationCount(0);
    speechService.playPopSound(400);
    speakText('Hydration counter reset to 0');
  };

  const awardStars = (count) => {
    setDailyStars(s => s + count);
    earnCoins(count * 5, 'Completing cognitive game level');
  };

  const triggerCloudSync = async () => {
    await offlineSyncEngine.forceCloudSync();
  };

  // Connect A2A Protocol Actions directly to App State (Registered after all function declarations)
  useEffect(() => {
    a2aProtocolInstance.registerAppActions({
      earnCoins,
      spendCoins,
      setAiDifficultyStage,
      awardStars,
      addHydration,
      speakText,
      language,
      setActiveGame
    });
  }, [earnCoins, spendCoins, setAiDifficultyStage, awardStars, addHydration, speakText, language, setActiveGame]);

  const dispatchA2ATask = async (params) => {
    return await a2aProtocolInstance.sendTask(params);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      activeTab,
      setActiveTab,
      activeGame,
      setActiveGame,
      highContrast,
      setHighContrast,
      voiceEnabled,
      setVoiceEnabled,
      speakText,
      cognitiveScore,
      setCognitiveScore,
      aiDifficultyStage,
      setAiDifficultyStage,
      dailyStars,
      awardStars,
      dailyStreak,
      smritiCoins,
      earnCoins,
      spendCoins,
      unlockedItems,
      activeAvatar,
      setActiveAvatar,
      activeTheme,
      setActiveTheme,
      bazaarItems: BAZAAR_ITEMS,
      hydrationCount,
      hydrationGoal,
      setHydrationGoal,
      addHydration,
      removeHydration,
      resetHydration,
      reminders,
      toggleReminder,
      addReminder,
      updateReminder,
      deleteReminder,
      familyMembers,
      addFamilyMember,
      updateFamilyMember,
      deleteFamilyMember,
      toggleStarFamilyMember,
      badges,
      syncStatus,
      triggerCloudSync,
      dispatchA2ATask,
      patientInfo: PATIENT_INFO,
      cognitiveTrends: WEEKLY_COGNITIVE_TRENDS
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
