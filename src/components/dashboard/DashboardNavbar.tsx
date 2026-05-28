'use client';

import { Bell, ChevronDown, LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth.store';
import { useLogout } from '@/hooks/auth/useAuth';

const ROLE_STYLES = {
  STUDENT: {
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    gradient: 'from-violet-500 to-indigo-600',
  },

  INSTRUCTOR: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    gradient: 'from-amber-500 to-orange-600',
  },

  SUPERADMIN: {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    gradient: 'from-cyan-500 to-blue-600',
  },
};

export default function DashboardNavbar() {
  const router = useRouter();

  const { user } = useAuthStore();

  const { mutate: logout, isPending } = useLogout();

  const [open, setOpen] = useState(false);

  if (!user) return null;

  const role = user.role as keyof typeof ROLE_STYLES;

  const style = ROLE_STYLES[role];

  return (
    <header className="sticky top-0 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* SEARCH */}

          <div className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-card px-3 h-11 w-[280px]">
            <Search
              size={16}
              className="text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          {/* NOTIFICATION */}

          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted">
            <Bell
              size={18}
              className="text-muted-foreground"
            />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* PROFILE */}

          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl bg-card px-3 py-2 transition hover:bg-muted"
            >
              {/* AVATAR */}

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${style.gradient} text-sm font-bold text-white`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* USER INFO */}

              <div className="hidden text-left md:block">
                <p className="max-w-[140px] truncate text-sm font-semibold text-foreground">
                  {user.name}
                </p>

                <p className="max-w-[140px] truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>

              {/* ROLE */}

              <span
                className={`hidden rounded-full border px-2 py-1 text-[10px] font-semibold lg:block ${style.badge}`}
              >
                {role}
              </span>

              <ChevronDown
                size={16}
                className={`text-muted-foreground transition ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* DROPDOWN */}

            {open && (
                <div className="absolute right-0 z-[99999] mt-2 w-[240px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">

                {/* TOP */}

                {/* LINKS */}

                <div className="p-2">

                  <button
                    onClick={() => {
                      setOpen(false);

                      if (role === 'SUPERADMIN') {
                        router.push('/admin/profile');
                      } else if (role === 'INSTRUCTOR') {
                        router.push('/instructor/profile');
                      } else {
                        router.push('/dashboard/profile');
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);

                      if (role === 'SUPERADMIN') {
                        router.push('/admin/settings');
                      } else if (role === 'INSTRUCTOR') {
                        router.push('/instructor/settings');
                      } else {
                        router.push('/dashboard/settings');
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition hover:bg-muted"
                  >
                    Settings
                  </button>

                  <button
                    onClick={() => logout()}
                    disabled={isPending}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={16} />

                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}