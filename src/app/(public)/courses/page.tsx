import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseListingContent from './components/course-lists';
import { Suspense } from 'react';

export default function CourseListingPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <Suspense fallback={<div>Loading...</div>}>
        <CourseListingContent />
        </Suspense>
      </main>
    </div>
  );
}