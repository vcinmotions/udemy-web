'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Mail, ShieldCheck } from 'lucide-react';
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (res) => {
      setSent(true);
      toast.success(res?.message || 'Password reset email sent.');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Could not send reset email.'));
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email });
  };

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

          <div className="backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="mb-7 text-center">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Reset Password
              </h1>
              <p className="text-white/50 mt-2 text-sm">
                Enter your account email and we will send a reset link.
              </p>
            </div>

            {sent ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                <p className="text-sm font-medium text-emerald-300">
                  Check your email for the password reset link.
                </p>
                <p className="mt-2 text-xs text-white/50">
                  The link expires in 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 px-4 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40 py-0.5">
                  <ShieldCheck size={13} />
                  We only send reset links to registered account emails.
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/40 mt-2"
                >
                  {isPending && <Loader2 size={16} className="animate-spin" />}
                  {isPending ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
