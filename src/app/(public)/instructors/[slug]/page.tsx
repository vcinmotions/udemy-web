import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import {
  courses,
  courseSlug,
} from '@/data/mockData';

import {
  Star,
  Users,
  PlayCircle,
  Clock3,
  BookOpen,
} from 'lucide-react';

export async function generateStaticParams() {
  const instructorSlugs = Array.from(
    new Set(
      courses.map((course) =>
        course.instructor.name
          .toLowerCase()
          .replaceAll(' ', '-')
      )
    )
  );

  return instructorSlugs.map((slug) => ({
    slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InstructorPage({
  params,
}: Props) {
  const { slug } = await params;

  const instructorCourses = courses.filter(
    (course) =>
      course.instructor.name
        .toLowerCase()
        .replaceAll(' ', '-') === slug
  );

  if (instructorCourses.length === 0) {
    notFound();
  }

  const instructor = instructorCourses[0].instructor;

  const totalStudents = instructorCourses.reduce(
    (acc, course) => acc + course.studentCount,
    0
  );

  const avgRating =
    instructorCourses.reduce(
      (acc, course) => acc + course.rating,
      0
    ) / instructorCourses.length;

  return (
    <>

      <main className="min-h-screen bg-background pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-hero-bg via-[#24124d] to-hero-bg">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-primary/20 blur-3xl" />

          <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-sm text-white/60 mb-5">
              <span>Instructors</span>

              <span>/</span>

              <span className="text-white capitalize">
                {instructor.name}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* IMAGE */}
              <div className="relative w-40 h-40 rounded-3xl overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
                  <BookOpen
                    size={14}
                    className="text-secondary"
                  />

                  <span className="text-sm text-white font-medium">
                    Top Rated Instructor
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                  {instructor.name}
                </h1>

                <p className="text-white/70 text-lg leading-relaxed mt-5 max-w-3xl">
                  {instructor.bio}
                </p>

                {/* STATS */}
                <div className="flex flex-wrap gap-4 mt-10">
                  <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[180px]">
                    <p className="text-3xl font-extrabold text-white">
                      {avgRating.toFixed(1)}★
                    </p>

                    <p className="text-sm text-white/60 mt-1">
                      Instructor Rating
                    </p>
                  </div>

                  <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[180px]">
                    <p className="text-3xl font-extrabold text-white">
                      {Math.floor(totalStudents / 1000)}k+
                    </p>

                    <p className="text-sm text-white/60 mt-1">
                      Students
                    </p>
                  </div>

                  <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[180px]">
                    <p className="text-3xl font-extrabold text-white">
                      {instructorCourses.length}
                    </p>

                    <p className="text-sm text-white/60 mt-1">
                      Courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-10">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-foreground">
              Courses by {instructor.name}
            </h2>

            <p className="text-muted-foreground mt-2">
              Explore all premium courses created by this
              instructor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {instructorCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-card border border-border rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {course.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-primary text-white text-xs font-bold px-3 py-1">
                        {course.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold mb-3">
                    {course.subcategory}
                  </p>

                  <h3 className="font-extrabold text-lg leading-snug text-foreground line-clamp-2 min-h-[56px]">
                    {course.title}
                  </h3>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-bold text-amber-500">
                      {course.rating}
                    </span>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={13}
                            className="fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>

                    <span className="text-xs text-muted-foreground">
                      (
                      {course.reviewCount.toLocaleString()}
                      )
                    </span>
                  </div>

                  {/* META */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock3 size={13} />

                      <span>
                        {course.totalHours}h
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users size={13} />

                      <span>
                        {Math.floor(
                          course.studentCount / 1000
                        )}
                        k
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <PlayCircle size={13} />

                      <span>
                        {course.totalLectures} Lectures
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-foreground">
                      ₹{course.price}
                    </span>

                    <span className="text-sm text-muted-foreground line-through">
                      ₹{course.originalPrice}
                    </span>
                  </div>

                  {/* ACTION */}
                  <div className="mt-6">
                    <Link
                      href={`/courses/${courseSlug(
                        course.title
                      )}`}
                      className="w-full btn-primary text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </>
  );
}