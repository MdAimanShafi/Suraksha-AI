/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  Bot,
  FileAudio,
  Flame,
  Globe,
  HardHat,
  LayoutDashboard,
  Monitor,
  PhoneCall,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { Language } from '../types/safety';

export const TopNavbar: React.FC = () => {
  const {
    language,
    setLanguage,
    mode,
    setMode,
    isSpeaking,
    stopSpeaking,
    triggerEmergency,
  } = useSafety();

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleSupervisorClick = () => {
    if (mode === 'supervisor') {
      setMode('worker');
    } else {
      setShowPinModal(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
      setMode('supervisor');
    } else {
      setPinError(true);
    }
  };

  // Strictly follow Top Bar Contract:
  // Zone 1: Single text wordmark
  // Zone 2: 4-5 concise single-line nav links
  // Zone 3: 1 primary action
  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setMode('worker')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-slate-950 shadow-md">
              <HardHat className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              SURAKSHA <span className="text-orange-500 font-extrabold">AI</span>
            </span>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
            <button
              onClick={() => setMode('worker')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 ${
                mode === 'worker' ? 'text-orange-400 font-semibold border-b-2 border-orange-500' : ''
              }`}
            >
              Companion
            </button>
            <button
              onClick={() => setMode('chat')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                mode === 'chat' ? 'text-orange-400 font-semibold border-b-2 border-orange-500' : ''
              }`}
            >
              <Bot className="w-4 h-4 text-orange-400" />
              <span>Gemini Chat</span>
            </button>
            <button
              onClick={() => setMode('transcribe')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                mode === 'transcribe' ? 'text-orange-400 font-semibold border-b-2 border-orange-500' : ''
              }`}
            >
              <FileAudio className="w-4 h-4 text-orange-400" />
              <span>Transcribe</span>
            </button>
            <button
              onClick={() => setMode('kiosk')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                mode === 'kiosk' ? 'text-orange-400 font-semibold border-b-2 border-orange-500' : ''
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Kiosk</span>
            </button>
            <button
              onClick={handleSupervisorClick}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                mode === 'supervisor' ? 'text-orange-400 font-semibold border-b-2 border-orange-500' : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Supervisor</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action (or emergency SOS trigger + language pill switcher) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {(['en', 'hi', 'ta'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    language === lang
                      ? 'bg-orange-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'தமிழ்'}
                </button>
              ))}
            </div>

            {/* Speaking audio mute toggle */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                title="Stop Audio"
                className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500/30 transition-colors"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => triggerEmergency(false)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-900/30 flex items-center gap-1.5 whitespace-nowrap shrink-0 animate-pulse"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS EMERGENCY</span>
            </button>
          </div>
        </div>
      </header>

      {/* Supervisor PIN Protection Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-orange-400 mb-4">
              <div className="p-2.5 bg-orange-500/10 rounded-xl border border-orange-500/30">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Supervisor Portal Access</h3>
                <p className="text-xs text-slate-400">Restricted for safety auditors and plant heads</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enter 4-Digit Security PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  autoFocus
                  placeholder="Demo PIN: 1234"
                  className="w-full text-center text-2xl tracking-widest bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-white focus:outline-none"
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Incorrect PIN. Enter 1234 for demo.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setPinInput('');
                    setPinError(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors shadow-sm"
                >
                  Authorize Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
