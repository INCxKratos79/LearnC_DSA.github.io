import React, { useState } from 'react';
import { LEETCODE_FAQ_PROBLEMS } from '../data/leetcodeFaqData';
import { PracticeProblem, ProblemStatus, Difficulty } from '../types';
import {
  Trophy,
  Search,
  Filter,
  Eye,
  Bookmark,
  BookmarkCheck,
  Building2,
  Clock,
  Cpu,
  CheckCircle2,
  Code2,
  Sparkles
} from 'lucide-react';

interface LeetCodeVaultProps {
  onOpenProblem: (problem: PracticeProblem) => void;
  solvedProblems: Record<string, ProblemStatus>;
  onStatusChange: (problemId: string, status: ProblemStatus) => void;
  bookmarkedProblems: string[];
  onToggleBookmark: (problemId: string) => void;
}

export const LeetCodeVault: React.FC<LeetCodeVaultProps> = ({
  onOpenProblem,
  solvedProblems,
  onStatusChange,
  bookmarkedProblems,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved' | 'Bookmarked'>('All');

  const categories = Array.from(
    new Set(LEETCODE_FAQ_PROBLEMS.map((p) => p.category))
  );

  const filteredProblems = LEETCODE_FAQ_PROBLEMS.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (problem.leetcodeNumber && problem.leetcodeNumber.toString().includes(searchQuery)) ||
      (problem.companyTags && problem.companyTags.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;

    const isSolved = solvedProblems[problem.id] === 'solved';
    const isBookmarked = bookmarkedProblems.includes(problem.id);

    let matchesStatus = true;
    if (statusFilter === 'Solved') matchesStatus = isSolved;
    if (statusFilter === 'Unsolved') matchesStatus = !isSolved;
    if (statusFilter === 'Bookmarked') matchesStatus = isBookmarked;

    return matchesSearch && matchesDifficulty && matchesCategory && matchesStatus;
  });

  const solvedCount = LEETCODE_FAQ_PROBLEMS.filter(
    (p) => solvedProblems[p.id] === 'solved'
  ).length;

  return (
    <div className="space-y-6">
      {/* Vault Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border border-purple-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold tracking-wide border border-purple-400/30">
            <Trophy className="w-3.5 h-3.5" />
            HIGH-FREQUENCY LEETCODE 75/150 INTERVIEW VAULT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            FAQ LeetCode Questions with Dual C & Python Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Essential interview classics asked across top product companies (Meta, Google, Amazon, Microsoft).
            Each problem includes full C code (handling pointers, structs, bounds) alongside idiomatic Python 3,
            step-by-step intuition, dry runs, and time/space complexities.
          </p>

          <div className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-400 flex-wrap">
            <span className="text-emerald-400 font-semibold">
              ✓ {solvedCount} / {LEETCODE_FAQ_PROBLEMS.length} Mastered
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300">
              Two Pointers • Sliding Window • LRU Cache • Trapping Water • Course Schedule • LIS
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 space-y-4 shadow-lg">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by problem name, #number, company (e.g. Meta, Amazon), or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['All', 'Unsolved', 'Solved', 'Bookmarked'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap">Category:</span>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProblems.map((problem) => {
          const status = solvedProblems[problem.id] || 'unsolved';
          const isSolved = status === 'solved';
          const isBookmarked = bookmarkedProblems.includes(problem.id);

          return (
            <div
              key={problem.id}
              className={`rounded-2xl border p-5 space-y-4 flex flex-col justify-between transition-all ${
                isSolved
                  ? 'bg-slate-900/90 border-emerald-900/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-3">
                {/* Badges & Actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                        problem.difficulty === 'Easy'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : problem.difficulty === 'Medium'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : 'bg-rose-950 text-rose-400 border-rose-800'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    {problem.leetcodeNumber && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        LC #{problem.leetcodeNumber}
                      </span>
                    )}
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {problem.category}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(problem.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                {/* Time / Space Complexity & Companies */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {problem.timeComplexity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-purple-400" />
                      {problem.spaceComplexity}
                    </span>
                  </div>

                  {problem.companyTags && (
                    <div className="flex items-center gap-1 text-[10px] text-indigo-300">
                      <Building2 className="w-3 h-3 text-indigo-400" />
                      <span>{problem.companyTags.slice(0, 3).join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <select
                  value={status}
                  onChange={(e) => onStatusChange(problem.id, e.target.value as ProblemStatus)}
                  className="bg-slate-950 border border-slate-800 text-[11px] rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:border-purple-500"
                >
                  <option value="unsolved">⚪ Unsolved</option>
                  <option value="in_progress">🟡 In Progress</option>
                  <option value="solved">🟢 Solved</option>
                  <option value="review">🟣 Revision</option>
                </select>

                <button
                  onClick={() => onOpenProblem(problem)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View C & Python Solution
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
          <p className="text-sm font-medium">No LeetCode problems matched your current filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('All');
              setSelectedCategory('All');
              setStatusFilter('All');
            }}
            className="text-xs text-purple-400 underline hover:text-purple-300"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
