'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, BookOpen, Star, Users } from 'lucide-react';

import { instructorApi } from '@/api/instructor.api';
import { withAuth } from '@/components/auth/withAuth';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import { STAT_COLORS } from '@/config/dashboard-ui';

interface InstructorCourse {
  id: string;
  title: string;
  isPublished?: boolean;
  isApproved?: boolean;
  studentCount?: number;
  reviewCount?: number;
  rating?: number;
}

function InstructorAnalyticsPage() {
  const { data: courses = [], isLoading } = useQuery<InstructorCourse[]>({
    queryKey: ['instructor-courses-analytics'],
    queryFn: instructorApi.getMyCourses,
  });

  const stats = useMemo(() => {
    const totalStudents = courses.reduce(
      (sum, course) => sum + (course.studentCount || 0),
      0
    );
    const totalReviews = courses.reduce(
      (sum, course) => sum + (course.reviewCount || 0),
      0
    );
    const avgRating =
      courses.length > 0
        ? (
            courses.reduce((sum, course) => sum + (course.rating || 0), 0) /
            courses.length
          ).toFixed(1)
        : '0.0';

    return { totalStudents, totalReviews, avgRating };
  }, [courses]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="section-label">INSTRUCTOR ANALYTICS</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            Course Performance
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track students, reviews, ratings and publishing health.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Courses"
            value={isLoading ? '...' : courses.length}
            icon={BookOpen}
            colorBg={STAT_COLORS.amber.bg}
            colorText={STAT_COLORS.amber.text}
          />
          <DashboardCard
            title="Students"
            value={isLoading ? '...' : stats.totalStudents}
            icon={Users}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
          />
          <DashboardCard
            title="Reviews"
            value={isLoading ? '...' : stats.totalReviews}
            icon={BarChart3}
            colorBg={STAT_COLORS.cyan.bg}
            colorText={STAT_COLORS.cyan.text}
          />
          <DashboardCard
            title="Avg Rating"
            value={isLoading ? '...' : stats.avgRating}
            icon={Star}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
        </div>

        <div className="mt-8">
          <DashboardSection title="Course Breakdown">
            {courses.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                Create courses to see analytics here.
              </div>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="grid gap-4 rounded-xl border border-border p-4 md:grid-cols-[1fr_120px_120px_120px]"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {course.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {course.isPublished ? 'Published' : 'Draft'} ·{' '}
                        {course.isApproved ? 'Approved' : 'Pending approval'}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Students: <span className="font-semibold text-foreground">{course.studentCount || 0}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Reviews: <span className="font-semibold text-foreground">{course.reviewCount || 0}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Rating: <span className="font-semibold text-foreground">{course.rating || 0}</span>
                    </p>
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

export default withAuth(InstructorAnalyticsPage, { allowedRoles: ['INSTRUCTOR'] });
