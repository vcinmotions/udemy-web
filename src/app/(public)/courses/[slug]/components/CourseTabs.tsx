'use client';

import React, { useState } from 'react';
import type { Course } from '@/data/mockData';

import LearningSection from './LearningSection';
import CurriculumAccordion from './CurriculumAccordion';
import InstructorCard from './InstructorCard';
import ReviewsSection from './ReviewsSection';

const TABS = [
  { id: 'tab-overview', label: 'Overview' },
  { id: 'tab-curriculum', label: 'Curriculum' },
  { id: 'tab-instructor', label: 'Instructor' },
  { id: 'tab-reviews', label: 'Reviews' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function CourseTabs({ course, onLessonClick, }: { course: Course, onLessonClick: (lesson: any) => void; }) {
  const [activeTab, setActiveTab] = useState<TabId>('tab-overview');

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-border mb-8 sticky top-[calc(4rem+56px)] bg-white z-30 -mx-4 px-4 lg:-mx-0 lg:px-0">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === 'tab-overview' && (
        <div className="space-y-10">
          <LearningSection course={course} />
          <RequirementsSection requirements={course.requirements} />
          <DescriptionSection description={course.description} />
        </div>
      )}

      {/* Curriculum */}
      {activeTab === 'tab-curriculum' && (
        <CurriculumAccordion course={course} onLessonClick={onLessonClick} />
      )}

      {/* Instructor */}
      {activeTab === 'tab-instructor' && (
        <InstructorCard instructor={course.instructor} />
      )}

      {/* Reviews */}
      {activeTab === 'tab-reviews' && (
        <ReviewsSection reviews={course.reviews} />
      )}
    </div>
  );
}

function DescriptionSection({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">
        Description
      </h2>

      <div
        className={`text-sm text-foreground leading-relaxed relative ${
          !expanded ? 'max-h-32 overflow-hidden' : ''
        }`}
      >
        <p>{description}</p>

        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 text-primary text-sm font-semibold hover:underline"
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
}

function RequirementsSection({
  requirements,
}: {
  requirements: string[];
}) {
  if (!requirements?.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">
        Requirements
      </h2>

      <ul className="space-y-2">
        {requirements.map((req, i) => (
          <li
            key={`req-${i}`}
            className="flex items-start gap-2.5 text-sm text-foreground"
          >
            <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 shrink-0" />
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}