/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Bot,
  Brain,
  CheckCircle2,
  Copy,
  CornerDownLeft,
  Loader2,
  RotateCcw,
  Send,
  Sparkles,
  Trash2,
  User,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { soundEffects } from '../utils/soundEffects';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

export const GeminiChatbot: React.FC = () => {
  const { language, speakText, isSpeaking, stopSpeaking } = useSafety();

  // Model selection state
  // Prompt requirement: Use gemini-4-argon for complex tasks, gemini-3.8-flash for general tasks, and gemini-3.1-flash-lite for tasks that should happen fast.
  const [selectedModel, setSelectedModel] = useState<
    'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'
  >('gemini-3.8-flash');

  // Role / system instruction state
  const [selectedRole, setSelectedRole] = useState<'advisor' | 'specialist' | 'investigator'>('advisor');

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        text:
          language === 'hi'
            ? 'नमस्ते! मैं सुरक्षा एआई (SURAKSHA AI) चैटबॉट हूँ। आप मुझसे फैक्ट्री सुरक्षा, पीपीई नियम, लोटो प्रक्रिया या किसी भी दुर्घटना रोकथाम के बारे में विस्तार से पूछ सकते हैं।'
            : language === 'ta'
            ? 'வணக்கம்! நான் சுரக்ஷா ஏஐ (SURAKSHA AI) உரையாடல் உதவியாளர். தொழிற்சாலை பாதுகாப்பு, பிபிஇ விதிகள், லோட்டோ நடைமுறை குறித்து என்னிடம் கேட்கலாம்.'
            : 'Hello! I am your SURAKSHA Gemini Safety Intelligence Chatbot. I can assist with certified plant safety SOPs, OSHA & Factories Act compliance, LOTO procedures, or detailed incident evaluations.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.8-flash',
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat thread
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    soundEffects.playClick();
    const userText = inputPrompt.trim();
    setInputPrompt('');
    setApiError(null);

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build history for multi-turn chat
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome-msg')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          model: selectedModel,
          role: selectedRole,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      soundEffects.playSuccess();

      const modelMessage: ChatMessage = {
        id: `mod-${Date.now()}`,
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model || selectedModel,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setApiError(err.message || 'Failed to reach Gemini safety server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    soundEffects.playClick();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text:
          language === 'hi'
            ? 'चैट इतिहास रीसेट कर दिया गया है। नया प्रश्न पूछें।'
            : language === 'ta'
            ? 'உரையாடல் வரலாறு அழிக்கப்பட்டது. புதிய கேள்வியை கேட்கவும்.'
            : 'Conversation history reset. What safety topic would you like to explore?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
    setApiError(null);
  };

  const quickStarters = [
    {
      title: 'LOTO Stamping Press Protocol',
      prompt: 'Provide a 5-point safety checklist for mechanical power press die changeover with zero hydraulic energy isolation.',
      model: 'gemini-3.8-flash' as const,
      role: 'specialist' as const,
    },
    {
      title: 'Fast Arc Flash PPE Clearance',
      prompt: 'Quick answer: What NFPA 70E category PPE is required for 415V 25kA MCC switchboard inspection?',
      model: 'gemini-3.1-flash-lite' as const,
      role: 'advisor' as const,
    },
    {
      title: 'Root Cause Incident Analysis',
      prompt: 'Conduct a deep 5-Why root cause analysis of a near-miss where an operator entered a robotic welding cage with bypassed interlocks.',
      model: 'gemini-4-argon' as const,
      role: 'investigator' as const,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[750px] max-w-5xl mx-auto overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase">
                GEMINI MULTI-TURN SAFETY CHAT
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-slate-400">
                Active: {selectedModel}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Suraksha AI Multi-Turn Safety Assistant
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Model Selector Pill (Requirements: argon for complex, 3.8-flash for general, 3.1-flash-lite for fast) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setSelectedModel('gemini-3.8-flash')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedModel === 'gemini-3.8-flash'
                  ? 'bg-orange-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="gemini-3.8-flash: General Safety Tasks"
            >
              3.8 Flash (General)
            </button>
            <button
              onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedModel === 'gemini-3.1-flash-lite'
                  ? 'bg-orange-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="gemini-3.1-flash-lite: Fast Tasks"
            >
              3.1 Lite (Fast)
            </button>
            <button
              onClick={() => setSelectedModel('gemini-4-argon')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                selectedModel === 'gemini-4-argon'
                  ? 'bg-orange-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="gemini-4-argon: Complex Incident Tasks"
            >
              Argon (Complex)
            </button>
          </div>

          {/* Role / Persona Selector */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
          >
            <option value="advisor">Role: Safety Advisor</option>
            <option value="specialist">Role: LOTO & Machinery Specialist</option>
            <option value="investigator">Role: Incident Investigator</option>
          </select>

          {/* Reset Thread */}
          <button
            onClick={handleClearChat}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Topic Starter Chips */}
      <div className="bg-slate-950/40 border-b border-slate-800/80 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
          Quick Prompts:
        </span>
        {quickStarters.map((starter, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedModel(starter.model);
              setSelectedRole(starter.role);
              setInputPrompt(starter.prompt);
            }}
            className="whitespace-nowrap px-2.5 py-1 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-700/60 transition-colors text-xs"
          >
            {starter.title}
          </button>
        ))}
      </div>

      {/* Scrollable Message Thread */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/30"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-slate-800 border border-slate-700 text-slate-300'
                    : 'bg-orange-500 text-slate-950 shadow-md'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-slate-800 text-white border border-slate-700 rounded-tr-none'
                    : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-800/60 pb-2 mb-2 text-[11px] text-slate-400">
                  <span className="font-semibold">
                    {isUser ? 'Operator / Safety Worker' : 'SURAKSHA Intelligence'}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.modelUsed && (
                      <span className="font-mono text-[10px] text-orange-400/80">
                        {msg.modelUsed}
                      </span>
                    )}
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>
                </div>

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Speech read-out for assistant responses */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => speakText(msg.text)}
                      className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen Aloud</span>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(msg.text);
                        soundEffects.playClick();
                      }}
                      className="text-slate-400 hover:text-slate-200"
                      title="Copy response text"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-slate-950 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-slate-300 flex items-center gap-2 shadow-md">
              <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
              <span>Analyzing safety database with {selectedModel}...</span>
            </div>
          </div>
        )}

        {/* API Error Notification */}
        {apiError && (
          <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-3.5 flex items-start gap-3 text-xs text-red-200">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300 block">Gemini API Notice:</strong>
              <span>{apiError}</span>
              <p className="text-[11px] text-red-300/80 mt-1">
                Note: Ensure GEMINI_API_KEY is configured in Settings &gt; Secrets, or switch to 3.8 Flash for standard queries.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Message Box */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'सुरक्षा प्रश्न या एसओपी के बारे में पूछें...'
                : language === 'ta'
                ? 'பாதுகாப்பு அல்லது நடைமுறைகள் குறித்து கேட்கவும்...'
                : 'Ask Gemini any factory safety question, SOP clarification, or hazard protocol...'
            }
            disabled={isLoading}
            className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl py-3 pl-4 pr-24 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="absolute right-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:hover:bg-orange-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </>
            )}
          </button>
        </form>
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
          <span>Role System Prompt Active · Powered by Google GenAI SDK</span>
          <span className="font-mono">Model: {selectedModel}</span>
        </div>
      </div>
    </div>
  );
};
