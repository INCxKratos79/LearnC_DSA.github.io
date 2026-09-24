export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Level = 'Basics' | 'Intermediate' | 'Moderate' | 'Advanced';
export type ProblemStatus = 'unsolved' | 'in_progress' | 'solved' | 'review';

export interface CodeSolution {
  c: string;
  python: string;
  cExplanation?: string;
  pythonExplanation?: string;
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  level: Level;
  category: string;
  leetcodeNumber?: number;
  description: string;
  constraints?: string[];
  inputExample: string;
  outputExample: string;
  approach: {
    intuition: string;
    stepByStep: string[];
    dryRun?: string;
    edgeCases?: string[];
  };
  timeComplexity: string;
  spaceComplexity: string;
  solution: CodeSolution;
  companyTags?: string[];
}

export interface CTopicModule {
  id: string;
  title: string;
  level: Level;
  tagline: string;
  estimatedHours: number;
  concepts: {
    title: string;
    description: string;
    codeSnippetC: string;
    codeSnippetPython?: string;
    notes?: string[];
    memoryDiagram?: string;
    pitfallWarning?: string;
  }[];
  problems: PracticeProblem[];
}

export interface DSATopicModule {
  id: string;
  title: string;
  level: Level;
  category: string;
  overview: string;
  keyPatterns: {
    patternName: string;
    description: string;
    templateC: string;
    templatePython: string;
    whenToUse: string;
  }[];
  timeSpaceSummary: {
    operation: string;
    timeComplexity: string;
    spaceComplexity: string;
    notes: string;
  }[];
  problems: PracticeProblem[];
}

export interface RoadmapWeek {
  weekNumber: number;
  monthNumber: number;
  title: string;
  goal: string;
  targetHours: number;
  level: Level;
  phase: string;
  dailySchedule: {
    day: string;
    tasks: string[];
    practiceGoal: string;
  }[];
  keyMilestones: string[];
  recommendedProblems: string[]; // problem IDs
}

export interface UserProgress {
  solvedProblems: Record<string, ProblemStatus>;
  problemNotes: Record<string, string>;
  completedWeeklyTasks: Record<string, boolean>; // key: "w{weekNumber}-d{dayIndex}-t{taskIndex}"
  completedCTopics: Record<string, boolean>;
  completedDSATopics: Record<string, boolean>;
  bookmarkedProblems: string[];
  streakDays: number;
  lastStudyDate: string;
}
