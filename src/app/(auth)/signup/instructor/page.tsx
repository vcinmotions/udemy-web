'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ArrowLeft, BookOpen, ChevronDown, ChevronUp, ShieldCheck, Mic2, BarChart3, DollarSign } from 'lucide-react';
import { instructorSignupSchema, type InstructorSignupInput } from '@/lib/validators/auth.schema';
import { useInstructorSignup } from '@/hooks/auth/useSignup';

export default function InstructorSignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const { mutate, isPending } = useInstructorSignup();

  const { register, handleSubmit, formState: { errors } } = useForm<InstructorSignupInput>({
    resolver: zodResolver(instructorSignupSchema),
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080e1a]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-5/12 flex-col justify-center px-12 xl:px-16">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">LearnHub</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full px-2 py-0.5 font-medium">Instructor</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
              Share your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                expertise & earn
              </span>
            </h2>
            <p className="text-white/60 text-lg">Build courses and reach thousands of students worldwide.</p>
          </div>

          <div className="space-y-5">
            {[
              { icon: Mic2, title: 'Easy course builder', desc: 'Upload videos, add resources, set quizzes' },
              { icon: BarChart3, title: 'Real-time analytics', desc: 'Track enrollments, progress and revenue' },
              { icon: DollarSign, title: 'Earn per enrollment', desc: 'Get paid every time a student enrolls' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/50 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">Looking to learn instead?</p>
            <Link href="/signup/student" className="text-amber-400 font-semibold text-sm hover:text-amber-300 transition">
              Sign up as a Student →
            </Link>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-10 lg:px-8">
          <div className="w-full max-w-md">
            <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition">
              <ArrowLeft size={15} /> Back
            </button>

            <div className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">Instructor Sign Up</h1>
                  <p className="text-white/50 text-xs mt-0.5">Apply to become a course creator</p>
                </div>
              </div>

              <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your professional name"
                    {...register('name')}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">Work Email</label>
                  <input
                    type="email"
                    placeholder="instructor@example.com"
                    {...register('email')}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      {...register('password')}
                      className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 pr-11 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
                </div>

                {/* Optional fields toggle */}
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="flex items-center gap-2 text-xs text-amber-400/80 hover:text-amber-400 transition font-medium"
                >
                  {showOptional ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showOptional ? 'Hide' : 'Add'} professional details (optional)
                </button>

                {showOptional && (
                  <div className="space-y-4 pt-1 border-t border-white/10">
                    {/* Headline */}
                    <div>
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                        Professional Headline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Full-Stack Developer | 10+ years"
                        {...register('headline')}
                        className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition"
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">Short Bio</label>
                      <textarea
                        rows={3}
                        placeholder="Tell students about your expertise and experience..."
                        {...register('bio')}
                        className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition resize-none"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-white/40 py-1">
                  <ShieldCheck size={13} />
                  Your application is reviewed by our team
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:from-amber-400 hover:to-orange-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40 mt-2"
                >
                  {isPending && <Loader2 size={16} className="animate-spin" />}
                  {isPending ? 'Creating Account...' : 'Create Instructor Account'}
                </button>
              </form>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-white/40">
                  Already have an account?{' '}
                  <Link href="/login" className="text-amber-400 font-semibold hover:text-amber-300 transition">Log in</Link>
                </p>
                <p className="text-xs text-white/30">
                  Want to learn?{' '}
                  <Link href="/signup/student" className="text-violet-400 hover:text-violet-300 transition font-medium">Student Sign Up</Link>
                </p>

                <p className="text-xs text-white/30">
                <Link href="/" className="text-green-400 hover:text-amber-300 transition font-medium">Home</Link>
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
