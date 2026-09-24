import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { CWorkspace } from './components/CWorkspace';
import { DSAWorkspace } from './components/DSAWorkspace';
import { RoadmapView } from './components/RoadmapView';
import { LeetCodeVault } from './components/LeetCodeVault';
import { ComparatorPlayground } from './components/ComparatorPlayground';
import { RevisionCheatSheet } from './components/RevisionCheatSheet';
import { ProblemModal } from './components/ProblemModal';
import { C_CURRICULUM } from './data/cCurriculumData';
import { DSA_CURRICULUM } from './data/dsaCurriculumData';
import { LEETCODE_FAQ_PROBLEMS } from './data/leetcodeFaqData';
import { PracticeProblem, ProblemStatus, UserProgress } from './types';
import { getInitialProgress, saveProgress } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('c-workspace');
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress());
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem | null>(null);

  // Collect all unique problems
  const allProblemsMap = React.useMemo(() => {
    const map = new Map<string, PracticeProblem>();
    C_CURRICULUM.forEach((t) => t.problems.forEach((p) => map.set(p.id, p)));
    DSA_CURRICULUM.forEach((t) => t.problems.forEach((p) => map.set(p.id, p)));
    LEETCODE_FAQ_PROBLEMS.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const totalProblemsCount = allProblemsMap.size;
  const solvedCount = Object.values(progress.solvedProblems).filter((s) => s === 'solved').length;

  // Persist progress changes
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const handleStatusChange = (problemId: string, status: ProblemStatus) => {
    updateProgress((prev) => ({
      ...prev,
      solvedProblems: {
        ...prev.solvedProblems,
        [problemId]: status
      }
    }));
  };

  const handleToggleBookmark = (problemId: string) => {
    updateProgress((prev) => {
      const isBookmarked = prev.bookmarkedProblems.includes(problemId);
      return {
        ...prev,
        bookmarkedProblems: isBookmarked
          ? prev.bookmarkedProblems.filter((id) => id !== problemId)
          : [...prev.bookmarkedProblems, problemId]
      };
    });
  };

  const handleSaveNote = (problemId: string, note: string) => {
    updateProgress((prev) => ({
      ...prev,
      problemNotes: {
        ...prev.problemNotes,
        [problemId]: note
      }
    }));
  };

  const handleToggleCTopic = (topicId: string) => {
    updateProgress((prev) => ({
      ...prev,
      completedCTopics: {
        ...prev.completedCTopics,
        [topicId]: !prev.completedCTopics[topicId]
      }
    }));
  };

  const handleToggleDSATopic = (topicId: string) => {
    updateProgress((prev) => ({
      ...prev,
      completedDSATopics: {
        ...prev.completedDSATopics,
        [topicId]: !prev.completedDSATopics[topicId]
      }
    }));
  };

  const handleToggleTask = (taskKey: string) => {
    updateProgress((prev) => ({
      ...prev,
      completedWeeklyTasks: {
        ...prev.completedWeeklyTasks,
        [taskKey]: !prev.completedWeeklyTasks[taskKey]
      }
    }));
  };

  const handleOpenProblemById = (problemId: string) => {
    const prob = allProblemsMap.get(problemId);
    if (prob) {
      setSelectedProblem(prob);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        solvedCount={solvedCount}
        totalProblemsCount={totalProblemsCount}
        streakDays={progress.streakDays}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'c-workspace' && (
          <CWorkspace
            onOpenProblem={(p) => setSelectedProblem(p)}
            solvedProblems={progress.solvedProblems}
            completedCTopics={progress.completedCTopics}
            onToggleTopicCompletion={handleToggleCTopic}
          />
        )}

        {activeTab === 'dsa-workspace' && (
          <DSAWorkspace
            onOpenProblem={(p) => setSelectedProblem(p)}
            solvedProblems={progress.solvedProblems}
            completedDSATopics={progress.completedDSATopics}
            onToggleTopicCompletion={handleToggleDSATopic}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            onOpenProblemById={handleOpenProblemById}
            completedTasks={progress.completedWeeklyTasks}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'leetcode-faq' && (
          <LeetCodeVault
            onOpenProblem={(p) => setSelectedProblem(p)}
            solvedProblems={progress.solvedProblems}
            onStatusChange={handleStatusChange}
            bookmarkedProblems={progress.bookmarkedProblems}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'comparator' && <ComparatorPlayground />}

        {activeTab === 'cheatsheet' && <RevisionCheatSheet />}
      </main>

      {/* Global Problem Inspection Modal with Dual Solutions */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          status={progress.solvedProblems[selectedProblem.id] || 'unsolved'}
          onStatusChange={handleStatusChange}
          isBookmarked={progress.bookmarkedProblems.includes(selectedProblem.id)}
          onToggleBookmark={handleToggleBookmark}
          note={progress.problemNotes[selectedProblem.id] || ''}
          onSaveNote={handleSaveNote}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between flex-wrap gap-3">
          <span>C Language & DSA 6-Month Intensive Study Program • Technical Interview & CP Preparation</span>
          <span className="font-mono text-slate-400">All practice problems have dual C & Python solutions</span>
        </div>
      </footer>
    </div>
  );
}
