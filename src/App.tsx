/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CategoryDetail } from './components/CategoryDetail';
import { EmergencyModal } from './components/EmergencyModal';
import { KioskMode } from './components/KioskMode';
import { SearchResultView } from './components/SearchResultView';
import { SupervisorDashboard } from './components/SupervisorDashboard';
import { TopNavbar } from './components/TopNavbar';
import { VoiceInputBar } from './components/VoiceInputBar';
import { WorkerHome } from './components/WorkerHome';
import { AudioTranscriber } from './components/AudioTranscriber';
import { GeminiChatbot } from './components/GeminiChatbot';
import { SafetyProvider, useSafety } from './context/SafetyContext';

function MainApp() {
  const { mode, activeCategory, searchResult } = useSafety();

  // If in Kiosk Mode, render full-screen kiosk layout without top navigation
  if (mode === 'kiosk') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <KioskMode />
        <EmergencyModal />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Top Navbar adhering to the strict 3-zone contract */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6">
        {mode === 'supervisor' ? (
          <SupervisorDashboard />
        ) : mode === 'chat' ? (
          <GeminiChatbot />
        ) : mode === 'transcribe' ? (
          <AudioTranscriber />
        ) : (
          <>
            {/* Worker App Components */}
            <VoiceInputBar />

            {/* If user executed a search or voice query */}
            {searchResult && <SearchResultView />}

            {/* If a category is selected for in-depth SOP inspection */}
            {activeCategory ? <CategoryDetail /> : <WorkerHome />}
          </>
        )}
      </main>

      {/* Emergency Modal overlay */}
      <EmergencyModal />

      {/* Industrial Footer adhering to anti-slop rules (quiet copyright & compliance) */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">SURAKSHA AI</span>
            <span>·</span>
            <span>Industrial Factory Safety Companion</span>
            <span>·</span>
            <span>ISO 45001 & Factories Act 1948</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Voice: Web Speech Engine</span>
            <span>·</span>
            <span>Storage: Local Plant Cache</span>
            <span>·</span>
            <span>Simulated AI Neural Model</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SafetyProvider>
      <MainApp />
    </SafetyProvider>
  );
}
