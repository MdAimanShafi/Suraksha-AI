/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types/safety';

export interface SpeechVoiceOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

class SpeechManager {
  private lastSpokenText: string = '';
  private lastSpokenLang: Language = 'en';
  private isSpeakingState: boolean = false;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public isRecognitionSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
    );
  }

  public getLastSpoken(): { text: string; language: Language } {
    return {
      text: this.lastSpokenText,
      language: this.lastSpokenLang,
    };
  }

  public stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
      this.isSpeakingState = false;
    }
  }

  public speak(
    text: string,
    language: Language,
    options?: SpeechVoiceOptions
  ): void {
    if (!this.isSupported() || !text.trim()) {
      options?.onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      this.lastSpokenText = text;
      this.lastSpokenLang = language;

      // Select proper language code
      const langCodeMap: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
      };
      utterance.lang = langCodeMap[language] || 'en-IN';
      utterance.rate = options?.rate ?? 0.95;
      utterance.pitch = options?.pitch ?? 1.0;

      // Match system voices if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find((v) =>
          v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase().slice(0, 2))
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onstart = () => {
        this.isSpeakingState = true;
        options?.onStart?.();
      };

      utterance.onend = () => {
        this.isSpeakingState = false;
        options?.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.isSpeakingState = false;
        options?.onError?.(e);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      this.isSpeakingState = false;
      options?.onError?.(e);
    }
  }

  public replayLast(options?: SpeechVoiceOptions): boolean {
    if (!this.lastSpokenText) return false;
    this.speak(this.lastSpokenText, this.lastSpokenLang, options);
    return true;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState || (this.isSupported() && window.speechSynthesis.speaking);
  }
}

export const speechManager = new SpeechManager();
