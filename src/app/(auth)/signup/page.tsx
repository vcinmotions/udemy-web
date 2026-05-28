'use client';

import Link from 'next/link';
import { GraduationCap, BookOpen, ArrowRight, Check } from 'lucide-react';

export default function SignupChoicePage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b1120] flex items-center justify-center py-4 px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-0 w-[400px] h-[400px] bg-violet-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-100px] right-0 w-[400px] h-[400px] bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Join LearnHub
          </h1>
          <p className="text-white/50 text-lg">Choose how you want to get started</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Student Card */}
          <Link href="/signup/student" className="group">
            <div className="h-full backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-8 hover:border-violet-500/50 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">I want to learn</h2>
              <p className="text-white/50 text-sm mb-6">Access thousands of courses and start building new skills today.</p>

              <ul className="space-y-2 mb-8">
                {['Free to join', 'Browse 1,200+ courses', 'Earn certificates', 'Track your progress'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <Check size={14} className="text-violet-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Sign up as Student <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* Instructor Card */}
          <Link href="/signup/instructor" className="group">
            <div className="h-full backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-8 hover:border-amber-500/50 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">I want to teach</h2>
              <p className="text-white/50 text-sm mb-6">Create courses, reach students worldwide, and earn revenue.</p>

              <ul className="space-y-2 mb-8">
                {['Course builder tools', 'Real-time analytics', 'Earn per enrollment', 'Instructor support'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Apply as Instructor <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>

<div className="mt-12 text-center">
        <p className="text-center text-white/40 text-sm mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition">Log in</Link>
        </p>

        <p className="text-xs text-white/30">
                <Link href="/" className="text-green-400 hover:text-amber-300 transition font-medium">Home</Link>
              </p>
              </div>
      </div>
    </section>
  );
}
