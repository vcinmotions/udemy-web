'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { authApi } from '@/api/auth.api';

function getErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    return response?.data?.message || fallback;
  }

  return fallback;
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (res) => {
      toast.success(res?.message || 'Password updated successfully.');
      router.push('/login');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Could not reset password.'));
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error('Password reset link is missing.');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    mutate({ token, password });
  };

  return (
    <div className="backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <KeyRound className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="mb-7 text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          New Password
        </h1>
        <p className="text-white/50 mt-2 text-sm">
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter new password"
              className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 pr-11 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm new password"
            className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-white/40 py-0.5">
          <ShieldCheck size={13} />
          Reset links expire automatically after use.
        </div>

        <button
          type="submit"
          disabled={isPending || !token}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40 mt-2"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {isPending ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {!token && (
        <p className="mt-4 text-center text-xs text-red-400">
          This reset link is missing a token. Please request a new one.
        </p>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b1120]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-80px] w-[350px] h-[350px] bg-violet-600/30 blur-3xl rounded-full" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link
            href="/login"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
          >
            <ArrowLeft size={15} /> Back to login
          </Link>

          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
