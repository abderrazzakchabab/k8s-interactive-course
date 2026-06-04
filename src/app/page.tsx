import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { chapters } from '@/lib/chapters';

export default function Home() {
  const totalExercises = chapters.reduce((acc, ch) => acc + ch.exercises.length, 0);
  const totalQuizzes = chapters.reduce((acc, ch) => acc + ch.quiz.length, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#326CE5]/20 via-transparent to-purple-500/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#326CE5]/20 border border-[#326CE5]/30 rounded-full text-sm text-[#60a5fa] mb-6">
                <span className="w-2 h-2 bg-[#326CE5] rounded-full animate-pulse" />
                Interactive Course
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Learn Kubernetes
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#326CE5] to-[#60a5fa]">
                  From Zero to Hero
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
                An interactive course with hands-on exercises, quizzes, and a built-in terminal.
                Learn by doing — run real kubectl commands right in your browser.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/chapters/ch1-introduction"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#326CE5] text-white rounded-xl font-semibold hover:bg-[#2957C4] transition shadow-lg shadow-[#326CE5]/25"
                >
                  Start Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/terminal"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-xl font-semibold hover:bg-slate-700 transition border border-slate-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Open Terminal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-slate-800 bg-[#0a0f1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: 'Chapters', value: chapters.length, icon: '📚' },
                { label: 'Exercises', value: totalExercises, icon: '💻' },
                { label: 'Quiz Questions', value: totalQuizzes, icon: '🧠' },
                { label: 'Diagrams', value: 'Interactive', icon: '🎨' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapters Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Course Curriculum</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => (
              <Link
                key={ch.id}
                href={`/chapters/${ch.id}`}
                className="group bg-[#1e1e2e] rounded-xl border border-slate-700 p-6 hover:border-[#326CE5]/50 hover:bg-[#252538] transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 bg-[#326CE5]/20 text-[#60a5fa] rounded-lg flex items-center justify-center font-bold text-sm group-hover:bg-[#326CE5] group-hover:text-white transition">
                    {ch.number}
                  </span>
                  <span className="text-xs text-slate-500">{ch.duration}</span>
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-[#60a5fa] transition">
                  {ch.title}
                </h3>
                <p className="text-sm text-slate-400 mb-3">{ch.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{ch.quiz.length} questions</span>
                  <span>{ch.exercises.length} exercises</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-800 bg-[#0a0f1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-white text-center mb-12">Why This Course?</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  title: 'Interactive Terminal',
                  desc: 'Run real kubectl commands directly in your browser. No setup required.',
                  icon: (
                    <svg className="w-8 h-8 text-[#326CE5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Visual Diagrams',
                  desc: 'Beautiful SVG diagrams explain architecture, networking, and deployment flows.',
                  icon: (
                    <svg className="w-8 h-8 text-[#F77F00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Hands-on Quizzes',
                  desc: 'Test your knowledge with interactive quizzes and detailed explanations.',
                  icon: (
                    <svg className="w-8 h-8 text-[#06D6A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
