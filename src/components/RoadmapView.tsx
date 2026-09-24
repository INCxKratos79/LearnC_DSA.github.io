import React, { useState } from 'react';
import { MASTER_ROADMAP } from '../data/roadmapData';
import { RoadmapWeek, PracticeProblem, Level } from '../types';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  ArrowRight,
  Filter
} from 'lucide-react';

interface RoadmapViewProps {
  onOpenProblemById: (problemId: string) => void;
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskKey: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  onOpenProblemById,
  completedTasks,
  onToggleTask
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const toggleWeekExpand = (weekNum: number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  const filteredWeeks = MASTER_ROADMAP.filter(
    (w) => selectedMonth === 'all' || w.monthNumber === selectedMonth
  );

  // Calculate overall task progress
  let totalTasks = 0;
  let completedCount = 0;

  MASTER_ROADMAP.forEach((w) => {
    w.dailySchedule.forEach((d, dIdx) => {
      d.tasks.forEach((_, tIdx) => {
        totalTasks++;
        const key = `w${w.weekNumber}-d${dIdx}-t${tIdx}`;
        if (completedTasks[key]) {
          completedCount++;
        }
      });
    });
  });

  const progressPercentage = Math.round((completedCount / (totalTasks || 1)) * 100);

  const months = [
    { num: 1, name: 'Month 1: C & Linear Foundations', level: 'Basics' },
    { num: 2, name: 'Month 2: Stacks, Trees & Recursion', level: 'Intermediate' },
    { num: 3, name: 'Month 3: Graphs & Systems DS', level: 'Intermediate' },
    { num: 4, name: 'Month 4: Dynamic Programming Mastery', level: 'Advanced' },
    { num: 5, name: 'Month 5: Advanced CP & LeetCode Blitz', level: 'Advanced' },
    { num: 6, name: 'Month 6: Mock Interviews & Contest Speed', level: 'Advanced' }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner with Study Urgency Tracker */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/90 border border-amber-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-400/30">
            <Calendar className="w-3.5 h-3.5" />
            24-WEEK (5-6 MONTH) ACCELERATED STUDY ROADMAP
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            5-6 Month Structured Roadmap: Basics to Advanced
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Designed for technical interviews and competitive programming after a revision break.
            Structured into 24 distinct weekly sprints (16-20 hrs/week) with daily schedules, milestones,
            and curated practice problems in C and Python.
          </p>

          {/* Progress bar inside hero */}
          <div className="pt-2 max-w-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Target className="w-4 h-4" /> 6-Month Completion Status:
              </span>
              <span className="font-mono text-white font-bold">
                {completedCount} / {totalTasks} Tasks ({progressPercentage}%)
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Month Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setSelectedMonth('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedMonth === 'all'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
          }`}
        >
          All 24 Weeks (Full 6 Months)
        </button>
        {months.map((m) => (
          <button
            key={m.num}
            onClick={() => setSelectedMonth(m.num)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              selectedMonth === m.num
                ? 'bg-slate-800 text-amber-300 border-amber-500 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            Month {m.num}: {m.name.split(':')[1]?.trim() || m.name}
          </button>
        ))}
      </div>

      {/* Roadmap Weeks List */}
      <div className="space-y-4">
        {filteredWeeks.map((week) => {
          const isExpanded = expandedWeeks[week.weekNumber];

          // Calculate week task completion
          let weekTasksTotal = 0;
          let weekTasksDone = 0;
          week.dailySchedule.forEach((d, dIdx) => {
            d.tasks.forEach((_, tIdx) => {
              weekTasksTotal++;
              if (completedTasks[`w${week.weekNumber}-d${dIdx}-t${tIdx}`]) {
                weekTasksDone++;
              }
            });
          });

          const isWeekDone = weekTasksTotal > 0 && weekTasksDone === weekTasksTotal;

          return (
            <div
              key={week.weekNumber}
              className={`rounded-2xl border transition-all ${
                isWeekDone
                  ? 'bg-slate-900/90 border-emerald-800/60 shadow-md'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Week Header */}
              <div
                onClick={() => toggleWeekExpand(week.weekNumber)}
                className="p-5 flex items-center justify-between cursor-pointer select-none flex-wrap gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 text-xs font-bold font-mono rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      WEEK {week.weekNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Month {week.monthNumber} • {week.phase.split(':')[1]?.trim() || week.phase}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                        week.level === 'Basics'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : week.level === 'Intermediate' || week.level === 'Moderate'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : 'bg-purple-950 text-purple-400 border-purple-800'
                      }`}
                    >
                      {week.level === 'Moderate' ? 'Intermediate' : week.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Target: {week.targetHours}h / week
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {week.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Weekly Goal:</strong> {week.goal}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Progress</span>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {weekTasksDone} / {weekTasksTotal} Tasks
                    </span>
                  </div>

                  <button
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content: Milestones & Daily Schedule */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-5 text-sm text-slate-300">
                  {/* Milestones Card */}
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> Week {week.weekNumber} Mastery Milestones:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      {week.keyMilestones.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-200">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Daily Schedule Mon - Sun */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-cyan-400" /> Daily Action Checklist (Mon - Sun):
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {week.dailySchedule.map((dayPlan, dIdx) => (
                        <div key={dIdx} className="bg-slate-950/80 rounded-xl border border-slate-800/90 p-3.5 space-y-2.5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                              <span className="text-xs font-bold font-mono text-cyan-400">
                                {dayPlan.day}
                              </span>
                              <span className="text-[10px] text-slate-400 font-sans">
                                Study & Practice
                              </span>
                            </div>

                            <div className="mt-2 space-y-1.5">
                              {dayPlan.tasks.map((task, tIdx) => {
                                const taskKey = `w${week.weekNumber}-d${dIdx}-t${tIdx}`;
                                const isDone = !!completedTasks[taskKey];

                                return (
                                  <div
                                    key={tIdx}
                                    onClick={() => onToggleTask(taskKey)}
                                    className="flex items-start gap-2 cursor-pointer group text-xs select-none"
                                  >
                                    <button className="mt-0.5 shrink-0 text-slate-500 group-hover:text-emerald-400 transition-colors">
                                      {isDone ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                      )}
                                    </button>
                                    <span className={isDone ? 'line-through text-slate-500' : 'text-slate-300'}>
                                      {task}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800/70 text-[11px] text-amber-300/90 flex items-start gap-1">
                            <strong className="text-amber-400 shrink-0 font-sans">Goal:</strong>
                            <span className="italic">{dayPlan.practiceGoal}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Practice Problems for this week */}
                  {week.recommendedProblems && week.recommendedProblems.length > 0 && (
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Recommended Problems:</span>
                        <div className="flex gap-2 flex-wrap">
                          {week.recommendedProblems.map((probId) => (
                            <button
                              key={probId}
                              onClick={() => onOpenProblemById(probId)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1 transition-colors"
                            >
                              <span>Solve Problem</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
