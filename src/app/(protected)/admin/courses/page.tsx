'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, CheckCircle2, Clock, XCircle } from 'lucide-react';

import { api } from '@/api/axios';
import { adminApi } from '@/api/admin.api';
import { withAuth } from '@/components/auth/withAuth';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import { STAT_COLORS } from '@/config/dashboard-ui';

interface AdminCourse {
  id: string;
  title: string;
  image?: string;
  isApproved?: boolean;
  isDraft?: boolean;
  isPublished?: boolean;
  instructor?: {
    name?: string;
  };
}

interface AdminDashboardData {
  stats?: {
    totalCourses?: number;
  };
  recentCourses?: AdminCourse[];
}

function AdminCoursesPage() {
  const { data: dashboard } = useQuery<AdminDashboardData>({
    queryKey: ['admin-dashboard-courses'],
    queryFn: async () => {
      const res = await api.get('/admin/dashboard');
      return res.data.data;
    },
  });

  const { data: pendingCourses = [] } = useQuery<AdminCourse[]>({
    queryKey: ['admin-pending-courses-list'],
    queryFn: adminApi.getPendingCourses,
  });

  const courses = useMemo(() => {
    const recent = dashboard?.recentCourses || [];
    const byId = new Map<string, AdminCourse>();

    [...pendingCourses, ...recent].forEach((course) => {
      byId.set(course.id, course);
    });

    return Array.from(byId.values());
  }, [dashboard, pendingCourses]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="section-label">ADMIN COURSES</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            Course Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review course status, approvals and publishing activity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Courses"
            value={dashboard?.stats?.totalCourses || courses.length}
            icon={BookOpen}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
          />
          <DashboardCard
            title="Pending"
            value={pendingCourses.length}
            icon={Clock}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
          <DashboardCard
            title="Approved"
            value={courses.filter((course) => course.isApproved).length}
            icon={CheckCircle2}
            colorBg={STAT_COLORS.emerald.bg}
            colorText={STAT_COLORS.emerald.text}
          />
          <DashboardCard
            title="Drafts"
            value={courses.filter((course) => course.isDraft).length}
            icon={XCircle}
            colorBg={STAT_COLORS.amber.bg}
            colorText={STAT_COLORS.amber.text}
          />
        </div>

        <div className="mt-8">
          <DashboardSection title="Courses">
            {courses.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No course records found yet.
              </div>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col gap-4 rounded-xl border border-border p-4 md:flex-row md:items-center"
                  >
                    <div className="h-16 w-24 overflow-hidden rounded-xl bg-muted">
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
                        {course.instructor?.name || 'Unknown instructor'}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.isApproved
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-orange-500/10 text-orange-400'
                        }`}
                      >
                        {course.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminCoursesPage, { allowedRoles: ['SUPERADMIN'] });
