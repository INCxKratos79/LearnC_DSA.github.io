import React, { useState } from 'react';
import { DSA_CURRICULUM } from '../data/dsaCurriculumData';
import { DSATopicModule, PracticeProblem, ProblemStatus, Level } from '../types';
import {
  Brain,
  Code2,
  GitBranch,
  Table,
  CheckCircle2,
  Circle,
  Eye,
  Filter,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
  Check
} from 'lucide-react';

interface DSAWorkspaceProps {
  onOpenProblem: (problem: PracticeProblem) => void;
  solvedProblems: Record<string, ProblemStatus>;
  completedDSATopics: Record<string, boolean>;
  onToggleTopicCompletion: (topicId: string) => void;
}

export const DSAWorkspace: React.FC<DSAWorkspaceProps> = ({
  onOpenProblem,
  solvedProblems,
  completedDSATopics,
  onToggleTopicCompletion
}) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(DSA_CURRICULUM[0].id);
  const [templateLang, setTemplateLang] = useState<'c' | 'python'>('c');

  const filteredTopics = DSA_CURRICULUM.filter(
    (t) => selectedLevel === 'All' || t.level === selectedLevel
  );

  const currentTopic = DSA_CURRICULUM.find((t) => t.id === selectedTopicId) || DSA_CURRICULUM[0];

  const levelBadges = {
    Basics: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/50',
    Intermediate: 'bg-amber-950/70 text-amber-400 border-amber-800/50',
    Moderate: 'bg-amber-950/70 text-amber-400 border-amber-800/50',
    Advanced: 'bg-purple-950/70 text-purple-400 border-purple-800/50'
  };

  return (
    <div className="space-y-6">
      {/* DSA Workspace Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-emerald-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide border border-emerald-400/30">
            <Brain className="w-3.5 h-3.5" />
            DEDICATED DSA & COMPETITIVE PROGRAMMING WORKSPACE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Data Structures & Algorithmic Problem Solving
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Transition from language syntax to high-level algorithmic design. Master core patterns:
            Two Pointers, Sliding Window, Monotonic Stacks, Tree Recursion, Graphs (BFS/DFS, Dijkstra, Topo Sort),
            and Dynamic Programming with dual C and Python implementations.
          </p>
          <div className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <GitBranch className="w-4 h-4" /> 6 Deep Algorithmic Tracks
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Table className="w-4 h-4" /> Big-O Complexity Tables
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <Code2 className="w-4 h-4" /> Standard Pattern Blueprints in C & Python
            </span>
          </div>
        </div>
      </div>

      {/* Level Filters Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Level:
          </span>
          {(['All', 'Basics', 'Moderate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedLevel === lvl
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lvl === 'Moderate' ? 'Intermediate' : lvl}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-white">{filteredTopics.length}</span> DSA Tracks
        </div>
      </div>

      {/* Grid: Topics Sidebar on Left, Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: DSA Tracks List */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            DSA Modules & Algorithms
          </h2>
          <div className="space-y-2.5">
            {filteredTopics.map((topic) => {
              const isCompleted = completedDSATopics[topic.id];
              const isSelected = selectedTopicId === topic.id;
              const solvedCount = topic.problems.filter(
                (p) => solvedProblems[p.id] === 'solved'
              ).length;

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`group relative p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/70 shadow-lg ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${levelBadges[topic.level]}`}>
                        {topic.level === 'Moderate' ? 'Intermediate' : topic.level}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {topic.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTopicCompletion(topic.id);
                      }}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      title={isCompleted ? 'Mark topic as uncompleted' : 'Mark topic as mastered'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                  </div>

                  <h3 className={`mt-2 text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {topic.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.overview}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Problems:{' '}
                      <strong className={solvedCount > 0 ? 'text-emerald-400' : 'text-slate-300'}>
                        {solvedCount} / {topic.problems.length} Solved
                      </strong>
                    </span>
                    <span className="flex items-center gap-0.5 text-emerald-400 font-medium">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Track Deep Dive, Patterns & Problems */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Topic Header */}
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${levelBadges[currentTopic.level]}`}>
                    {currentTopic.level === 'Moderate' ? 'Intermediate Level' : `${currentTopic.level} Level`}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Category: {currentTopic.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentTopic.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentTopic.overview}
                </p>
              </div>

              <button
                onClick={() => onToggleTopicCompletion(currentTopic.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                  completedDSATopics[currentTopic.id]
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                }`}
              >
                {completedDSATopics[currentTopic.id] ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Track Mastered
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    Mark Track as Mastered
                  </>
                )}
              </button>
            </div>

            {/* Algorithmic Pattern Templates */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  Key Algorithmic Patterns & Boilerplate Templates
                </h3>

                <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setTemplateLang('c')}
                    className={`px-2.5 py-0.5 rounded font-mono ${
                      templateLang === 'c' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    C Template
                  </button>
                  <button
                    onClick={() => setTemplateLang('python')}
                    className={`px-2.5 py-0.5 rounded font-mono ${
                      templateLang === 'python' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python Template
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentTopic.keyPatterns.map((pattern, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 space-y-3">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        {pattern.patternName}
                      </h4>
                      <span className="text-[11px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        When to use: {pattern.whenToUse}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pattern.description}
                    </p>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
                      <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>{templateLang === 'c' ? 'C Idiom' : 'Python Idiom'}</span>
                        <span className="text-[10px] uppercase text-emerald-400">Reusable Blueprint</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-emerald-200 overflow-x-auto leading-relaxed">
                        <code>{templateLang === 'c' ? pattern.templateC : pattern.templatePython}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time & Space Complexity Summary Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Table className="w-4 h-4 text-cyan-400" />
                Time & Space Complexity Reference Table
              </h3>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/90 text-slate-300 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Operation / Algorithm</th>
                      <th className="py-2.5 px-4 font-mono text-amber-300">Time Complexity</th>
                      <th className="py-2.5 px-4 font-mono text-purple-300">Space Complexity</th>
                      <th className="py-2.5 px-4">Architectural Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {currentTopic.timeSpaceSummary.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-2.5 px-4 font-medium text-white">{row.operation}</td>
                        <td className="py-2.5 px-4 font-mono text-amber-300">{row.timeComplexity}</td>
                        <td className="py-2.5 px-4 font-mono text-purple-300">{row.spaceComplexity}</td>
                        <td className="py-2.5 px-4 text-slate-400">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Problems Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Curated Practice Problems for this DSA Topic
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentTopic.problems.map((problem) => {
                  const status = solvedProblems[problem.id] || 'unsolved';
                  const isSolved = status === 'solved';

                  return (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex-wrap gap-3"
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
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
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                              LeetCode #{problem.leetcodeNumber}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-mono">
                            Time: {problem.timeComplexity}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                          {problem.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {problem.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                            isSolved
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                              : status === 'in_progress'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {isSolved ? '✓ Solved' : status === 'in_progress' ? 'In Progress' : 'Unsolved'}
                        </span>

                        <button
                          onClick={() => onOpenProblem(problem)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Solution & Approach
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
