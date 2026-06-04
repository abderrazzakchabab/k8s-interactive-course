'use client';

import { chapters } from '@/lib/chapters';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  currentChapterId?: string;
}

export default function Sidebar({ currentChapterId }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-700 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden lg:block">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Course Content</h3>
        <nav className="space-y-1">
          {chapters.map((ch) => {
            const isActive = ch.id === currentChapterId || pathname === `/chapters/${ch.id}`;
            return (
              <Link
                key={ch.id}
                href={`/chapters/${ch.id}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-[#326CE5]/20 text-[#60a5fa] font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-[#326CE5] text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {ch.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{ch.title}</div>
                  <div className="text-xs text-slate-500 truncate">{ch.duration}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <Link
            href="/terminal"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Open Terminal</span>
          </Link>
          <Link
            href="/exercises"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Exercises</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
