'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, LockKeyhole, Palette, ShieldCheck } from 'lucide-react';

import { withAuth } from '@/components/auth/withAuth';
import { useAuthStore } from '@/store/auth.store';

type Role = 'STUDENT' | 'INSTRUCTOR' | 'SUPERADMIN';

function AccountSettingsPage({
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

  const settings = [
    {
      title: 'Security',
      description: 'Password changes and two-step verification controls will live here.',
      icon: LockKeyhole,
    },
    {
      title: 'Notifications',
      description: 'Choose which learning and account updates should reach you.',
      icon: Bell,
    },
    {
      title: 'Appearance',
      description: 'Theme and dashboard density preferences for this account.',
      icon: Palette,
    },
    {
      title: 'Privacy',
      description: 'Manage profile visibility and data sharing preferences.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="section-label">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Account preferences are grouped here so the route never lands on a blank page.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {settings.map((item) => {
            const Icon = item.icon;

            return (
              <section
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="text-primary" size={20} />
                </div>
                <h2 className="text-lg font-bold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
                <button className="mt-5 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
                  Manage
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AccountSettingsPage, {
  allowedRoles: ['STUDENT', 'INSTRUCTOR', 'SUPERADMIN'],
});
