import React, { useState } from 'react';
import { C_CURRICULUM } from '../data/cCurriculumData';
import { CTopicModule, PracticeProblem, ProblemStatus, Level } from '../types';
import { 
  Terminal, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronRight, 
  Code, 
  Sparkles, 
  BookOpen, 
  Filter,
  Check,
  Eye,
  FileCode2
} from 'lucide-react';

interface CWorkspaceProps {
  onOpenProblem: (problem: PracticeProblem) => void;
  solvedProblems: Record<string, ProblemStatus>;
  completedCTopics: Record<string, boolean>;
  onToggleTopicCompletion: (topicId: string) => void;
}

export const CWorkspace: React.FC<CWorkspaceProps> = ({
  onOpenProblem,
  solvedProblems,
  completedCTopics,
  onToggleTopicCompletion
}) => {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(C_CURRICULUM[0].id);
  const [activeCodeLang, setActiveCodeLang] = useState<'c' | 'python'>('c');

  const filteredTopics = C_CURRICULUM.filter(
    (t) => selectedLevel === 'All' || t.level === selectedLevel
  );

  const currentTopic = C_CURRICULUM.find((t) => t.id === selectedTopicId) || C_CURRICULUM[0];

  const levelBadges = {
    Basics: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/50',
    Intermediate: 'bg-amber-950/70 text-amber-400 border-amber-800/50',
    Moderate: 'bg-amber-950/70 text-amber-400 border-amber-800/50',
    Advanced: 'bg-purple-950/70 text-purple-400 border-purple-800/50'
  };

  return (
    <div className="space-y-6">
      {/* C Language Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide border border-blue-400/30">
            <Terminal className="w-3.5 h-3.5" />
            DEDICATED C LANGUAGE RE-IMMERSION WORKSPACE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Bare-Metal C Mastery & Systems Foundation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Re-architect your low-level intuition after a break. Master how data structures sit in physical RAM,
            stack vs heap allocations, pointer arithmetic step sizes, memory alignment, and writing safe, leak-free C code.
          </p>
          <div className="flex items-center gap-4 pt-2 text-xs font-mono text-slate-400 flex-wrap">
            <span className="flex items-center gap-1.5 text-blue-300">
              <Code className="w-4 h-4" /> 5 Dedicated Core Modules
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Layers className="w-4 h-4" /> Memory Layout & Segments
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Sparkles className="w-4 h-4" /> Dual C & Python Solutions for All Problems
            </span>
          </div>
        </div>
      </div>

      {/* Level Filters & Topic Selector Bar */}
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
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {lvl === 'Moderate' ? 'Intermediate' : lvl}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-white">{filteredTopics.length}</span> C Topics
        </div>
      </div>

      {/* Split Workspace Layout: Topics List on Left, Deep Learning Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Topics Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            C Curriculum Topics
          </h2>
          <div className="space-y-2.5">
            {filteredTopics.map((topic) => {
              const isCompleted = completedCTopics[topic.id];
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
                      ? 'bg-slate-800/90 border-blue-500/70 shadow-lg ring-1 ring-blue-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${levelBadges[topic.level]}`}>
                        {topic.level === 'Moderate' ? 'Intermediate' : topic.level}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {topic.estimatedHours}h
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
                    {topic.tagline}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Problems:{' '}
                      <strong className={solvedCount > 0 ? 'text-emerald-400' : 'text-slate-300'}>
                        {solvedCount} / {topic.problems.length} Solved
                      </strong>
                    </span>
                    <span className="flex items-center gap-0.5 text-blue-400 font-medium">
                      Study <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Topic Deep Dive & Problems */}
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
                    Estimated Time: {currentTopic.estimatedHours} Hours
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentTopic.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentTopic.tagline}
                </p>
              </div>

              <button
                onClick={() => onToggleTopicCompletion(currentTopic.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
                  completedCTopics[currentTopic.id]
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                }`}
              >
                {completedCTopics[currentTopic.id] ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Topic Mastered
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    Mark Topic as Mastered
                  </>
                )}
              </button>
            </div>

            {/* Core Concepts */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Key Architectural Concepts & Memory Models
                </h3>

                {/* Code language toggle for snippets */}
                <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveCodeLang('c')}
                    className={`px-2.5 py-0.5 rounded font-mono ${
                      activeCodeLang === 'c' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    C Code
                  </button>
                  <button
                    onClick={() => setActiveCodeLang('python')}
                    className={`px-2.5 py-0.5 rounded font-mono ${
                      activeCodeLang === 'python' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python Equivalent
                  </button>
                </div>
              </div>

              {currentTopic.concepts.map((concept, idx) => (
                <div key={idx} className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-5 space-y-4">
                  <h4 className="text-base font-semibold text-white tracking-tight">
                    {concept.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {concept.description}
                  </p>

                  {/* Memory Diagram if available */}
                  {concept.memoryDiagram && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-blue-950/60 font-mono text-xs text-cyan-300 space-y-2 overflow-x-auto shadow-inner">
                      <div className="flex items-center gap-1.5 text-blue-400 font-sans font-semibold text-[11px] uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5" /> Hardware RAM / Memory Architecture Diagram:
                      </div>
                      <pre className="text-cyan-200 leading-snug">{concept.memoryDiagram}</pre>
                    </div>
                  )}

                  {/* Code Snippet */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 shadow-md">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                      <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                        <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                        {activeCodeLang === 'c' ? 'C Implementation' : 'Python 3 Comparison'}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">
                        {activeCodeLang === 'c' ? 'GCC / Clang' : 'CPython'}
                      </span>
                    </div>
                    <pre className="p-4 text-xs font-mono overflow-x-auto text-slate-200 leading-relaxed max-h-[360px]">
                      <code>
                        {activeCodeLang === 'c'
                          ? concept.codeSnippetC
                          : (concept.codeSnippetPython || '# No Python equivalent needed')}
                      </code>
                    </pre>
                  </div>

                  {/* Bullet notes */}
                  {concept.notes && concept.notes.length > 0 && (
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/60 text-xs text-slate-300 space-y-1">
                      <strong className="text-slate-200 block mb-1">Key Revision Takeaways:</strong>
                      <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                        {concept.notes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pitfall & Segfault Warning */}
                  {concept.pitfallWarning && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 block mb-0.5">Critical C Pitfall / Segfault Guard:</strong>
                        <span>{concept.pitfallWarning}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Practice Problems in this C Topic */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Topic Practice Problems (C & Python Solutions)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every problem includes full pure C and Python 3 code with complete approach walkthrough
                  </p>
                </div>
              </div>

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
                          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
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
