/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SAMPLE_ACTIVITY_LOGS } from '../data/safetyContent';
import { matchSafetyQuery, SafetyMatchResult } from '../services/safetyEngine';
import { DEFAULT_KIOSK_SETTINGS, StorageService } from '../services/storage';
import { InteractionLog, KioskSettings, Language, SafetyCategory, TrainingGapMetric } from '../types/safety';
import { soundEffects } from '../utils/soundEffects';
import { speechManager } from '../utils/speech';

export type AppMode = 'worker' | 'kiosk' | 'supervisor' | 'chat' | 'transcribe';

interface SafetyContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  activeCategory: SafetyCategory | null;
  setActiveCategory: (cat: SafetyCategory | null) => void;
  searchResult: SafetyMatchResult | null;
  activeQueryText: string;
  isSpeaking: boolean;
  speakingText: string;
  lastSpokenText: string;
  speakText: (text: string, customLang?: Language) => void;
  stopSpeaking: () => void;
  replayLast: () => void;
  executeSearch: (query: string, source?: 'voice' | 'text' | 'faq') => void;
  clearSearch: () => void;
  logs: InteractionLog[];
  trainingGaps: TrainingGapMetric[];
  kioskSettings: KioskSettings;
  updateKioskSettings: (settings: KioskSettings) => void;
  isEmergencyActive: boolean;
  emergencySirenOn: boolean;
  triggerEmergency: (autoSiren?: boolean) => void;
  stopEmergency: () => void;
  toggleEmergencySiren: () => void;
  checklistProgress: Record<string, boolean>;
  toggleChecklistItem: (key: string) => void;
  resetChecklist: () => void;
  toggleLogResolved: (id: string) => void;
  resetDemoData: () => void;
  loadSampleData: () => void;
  exportLogsCSV: () => void;
  exportLogsJSON: () => void;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const SafetyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('hi'); // Default Hindi for Indian shopfloors, easily toggleable
  const [mode, setModeState] = useState<AppMode>('worker');
  const [activeCategory, setActiveCategory] = useState<SafetyCategory | null>(null);
  const [searchResult, setSearchResult] = useState<SafetyMatchResult | null>(null);
  const [activeQueryText, setActiveQueryText] = useState<string>('');

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');
  const [lastSpokenText, setLastSpokenText] = useState<string>('');

  const [logs, setLogs] = useState<InteractionLog[]>(() => StorageService.getLogs());
  const [trainingGaps, setTrainingGaps] = useState<TrainingGapMetric[]>(() => StorageService.getTrainingGaps());
  const [kioskSettings, setKioskSettings] = useState<KioskSettings>(() => StorageService.getKioskSettings());

  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [emergencySirenOn, setEmergencySirenOn] = useState<boolean>(false);

  const [checklistProgress, setChecklistProgress] = useState<Record<string, boolean>>({});

  const setLanguage = (lang: Language) => {
    soundEffects.playClick();
    setLanguageState(lang);
    // If speaking, stop to avoid language mismatch
    speechManager.stop();
    setIsSpeaking(false);
  };

  const setMode = (m: AppMode) => {
    soundEffects.playClick();
    setModeState(m);
    // When switching to kiosk or worker, clear search
    setSearchResult(null);
    setActiveQueryText('');
  };

  const speakText = (text: string, customLang?: Language) => {
    const targetLang = customLang || language;
    setSpeakingText(text);
    setLastSpokenText(text);
    setIsSpeaking(true);

    speechManager.speak(text, targetLang, {
      rate: kioskSettings.speechRate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setSpeakingText('');
      },
      onError: () => {
        setIsSpeaking(false);
        setSpeakingText('');
      },
    });
  };

  const stopSpeaking = () => {
    speechManager.stop();
    setIsSpeaking(false);
    setSpeakingText('');
  };

  const replayLast = () => {
    soundEffects.playClick();
    if (!lastSpokenText) return;
    speakText(lastSpokenText, language);
  };

  const executeSearch = (query: string, source: 'voice' | 'text' | 'faq' = 'text') => {
    if (!query.trim()) return;

    soundEffects.playClick();
    setActiveQueryText(query);
    const result = matchSafetyQuery(query, language);
    setSearchResult(result);

    // Save interaction to localStorage
    const newLog = StorageService.addLog({
      language,
      category: result.category,
      query,
      response: result.summaryText,
      source,
      resolved: true,
      flaggedTrainingGap: result.flaggedTrainingGap,
      trainingGapReason: result.trainingGapReason,
      zone: kioskSettings.plantZone,
    });

    setLogs((prev) => [newLog, ...prev]);
    setTrainingGaps(StorageService.getTrainingGaps());

    // Auto-speak summary if sound enabled
    if (kioskSettings.soundEnabled) {
      speakText(result.spokenText, language);
    }
  };

  const clearSearch = () => {
    soundEffects.playClick();
    setSearchResult(null);
    setActiveQueryText('');
    stopSpeaking();
  };

  const triggerEmergency = (autoSiren = false) => {
    setIsEmergencyActive(true);
    soundEffects.playSuccess();
    if (autoSiren) {
      soundEffects.startSiren();
      setEmergencySirenOn(true);
    }

    // Log emergency trigger
    const newLog = StorageService.addLog({
      language,
      category: 'emergency',
      query: 'PLANT EMERGENCY SOS TRIGGERED',
      response: 'Immediate plant-wide evacuation protocol initiated. Evacuate to Assembly Point B.',
      source: 'emergency',
      resolved: false,
      flaggedTrainingGap: false,
      zone: kioskSettings.plantZone,
    });
    setLogs((prev) => [newLog, ...prev]);

    // Spoken announcement
    const announcement =
      language === 'hi'
        ? 'आपातकालीन चेतावनी! तुरंत कार्य रोकें और असेंबली पॉइंट बी की ओर प्रस्थान करें।'
        : language === 'ta'
        ? 'அவசர எச்சரிக்கை! உடனடியாக பணியை நிறுத்திவிட்டு அசெம்பிளி பாயிண்ட் பிக்கு செல்லவும்.'
        : 'Emergency Alert! Stop work immediately and proceed to Assembly Point B.';
    speakText(announcement, language);
  };

  const stopEmergency = () => {
    soundEffects.stopSiren();
    setEmergencySirenOn(false);
    setIsEmergencyActive(false);
    stopSpeaking();
  };

  const toggleEmergencySiren = () => {
    if (emergencySirenOn) {
      soundEffects.stopSiren();
      setEmergencySirenOn(false);
    } else {
      soundEffects.startSiren();
      setEmergencySirenOn(true);
    }
  };

  const toggleChecklistItem = (key: string) => {
    soundEffects.playClick();
    setChecklistProgress((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetChecklist = () => {
    soundEffects.playClick();
    setChecklistProgress({});
  };

  const toggleLogResolved = (id: string) => {
    soundEffects.playClick();
    setLogs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, resolved: !l.resolved } : l))
    );
  };

  const resetDemoData = () => {
    soundEffects.playClick();
    StorageService.resetDemoData();
    setLogs(StorageService.getLogs());
    setTrainingGaps(StorageService.getTrainingGaps());
  };

  const loadSampleData = () => {
    soundEffects.playSuccess();
    // Add 10 additional varied factory audit records
    const extraRecords: InteractionLog[] = [
      {
        id: `log-extra-1`,
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        language: 'hi',
        category: 'machine',
        query: 'क्या कन्वेयर बेल्ट चलते समय साफ की जा सकती है?',
        response: 'कदापि नहीं! कन्वेयर को बंद कर लोटो (LOTO) लगाएं और शून्य गति सुनिश्चित करने के बाद ही साफ करें।',
        source: 'voice',
        resolved: true,
        flaggedTrainingGap: true,
        trainingGapReason: 'Conveyor nip-point entanglement hazard inquired.',
        zone: 'Zone D – Assembly',
      },
      {
        id: `log-extra-2`,
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        language: 'ta',
        category: 'fire',
        query: 'தீயணைப்பானின் பிரஷர் கேஜ் சிவப்பில் இருந்தால் என்ன செய்வது?',
        response: 'சிவப்பு பகுதியில் முள் இருந்தால் சிலிண்டரை உடனடியாக மாற்றி பராமரிப்பு பிரிவுக்கு அனுப்ப வேண்டும்.',
        source: 'text',
        resolved: true,
        flaggedTrainingGap: false,
        zone: 'Zone B – Welding Bay',
      },
      {
        id: `log-extra-3`,
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
        language: 'en',
        category: 'electrical',
        query: 'What is the required dielectric rating for substation boots?',
        response: 'Boots must comply with IS 15298 Part 2 tested for 14kV dielectric breakdown resistance.',
        source: 'faq',
        resolved: true,
        flaggedTrainingGap: false,
        zone: 'Zone E – Substation',
      },
    ];

    const merged = [...extraRecords, ...logs];
    setLogs(merged);
    try {
      localStorage.setItem('suraksha_interaction_logs', JSON.stringify(merged));
    } catch {
      // ignore
    }
  };

  const exportLogsCSV = () => {
    soundEffects.playClick();
    const headers = ['ID', 'Timestamp', 'Language', 'Category', 'Source', 'Resolved', 'TrainingGap', 'Zone', 'Query', 'Response'];
    const rows = logs.map((l) => [
      l.id,
      l.timestamp,
      l.language,
      l.category,
      l.source,
      l.resolved ? 'YES' : 'NO',
      l.flaggedTrainingGap ? 'FLAGGED' : 'NORMAL',
      `"${l.zone}"`,
      `"${l.query.replace(/"/g, '""')}"`,
      `"${l.response.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `suraksha_safety_audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportLogsJSON = () => {
    soundEffects.playClick();
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `suraksha_safety_audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateKioskSettings = (settings: KioskSettings) => {
    setKioskSettings(settings);
    StorageService.saveKioskSettings(settings);
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      soundEffects.stopSiren();
    };
  }, []);

  return (
    <SafetyContext.Provider
      value={{
        language,
        setLanguage,
        mode,
        setMode,
        activeCategory,
        setActiveCategory,
        searchResult,
        activeQueryText,
        isSpeaking,
        speakingText,
        lastSpokenText,
        speakText,
        stopSpeaking,
        replayLast,
        executeSearch,
        clearSearch,
        logs,
        trainingGaps,
        kioskSettings,
        updateKioskSettings,
        isEmergencyActive,
        emergencySirenOn,
        triggerEmergency,
        stopEmergency,
        toggleEmergencySiren,
        checklistProgress,
        toggleChecklistItem,
        resetChecklist,
        toggleLogResolved,
        resetDemoData,
        loadSampleData,
        exportLogsCSV,
        exportLogsJSON,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = (): SafetyContextType => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
