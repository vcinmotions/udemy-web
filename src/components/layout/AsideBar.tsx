'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Play,
  PlusCircle,
  BarChart3,
  ShoppingCart,
  CheckSquare,
  GraduationCap,
  Video,
  Menu,
  X,
} from 'lucide-react';

import { useAuthStore } from '@/store/auth.store';
import { useLogout } from '@/hooks/auth/useAuth';
import DashboardNavbar from '../dashboard/DashboardNavbar';

/* ───────────────────────────────────────────────────────────── */

const NAV_ITEMS = {
  STUDENT: [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'My Courses',
      href: '/dashboard/my-courses',
      icon: BookOpen,
    },
    // {
    //   label: 'Learning',
    //   href: '/dashboard/learn',
    //   icon: Play,
    // },
    {
      label: 'Profile',
      href: '/dashboard/profile',
      icon: User,
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ],

  INSTRUCTOR: [
    {
      label: 'Dashboard',
      href: '/instructor/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Courses',
      href: '/instructor/courses',
      icon: BookOpen,
    },
    {
      label: 'Create Course',
      href: '/instructor/courses/new',
      icon: PlusCircle,
    },
    {
      label: 'Analytics',
      href: '/instructor/analytics',
      icon: BarChart3,
    },
    {
      label: 'Profile',
      href: '/instructor/profile',
      icon: User,
    },
    {
      label: 'Settings',
      href: '/instructor/settings',
      icon: Settings,
    },
  ],

  SUPERADMIN: [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      label: 'Courses',
      href: '/admin/courses',
      icon: BookOpen,
    },
    {
      label: 'Pending',
      href: '/admin/pending',
      icon: CheckSquare,
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ],
};

const ROLE_CONFIG = {
  STUDENT: {
    label: 'Student',
    gradient: 'from-violet-500 to-indigo-600',
    active: 'bg-violet-500/15 text-violet-600',
  },

  INSTRUCTOR: {
    label: 'Instructor',
    gradient: 'from-orange-500 to-amber-500',
    active: 'bg-orange-500/15 text-orange-600',
  },

  SUPERADMIN: {
    label: 'Admin',
    gradient: 'from-cyan-500 to-blue-600',
    active: 'bg-cyan-500/15 text-cyan-600',
  },
};

/* ───────────────────────────────────────────────────────────── */

export function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  const { user } = useAuthStore();

  const { mutate: logout, isPending } = useLogout();

  if (!user || !NAV_ITEMS[user.role as keyof typeof NAV_ITEMS]) return null;

  const role = user.role as keyof typeof NAV_ITEMS;

  const items = NAV_ITEMS[role];

  const cfg = ROLE_CONFIG[role];

  return (
    <aside
      className={`
        hidden lg:flex
        flex-col
        transition-all duration-300
        border-r
        bg-card
        border-border
        shadow-sidebar
        h-screen
        sticky top-0
        ${collapsed ? 'w-[78px]' : 'w-[260px]'}
      `}
    >
      {/* Logo */}

      <div className="h-16 border-b border-border flex items-center px-4">
        <div
          className={`
            w-10 h-10 rounded-2xl
            bg-gradient-to-br ${cfg.gradient}
            flex items-center justify-center
            text-white font-bold shrink-0
          `}
        >
          L
        </div>

        {!collapsed && (
          <div className="ml-3">
            <p className="font-bold text-sm">LearnHub</p>

            <p className="text-xs text-muted-foreground">
              {cfg.label} Panel
            </p>
          </div>
        )}
      </div>

      {/* User */}

      {/* {!collapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-11 h-11 rounded-full
                bg-gradient-to-br ${cfg.gradient}
                flex items-center justify-center
                text-white font-bold
              `}
            >
              {user.name.charAt(0)}
            </div>

            <div className="min-w-0">
              <p className="font-semibold truncate">
                {user.name}
              </p>

              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Navigation */}

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            pathname.startsWith(href + '/');

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3
                rounded-xl
                px-3 py-3
                text-sm font-medium
                transition-all
                ${
                  active
                    ? cfg.active
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <Icon size={18} />

              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}

      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => logout()}
          disabled={isPending}
          className={`
            w-full flex items-center gap-3
            rounded-xl px-3 py-3
            text-sm font-medium
            text-red-500
            hover:bg-red-500/10
            transition
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut size={18} />

          {!collapsed && <span>Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            w-full flex items-center gap-3
            rounded-xl px-3 py-3
            text-sm
            hover:bg-muted
            transition
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

/* ───────────────────────────────────────────────────────────── */

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { user } = useAuthStore();

  const { mutate: logout } = useLogout();

  if (!user) return null;

  const role = user.role as keyof typeof NAV_ITEMS;

  const items = NAV_ITEMS[role];

  const cfg = ROLE_CONFIG[role];

  return (
    <>
      <header className="lg:hidden h-14 border-b border-border bg-card px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div
            className={`
              w-9 h-9 rounded-xl
              bg-gradient-to-br ${cfg.gradient}
            `}
          />

          <p className="font-bold">LearnHub</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-muted"
        >
          <Menu size={20} />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-[280px] h-full bg-card border-r border-border">
            <div className="h-14 border-b border-border flex items-center justify-between px-4">
              <p className="font-bold">Menu</p>

              <button onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <nav className="p-3 space-y-1">
              {items.map(({ label, href, icon: Icon }) => {
                const active =
                  pathname === href ||
                  pathname.startsWith(href + '/');

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3
                      rounded-xl px-3 py-3
                      transition
                      ${
                        active
                          ? cfg.active
                          : 'hover:bg-muted'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-red-500 hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ───────────────────────────────────────────────────────────── */

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* MOBILE NAV */}

        <MobileNav />

        {/* TOP NAVBAR */}

        <DashboardNavbar />

        {/* CONTENT */}

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}