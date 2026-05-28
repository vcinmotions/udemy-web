'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Users, DollarSign, BarChart3, Video, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { withAuth } from '@/components/auth/withAuth';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import { STAT_COLORS } from '@/config/dashboard-ui';

function InstructorDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="section-label">INSTRUCTOR PANEL</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            Instructor Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Hi {user.name}, manage your courses and track performance
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Courses"
            value={0}
            icon={BookOpen}
            colorBg={STAT_COLORS.amber.bg}
            colorText={STAT_COLORS.amber.text}
          />
          <DashboardCard
            title="Total Students"
            value={0}
            icon={Users}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
          />
          <DashboardCard
            title="Total Revenue"
            value="₹0"
            icon={DollarSign}
            colorBg={STAT_COLORS.cyan.bg}
            colorText={STAT_COLORS.cyan.text}
          />
          <DashboardCard
            title="Avg Rating"
            value="—"
            icon={BarChart3}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
        </div>

        {/* COURSES */}
        <div className="mt-8">
          <DashboardSection
            title="My Courses"
            action={
              <button
                onClick={() => router.push('/instructor/courses')}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all <ChevronRight size={14} />
              </button>
            }
          >
            <div className="text-center py-12">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted border border-border">
                <Video className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No courses yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first course to start earning
              </p>
              <button
                onClick={() => router.push('/instructor/courses/new')}
                className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
              >
                Create First Course
              </button>
            </div>
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}

export default withAuth(InstructorDashboard, { allowedRoles: ['INSTRUCTOR'] });
