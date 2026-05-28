'use client';

import Link from 'next/link';

import {
  Edit,
  Trash2,
  Eye,
  PlusCircle,
} from 'lucide-react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { instructorApi } from '@/api/instructor.api';


export default function InstructorCoursesPage() {
  const { data: courses = [], refetch } =
    useQuery({
      queryKey: ['my-courses'],
      queryFn: instructorApi.getMyCourses,
    });

  const deleteMutation = useMutation({
    mutationFn: instructorApi.deleteCourse,

    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="space-y-6 p-6">

      <div className="block md:flex items-center justify-between">
        <div className='mb-5'>
          <h1 className="text-3xl font-bold">
            My Courses
          </h1>

          <p className="text-muted-foreground">
            Manage all your courses
          </p>
        </div>

        <Link
          href="/instructor/courses/new"
          className="flex items-center w-max gap-2 rounded-xl bg-black px-5 py-3 text-white"
        >
          <PlusCircle size={18} />
          New Course
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {courses.map((course: any) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-3xl border bg-card"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-52 w-full object-cover"
            />

            <div className="space-y-4 p-5">

              <div>
                <h2 className="line-clamp-1 text-lg font-bold">
                  {course.title}
                </h2>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {course.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500">
                  ₹{course.price}
                </span>

                <span className="text-sm text-muted-foreground">
                  ⭐ {course.rating}
                </span>
              </div>

              <div className="flex items-center gap-2">

                <Link
                  href={`/instructor/courses/${course.id}/view`}
                  className="flex h-10 flex-1 items-center justify-center rounded-xl border"
                >
                  <Eye size={18} />
                </Link>

                <Link
                  href={`/instructor/courses/${course.id}/edit`}
                  className="flex h-10 flex-1 items-center justify-center rounded-xl border"
                >
                  <Edit size={18} />
                </Link>

                <button
                  onClick={() =>
                    deleteMutation.mutate(course.id)
                  }
                  className="flex h-10 flex-1 items-center justify-center rounded-xl border text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}