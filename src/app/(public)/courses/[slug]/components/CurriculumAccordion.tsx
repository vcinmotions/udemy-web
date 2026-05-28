'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Play,
  Lock,
  FileText,
  HelpCircle,
  Eye,
} from 'lucide-react';
import type { Course, CurriculumSection, Lesson } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

function LessonRow({ lesson }: { lesson: Lesson }) {
  const typeIcon = lesson.type === 'quiz'
    ? <HelpCircle size={14} className="text-muted-foreground" />
    : lesson.type === 'resource'
    ? <FileText size={14} className="text-muted-foreground" />
    : <Play size={14} className="text-muted-foreground" />;

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors rounded-lg">
      <div className="shrink-0">{typeIcon}</div>
      <span className="text-sm text-foreground flex-1 leading-snug">{lesson.title}</span>
      <div className="flex items-center gap-2 shrink-0">
        {lesson.isPreview && (
          <span className="text-xs text-primary font-medium flex items-center gap-1 hover:underline cursor-pointer">
            <Eye size={12} />
            Preview
          </span>
        )}
        {!lesson.isPreview && lesson.type !== 'resource' && (
          <Lock size={13} className="text-muted-foreground" />
        )}
        <span className="text-xs text-muted-foreground font-tabular w-12 text-right">
          {lesson.duration}
        </span>
      </div>
    </div>
  );
}

function SectionItem({ section, defaultOpen = false }: { section: CurriculumSection; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-5 py-4 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{section.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {section.lessons.length} lessons · {section.totalDuration}
          </p>
        </div>
        <div className="shrink-0 text-muted-foreground">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-2 bg-white divide-y divide-border/50">
              {section.lessons.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function CurriculumAccordion({
  course,
}: {
  course: Course;
}) {
  const [showAll, setShowAll] = useState(false);

  const totalLessons = course.curriculum.reduce(
    (sum, s) => sum + s.lessons.length,
    0
  );

  const displayedSections = showAll
    ? course.curriculum
    : course.curriculum.slice(0, 3);

  return (
    <div>
      <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Course Content
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            {course.curriculum.length} sections · {totalLessons} lectures ·{" "}
            {course.totalHours}h total length
          </p>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-primary text-sm font-semibold hover:underline"
        >
          {showAll ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>

      <div className="space-y-3">
        {displayedSections.map((section, i) => (
          <SectionItem
            key={section.id}
            section={section}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      {!showAll && course.curriculum.length > 3 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors"
        >
          Show {course.curriculum.length - 3} more sections
        </button>
      )}
    </div>
  );
}