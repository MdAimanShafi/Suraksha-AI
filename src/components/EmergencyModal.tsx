/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Bell,
  BellOff,
  Cross,
  Droplets,
  Flame,
  HeartPulse,
  Navigation,
  Phone,
  PhoneCall,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const EmergencyModal: React.FC = () => {
  const {
    isEmergencyActive,
    stopEmergency,
    emergencySirenOn,
    toggleEmergencySiren,
    language,
    speakText,
  } = useSafety();

  if (!isEmergencyActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-950 border-2 border-red-600 rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150 my-auto">
        {/* Top Emergency Siren Banner */}
        <div className="flex items-center justify-between border-b border-red-900/60 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-red-600 rounded-2xl text-white animate-bounce shadow-lg shadow-red-600/50">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold uppercase bg-red-600 text-white px-2 py-0.5 rounded">
                  RED ALERT
                </span>
                <span className="text-xs text-red-400 font-mono">
                  PLANT EMERGENCY SOS TRIGGERED
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {language === 'hi'
                  ? 'आपातकालीन निकास एवं प्राथमिक सहायता'
                  : language === 'ta'
                  ? 'அவசர வெளியேற்றம் மற்றும் முதலுதவி'
                  : 'Plant Emergency Evacuation & Rescue'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Siren toggle */}
            <button
              onClick={toggleEmergencySiren}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                emergencySirenOn
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Toggle Audio Siren"
            >
              {emergencySirenOn ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              <span className="hidden sm:inline">
                {emergencySirenOn ? 'Siren ON' : 'Mute Siren'}
              </span>
            </button>

            {/* Stand down close button */}
            <button
              onClick={stopEmergency}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-colors"
              title="Close Emergency Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Evacuation Route & Assembly Point Card */}
        <div className="bg-red-950/30 border-2 border-red-500/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/40">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-red-300 font-bold">
                Designated Safe Zone
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Proceed to Assembly Point B (North Lawn)
              </h2>
              <p className="text-xs text-red-200 mt-0.5">
                Walk calmly via green emergency stairwells. Do NOT use freight or passenger elevators.
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              speakText(
                language === 'hi'
                  ? 'तुरंत असेंबली पॉइंट बी की ओर प्रस्थान करें। लिफ्ट का उपयोग न करें।'
                  : language === 'ta'
                  ? 'அசெம்பிளி பாயிண்ட் பிக்கு செல்லவும். லிப்ட் பயன்படுத்த வேண்டாம்.'
                  : 'Proceed to Assembly Point B immediately. Do not use elevators.'
              )
            }
            className="shrink-0 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'निर्देश सुनें' : language === 'ta' ? 'கேளுங்கள்' : 'Hear Directions'}</span>
          </button>
        </div>

        {/* Plant Speed Dials */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Immediate Emergency Hotlines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Plant Dispensary</span>
                <span className="font-mono text-sm font-bold text-white">Ext: 222</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/40">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Fire Marshal Station</span>
                <span className="font-mono text-sm font-bold text-white">Ext: 101</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/40">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Chief Safety Officer</span>
                <span className="font-mono text-sm font-bold text-white">+91-98765-43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Rapid Life-Saving Protocols */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Critical On-Scene Life-Saving Rules
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
                <Zap className="w-4 h-4" />
                <span>Electric Shock Rescue</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                DO NOT touch victim with bare hands! Kill main breaker or push wire away with dry wood.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Droplets className="w-4 h-4" />
                <span>Chemical Eye Flush</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hold eyelids open at eyewash fountain and flush continuously for full 15 minutes.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                <HeartPulse className="w-4 h-4" />
                <span>Cardiac / CPR</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Center chest compressions at 100-120 beats/min. Dispatch runner for AED machine.
              </p>
            </div>
          </div>
        </div>

        {/* Stand Down Action */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Incident Logged to Plant Master Dispatch
          </span>
          <button
            onClick={stopEmergency}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-slate-700"
          >
            All-Clear / Dismiss Emergency
          </button>
        </div>
      </div>
    </div>
  );
};
