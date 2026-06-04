'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a] border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="w-8 h-8 bg-[#326CE5] rounded-lg flex items-center justify-center text-sm font-bold">K8s</span>
              <span className="hidden sm:inline">Kubernetes 101</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-white transition text-sm font-medium">Home</Link>
            <Link href="/chapters" className="text-slate-300 hover:text-white transition text-sm font-medium">Chapters</Link>
            <Link href="/exercises" className="text-slate-300 hover:text-white transition text-sm font-medium">Exercises</Link>
            <Link href="/terminal" className="text-slate-300 hover:text-white transition text-sm font-medium">Terminal</Link>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-t border-slate-700 px-4 py-3 space-y-2">
          <Link href="/" className="block text-slate-300 py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/chapters" className="block text-slate-300 py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Chapters</Link>
          <Link href="/exercises" className="block text-slate-300 py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Exercises</Link>
          <Link href="/terminal" className="block text-slate-300 py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Terminal</Link>
        </div>
      )}
    </nav>
  );
}
