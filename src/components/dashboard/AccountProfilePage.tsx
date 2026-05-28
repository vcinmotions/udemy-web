'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Shield, UserRound } from 'lucide-react';

import { withAuth } from '@/components/auth/withAuth';
import { useAuthStore } from '@/store/auth.store';

type Role = 'STUDENT' | 'INSTRUCTOR' | 'SUPERADMIN';

const ROLE_LABELS: Record<Role, string> = {
  STUDENT: 'Student',
  INSTRUCTOR: 'Instructor',
  SUPERADMIN: 'Administrator',
};

function AccountProfilePage({
  allowedRoles,
  title,
  eyebrow,
}: {
  allowedRoles: Role[];
  title: string;
  eyebrow: string;
}) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || allowedRoles.includes(user.role as Role)) return;

    if (user.role === 'SUPERADMIN') router.push('/admin/dashboard');
    else if (user.role === 'INSTRUCTOR') router.push('/instructor/dashboard');
    else router.push('/dashboard');
  }, [allowedRoles, router, user]);

  if (!user) return null;
  if (!allowedRoles.includes(user.role as Role)) return null;

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="section-label">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review your account details and public learning profile.
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-3xl font-black text-white">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-black text-foreground">
                {user.name}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {user.headline || ROLE_LABELS[user.role as Role]}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
                  <Shield size={14} />
                  {ROLE_LABELS[user.role as Role]}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
                  <Mail size={14} />
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <UserRound className="text-primary" size={18} />
              </div>
              <h3 className="font-bold text-foreground">Bio</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {user.bio || 'No bio added yet.'}
              </p>
            </div>

            <div className="rounded-2xl border border-border p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <Shield className="text-emerald-400" size={18} />
              </div>
              <h3 className="font-bold text-foreground">Account Status</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {user.isActive ? 'Your account is active.' : 'Your account is inactive.'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Email {user.emailVerified ? 'verified' : 'not verified'}.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default withAuth(AccountProfilePage, {
  allowedRoles: ['STUDENT', 'INSTRUCTOR', 'SUPERADMIN'],
});
