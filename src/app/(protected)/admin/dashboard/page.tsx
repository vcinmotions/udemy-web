'use client';

import { withAuth } from '@/components/auth/withAuth';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import {
  Users,
  BookOpen,
  ShoppingCart,
  TrendingUp,
  Activity,
} from 'lucide-react';

import { adminApi } from '@/api/admin.api';

import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';

import { STAT_COLORS } from '@/config/dashboard-ui';

type AdminDashboardData = {
  stats?: {
    totalUsers?: number;
    totalCourses?: number;
    totalEnrollments?: number;
    pendingCourses?: number;
  };
  recentUsers?: {
    id: string;
    name: string;
    email: string;
    role: string;
  }[];
  recentCourses?: {
    id: string;
    title: string;
    image?: string;
    isApproved?: boolean;
    instructor?: {
      name?: string;
    };
  }[];
};

function useAdminStats(enabled: boolean) {
  return useQuery<AdminDashboardData>({
    queryKey: ['admin-dashboard'],
    queryFn: adminApi.getDashboard,

    enabled,

    // IMPORTANT
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,

    staleTime: 0,
  });
}

function AdminDashboardPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useAdminStats(true);

  const stats = data?.stats;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">

        {/* HEADER */}

        <div className="mb-8">
          <p className="section-label">
            ADMIN PANEL
          </p>

          <h1 className="mt-2 text-4xl font-black text-foreground">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage users, courses, analytics and platform activity.
          </p>
        </div>

        {/* STATS */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total Users"
            value={isLoading ? '...' : stats?.totalUsers || 0}
            icon={Users}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
            change="+12%"
          />

          <DashboardCard
            title="Total Courses"
            value={isLoading ? '...' : stats?.totalCourses || 0}
            icon={BookOpen}
            colorBg={STAT_COLORS.amber.bg}
            colorText={STAT_COLORS.amber.text}
            change="+5%"
          />

          <DashboardCard
            title="Enrollments"
            value={isLoading ? '...' : stats?.totalEnrollments || 0}
            icon={ShoppingCart}
            colorBg={STAT_COLORS.cyan.bg}
            colorText={STAT_COLORS.cyan.text}
            change="+18%"
          />

          <DashboardCard
            title="Pending Courses"
            value={isLoading ? '...' : stats?.pendingCourses || 0}
            icon={TrendingUp}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
        </div>

        {/* CONTENT */}

        <div className="mt-8 flex flex-col md:grid gap-6 lg:grid-cols-3">

          {/* USERS */}

          <DashboardSection
            title="Recent Users"
            action={
              <button
                onClick={() => router.push('/admin/users')}
                className="text-sm font-medium text-primary"
              >
                View All
              </button>
            }
          >
            <div className="space-y-3">

              {isLoading ? (
                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))
              ) : isError ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Could not load recent users.
                </p>
              ) : (data?.recentUsers || []).length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No recent users found.
                </p>
              ) : (data?.recentUsers || []).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 rounded-xl border border-border p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                    {user.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">
                      {user.name}
                    </p>

                    <p className="truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                    {user.role}
                  </span>
                </div>
              ))}

            </div>
          </DashboardSection>

          {/* COURSES */}

          <div className="lg:col-span-2">
            <DashboardSection
              title="Recent Courses"
              action={
                <button
                  onClick={() => router.push('/admin/courses')}
                  className="text-sm font-medium text-primary"
                >
                  View All
                </button>
              }
            >
              <div className="space-y-3">

                {isLoading ? (
                  [1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-xl border border-border p-3"
                    >
                      <div className="h-14 w-20 animate-pulse rounded-lg bg-muted" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                      </div>
                      <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
                    </div>
                  ))
                ) : isError ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Could not load recent courses.
                  </p>
                ) : (data?.recentCourses || []).length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No recent courses found.
                  </p>
                ) : (data?.recentCourses || []).map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 rounded-xl border border-border p-3"
                  >
                    <div className="h-14 w-20 overflow-hidden rounded-lg bg-muted">
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">
                        {course.title}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {course.instructor?.name}
                      </p>
                    </div>

                    <div>
                      {course.isApproved ? (
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                          Approved
                        </span>
                      ) : (
                        <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            </DashboardSection>
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {[
            {
              label: 'Manage Users',
              icon: Users,
              href: '/admin/users',
            },

            {
              label: 'Courses',
              icon: BookOpen,
              href: '/admin/courses',
            },

            {
              label: 'Pending Review',
              icon: Activity,
              href: '/admin/pending',
            },

            {
              label: 'Orders',
              icon: ShoppingCart,
              href: '/admin/orders',
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:border-primary/20 hover:bg-primary/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="text-primary" size={20} />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {item.label}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Open section
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboardPage, { allowedRoles: ['SUPERADMIN'] });
