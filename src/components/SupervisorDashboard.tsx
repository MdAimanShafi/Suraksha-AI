/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowDownToLine,
  CheckCircle2,
  Database,
  Download,
  Filter,
  Flame,
  Globe,
  HardHat,
  HelpCircle,
  Layers,
  MessageSquare,
  RefreshCw,
  Search,
  Shield,
  Sliders,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { Language, SafetyCategory } from '../types/safety';

export const SupervisorDashboard: React.FC = () => {
  const {
    logs,
    trainingGaps,
    resetDemoData,
    loadSampleData,
    exportLogsCSV,
    exportLogsJSON,
    toggleLogResolved,
    kioskSettings,
    updateKioskSettings,
    setMode,
  } = useSafety();

  const [activeTab, setActiveTab] = useState<'analytics' | 'logs' | 'gaps' | 'settings'>('analytics');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [filterGapOnly, setFilterGapOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Computations
  const totalInteractions = logs.length;
  const voiceInteractions = logs.filter((l) => l.source === 'voice').length;
  const gapInteractions = logs.filter((l) => l.flaggedTrainingGap).length;

  // Language distribution
  const langCounts: Record<Language, number> = {
    hi: logs.filter((l) => l.language === 'hi').length,
    en: logs.filter((l) => l.language === 'en').length,
    ta: logs.filter((l) => l.language === 'ta').length,
  };

  // Category counts
  const categoryCounts: Record<SafetyCategory, number> = {
    helmet: logs.filter((l) => l.category === 'helmet').length,
    fire: logs.filter((l) => l.category === 'fire').length,
    machine: logs.filter((l) => l.category === 'machine').length,
    electrical: logs.filter((l) => l.category === 'electrical').length,
    emergency: logs.filter((l) => l.category === 'emergency').length,
  };

  // Frequently queried topics
  const topTopics = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  // Filtered log entries
  const filteredLogs = logs.filter((log) => {
    if (filterCategory !== 'all' && log.category !== filterCategory) return false;
    if (filterLanguage !== 'all' && log.language !== filterLanguage) return false;
    if (filterGapOnly && !log.flaggedTrainingGap) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return (
        log.query.toLowerCase().includes(s) ||
        log.response.toLowerCase().includes(s) ||
        log.zone.toLowerCase().includes(s)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Demo Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold uppercase tracking-wider mb-1">
            <span>EHS SAFETY AUDITOR CONSOLE</span>
            <span className="text-slate-600">·</span>
            <span>PLANT #4 SURAKSHA TELEMETRY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Supervisor Safety Intelligence & Training Gaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time shopfloor compliance metrics, worker voice queries, and OSHA training deficiencies.
          </p>
        </div>

        {/* Demo Controls: Reset & Load Sample Data */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={loadSampleData}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-orange-400" />
            <span>Load Sample Data</span>
          </button>
          <button
            onClick={resetDemoData}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={exportLogsCSV}
            className="px-3.5 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-extrabold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Navigation Segmented Control Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'bg-orange-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'gaps'
              ? 'bg-orange-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Training Gaps ({trainingGaps.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'bg-orange-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Interaction Audit Log ({logs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-orange-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Kiosk Settings</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Stat Cards (Single Elevation, Tabular Numerals) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Total Safety Interactions
              </span>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {totalInteractions}
              </div>
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% logged locally to storage
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Voice Query Volume
              </span>
              <div className="text-3xl font-extrabold text-orange-400 font-mono tabular-nums">
                {voiceInteractions}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {((voiceInteractions / (totalInteractions || 1)) * 100).toFixed(0)}% worker adoption rate
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Identified Training Gaps
              </span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                {gapInteractions}
              </div>
              <p className="text-[11px] text-amber-400/90 mt-2">
                Requires Shift Toolbox Talk
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Emergency Drills / SOS
              </span>
              <div className="text-3xl font-extrabold text-red-400 font-mono tabular-nums">
                {logs.filter((l) => l.category === 'emergency').length}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Zero open fatalities this quarter
              </p>
            </div>
          </div>

          {/* 2-Column Visual Breakdown: Topic Distribution + Language Adoption */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Topic Distribution */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-orange-400" />
                  <span>Topic-Wise Interaction Breakdown</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">By Category</span>
              </div>

              <div className="space-y-3.5">
                {topTopics.map(([cat, count]) => {
                  const percentage = totalInteractions ? ((count / totalInteractions) * 100).toFixed(1) : '0';
                  const labels: Record<string, string> = {
                    helmet: 'Helmet & PPE (IS 2925)',
                    fire: 'Fire Safety & PASS (NFPA 10)',
                    machine: 'Machine & LOTO (OSHA 1910)',
                    electrical: 'Electrical & Arc Flash (IS 732)',
                    emergency: 'Emergency & First Aid (Factories Act)',
                  };

                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-200">{labels[cat]}</span>
                        <span className="font-mono tabular-nums text-slate-400 font-bold">
                          {count} queries ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full transition-all duration-500 ${
                            cat === 'emergency'
                              ? 'bg-red-500'
                              : cat === 'machine'
                              ? 'bg-blue-500'
                              : cat === 'fire'
                              ? 'bg-orange-500'
                              : cat === 'electrical'
                              ? 'bg-yellow-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Language Distribution */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-400" />
                  <span>Shopfloor Language Distribution</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Worker Preference</span>
              </div>

              <div className="space-y-4">
                {[
                  { lang: 'hi', label: 'Hindi (हिंदी)', count: langCounts.hi, color: 'bg-orange-500' },
                  { lang: 'en', label: 'English (Indian Plant Standard)', count: langCounts.en, color: 'bg-blue-500' },
                  { lang: 'ta', label: 'Tamil (தமிழ்)', count: langCounts.ta, color: 'bg-emerald-500' },
                ].map((item) => {
                  const pct = totalInteractions ? ((item.count / totalInteractions) * 100).toFixed(1) : '0';
                  return (
                    <div key={item.lang} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-200 font-semibold">{item.label}</span>
                        <span className="font-mono tabular-nums text-slate-400 font-bold">
                          {item.count} sessions ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full ${item.color} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <p>
                  <strong className="text-white">Multilingual Insights:</strong> 58% of shopfloor operators prefer Hindi voice instructions during high-stress maintenance clearance. Tamil voice inputs peak in Assembly Bay 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRAINING GAPS */}
      {activeTab === 'gaps' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Detected Safety Training Deficiencies</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically flagged from recurring queries, failed procedure attempts, and hesitation in critical zones.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {trainingGaps.map((gap) => (
              <div
                key={gap.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded uppercase ${
                        gap.urgency === 'high'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {gap.urgency} URGENCY
                    </span>
                    <h3 className="font-bold text-white text-base">{gap.title}</h3>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    Location: <strong className="text-slate-200">{gap.affectedZone}</strong>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {gap.summary}
                </p>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-200">
                  <Shield className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-orange-400 block mb-0.5">Recommended Remediation Action:</strong>
                    <span>{gap.recommendedAction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTION AUDIT LOG */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search audit queries, zones, responses..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Modules</option>
                <option value="helmet">Helmet & PPE</option>
                <option value="fire">Fire & PASS</option>
                <option value="machine">Machine & LOTO</option>
                <option value="electrical">Electrical</option>
                <option value="emergency">Emergency SOS</option>
              </select>

              {/* Language Filter */}
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Languages</option>
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="ta">Tamil</option>
              </select>

              {/* Training gap only toggle */}
              <button
                onClick={() => setFilterGapOnly(!filterGapOnly)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  filterGapOnly
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Training Gaps Only
              </button>
            </div>
          </div>

          {/* Dense High-Density Data Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Zone</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Lang / Source</th>
                    <th className="py-3 px-4">Query Asked</th>
                    <th className="py-3 px-4">Response Rendered</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-500">
                        No interaction records match the specified filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => {
                      const timeStr = new Date(log.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                      return (
                        <tr key={log.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="py-3 px-4 font-mono text-slate-400 tabular-nums whitespace-nowrap">
                            {timeStr}
                          </td>
                          <td className="py-3 px-4 text-slate-300 font-medium whitespace-nowrap">
                            {log.zone}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono uppercase text-orange-400 font-semibold">
                              {log.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="uppercase font-mono text-slate-400">
                              {log.language} · {log.source}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-100 font-semibold max-w-xs truncate">
                            {log.query}
                          </td>
                          <td className="py-3 px-4 text-slate-300 max-w-sm truncate">
                            {log.response}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            {log.flaggedTrainingGap ? (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                                GAP FLAGGED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                                COMPLIANT
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KIOSK SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-orange-400" />
              <span>Plant Kiosk Hardware & Policy Settings</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure touch timeout countdown, terminal location, and speech engine parameters.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Kiosk Terminal Plant Zone
              </label>
              <input
                type="text"
                value={kioskSettings.plantZone}
                onChange={(e) =>
                  updateKioskSettings({ ...kioskSettings, plantZone: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Auto-Reset Inactivity Timeout ({kioskSettings.autoResetSeconds} seconds)
              </label>
              <input
                type="range"
                min={15}
                max={120}
                step={5}
                value={kioskSettings.autoResetSeconds}
                onChange={(e) =>
                  updateKioskSettings({
                    ...kioskSettings,
                    autoResetSeconds: parseInt(e.target.value),
                  })
                }
                className="w-full accent-orange-500"
              />
              <span className="text-[11px] text-slate-500 font-mono">
                Resets active category view back to home if worker walks away.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Voice Output Speech Rate ({kioskSettings.speechRate}x)
              </label>
              <input
                type="range"
                min={0.7}
                max={1.3}
                step={0.05}
                value={kioskSettings.speechRate}
                onChange={(e) =>
                  updateKioskSettings({
                    ...kioskSettings,
                    speechRate: parseFloat(e.target.value),
                  })
                }
                className="w-full accent-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Supervisor Exit PIN Code
              </label>
              <input
                type="password"
                maxLength={4}
                value={kioskSettings.supervisorPin}
                onChange={(e) =>
                  updateKioskSettings({
                    ...kioskSettings,
                    supervisorPin: e.target.value,
                  })
                }
                className="w-36 text-center tracking-widest font-mono bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
