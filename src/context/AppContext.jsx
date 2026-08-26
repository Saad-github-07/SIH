import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_REMINDERS, WEEKLY_COGNITIVE_TRENDS, PATIENT_INFO } from '../data/sampleAnalytics';
import { speechService } from '../services/speechService';
import { offlineSyncEngine } from '../services/offlineStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'caregiver'
  const [activeGame, setActiveGame] = useState(null); // null | 'memory' | 'pattern' | 'routine' | 'sound'
  const [highContrast, setHighContrast] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Patient Progress State
  const [cognitiveScore, setCognitiveScore] = useState(76);
  const [aiDifficultyStage, setAiDifficultyStage] = useState(2); // 1 = Easy, 2 = Medium, 3 = High
  const [hydrationCount, setHydrationCount] = useState(6); // Glasses today
  const [hydrationGoal] = useState(8);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  // Network & Sync State
  const [syncStatus, setSyncStatus] = useState({
    isOnline: offlineSyncEngine.isOnline,
    pendingCount: offlineSyncEngine.getPendingSyncQueue().length
  });

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

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(item => {
      if (item.id === id) {
        const updated = !item.taken;
        if (updated) {
          speakText(`${item.title} ${t.medTaken}`);
        }
        return { ...item, taken: updated };
      }
      return item;
    }));
  };

  const addHydration = () => {
    if (hydrationCount < hydrationGoal) {
      const nextCount = hydrationCount + 1;
      setHydrationCount(nextCount);
      speakText(`${nextCount} ${t.glasses}`);
    }
  };

  const triggerCloudSync = async () => {
    await offlineSyncEngine.forceCloudSync();
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
      hydrationCount,
      hydrationGoal,
      addHydration,
      reminders,
      toggleReminder,
      syncStatus,
      triggerCloudSync,
      patientInfo: PATIENT_INFO,
      cognitiveTrends: WEEKLY_COGNITIVE_TRENDS
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
