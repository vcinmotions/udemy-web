'use client';

import React from 'react';
import { Star } from 'lucide-react';
import type { Course } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyCourseBarProps {
  course: Course;
  visible: boolean;
}

export default function StickyCourseBar({ course, visible }: StickyCourseBarProps) {
  console.log("Course in StickyCourseBar", course);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-16 left-0 right-0 z-40 bg-foreground text-white sticky-topbar-shadow"
        >
          <div className="stickeybar max-w-screen-2xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
            <h3 className="text-sm font-semibold text-white line-clamp-1 flex-1 hidden md:block">
              {course.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-amber-400 font-bold text-sm">{course.rating}</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={`sticky-star-${s}`}
                    size={12}
                    className={s <= Math.round(course.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-500'}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-xs hidden sm:block">
                ({course.reviewCount.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right hidden sm:block">
                <span className="text-lg font-bold text-white">₹{course.price}</span>
                <span className="text-sm price-strike ml-2 text-gray-400">₹{course.originalPrice}</span>
              </div>
              <button className="btn-primary py-2 px-5 text-sm">
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}