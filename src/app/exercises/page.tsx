'use client';

import Navbar from '@/components/Navbar';
import Exercise from '@/components/Exercise';
import { chapters } from '@/lib/chapters';
import { useState } from 'react';

export default function ExercisesPage() {
  const [filterChapter, setFilterChapter] = useState<string>('all');

  const allExercises = chapters.flatMap(ch =>
    ch.exercises.map(ex => ({ ...ex, chapterId: ch.id, chapterTitle: ch.title, chapterNumber: ch.number }))
  );

  const filtered = filterChapter === 'all'
    ? allExercises
    : allExercises.filter(ex => ex.chapterId === filterChapter);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Exercises</h1>
          <p className="text-slate-400 mb-4">Practice your Kubernetes skills with hands-on exercises</p>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Filter by chapter:</span>
            <select
              value={filterChapter}
              onChange={(e) => setFilterChapter(e.target.value)}
              className="bg-[#1e1e2e] border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="all">All Chapters</option>
              {chapters.map(ch => (
                <option key={ch.id} value={ch.id}>Chapter {ch.number}: {ch.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>No exercises found for this chapter.</p>
            </div>
          ) : (
            filtered.map((ex) => (
              <div key={ex.id}>
                <div className="text-xs text-slate-500 mb-2">
                  Chapter {ex.chapterNumber}: {ex.chapterTitle}
                </div>
                <Exercise exercise={ex} chapterId={ex.chapterId} />
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
