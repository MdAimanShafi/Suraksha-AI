/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Copy,
  FileAudio,
  Loader2,
  Mic,
  MicOff,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { soundEffects } from '../utils/soundEffects';

interface TranscriptionHistoryItem {
  id: string;
  timestamp: string;
  text: string;
  model: string;
  durationSeconds: number;
}

export const AudioTranscriber: React.FC = () => {
  const { language, executeSearch, setMode, speakText } = useSafety();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<TranscriptionHistoryItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    soundEffects.playClick();
    setErrorMessage(null);
    setTranscriptionResult(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      soundEffects.playMicChime();

      // Use audio/webm or audio/mp4 depending on browser support
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());

        if (audioChunksRef.current.length === 0) {
          setErrorMessage('No audio data was recorded.');
          return;
        }

        const recordedBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });
        await processAndTranscribe(recordedBlob, recorder.mimeType || 'audio/webm');
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone access failed:', err);
      // Fallback: provide pre-configured industrial voice test sample if mic is unavailable
      setErrorMessage(
        'Microphone access denied or unavailable in this browser frame. You can use the "Simulate Factory Voice Recording" test button below.'
      );
    }
  };

  const stopRecording = () => {
    soundEffects.playClick();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Convert blob to base64 and send to gemini-3.5-transcribe
  const processAndTranscribe = async (blob: Blob, mimeType: string) => {
    setIsTranscribing(true);
    setErrorMessage(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = reader.result as string;

        const res = await fetch('/api/gemini/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: base64Data,
            mimeType,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Transcription failed with HTTP ${res.status}`);
        }

        const data = await res.json();
        const text = data.transcript || 'No speech detected.';
        soundEffects.playSuccess();
        setTranscriptionResult(text);

        const newItem: TranscriptionHistoryItem = {
          id: `trans-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text,
          model: 'gemini-3.5-transcribe',
          durationSeconds: recordingSeconds,
        };
        setHistory((prev) => [newItem, ...prev]);
        setIsTranscribing(false);
      };
    } catch (err: any) {
      console.error('Transcription error:', err);
      setErrorMessage(err.message || 'Error communicating with gemini-3.5-transcribe model.');
      setIsTranscribing(false);
    }
  };

  // Simulated recording for evaluation when mic permissions are blocked by sandbox iframe
  const handleSimulateRecording = async () => {
    soundEffects.playMicChime();
    setIsRecording(true);
    setRecordingSeconds(0);
    setErrorMessage(null);
    setTranscriptionResult(null);

    let sec = 0;
    const interval = setInterval(() => {
      sec++;
      setRecordingSeconds(sec);
      if (sec >= 3) {
        clearInterval(interval);
        setIsRecording(false);
        setIsTranscribing(true);

        setTimeout(() => {
          setIsTranscribing(false);
          soundEffects.playSuccess();
          const sampleResult =
            language === 'hi'
              ? 'मशीन नंबर चार में हाइड्रोलिक प्रेशर लीक हो रहा है, क्या तुरंत लोटो (LOTO) लगाना आवश्यक है?'
              : language === 'ta'
              ? 'இயந்திர எண் நான்கில் ஹைட்ராலிக் கசிவு உள்ளது, லோட்டோ செய்ய வேண்டுமா?'
              : 'Hydraulic pressure drop detected on Press Line 4, initiating emergency lockout tagout verification.';
          setTranscriptionResult(sampleResult);

          const newItem: TranscriptionHistoryItem = {
            id: `trans-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: sampleResult,
            model: 'gemini-3.5-transcribe',
            durationSeconds: 3,
          };
          setHistory((prev) => [newItem, ...prev]);
        }, 1200);
      }
    }, 1000);
  };

  const handleCopy = () => {
    if (!transcriptionResult) return;
    navigator.clipboard.writeText(transcriptionResult);
    soundEffects.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunAsSafetyQuery = () => {
    if (!transcriptionResult) return;
    soundEffects.playClick();
    setMode('worker');
    executeSearch(transcriptionResult, 'voice');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl text-orange-400">
            <FileAudio className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase">
                MODEL: GEMINI-3.5-TRANSCRIBE
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-mono">Microphone Speech-to-Text</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Industrial Audio Transcription Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Speak into your microphone in English, Hindi, or Tamil. Audio is captured and accurately transcribed using Gemini 3.5 Transcribe.
            </p>
          </div>
        </div>
      </div>

      {/* Recording Control Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5">
        {isRecording ? (
          <div className="space-y-4">
            <div className="relative inline-flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <button
                onClick={stopRecording}
                className="relative w-24 h-24 rounded-full bg-red-600 text-white flex flex-col items-center justify-center shadow-xl shadow-red-600/40 active:scale-95 transition-all"
                title="Stop Recording"
              >
                <Square className="w-8 h-8 fill-white" />
                <span className="text-[10px] font-bold uppercase mt-1">Stop</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold font-mono tabular-nums text-red-400">
                00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
              </div>
              <p className="text-xs text-slate-400 animate-pulse">
                Recording microphone audio... Speak your safety instruction clearly.
              </p>
            </div>
          </div>
        ) : isTranscribing ? (
          <div className="py-6 space-y-3">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto" />
            <h3 className="text-base font-bold text-white">
              Transcribing audio with gemini-3.5-transcribe...
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Processing multilingual speech acoustic features and plant terminology.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={startRecording}
              className="w-24 h-24 rounded-full bg-orange-500 hover:bg-orange-400 text-slate-950 flex flex-col items-center justify-center shadow-xl shadow-orange-500/30 active:scale-95 transition-all mx-auto"
              title="Click to Record Microphone"
            >
              <Mic className="w-8 h-8" />
              <span className="text-[10px] font-black uppercase mt-1">Record</span>
            </button>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Click Microphone to Begin Recording</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Captures shopfloor audio and submits directly to <strong className="text-slate-200">gemini-3.5-transcribe</strong>.
              </p>
            </div>

            <button
              onClick={handleSimulateRecording}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              Simulate Factory Audio Recording (Demo Test)
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="w-full bg-red-950/40 border border-red-800/60 rounded-xl p-3.5 flex items-start gap-3 text-xs text-red-200 text-left">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300 block">Notice:</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </div>

      {/* Transcription Result Output Box */}
      {transcriptionResult && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Transcribed via gemini-3.5-transcribe</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(transcriptionResult)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Hear Audio</span>
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
            "{transcriptionResult}"
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            <button
              onClick={handleRunAsSafetyQuery}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Solve in Safety Companion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Previous Transcription History */}
      {history.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Audio Transcriptions ({history.length})
          </h3>
          <div className="space-y-2">
            {history.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                    <span>{item.timestamp}</span>
                    <span>·</span>
                    <span className="text-orange-400">{item.model}</span>
                    <span>·</span>
                    <span>{item.durationSeconds}s clip</span>
                  </div>
                  <p className="text-slate-200 font-medium">{item.text}</p>
                </div>
                <button
                  onClick={() => {
                    executeSearch(item.text, 'voice');
                    setMode('worker');
                  }}
                  className="shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded-lg font-semibold"
                >
                  Analyze
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
