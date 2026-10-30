/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  Flame,
  Globe,
  HardHat,
  Lock,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { SAFETY_CATEGORIES, SAFETY_INSTRUCTIONS } from '../data/safetyContent';
import { Language, SafetyCategory } from '../types/safety';
import { soundEffects } from '../utils/soundEffects';

export const KioskMode: React.FC = () => {
  const {
    language,
    setLanguage,
    setMode,
    speakText,
    isSpeaking,
    stopSpeaking,
    replayLast,
    lastSpokenText,
    executeSearch,
    triggerEmergency,
    kioskSettings,
  } = useSafety();

  // Inactivity auto-reset timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    kioskSettings.autoResetSeconds
  );
  const [activeKioskCat, setActiveKioskCat] = useState<SafetyCategory | null>(null);
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [showExitPinModal, setShowExitPinModal] = useState<boolean>(false);
  const [exitPin, setExitPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Inactivity countdown handler
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Reset kiosk back to default home state
          setActiveKioskCat(null);
          stopSpeaking();
          return kioskSettings.autoResetSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [kioskSettings.autoResetSeconds]);

  // Reset timer on any user touch/interaction
  const handleUserActivity = () => {
    setSecondsRemaining(kioskSettings.autoResetSeconds);
  };

  const handleKioskVoice = () => {
    handleUserActivity();
    if (isSpeaking) stopSpeaking();

    setIsVoiceListening(true);
    soundEffects.playMicChime();

    const sampleQueries = {
      hi: 'आग लगने पर पास (PASS) नियम कैसे काम करता है?',
      ta: 'மின் அதிர்ச்சி ஏற்பட்டால் என்ன செய்ய வேண்டும்?',
      en: 'What are the steps for machine Lockout Tagout?',
    };

    const target = sampleQueries[language];
    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      setVoiceTranscript(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVoiceListening(false);
          soundEffects.playSuccess();
          executeSearch(target, 'voice');
          setVoiceTranscript('');
        }, 500);
      }
    }, 40);
  };

  const handleExitKiosk = (e: React.FormEvent) => {
    e.preventDefault();
    if (exitPin === kioskSettings.supervisorPin) {
      setShowExitPinModal(false);
      setExitPin('');
      setPinError(false);
      setMode('worker');
    } else {
      setPinError(true);
    }
  };

  const categoryIcons: Record<SafetyCategory, React.ReactNode> = {
    helmet: <HardHat className="w-12 h-12 text-amber-400" />,
    fire: <Flame className="w-12 h-12 text-orange-400" />,
    machine: <AlertTriangle className="w-12 h-12 text-blue-400" />,
    electrical: <Zap className="w-12 h-12 text-yellow-400" />,
    emergency: <AlertOctagon className="w-12 h-12 text-red-400" />,
  };

  return (
    <div
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      onClick={handleUserActivity}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 select-none"
    >
      {/* Top Kiosk Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg">
            S
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SURAKSHA AI <span className="text-orange-500 font-bold">KIOSK</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Terminal: Bay 4 North · Factory Safety Station
            </p>
          </div>
        </div>

        {/* Center Language Switcher for Gloved Workers (Huge Buttons) */}
        <div className="flex items-center bg-slate-900 border-2 border-slate-700 rounded-2xl p-1 gap-1">
          {(['hi', 'en', 'ta'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                handleUserActivity();
                setLanguage(lang);
              }}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-sm sm:text-base transition-all ${
                language === lang
                  ? 'bg-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {lang === 'hi' ? 'हिंदी' : lang === 'en' ? 'ENGLISH' : 'தமிழ்'}
            </button>
          ))}
        </div>

        {/* Auto-Reset Countdown Badge & Exit Pin Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400">
            <Clock className="w-4 h-4 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Reset in {secondsRemaining}s</span>
          </div>

          <button
            onClick={() => setShowExitPinModal(true)}
            className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Supervisor Exit (PIN Protected)"
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Kiosk Center View */}
      <div className="my-auto py-6 max-w-6xl mx-auto w-full space-y-6">
        {/* If a category is selected in Kiosk mode, show giant full-screen protocol */}
        {activeKioskCat ? (
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {categoryIcons[activeKioskCat]}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-orange-400 font-bold">
                    {SAFETY_INSTRUCTIONS[activeKioskCat].standardCode}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {SAFETY_INSTRUCTIONS[activeKioskCat].title[language]}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveKioskCat(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-2xl border border-slate-600 transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                <span>{language === 'hi' ? 'वापस' : language === 'ta' ? 'பின்செல்' : 'Close'}</span>
              </button>
            </div>

            {/* Audio Overview Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl leading-relaxed">
                {SAFETY_INSTRUCTIONS[activeKioskCat].overview[language]}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(SAFETY_INSTRUCTIONS[activeKioskCat].audioSummary[language])}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-400 active:scale-95 text-slate-950 font-black text-sm rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>{language === 'hi' ? 'ऑडियो सुनें' : language === 'ta' ? 'கேளுங்கள்' : 'Hear Instructions'}</span>
                </button>
                <button
                  onClick={replayLast}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-xl border border-slate-700"
                  title="Replay Last Audio"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Giant Checklist Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAFETY_INSTRUCTIONS[activeKioskCat].steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="bg-slate-950/70 border-2 border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 mb-1">
                      STEP {st.stepNumber}
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5">
                      {st.title[language]}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {st.description[language]}
                    </p>
                  </div>

                  <button
                    onClick={() => speakText(st.audioPrompt[language])}
                    className="mt-4 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4 text-orange-400" />
                    <span>{language === 'hi' ? 'कदम सुनें' : language === 'ta' ? 'படி கேள்' : 'Listen Step'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Normal Kiosk Home with Giant Category Buttons + Giant Mic */
          <div className="space-y-6">
            {/* Center Voice Query Banner for Kiosk */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-2 border-orange-500/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-mono uppercase text-orange-400 font-bold flex items-center gap-2 justify-center sm:justify-start">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Touch-Free Voice Assistant</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'hi'
                    ? 'सुरक्षा सवाल पूछने के लिए माइक दबाएं'
                    : language === 'ta'
                    ? 'பாதுகாப்பு கேள்வி கேட்க மைக்கை அழுத்தவும்'
                    : 'Tap Microphone & Speak Any Safety Query'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  {language === 'hi'
                    ? 'हेलमेट, आग, मशीन लोटो, या करंट लगने पर क्या करना चाहिए तुरंत जानें।'
                    : language === 'ta'
                    ? 'தலைக்கவசம், தீ, இயந்திரம் மற்றும் முதலுதவி வினாக்களுக்கு உடனடி பதில்.'
                    : 'Instant voice safety guidance in Hindi, English, and Tamil.'}
                </p>
              </div>

              {/* Giant Kiosk Mic Button */}
              <button
                onClick={handleKioskVoice}
                className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center border-4 transition-all duration-200 active:scale-95 shadow-2xl shrink-0 ${
                  isVoiceListening
                    ? 'bg-red-500 border-red-300 text-white animate-pulse'
                    : 'bg-orange-500 hover:bg-orange-400 border-orange-300 text-slate-950'
                }`}
              >
                {isVoiceListening ? (
                  <>
                    <MicOff className="w-12 h-12" />
                    <span className="text-xs font-black uppercase mt-1">Listening</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-12 h-12" />
                    <span className="text-xs font-black uppercase mt-1">Tap To Speak</span>
                  </>
                )}
              </button>
            </div>

            {/* 5 Giant Rugged Category Touch Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SAFETY_CATEGORIES.map((cat) => {
                const isEmergency = cat.id === 'emergency';
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleUserActivity();
                      setActiveKioskCat(cat.id);
                    }}
                    className={`h-48 sm:h-56 rounded-3xl border-2 p-5 flex flex-col justify-between text-left transition-all duration-200 active:scale-95 shadow-xl ${
                      isEmergency
                        ? 'bg-red-950/40 border-red-500/80 hover:bg-red-900/40 text-red-100'
                        : 'bg-slate-900 border-slate-700 hover:border-orange-500 hover:bg-slate-850'
                    }`}
                  >
                    <div className="p-3 bg-slate-950 rounded-2xl w-fit border border-slate-800">
                      {categoryIcons[cat.id]}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-orange-400 font-bold block mb-1">
                        {cat.standard}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                        {cat.names[language]}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Kiosk Action Bar */}
      <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Replay Last Spoken Button */}
        <div className="flex items-center gap-3">
          {lastSpokenText && (
            <button
              onClick={replayLast}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 text-orange-400 rounded-2xl font-black text-sm flex items-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <RotateCcw className="w-5 h-5" />
              <span>
                {language === 'hi' ? 'पिछला निर्देश फिर सुनें' : language === 'ta' ? 'மீண்டும் கேள்' : 'Replay Last Instruction'}
              </span>
            </button>
          )}
        </div>

        {/* Giant Red SOS Emergency Trigger */}
        <button
          onClick={() => triggerEmergency(true)}
          className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-red-600/30 active:scale-95 transition-all animate-pulse"
        >
          <AlertOctagon className="w-6 h-6" />
          <span>{language === 'hi' ? 'आपातकालीन अलार्म (SOS)' : language === 'ta' ? 'அவசர அலாரம் (SOS)' : 'EMERGENCY EVACUATION (SOS)'}</span>
        </button>
      </div>

      {/* Supervisor Exit PIN Modal */}
      {showExitPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-orange-400">
              <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Exit Kiosk Mode</h3>
                <p className="text-xs text-slate-400">Enter supervisor PIN to exit</p>
              </div>
            </div>

            <form onSubmit={handleExitKiosk} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                value={exitPin}
                onChange={(e) => {
                  setExitPin(e.target.value);
                  setPinError(false);
                }}
                autoFocus
                placeholder="Default: 1234"
                className="w-full text-center text-3xl tracking-widest bg-slate-950 border-2 border-slate-700 focus:border-orange-500 rounded-2xl py-3 text-white focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-400 text-center font-bold">
                  Incorrect PIN. Use 1234.
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowExitPinModal(false);
                    setExitPin('');
                    setPinError(false);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-black text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-xl"
                >
                  Exit to Full Mode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
