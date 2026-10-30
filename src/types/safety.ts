/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi' | 'ta';

export type SafetyCategory = 'helmet' | 'fire' | 'machine' | 'electrical' | 'emergency';

export interface CategoryMetadata {
  id: SafetyCategory;
  code: string;
  names: Record<Language, string>;
  subtitles: Record<Language, string>;
  color: string;
  accentBg: string;
  iconName: string;
  standard: string;
}

export interface SafetyStep {
  stepNumber: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  audioPrompt: Record<Language, string>;
  isMandatory: boolean;
}

export interface SafetyInstruction {
  id: string;
  categoryId: SafetyCategory;
  standardCode: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  overview: Record<Language, string>;
  audioSummary: Record<Language, string>;
  severity: 'critical' | 'warning' | 'advisory';
  steps: SafetyStep[];
  dos: Record<Language, string[]>;
  donts: Record<Language, string[]>;
  requiredPpe: Record<Language, string[]>;
}

export interface SafetyFAQ {
  id: string;
  categoryId: SafetyCategory;
  question: Record<Language, string>;
  answer: Record<Language, string>;
  audioText: Record<Language, string>;
  keywords: string[];
}

export interface InteractionLog {
  id: string;
  timestamp: string; // ISO String
  language: Language;
  category: SafetyCategory;
  query: string;
  response: string;
  source: 'voice' | 'text' | 'faq' | 'checklist' | 'emergency';
  resolved: boolean;
  flaggedTrainingGap: boolean;
  trainingGapReason?: string;
  zone: string;
}

export interface TrainingGapMetric {
  id: string;
  category: SafetyCategory;
  title: string;
  queryCount: number;
  affectedZone: string;
  urgency: 'high' | 'medium' | 'low';
  summary: string;
  recommendedAction: string;
}

export interface KioskSettings {
  autoResetSeconds: number;
  soundEnabled: boolean;
  speechRate: number; // 0.8, 1.0, 1.2
  supervisorPin: string;
  plantZone: string;
}
