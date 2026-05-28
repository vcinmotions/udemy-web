'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

import CourseCard from '@/components/course/CourseCard';
import { useCourses } from '@/queries/useCourses';
import { Course } from '@/types/course.types';

const tabs = [
  { id: 'tab-popular', label: 'Most Popular' },
  { id: 'tab-new', label: 'New & Trending' },
  { id: 'tab-free', label: 'Free Courses' },
];

export default function FeaturedCourses() {
  const [activeTab, setActiveTab] =
    useState('tab-popular');

  const scrollRef = useRef<HTMLDivElement>(null);

    const {
      data,
      isLoading,
      error,
    } = useCourses({
      page: 1,
      limit: 8,
    });
  
    const courses = data?.data?.courses || [];
    const pagination = data?.meta;
  
    console.log("Courses in FeaturedCourses", courses);
    console.log("Pagination in FeaturedCourses", pagination);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  };

  const displayedCoursesOld = useMemo(() => {
    switch (activeTab) {
      case 'tab-new':
        return courses.filter(
          (course: Course) =>
            course.badge === 'New' ||
            course.badge === 'Hot' ||
            course.badge === 'Popular'
        );

      case 'tab-free':
        return courses.filter(
          (course: Course) => course.price === 0
        );

      default:
        return [...courses]
          .sort(
            (a, b) =>
              b.studentCount - a.studentCount
          )
          .slice(0, 8);
    }
  }, [activeTab]);

  const displayedCourses = useMemo(() => {
  switch (activeTab) {
    case 'tab-new':
      return courses.filter(
        (course: Course) =>
          course.badge === 'New' ||
          course.badge === 'Hot' ||
          course.badge === 'Popular'
      );

    case 'tab-free':
      return courses.filter(
        (course: Course) => course.price === 0
      );

    default:
      return [...courses]
        .sort(
          (a, b) =>
            b.studentCount - a.studentCount
        )
        .slice(0, 8);
  }
}, [activeTab, courses]);

  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Curated for you
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
              Featured Courses
            </h2>

            <p className="text-muted-foreground mt-3 max-w-2xl">
              Explore premium courses designed to help
              you master accounting, GST, Excel, and
              professional business skills.
            </p>
          </div>

          {/* TABS */}
          <div className="flex items-center gap-2 bg-muted p-1.5 rounded-2xl overflow-x-auto">
            {tabs.map((tab) => {
              const isActive =
                activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-primary shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        

        {/* SLIDER */}
        <div className="relative">

          
          {/* LEFT */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg items-center justify-center hover:scale-105 transition"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT */}
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg items-center justify-center hover:scale-105 transition"
          >
            <ChevronRight size={18} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              ref={scrollRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 m-0 md:m-8 scroll-smooth"
            >
              {displayedCourses.map(
                (course: Course, index: any) => (
                  <motion.div
                    key={course.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    className="min-w-[290px] max-w-[290px] lg:min-w-[320px] lg:max-w-[320px] shrink-0"
                  >
                    <CourseCard
                      course={course}
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Browse All Courses
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}