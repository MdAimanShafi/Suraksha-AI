/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Mic,
  MicOff,
  Search,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { soundEffects } from '../utils/soundEffects';

export const VoiceInputBar: React.FC = () => {
  const { language, executeSearch, isSpeaking, stopSpeaking } = useSafety();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [typedQuery, setTypedQuery] = useState<string>('');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');
  const micDeniedRef = useRef<boolean>(false);

  // Initialize SpeechRecognition if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        const langMap = {
          en: 'en-IN',
          hi: 'hi-IN',
          ta: 'ta-IN',
        };
        recognition.lang = langMap[language] || 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          setRecognitionError(null);
          soundEffects.playMicChime();
        };

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            current += event.results[i][0].transcript;
          }
          setTranscript(current);
          transcriptRef.current = current;
        };

        recognition.onerror = (event: any) => {
          setIsListening(false);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            micDeniedRef.current = true;
            // Seamlessly fall back to simulation so the worker gets the query answered immediately
            simulateVoiceInput();
          } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
            setRecognitionError(
              language === 'hi'
                ? 'आवाज़ पहचान में रुकावट। आप नीचे टाइप भी कर सकते हैं।'
                : language === 'ta'
                ? 'குரல் அறிதலில் பிழை. கீழே தட்டச்சு செய்யவும்.'
                : 'Speech input unavailable. You can also type below.'
            );
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          if (transcriptRef.current.trim()) {
            executeSearch(transcriptRef.current, 'voice');
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [language]);

  const toggleListening = () => {
    soundEffects.playClick();
    if (isSpeaking) {
      stopSpeaking();
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    // If microphone permission is known to be blocked in iframe, immediately simulate
    if (micDeniedRef.current || !recognitionRef.current) {
      simulateVoiceInput();
      return;
    }

    setTranscript('');
    transcriptRef.current = '';
    setRecognitionError(null);

    try {
      recognitionRef.current.start();
    } catch {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    soundEffects.playMicChime();

    const sampleQueries = {
      hi: 'मशीन में लोटो (LOTO) लगाने के 6 नियम क्या हैं?',
      ta: 'மின் அதிர்ச்சி ஏற்பட்டால் முதலுதவி என்ன?',
      en: 'What are the 4 steps of the PASS fire safety method?',
    };

    const targetText = sampleQueries[language] || sampleQueries.en;
    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      setTranscript(targetText.slice(0, index));
      if (index >= targetText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsListening(false);
          soundEffects.playSuccess();
          executeSearch(targetText, 'voice');
        }, 500);
      }
    }, 50);
  };

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedQuery.trim()) return;
    executeSearch(typedQuery, 'text');
    setTypedQuery('');
  };

  const quickPrompts = {
    hi: [
      'हेलमेट का चिन स्ट्रैप कैसे चेक करें?',
      'आग बुझाने का पास (PASS) नियम',
      'लोटो (LOTO) 6 चरण प्रक्रिया',
      'करंट लगने पर तत्काल प्राथमिक उपचार',
    ],
    ta: [
      'தலைக்கவசம் கன்னப் பட்டை சோதனை',
      'பாஸ் (PASS) தீயணைப்பு முறை',
      'லோட்டோ (LOTO) 6 படிகள்',
      'மின் அதிர்ச்சி மீட்பு நெறிமுறை',
    ],
    en: [
      'How to inspect helmet chin strap?',
      'PASS fire extinguisher protocol',
      '6-Step LOTO machine procedure',
      'Electric shock rescue zero-touch rule',
    ],
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
        {/* Giant Glove-Friendly Voice Button */}
        <button
          onClick={toggleListening}
          className={`relative group shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border-2 active:scale-95 shadow-lg ${
            isListening
              ? 'bg-red-500 border-red-400 text-white shadow-red-500/50 animate-pulse'
              : 'bg-orange-500 hover:bg-orange-400 border-orange-400 text-slate-950 shadow-orange-500/20'
          }`}
          title="Tap to speak safety query"
        >
          {isListening ? (
            <>
              <div className="absolute -inset-2 rounded-2xl bg-red-500/30 animate-ping pointer-events-none" />
              <MicOff className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              <span className="text-[11px] font-bold uppercase tracking-wider mt-1 text-white">
                {language === 'hi' ? 'सुन रहे हैं...' : language === 'ta' ? 'கேட்கிறது...' : 'Listening...'}
              </span>
            </>
          ) : (
            <>
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider mt-1 text-slate-950">
                {language === 'hi' ? 'बोलकर पूछें' : language === 'ta' ? 'பேசி கேட்கவும்' : 'Tap & Speak'}
              </span>
            </>
          )}
        </button>

        {/* Text Search Fallback & Status Display */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>
                {language === 'hi'
                  ? 'सुरक्षा एआई वॉयस व टेक्स्ट असिस्टेंट'
                  : language === 'ta'
                  ? 'சுரக்ஷா ஏஐ குரல் மற்றும் உரை உதவி'
                  : 'SURAKSHA AI Multilingual Voice Assistant'}
              </span>
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              Model: Plant-Local Neural v2.4 (Simulated AI)
            </span>
          </div>

          {/* Listening Live Display */}
          {isListening ? (
            <div className="w-full bg-slate-950 border border-orange-500/50 rounded-xl p-3.5 flex items-center justify-between text-orange-400">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
                </span>
                <p className="text-sm font-medium italic">
                  {transcript || (language === 'hi' ? 'अपनी सुरक्षा समस्या बोलें...' : language === 'ta' ? 'உங்கள் கேள்வியை பேசவும்...' : 'Speak your question clearly...')}
                </p>
              </div>
              <button
                onClick={toggleListening}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg text-slate-300 font-medium"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitText} className="relative flex items-center">
              <input
                type="text"
                value={typedQuery}
                onChange={(e) => setTypedQuery(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'या यहाँ टाइप करें: जैसे "हेलमेट कैसे पहनें", "पास नियम", "लोटो प्रक्रिया"...'
                    : language === 'ta'
                    ? 'அல்லது இங்கு தட்டச்சு செய்யவும்: "தலைக்கவசம்", "பாஸ் முறை", "லோட்டோ"...'
                    : 'Or type safety query: e.g. "LOTO steps", "Class B fire", "Eyewash rule"...'
                }
                className="w-full bg-slate-950 border border-slate-700 focus:border-orange-500 rounded-xl py-3 pl-4 pr-24 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!typedQuery.trim()}
                className="absolute right-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:hover:bg-orange-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'खोजें' : language === 'ta' ? 'தேடு' : 'Search'}</span>
              </button>
            </form>
          )}

          {recognitionError && (
            <p className="text-xs text-amber-400">{recognitionError}</p>
          )}

          {/* Quick Voice Prompt Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
              {language === 'hi' ? 'त्वरित प्रश्न:' : language === 'ta' ? 'விரைவு வினாக்கள்:' : 'Quick Voice Queries:'}
            </span>
            {quickPrompts[language].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundEffects.playClick();
                  executeSearch(prompt, 'voice');
                }}
                className="px-2.5 py-1 text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-700/60 transition-colors text-left truncate max-w-[240px]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
