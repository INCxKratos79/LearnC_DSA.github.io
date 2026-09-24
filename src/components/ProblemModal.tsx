import React, { useState } from 'react';
import { PracticeProblem, ProblemStatus } from '../types';
import { X, Copy, Check, Bookmark, BookmarkCheck, ExternalLink, Code2, BookOpen, Clock, Cpu, Building2, Lightbulb, FileText } from 'lucide-react';

interface ProblemModalProps {
  problem: PracticeProblem | null;
  onClose: () => void;
  status: ProblemStatus;
  onStatusChange: (problemId: string, status: ProblemStatus) => void;
  isBookmarked: boolean;
  onToggleBookmark: (problemId: string) => void;
  note: string;
  onSaveNote: (problemId: string, note: string) => void;
}

export const ProblemModal: React.FC<ProblemModalProps> = ({
  problem,
  onClose,
  status,
  onStatusChange,
  isBookmarked,
  onToggleBookmark,
  note,
  onSaveNote
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'c' | 'python' | 'approach' | 'notes'>('both');
  const [copiedLang, setCopiedLang] = useState<'c' | 'python' | null>(null);
  const [localNote, setLocalNote] = useState(note);

  if (!problem) return null;

  const handleCopy = (code: string, lang: 'c' | 'python') => {
    navigator.clipboard.writeText(code);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const difficultyColors = {
    Easy: 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50',
    Medium: 'bg-amber-950/80 text-amber-400 border-amber-700/50',
    Hard: 'bg-rose-950/80 text-rose-400 border-rose-700/50'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${difficultyColors[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-cyan-950/70 text-cyan-400 border border-cyan-800/40">
              {problem.level}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {problem.category}
            </span>
            {problem.leetcodeNumber && (
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                LeetCode #{problem.leetcodeNumber}
              </span>
            )}
            <h2 className="text-xl font-bold text-white tracking-tight">{problem.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(problem.id)}
              className={`p-2 rounded-lg transition-colors border ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Bar: Status & Tab switch */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-sm flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Practice Status:</span>
            <select
              value={status}
              onChange={(e) => onStatusChange(problem.id, e.target.value as ProblemStatus)}
              className="bg-slate-800 border border-slate-700 text-xs rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="unsolved">⚪ Unsolved</option>
              <option value="in_progress">🟡 In Progress</option>
              <option value="solved">🟢 Solved / Mastered</option>
              <option value="review">🟣 Needs Revision</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 text-xs font-medium">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'both' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Dual View (C & Python)
            </button>
            <button
              onClick={() => setActiveTab('c')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'c' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              C Language
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'python' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Python 3
            </button>
            <button
              onClick={() => setActiveTab('approach')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'approach' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              💡 Approach & Intuition
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'notes' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              📝 Notes
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300">
          {/* Problem Statement & Complexity Summary */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4.5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Problem Statement
              </span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Time: <strong className="text-amber-300">{problem.timeComplexity}</strong>
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  Space: <strong className="text-purple-300">{problem.spaceComplexity}</strong>
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-200">{problem.description}</p>

            {/* Input / Output Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1 font-sans font-semibold">Example Input:</span>
                <pre className="text-cyan-300 whitespace-pre-wrap">{problem.inputExample}</pre>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1 font-sans font-semibold">Expected Output:</span>
                <pre className="text-emerald-300 whitespace-pre-wrap">{problem.outputExample}</pre>
              </div>
            </div>

            {/* Constraints & Company Tags */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 flex-wrap gap-2 text-xs">
              {problem.constraints && problem.constraints.length > 0 && (
                <div className="text-slate-400">
                  <strong className="text-slate-300">Constraints: </strong>
                  {problem.constraints.join(' • ')}
                </div>
              )}
              {problem.companyTags && problem.companyTags.length > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-slate-300 font-medium">Frequently Asked By:</span>
                  <div className="flex gap-1 flex-wrap">
                    {problem.companyTags.map((company) => (
                      <span key={company} className="px-2 py-0.5 bg-slate-900 text-indigo-300 rounded border border-slate-700/80">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tab: Approach & Intuition */}
          {(activeTab === 'approach' || activeTab === 'both') && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Algorithm Approach & Detailed Intuition
              </h3>

              <div className="bg-amber-950/20 border-l-4 border-amber-500 p-3 rounded-r-lg text-sm text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 block mb-1">Key Intuition:</strong>
                {problem.approach.intuition}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Step-by-Step Algorithm:</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-300 pl-1">
                  {problem.approach.stepByStep.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {problem.approach.dryRun && (
                <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
                  <span className="text-slate-400 font-sans font-semibold block text-cyan-400">Trace / Dry Run Walkthrough:</span>
                  <pre className="text-slate-300 whitespace-pre-wrap">{problem.approach.dryRun}</pre>
                </div>
              )}

              {problem.approach.edgeCases && problem.approach.edgeCases.length > 0 && (
                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Edge Cases Handled: </strong>
                  {problem.approach.edgeCases.join(' • ')}
                </div>
              )}
            </div>
          )}

          {/* Tab: Dual Code Solutions (or single language) */}
          {(activeTab === 'both' || activeTab === 'c' || activeTab === 'python') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  Dual-Language Implementation (C vs Python)
                </h3>
                <span className="text-xs text-slate-400">
                  Compare pointer mechanics & memory bounds in C with idiomatic Python
                </span>
              </div>

              <div className={`grid gap-4 ${activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                {/* C Language Block */}
                {(activeTab === 'both' || activeTab === 'c') && (
                  <div className="flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="text-xs font-mono font-bold text-blue-400">Pure C Solution</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                          Low-Level & Pointers
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(problem.solution.c, 'c')}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        {copiedLang === 'c' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedLang === 'c' ? 'Copied!' : 'Copy C'}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-blue-100 overflow-x-auto leading-relaxed max-h-[480px]">
                      <code>{problem.solution.c}</code>
                    </pre>
                  </div>
                )}

                {/* Python Language Block */}
                {(activeTab === 'both' || activeTab === 'python') && (
                  <div className="flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-mono font-bold text-emerald-400">Python 3 Solution</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                          Idiomatic Pythonic
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(problem.solution.python, 'python')}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        {copiedLang === 'python' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedLang === 'python' ? 'Copied!' : 'Copy Python'}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-100 overflow-x-auto leading-relaxed max-h-[480px]">
                      <code>{problem.solution.python}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Personal Notes */}
          {(activeTab === 'notes' || activeTab === 'both') && (
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Your Revision Notes for this Problem
                </h4>
                <span className="text-xs text-slate-400">Saved automatically to your local browser storage</span>
              </div>
              <textarea
                value={localNote}
                onChange={(e) => {
                  setLocalNote(e.target.value);
                  onSaveNote(problem.id, e.target.value);
                }}
                placeholder="Write your personal takeaways, edge case reminders, or interview notes here (e.g. 'Watch out for integer overflow on INT_MAX; in C allocate 2 * sizeof(int)')..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-900/90 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>5-6 Month Mastery Track:</span>
            <strong className="text-slate-200">{problem.level} Level</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
