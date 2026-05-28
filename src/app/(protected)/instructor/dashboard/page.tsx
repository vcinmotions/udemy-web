'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  BookOpen,
  Users,
  DollarSign,
  BarChart3,
  Video,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { withAuth } from '@/components/auth/withAuth';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import { STAT_COLORS } from '@/config/dashboard-ui';
import { instructorApi } from '@/api/instructor.api';

type InstructorCourse = {
  id: string;
  title: string;
  image?: string;
  price?: number;
  rating?: number;
  studentCount?: number;
  isPublished?: boolean;
};

function InstructorDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery<InstructorCourse[]>({
    queryKey: ['instructor-dashboard', user?.id],
    queryFn: instructorApi.getMyCourses,
    enabled: Boolean(user),
  });

  if (!user) return null;

  const totalStudents = courses.reduce(
    (acc: number, course) => acc + (Number(course.studentCount) || 0),
    0
  );
  const totalRevenue = courses.reduce(
    (acc: number, course) =>
      acc + (Number(course.price) || 0) * (Number(course.studentCount) || 0),
    0
  );
  const ratedCourses = courses.filter((course) => Number(course.rating) > 0);
  const averageRating = ratedCourses.length
    ? (
        ratedCourses.reduce(
          (acc: number, course) => acc + Number(course.rating),
          0
        ) / ratedCourses.length
      ).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="section-label">INSTRUCTOR PANEL</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            Instructor Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Hi {user.name}, manage your courses and track performance
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Courses"
            value={isLoading ? '...' : courses.length}
            icon={BookOpen}
            colorBg={STAT_COLORS.amber.bg}
            colorText={STAT_COLORS.amber.text}
          />
          <DashboardCard
            title="Total Students"
            value={isLoading ? '...' : totalStudents}
            icon={Users}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
          />
          <DashboardCard
            title="Total Revenue"
            value={isLoading ? '...' : `Rs ${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            colorBg={STAT_COLORS.cyan.bg}
            colorText={STAT_COLORS.cyan.text}
          />
          <DashboardCard
            title="Avg Rating"
            value={isLoading ? '...' : averageRating}
            icon={BarChart3}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
        </div>

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
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-border p-3"
                  >
                    <div className="h-14 w-20 animate-pulse rounded-lg bg-muted" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="py-12 text-center">
                <p className="font-medium text-foreground">Could not load courses</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please refresh the page or try again in a moment.
                </p>
              </div>
            ) : courses.length === 0 ? (
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
            ) : (
              <div className="space-y-3">
                {courses.slice(0, 5).map((course) => (
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
                        {course.studentCount || 0} students
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        course.isPublished
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-orange-500/10 text-orange-500'
                      }`}
                    >
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
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

export default withAuth(InstructorDashboard, { allowedRoles: ['INSTRUCTOR'] });
