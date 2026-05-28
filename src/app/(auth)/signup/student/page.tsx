'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ArrowLeft, GraduationCap, Sparkles, ShieldCheck, BookOpen, Users, Trophy } from 'lucide-react';
import { studentSignupSchema, type StudentSignupInput } from '@/lib/validators/auth.schema';
import { useStudentSignup } from '@/hooks/auth/useSignup';

export default function StudentSignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useStudentSignup();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<StudentSignupInput>({
    resolver: zodResolver(studentSignupSchema),
  });

  const password = watch('password', '');
  const strength = [/[A-Z]/, /[0-9]/, /.{8,}/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length;
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'][strength];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b1120]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-60px] w-[400px] h-[400px] bg-violet-600/25 blur-3xl rounded-full" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] bg-cyan-500/15 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel — Benefits */}
        <div className="hidden lg:flex lg:w-5/12 flex-col justify-center px-12 xl:px-16">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">LearnHub</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
              Start learning<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                today for free
              </span>
            </h2>
            <p className="text-white/60 text-lg">Join over 45,000 students already learning on our platform.</p>
          </div>

          <div className="space-y-5">
            {[
              { icon: BookOpen, title: '1,200+ courses', desc: 'From beginner to advanced across all domains' },
              { icon: Users, title: 'Expert instructors', desc: 'Learn from industry professionals' },
              { icon: Trophy, title: 'Earn certificates', desc: 'Showcase your skills to employers' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/50 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">Are you a teacher?</p>
            <Link href="/signup/instructor" className="text-violet-400 font-semibold text-sm hover:text-violet-300 transition">
              Apply as an Instructor →
            </Link>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-10 lg:px-8">
          <div className="w-full max-w-md">
            <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition">
              <ArrowLeft size={15} /> Back
            </button>

            <div className="backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-7">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-black" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">Student Sign Up</h1>
                  <p className="text-white/50 text-xs mt-0.5">Create your free learning account</p>
                </div>
              </div>

              <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name')}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
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
                      className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 pr-11 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-white/40">{strengthLabel} password</p>
                    </div>
                  )}
                  {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 text-xs text-white/40 py-1">
                  <ShieldCheck size={13} />
                  Your data is encrypted and never shared
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40 mt-2"
                >
                  {isPending && <Loader2 size={16} className="animate-spin" />}
                  {isPending ? 'Creating Account...' : 'Create Student Account'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0d1525] px-3 text-xs text-white/30">OR SIGN UP WITH</span>
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                {['Google', 'GitHub'].map((provider) => (
                  <button key={provider} className="h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white text-sm font-medium">
                    {provider}
                  </button>
                ))}
              </div>

              {/* Footer links */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-white/40">
                  Already have an account?{' '}
                  <Link href="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition">Log in</Link>
                </p>
                <p className="text-xs text-white/30">
                  Want to teach?{' '}
                  <Link href="/signup/instructor" className="text-cyan-400 hover:text-cyan-300 transition font-medium">Become an Instructor</Link>
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
