import { UserProgress, ProblemStatus } from '../types';

const STORAGE_KEY = 'c_dsa_study_program_progress_v1';

export const getInitialProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse stored progress', e);
  }

  return {
    solvedProblems: {},
    problemNotes: {},
    completedWeeklyTasks: {},
    completedCTopics: {},
    completedDSATopics: {},
    bookmarkedProblems: [],
    streakDays: 1,
    lastStudyDate: new Date().toISOString().split('T')[0]
  };
};

export const saveProgress = (progress: UserProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};
