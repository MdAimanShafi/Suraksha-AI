/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  INITIAL_TRAINING_GAPS,
  SAMPLE_ACTIVITY_LOGS,
} from '../data/safetyContent';
import {
  InteractionLog,
  KioskSettings,
  Language,
  SafetyCategory,
  TrainingGapMetric,
} from '../types/safety';

const LOGS_STORAGE_KEY = 'suraksha_interaction_logs';
const GAPS_STORAGE_KEY = 'suraksha_training_gaps';
const SETTINGS_STORAGE_KEY = 'suraksha_kiosk_settings';

export const DEFAULT_KIOSK_SETTINGS: KioskSettings = {
  autoResetSeconds: 45,
  soundEnabled: true,
  speechRate: 0.95,
  supervisorPin: '1234',
  plantZone: 'Bay 4 – North Stamping & Assembly',
};

export class StorageService {
  public static getLogs(): InteractionLog[] {
    try {
      const data = localStorage.getItem(LOGS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(SAMPLE_ACTIVITY_LOGS));
        return SAMPLE_ACTIVITY_LOGS;
      }
      return JSON.parse(data);
    } catch {
      return SAMPLE_ACTIVITY_LOGS;
    }
  }

  public static addLog(log: Omit<InteractionLog, 'id' | 'timestamp'>): InteractionLog {
    const fullLog: InteractionLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };

    try {
      const current = this.getLogs();
      const updated = [fullLog, ...current].slice(0, 200); // keep max 200
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updated));

      // If flagged training gap, update gap counters
      if (log.flaggedTrainingGap) {
        this.incrementTrainingGap(log.category, log.zone);
      }
    } catch (e) {
      console.warn('Storage save failed:', e);
    }

    return fullLog;
  }

  public static getTrainingGaps(): TrainingGapMetric[] {
    try {
      const data = localStorage.getItem(GAPS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(GAPS_STORAGE_KEY, JSON.stringify(INITIAL_TRAINING_GAPS));
        return INITIAL_TRAINING_GAPS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_TRAINING_GAPS;
    }
  }

  public static incrementTrainingGap(category: SafetyCategory, zone: string): void {
    const gaps = this.getTrainingGaps();
    const existing = gaps.find((g) => g.category === category);
    if (existing) {
      existing.queryCount += 1;
      existing.affectedZone = zone;
    }
    localStorage.setItem(GAPS_STORAGE_KEY, JSON.stringify(gaps));
  }

  public static resolveTrainingGap(gapId: string): void {
    const gaps = this.getTrainingGaps().filter((g) => g.id !== gapId);
    localStorage.setItem(GAPS_STORAGE_KEY, JSON.stringify(gaps));
  }

  public static getKioskSettings(): KioskSettings {
    try {
      const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_KIOSK_SETTINGS));
        return DEFAULT_KIOSK_SETTINGS;
      }
      return { ...DEFAULT_KIOSK_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_KIOSK_SETTINGS;
    }
  }

  public static saveKioskSettings(settings: KioskSettings): void {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }

  public static resetDemoData(): void {
    try {
      localStorage.removeItem(LOGS_STORAGE_KEY);
      localStorage.removeItem(GAPS_STORAGE_KEY);
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(SAMPLE_ACTIVITY_LOGS));
      localStorage.setItem(GAPS_STORAGE_KEY, JSON.stringify(INITIAL_TRAINING_GAPS));
    } catch (e) {
      console.warn('Reset failed:', e);
    }
  }

  public static clearAllData(): void {
    try {
      localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify([]));
      localStorage.setItem(GAPS_STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.warn('Clear failed:', e);
    }
  }
}
