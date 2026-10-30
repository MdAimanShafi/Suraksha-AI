/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Flame,
  HardHat,
  HelpCircle,
  Play,
  RotateCcw,
  Shield,
  Square,
  Volume2,
  VolumeX,
  XCircle,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { SAFETY_CATEGORIES, SAFETY_FAQS, SAFETY_INSTRUCTIONS } from '../data/safetyContent';
import { SafetyCategory } from '../types/safety';

export const CategoryDetail: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    language,
    speakText,
    isSpeaking,
    stopSpeaking,
    replayLast,
    checklistProgress,
    toggleChecklistItem,
    executeSearch,
  } = useSafety();

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  if (!activeCategory) return null;

  const metadata = SAFETY_CATEGORIES.find((c) => c.id === activeCategory)!;
  const instruction = SAFETY_INSTRUCTIONS[activeCategory];
  const relatedFaqs = SAFETY_FAQS.filter((f) => f.categoryId === activeCategory);

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

  return (
    <div className="space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveCategory(null)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-orange-400" />
          <span>
            {language === 'hi'
              ? 'सभी श्रेणियों पर वापस जाएं'
              : language === 'ta'
              ? 'அனைத்து பிரிவுகளுக்கும் திரும்பு'
              : 'Back to All Modules'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {/* Replay Last Instruction */}
          <button
            onClick={replayLast}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">
              {language === 'hi' ? 'पुनः सुनें' : language === 'ta' ? 'மீண்டும் கேள்' : 'Replay Last'}
            </span>
          </button>

          {/* Full SOP Voice Readout Button */}
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-xl border border-red-500/40 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <VolumeX className="w-4 h-4 text-red-400" />
              <span>{language === 'hi' ? 'ऑडियो रोकें' : language === 'ta' ? 'நிறுத்து' : 'Stop Audio'}</span>
            </button>
          ) : (
            <button
              onClick={() => speakText(instruction.audioSummary[language])}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-colors shadow-md active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>{language === 'hi' ? 'पूरा प्रोटोकॉल सुनें' : language === 'ta' ? 'முழு விதியை கேள்' : 'Listen to Full SOP'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Module Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 mb-5">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
              {getCategoryIcon(activeCategory)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-orange-400 font-semibold mb-1">
                <span>{instruction.standardCode}</span>
                <span className="text-slate-600">·</span>
                <span>OSHA / IS COMPLIANT</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {instruction.title[language]}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {instruction.subtitle[language]}
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          {instruction.overview[language]}
        </p>

        {/* Required PPE strip */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            {language === 'hi' ? 'आवश्यक पीपीई:' : language === 'ta' ? 'தேவையான பிபிஇ:' : 'Required PPE:'}
          </span>
          {instruction.requiredPpe[language].map((ppe, i) => (
            <span
              key={i}
              className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
            >
              {ppe}
            </span>
          ))}
        </div>
      </div>

      {/* Step-by-Step Interactive Execution Checklist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'चरणबद्ध प्रक्रिया और ऑपरेटर चेकलिस्ट'
                  : language === 'ta'
                  ? 'படி படியான வழிகாட்டி & சரிபார்ப்பு பட்டியல்'
                  : 'Step-by-Step Operator Checklist'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'hi'
                ? 'प्रत्येक कदम को पूरा करने के बाद टिक करें और ऑडियो निर्देश सुनें।'
                : language === 'ta'
                ? 'ஒவ்வொரு படியையும் முடித்தவுடன் டிக் செய்து ஆடியோ கேளுங்கள்.'
                : 'Check off each step as you complete it and tap the speaker to hear instructions.'}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {instruction.steps.map((st) => {
            const checkKey = `${activeCategory}-step-${st.stepNumber}`;
            const isChecked = checklistProgress[checkKey];

            return (
              <div
                key={st.stepNumber}
                className={`border rounded-2xl p-4 sm:p-5 transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isChecked
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Big Checkbox Trigger */}
                  <button
                    onClick={() => toggleChecklistItem(checkKey)}
                    className="mt-0.5 shrink-0 focus:outline-none"
                    title="Toggle step completion"
                  >
                    {isChecked ? (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-500 hover:text-slate-300" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-orange-400 uppercase">
                        Step {st.stepNumber}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-bold ${
                          isChecked ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {st.title[language]}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {st.description[language]}
                    </p>
                  </div>
                </div>

                {/* Per-step Speech Playback Button */}
                <button
                  onClick={() => speakText(st.audioPrompt[language])}
                  className="shrink-0 w-full sm:w-auto px-3.5 py-2 bg-slate-950 hover:bg-slate-800 active:scale-95 text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-orange-400" />
                  <span>{language === 'hi' ? 'यह कदम सुनें' : language === 'ta' ? 'படி கேட்க' : 'Listen Step'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certified Dos and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DOs */}
        <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-bold text-base text-emerald-300">
              {language === 'hi' ? 'क्या करें (DOs)' : language === 'ta' ? 'செய்ய வேண்டியவை' : 'Certified DOs'}
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {instruction.dos[language].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'Ts */}
        <div className="bg-slate-900 border border-red-900/40 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="w-5 h-5" />
            <h3 className="font-bold text-base text-red-300">
              {language === 'hi' ? 'क्या न करें (DON’Ts)' : language === 'ta' ? 'செய்யக் கூடாதவை' : 'Strict Prohibitions (DON’Ts)'}
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {instruction.donts[language].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Category FAQs */}
      {relatedFaqs.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            <span>
              {language === 'hi'
                ? 'इस श्रेणी के अक्सर पूछे जाने वाले प्रश्न'
                : language === 'ta'
                ? 'இந்த பிரிவுக்கான கேள்வி பதில்கள்'
                : 'Module Clarifications & FAQs'}
            </span>
          </h3>

          <div className="space-y-2">
            {relatedFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                  >
                    <span>{faq.question[language]}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-orange-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-3">
                      <p className="mt-2 leading-relaxed">{faq.answer[language]}</p>
                      <button
                        onClick={() => speakText(faq.audioText[language])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'उत्तर सुनें' : language === 'ta' ? 'பதிலை கேள்' : 'Listen Answer'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
