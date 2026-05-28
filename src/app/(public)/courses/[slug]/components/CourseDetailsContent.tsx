'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

import { useCourse } from '@/queries/useCourse';

import StickyCourseBar from './StickyCourseBar';
import CourseHero from './CourseHero';
import CourseTabs from './CourseTabs';
import CourseSidebar from './CourseSidebar';
import VideoPreviewModal from './VideoPreviewModal';

export default function CourseDetailsContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [selectedLesson, setSelectedLesson] =
  useState<any>(null);

  const { data: course, isLoading, error } = useCourse(slug);

  console.log("slug in CourseDetailsContent", slug);
  console.log("Course in CourseDetailsContent", course);

  const [modalOpen, setModalOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px',
      }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, [course]);

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Something went wrong
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-10 text-center text-red-500">
        Course not found
      </div>
    );
  }

  return (
    <>
      <StickyCourseBar course={course} visible={stickyVisible} />

      <div ref={heroRef}>
        <CourseHero
          course={course}
          onPreviewClick={() => setModalOpen(true)}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <CourseTabs course={course} 
            onLessonClick={(lesson) => {
              setSelectedLesson(lesson);
              setModalOpen(true);
            }}/>
          </div>

          <div className="hidden lg:block w-80 xl:w-96 shrink-0">
            <div className="sticky top-24">
              <CourseSidebar
                course={course}
                onPreviewClick={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border p-4 shadow-sticky">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-xl font-bold text-foreground">
              ₹{course.price}
            </span>
            <span className="text-sm price-strike ml-2">
              ₹{course.originalPrice}
            </span>
          </div>

          <button className="btn-primary flex-1">
            Enroll Now — ₹{course.price}
          </button>
        </div>
      </div>

      <VideoPreviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        course={course}
        lesson={selectedLesson}
      />
    </>
  );
}