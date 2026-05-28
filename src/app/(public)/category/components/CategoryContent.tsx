'use client';

import {
  Star,
  Users,
  Clock3,
  Heart,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { categoryApi } from '@/api/category.api';

export default function CategoryContent() {
  const params = useParams();

  const slug = params.slug as string;

  console.log(slug);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategory,
  });

  console.log(categories);

  const formattedSlug = slug
    ?.replaceAll('-', ' ')
    .toLowerCase();

  // FIND CURRENT CATEGORY
  const currentCategory = categories.find(
    (category: any) =>
      category.slug === slug ||
      category.name.toLowerCase() === formattedSlug
  );

  // GET COURSES
  const filteredCourses =
    currentCategory?.courses || [];

  // SLUG HELPER
  const courseSlug = (title: string) =>
    title
      .toLowerCase()
      .replaceAll(/[^a-z0-9\s-]/g, '')
      .replaceAll(/\s+/g, '-');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-lg font-semibold">
          Loading category...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-hero-bg via-[#24124d] to-hero-bg">
        {/* BLOBS */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="bg-hero-bg relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-5">
            <span>Categories</span>

            <span>/</span>

            <span className="text-white capitalize">
              {formattedSlug}
            </span>
          </div>

          <div className="max-w-4xl">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
              <Sparkles
                size={14}
                className="text-secondary"
              />

              <span className="text-sm text-white font-medium">
                Trending Learning Path
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white capitalize leading-tight">
              {formattedSlug}
            </h1>

            {/* DESC */}
            <p className="text-white/70 text-lg leading-relaxed mt-5 max-w-2xl">
              Master modern skills with real-world
              projects, expert-led courses,
              downloadable resources, and
              production-ready learning paths.
            </p>

            {/* STATS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[180px]">
                <p className="text-3xl font-extrabold text-white">
                  {filteredCourses.length}
                </p>

                <p className="text-sm text-white/60 mt-1">
                  Premium Courses
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[180px]">
                <p className="text-3xl font-extrabold text-white">
                  {currentCategory?._count
                    ?.courses || 0}
                  +
                </p>

                <p className="text-sm text-white/60 mt-1">
                  Active Learners
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[180px]">
                <p className="text-3xl font-extrabold text-white">
                  4.8★
                </p>

                <p className="text-sm text-white/60 mt-1">
                  Average Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-10">
        {/* TOPBAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">
              Explore Courses
            </h2>

            <p className="text-muted-foreground mt-2">
              Showing{' '}
              <span className="font-semibold text-foreground">
                {filteredCourses.length}
              </span>{' '}
              results in{' '}
              <span className="capitalize">
                {formattedSlug}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-medium">
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <select className="px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Highest Rated</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* EMPTY */}
        {filteredCourses.length === 0 ? (
          <div className="border border-dashed border-border rounded-3xl p-20 text-center bg-card">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <TrendingUp
                size={32}
                className="text-primary"
              />
            </div>

            <h3 className="text-3xl font-bold text-foreground mb-3">
              No courses found
            </h3>

            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find courses in this
              category yet. Try exploring another
              topic.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredCourses.map((course: any) => (
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

                  {/* BADGE */}
                  {course.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-primary text-white text-xs font-bold px-3 py-1">
                        {course.badge}
                      </span>
                    </div>
                  )}

                  {/* WISHLIST */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <Heart size={16} />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {/* CATEGORY */}
                  <p className="text-xs uppercase tracking-wider text-primary font-bold mb-3">
                    {course.subcategory?.name}
                  </p>

                  {/* TITLE */}
                  <h3 className="font-extrabold text-lg leading-snug text-foreground line-clamp-2 min-h-[56px]">
                    {course.title}
                  </h3>

                  {/* INSTRUCTOR */}
                  <p className="text-sm text-muted-foreground mt-2">
                    by {course.instructor?.name}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="font-bold text-amber-500">
                      {course.rating}
                    </span>

                    <div className="flex items-center gap-0.5">
                      {Array.from({
                        length: 5,
                      }).map((_, index) => (
                        <Star
                          key={index}
                          size={13}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <span className="text-xs text-muted-foreground">
                      (
                      {course.reviewCount?.toLocaleString()}
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
                          course.studentCount /
                            1000
                        )}
                        k
                      </span>
                    </div>

                    <div>{course.level}</div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-foreground">
                      ₹
                      {Math.floor(
                        course.price
                      )}
                    </span>

                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹
                        {Math.floor(
                          course.originalPrice
                        )}
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/courses/${course.slug || courseSlug(course.title)}`}
                      className="flex-1 btn-primary text-center py-3 rounded-xl text-sm font-semibold"
                    >
                      View Course
                    </Link>

                    <button className="w-12 h-12 rounded-xl border border-border hover:bg-muted transition-colors flex items-center justify-center">
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}