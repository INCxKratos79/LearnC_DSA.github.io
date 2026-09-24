import React from 'react';
import { 
  Terminal, 
  Brain, 
  Calendar, 
  Trophy, 
  Scale, 
  BookOpen, 
  Flame, 
  CheckCircle,
  Code
} from 'lucide-react';

export type ActiveTab = 'c-workspace' | 'dsa-workspace' | 'roadmap' | 'leetcode-faq' | 'comparator' | 'cheatsheet';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  solvedCount: number;
  totalProblemsCount: number;
  streakDays: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  solvedCount,
  totalProblemsCount,
  streakDays
}) => {
  const navItems = [
    {
      id: 'c-workspace' as ActiveTab,
      label: 'C Language Mastery',
      icon: Terminal,
      color: 'text-blue-400',
      badge: 'Core Memory & Pointers'
    },
    {
      id: 'dsa-workspace' as ActiveTab,
      label: 'DSA & Algorithms',
      icon: Brain,
      color: 'text-emerald-400',
      badge: 'Patterns & Trees/Graphs'
    },
    {
      id: 'roadmap' as ActiveTab,
      label: '6-Month Master Plan',
      icon: Calendar,
      color: 'text-amber-400',
      badge: '24-Week Schedule'
    },
    {
      id: 'leetcode-faq' as ActiveTab,
      label: 'LeetCode FAQ Vault',
      icon: Trophy,
      color: 'text-purple-400',
      badge: 'Top 75/150 Interview'
    },
    {
      id: 'comparator' as ActiveTab,
      label: 'C vs Python Runner',
      icon: Scale,
      color: 'text-cyan-400',
      badge: 'Architecture & Sim'
    },
    {
      id: 'cheatsheet' as ActiveTab,
      label: 'Revision Sheet',
      icon: BookOpen,
      color: 'text-rose-400',
      badge: 'Segfaults & Bitwise'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Branding & Stats Row */}
        <div className="flex items-center justify-between py-3.5 border-b border-slate-800/80 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">
                  C & DSA 6-Month Mastery
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 uppercase tracking-wider">
                  Technical Interviews & CP
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Structured path from Basics to Advanced • Dual C & Python Solutions for All Problems
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Solved:</span>
              <strong className="text-white font-mono">{solvedCount} / {totalProblemsCount}</strong>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-900/40 text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-slate-400">Streak:</span>
              <strong className="font-mono">{streakDays} Day{streakDays > 1 ? 's' : ''}</strong>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Distinct Workspaces) */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md ring-1 ring-slate-700 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span>{item.label}</span>
                <span
                  className={`hidden md:inline-block text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-slate-900 text-slate-300 border border-slate-700'
                      : 'text-slate-500'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
