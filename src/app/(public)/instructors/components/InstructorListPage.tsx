'use client';

import React from 'react';

import Link from 'next/link';

import {
  Star,
  Users,
  BookOpen,
} from 'lucide-react';

import { motion } from 'framer-motion';

import AppImage from '@/components/ui/AppImage';

import { useInstructors } from '@/queries/useInstructor';

export default function InstructorListPage() {
  const { data: instructors = [] } =
    useInstructors();

  console.log(
    'instructors in InstructorListPage',
    instructors
  );

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <p className="section-label mb-2">
            Learn from the best
          </p>

          <h1 className="text-hero-md text-foreground">
            Top Instructors
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map(
            (inst: any, i: number) => (
              <Link
                href={`/instructors/${inst.id}`}
                key={inst.id}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                  }}
                  className="bg-white border border-border rounded-2xl p-6 text-center hover:shadow-card-hover transition-all duration-200 group cursor-pointer h-full"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                    <AppImage
                      src={
                        inst.avatar ||
                        '/placeholder.jpg'
                      }
                      alt={inst.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>

                  <h3 className="text-sm font-bold text-foreground">
                    {inst.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[36px]">
                    {inst.headline ||
                      'Professional Instructor'}
                  </p>

                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star
                      size={13}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="text-sm font-bold text-foreground">
                      {inst.averageRating || 0}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      (
                      {Math.floor(
                        (inst.totalReviews ||
                          0) / 1000
                      )}
                      K)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-sm font-bold text-foreground font-tabular">
                        {Math.floor(
                          (inst.totalStudents ||
                            0) / 1000
                        )}
                        K
                      </p>

                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Users size={10} />
                        Students
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-bold text-foreground">
                        {inst.totalCourses || 0}
                      </p>

                      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <BookOpen size={10} />
                        Courses
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          )}
        </div>
      </div>
    </main>
  );
}