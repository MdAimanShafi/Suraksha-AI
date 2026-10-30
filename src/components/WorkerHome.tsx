/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  CheckSquare,
  Clock,
  Eye,
  Flame,
  HardHat,
  HelpCircle,
  Play,
  RotateCcw,
  Shield,
  Square,
  Volume2,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { SAFETY_CATEGORIES, SAFETY_FAQS, SAFETY_INSTRUCTIONS } from '../data/safetyContent';
import { SafetyCategory } from '../types/safety';

export const WorkerHome: React.FC = () => {
  const {
    language,
    setActiveCategory,
    speakText,
    replayLast,
    lastSpokenText,
    isSpeaking,
    checklistProgress,
    toggleChecklistItem,
    resetChecklist,
    executeSearch,
  } = useSafety();

  const getCategoryIcon = (id: SafetyCategory) => {
    switch (id) {
      case 'helmet':
        return <HardHat className="w-8 h-8 text-amber-400" />;
      case 'fire':
        return <Flame className="w-8 h-8 text-orange-400" />;
      case 'machine':
        return <AlertTriangle className="w-8 h-8 text-blue-400" />;
      case 'electrical':
        return <Zap className="w-8 h-8 text-yellow-400" />;
      case 'emergency':
        return <AlertOctagon className="w-8 h-8 text-red-400" />;
    }
  };

  // Pre-shift safety checklist items
  const dailyChecklistItems = [
    {
      id: 'chk-helmet',
      en: 'IS 2925 Hard Hat with 1-finger tight chin strap fastened',
      hi: 'IS 2925 सुरक्षा हेलमेट और 1 उंगली कसाव वाला चिन स्ट्रैप बंधा है',
      ta: 'சான்றளிக்கப்பட்ட தலைக்கவசம் கன்னப் பட்டை சரியாக பொருந்தியுள்ளது',
    },
    {
      id: 'chk-shoes',
      en: 'Steel-toe puncture resistant footwear securely laced',
      hi: 'स्टील-टो सुरक्षा जूते सही तरह से बंधे हैं',
      ta: 'எஃகு முனை கொண்ட பாதுகாப்பு காலணிகள் அணியப்பட்டுள்ளது',
    },
    {
      id: 'chk-vest',
      en: 'High-visibility reflective vest zipped closed',
      hi: 'हाई-विजिबिलिटी रिफ्लेक्टिव जैकेट की चेन बंद है',
      ta: 'ஒளிரும் பாதுகாப்பு அங்கி முழுமையாக மூடப்பட்டுள்ளது',
    },
    {
      id: 'chk-glasses',
      en: 'Impact safety goggles / face shield clean and on hand',
      hi: 'सुरक्षा चश्मा या फेस शील्ड साफ और उपयोग के लिए तैयार है',
      ta: 'கண் பாதுகாப்பு கண்ணாடி அல்லது முகக் கவசம் தயாராக உள்ளது',
    },
  ];

  const completedChecks = dailyChecklistItems.filter(
    (item) => checklistProgress[item.id]
  ).length;

  return (
    <div className="space-y-8">
      {/* Shift Greeting & Replay Last Floating Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Shift 1 Active · Zone: Plant Stamping & Assembly</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            {language === 'hi'
              ? 'फैक्ट्री सुरक्षा साथी (सुरक्षा एआई)'
              : language === 'ta'
              ? 'தொழிற்சாலை பாதுகாப்பு வழிகாட்டி (சுரக்ஷா ஏஐ)'
              : 'Factory Safety Companion'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            {language === 'hi'
              ? 'अपनी सुरक्षा श्रेणी चुनें, वॉयस से पूछें या आपातकालीन प्रोटोकॉल का पालन करें।'
              : language === 'ta'
              ? 'உங்கள் பாதுகாப்பு வகையைத் தேர்ந்தெடுக்கவும் அல்லது குரல் மூலம் கேட்கவும்.'
              : 'Select a safety module below, ask by voice, or review verified plant SOPs.'}
          </p>
        </div>

        {/* Prominent Replay Last Instruction Button */}
        {lastSpokenText && (
          <button
            onClick={replayLast}
            className="w-full md:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-orange-400 hover:text-orange-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? 'पिछला निर्देश फिर से सुनें'
                : language === 'ta'
                ? 'முந்தைய அறிவுறுத்தலை மீண்டும் கேள்'
                : 'Replay Last Instruction'}
            </span>
          </button>
        )}
      </div>

      {/* 5 Big Safety Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-400" />
            <span>
              {language === 'hi'
                ? '5 मुख्य सुरक्षा श्रेणियां'
                : language === 'ta'
                ? '5 முக்கிய பாதுகாப்பு பிரிவுகள்'
                : 'Five Safety Modules'}
            </span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Complies with Factories Act 1948
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SAFETY_CATEGORIES.map((cat) => {
            const instruction = SAFETY_INSTRUCTIONS[cat.id];
            const isEmergencyCat = cat.id === 'emergency';

            return (
              <div
                key={cat.id}
                className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-slate-600 shadow-lg ${
                  isEmergencyCat
                    ? 'border-red-500/60 bg-red-950/20'
                    : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-medium">
                      {cat.standard}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {cat.names[language]}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.subtitles[language]}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center gap-2">
                  {/* Big Accessible Audio Readout Button */}
                  <button
                    onClick={() => speakText(instruction.audioSummary[language])}
                    className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                    title="Listen to audio overview"
                  >
                    <Volume2 className="w-4 h-4 text-orange-400" />
                    <span>{language === 'hi' ? 'ऑडियो सुनें' : language === 'ta' ? 'கேளுங்கள்' : 'Listen'}</span>
                  </button>

                  {/* Open SOP Details */}
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex-1 py-2.5 px-3 bg-orange-500 hover:bg-orange-400 active:scale-95 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>{language === 'hi' ? 'नियम व चेकलिस्ट' : language === 'ta' ? 'விதிகள்' : 'Open SOP'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Pre-Shift Verification Strip (Interactive checklist) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">
              {language === 'hi'
                ? 'दैनिक शिफ्ट पूर्व सुरक्षा जांच'
                : language === 'ta'
                ? 'தினசரி பணிக்கு முந்தைய பாதுகாப்பு சரிபார்ப்பு'
                : 'Daily Pre-Shift PPE Self-Verification'}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
              {completedChecks} / {dailyChecklistItems.length} {language === 'hi' ? 'पूर्ण' : language === 'ta' ? 'முடிந்தது' : 'Verified'}
            </span>
            {completedChecks > 0 && (
              <button
                onClick={resetChecklist}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dailyChecklistItems.map((item) => {
            const isChecked = checklistProgress[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 active:scale-[0.99] ${
                  isChecked
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {isChecked ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {item[language]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frequently Asked Safety FAQs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            <span>
              {language === 'hi'
                ? 'अक्सर पूछे जाने वाले सुरक्षा प्रश्न (FAQs)'
                : language === 'ta'
                ? 'அடிக்கடி கேட்கப்படும் பாதுகாப்பு கேள்விகள்'
                : 'Frequently Asked Safety Questions'}
            </span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Tap to open solution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SAFETY_FAQS.slice(0, 4).map((faq) => (
            <button
              key={faq.id}
              onClick={() => executeSearch(faq.question[language], 'faq')}
              className="w-full text-left p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-950/80 transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase text-orange-400 font-semibold">
                  {faq.categoryId}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white">
                {faq.question[language]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
