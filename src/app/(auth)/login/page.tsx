'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ArrowLeft, GraduationCap, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/lib/validators/auth.schema';
import { useLogin } from '@/hooks/auth/useLogin';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending, isError, error } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const errorMessage = (error as any)?.response?.data?.message;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b1120]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[350px] h-[350px] bg-violet-600/30 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <button onClick={() => router.back()} className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition">
            <ArrowLeft size={15} /> Back
          </button>

          <div className="backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="mb-7 text-center">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
              <p className="text-white/50 mt-2 text-sm">
                Sign in to continue your journey
              </p>
            </div>

            {/* Role info banner */}
            <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 text-center">
                One login for{' '}
                <span className="text-violet-400 font-medium">Students</span>,{' '}
                <span className="text-amber-400 font-medium">Instructors</span> &{' '}
                <span className="text-cyan-400 font-medium">Admins</span>{' '}
                — you'll be redirected to your dashboard
              </p>
            </div>

            {/* API Error */}
            {isError && errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2">
                <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-4">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Password</label>
                  <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 pr-11 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
              </div>

              <div className="flex items-center gap-2 text-xs text-white/40 py-0.5">
                <ShieldCheck size={13} />
                Secured with 256-bit encryption
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40 mt-2"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isPending ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0d1525] px-3 text-xs text-white/30">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['Google', 'GitHub'].map((p) => (
                <button key={p} className="h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white text-sm font-medium">
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-white/40">
                Don&apos;t have an account?{' '}
                <Link href="/signup/student" className="text-violet-400 font-semibold hover:text-violet-300 transition">Sign up free</Link>
              </p>
              <p className="text-xs text-white/30">
                Want to teach?{' '}
                <Link href="/signup/instructor" className="text-amber-400 hover:text-amber-300 transition font-medium">Instructor sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
