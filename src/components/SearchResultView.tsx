/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  HardHat,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { SafetyCategory } from '../types/safety';

export const SearchResultView: React.FC = () => {
  const {
    searchResult,
    clearSearch,
    language,
    speakText,
    isSpeaking,
    stopSpeaking,
    replayLast,
    setActiveCategory,
  } = useSafety();

  if (!searchResult) return null;

  const categoryIcons: Record<SafetyCategory, React.ReactNode> = {
    helmet: <HardHat className="w-5 h-5 text-amber-400" />,
    fire: <Flame className="w-5 h-5 text-orange-400" />,
    machine: <AlertTriangle className="w-5 h-5 text-blue-400" />,
    electrical: <Zap className="w-5 h-5 text-yellow-400" />,
    emergency: <AlertOctagon className="w-5 h-5 text-red-400" />,
  };

  const handleOpenCategoryDetail = () => {
    setActiveCategory(searchResult.category);
    clearSearch();
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-5 animate-in fade-in duration-200">
      {/* Top Banner with Close & Audio Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
            {categoryIcons[searchResult.category]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-orange-400 tracking-wider font-semibold">
                Match Confidence: {(searchResult.confidence * 100).toFixed(0)}%
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 uppercase font-mono">
                {searchResult.category.toUpperCase()} SOP
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              {language === 'hi'
                ? 'सुरक्षा समाधान व प्रमाणित निर्देश'
                : language === 'ta'
                ? 'பாதுகாப்பு தீர்வு மற்றும் வழிகாட்டல்'
                : 'Safety Protocol Guidance'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Working Text-to-Speech Playback Button */}
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="px-3.5 py-1.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg border border-red-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <VolumeX className="w-4 h-4 text-red-400" />
              <span>{language === 'hi' ? 'रोकें' : language === 'ta' ? 'நிறுத்து' : 'Stop'}</span>
            </button>
          ) : (
            <button
              onClick={() => speakText(searchResult.spokenText)}
              className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>{language === 'hi' ? 'निर्देश सुनें' : language === 'ta' ? 'கேளுங்கள்' : 'Play Voice'}</span>
            </button>
          )}

          {/* Replay Last Instruction */}
          <button
            onClick={replayLast}
            title="Replay Voice Audio"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Dismiss button */}
          <button
            onClick={clearSearch}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Answer Summary */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5">
        <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
          {searchResult.summaryText}
        </p>
      </div>

      {/* Steps List if available */}
      {searchResult.steps && searchResult.steps.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'hi' ? 'अनिवार्य सुरक्षा कदम' : language === 'ta' ? 'கட்டாய படிகள்' : 'Mandatory Execution Steps'}
          </h3>
          <div className="grid gap-2">
            {searchResult.steps.map((st, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 text-sm text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Prohibition Warning */}
      {searchResult.criticalWarning && (
        <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-3.5 flex items-start gap-3 text-xs sm:text-sm text-red-200">
          <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-300">
              {language === 'hi' ? 'सख्त सुरक्षा निषेध' : language === 'ta' ? 'கடுமையான தடை' : 'Strict Safety Prohibition'}
            </p>
            <p className="mt-0.5 text-red-200/90">{searchResult.criticalWarning}</p>
          </div>
        </div>
      )}

      {/* Suggested Follow-up Questions */}
      {searchResult.suggestedQuestions && searchResult.suggestedQuestions.length > 0 && (
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-400 mb-2 block">
            {language === 'hi' ? 'संबंधित प्रश्न:' : language === 'ta' ? 'தொடர்புடைய கேள்விகள்:' : 'Related Safety Queries:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {searchResult.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  speakText(q);
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-mono">
          Logged to Plant Audit DB · ISO 45001 Compliant
        </span>
        <button
          onClick={handleOpenCategoryDetail}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-orange-400 hover:text-orange-300 text-xs font-bold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <span>
            {language === 'hi' ? 'पूरा एसओपी (SOP) देखें' : language === 'ta' ? 'முழு SOP பார்க்க' : 'Open Full SOP Protocol'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
