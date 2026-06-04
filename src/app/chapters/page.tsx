import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { chapters } from '@/lib/chapters';

export default function ChaptersPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Course Chapters</h1>
        <p className="text-slate-400 mb-8">7 chapters to take you from zero to productive with Kubernetes</p>
        
        <div className="space-y-4">
          {chapters.map((ch, idx) => (
            <Link
              key={ch.id}
              href={`/chapters/${ch.id}`}
              className="block bg-[#1e1e2e] rounded-xl border border-slate-700 p-6 hover:border-[#326CE5]/50 hover:bg-[#252538] transition group"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#326CE5]/20 text-[#60a5fa] font-bold text-lg shrink-0 group-hover:bg-[#326CE5] group-hover:text-white transition">
                  {ch.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-semibold text-white group-hover:text-[#60a5fa] transition">{ch.title}</h2>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{ch.duration}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{ch.subtitle}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>📖 {ch.sections.length} sections</span>
                    <span>🧠 {ch.quiz.length} questions</span>
                    <span>💻 {ch.exercises.length} exercises</span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-[#326CE5] transition shrink-0 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
