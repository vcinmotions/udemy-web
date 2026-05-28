'use client';

import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import {
  BookOpen,
  Play,
} from 'lucide-react';

import { withAuth } from '@/components/auth/withAuth';

import { studentApi } from '@/api/student.api';

function MyCoursesPage() {
  const router = useRouter();

  const {
    data: enrollments = [],
    isLoading,
  } = useQuery({
    queryKey: ['my-courses'],
    queryFn:
      studentApi.getMyCourse,
  });

  if (isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <BookOpen
              className="text-primary"
              size={32}
            />

            <h1 className="text-4xl font-black">
              My Courses
            </h1>
          </div>

          <p className="text-muted-foreground">
            Continue learning your
            enrolled courses.
          </p>
        </div>

        {enrollments.length ===
        0 ? (
          <div className="rounded-2xl border border-border bg-white p-10 text-center">
            <h2 className="text-2xl font-bold">
              No enrolled courses
            </h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {enrollments.map(
              (item: any) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-border bg-white"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={
                        item.course
                          .image
                      }
                      alt={
                        item.course
                          .title
                      }
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-2 text-xl font-bold">
                      {
                        item.course
                          .title
                      }
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      By{' '}
                      {
                        item
                          .course
                          .instructor
                          ?.name
                      }
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>
                          Progress
                        </span>

                        <span>
                          {
                            item.progress
                          }
                          %
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          style={{
                            width: `${item.progress}%`,
                          }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/learn/${item.course.slug}`
                        )
                      }
                      className="bg-black mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-white"
                    >
                      <Play size={16} />

                      Continue
                      Learning
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default withAuth(
  MyCoursesPage,
  {
    allowedRoles: ['STUDENT'],
  }
);