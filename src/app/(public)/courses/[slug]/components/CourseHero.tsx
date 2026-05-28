'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Clock, Globe, Award, ChevronRight, Play, RefreshCw } from 'lucide-react';
import { Course } from '@/types/course.types';
import { motion } from 'framer-motion';
import { StarRating } from '@/components/course/CourseCard';

interface CourseHeroProps {
  course: Course;
  onPreviewClick: () => void;
}

export default function CourseHero({ course, onPreviewClick }: CourseHeroProps) {
  return (
    <div className="hero-gradient py-10 lg:py-14">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={13} />
          <Link
            href={`/categories/${course.category.slug}`}
            className="hover:text-white transition-colors"
          >
            {course.category.name}
          </Link>
          <ChevronRight size={13} />
          <Link
            href={`/categories/${course.subcategory.slug}`}
            className="hover:text-white transition-colors"
          >
            {course.subcategory.name}
          </Link>
          <ChevronRight size={13} />
          <span className="text-white/90 line-clamp-1 max-w-xs">{course.title}</span>
        </nav>

        <div className="max-w-3xl">
          {/* Badge */}
          {course.badge && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3"
            >
              <span className={course.badge === 'Bestseller' ? 'badge-bestseller' : course.badge === 'New' ? 'badge-new' : 'badge-hot'}>
                {course.badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-hero-xl text-white mb-4"
          >
            {course.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-base leading-relaxed mb-5"
          >
            {course.subtitle}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mb-5"
          >
            <StarRating rating={course.rating} count={course.reviewCount} />
            <span className="flex items-center gap-1.5 text-white/75 text-sm">
              <Users size={14} />
              {course.studentCount.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1.5 text-white/75 text-sm">
              <Clock size={14} />
              {course.totalHours} hours total
            </span>
            <span className="flex items-center gap-1.5 text-white/75 text-sm">
              <Globe size={14} />
              {course.language}
            </span>
          </motion.div>

          {/* Instructor + meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 mb-6"
          >
            <span>
              Created by{' '}
              <span className="text-violet-300 hover:text-violet-200 cursor-pointer font-medium">
                {course.instructor.name}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw size={13} />
              Last updated {course.lastUpdated}
            </span>
            <span className="flex items-center gap-1">
              <Award size={13} />
              Certificate of Completion
            </span>
          </motion.div>

          {/* Level + lectures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {[
              course.level,
              `${course.totalLectures} lectures`,
              `${course.totalHours}h video`,
              `${course.totalArticles} articles`,
            ].map((badge) => (
              <span
                key={`hero-badge-${badge}`}
                className="text-xs font-medium bg-white/12 border border-white/20 text-white/85 px-3 py-1.5 rounded-full"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Mobile preview button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 lg:hidden"
          >
            <button
              onClick={onPreviewClick}
              className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/25 transition-colors"
            >
              <Play size={16} className="fill-white" />
              Preview this course
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}