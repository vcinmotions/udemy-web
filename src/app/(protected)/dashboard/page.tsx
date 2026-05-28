'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Trophy, TrendingUp, Play, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { withAuth } from '@/components/auth/withAuth';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import { STAT_COLORS } from '@/config/dashboard-ui';
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '@/api/student.api';

function StudentDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();

  const {
      data: enrollments = [],
      isLoading,
    } = useQuery({
      queryKey: ['my-courses'],
      queryFn: studentApi.getMyCourse,
    });
    

  console.log("enrollments in dashboard", enrollments);
  console.log("user in dashboard", user);
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="section-label">STUDENT DASHBOARD</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your learning progress and continue where you left off.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Enrolled Courses"
            value={enrollments.length}
            icon={BookOpen}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
          />
          <DashboardCard
            title="Hours Learned"
            value={`${
              enrollments.length > 0
                ? Math.round(
                    enrollments.reduce(
                      (acc: number, item: any) =>
                        acc + item.progress,
                      0
                    ) / enrollments.length
                  )
                : 0
            }%`}
            icon={Clock}
            colorBg={STAT_COLORS.cyan.bg}
            colorText={STAT_COLORS.cyan.text}
          />
          <DashboardCard
            title="Certificates"
            value={0}
            icon={Trophy}
            colorBg={STAT_COLORS.amber.bg}
            colorText={STAT_COLORS.amber.text}
          />
          <DashboardCard
            title="Avg Progress"
            value="0%"
            icon={TrendingUp}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
        </div>

        {/* MY LEARNING */}
        <div className="mt-8">
          <DashboardSection
            title="My Courses"
            action={
              <button
                onClick={() => router.push('/courses')}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Browse courses <ChevronRight size={14} />
              </button>
            }
          >
            {enrollments.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
                  <Play className="h-7 w-7 text-muted-foreground" />
                </div>

                <p className="font-medium text-foreground">
                  No courses yet
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Enroll in a course to start learning
                </p>

                <button
                  onClick={() =>
                    router.push('/courses')
                  }
                  className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90"
                >
                  Explore Courses
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {enrollments.map((enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={
                          enrollment.course.image ||
                          '/placeholder.jpg'
                        }
                        alt={enrollment.course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-2 text-lg font-bold text-foreground">
                        {enrollment.course.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {
                          enrollment.course.subtitle
                        }
                      </p>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>

                          <span className="font-medium">
                            {enrollment.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            style={{
                              width: `${enrollment.progress}%`,
                            }}
                            className="h-full bg-primary transition-all"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard/learn/${enrollment.course.slug}`
                          )
                        }
                        className="bg-black mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-primary font-semibold text-white transition hover:bg-primary/90"
                      >
                        Continue Learning
                      </button>
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

export default withAuth(StudentDashboard, { allowedRoles: ['STUDENT'] });
