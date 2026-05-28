'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Star, Users, BookOpen, Award, TimerIcon, LinkIcon} from 'lucide-react';
import type { Instructor } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function InstructorCard({ instructor }: { instructor: Instructor }) {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold text-foreground mb-6">Your Instructor</h2>

      <div className="flex items-start gap-5 mb-5 flex-wrap">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/15 shrink-0">
          <AppImage
            src={instructor.avatar}
            alt={`${instructor.name} instructor profile photo`}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground hover:text-primary cursor-pointer transition-colors">
            {instructor.name}
          </h3>
          <p className="text-sm text-muted-foreground">{instructor.title}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { id: 'istat-rating', icon: Star, value: instructor.rating, label: 'Rating', color: 'text-amber-500' },
              { id: 'istat-reviews', icon: Award, value: `${(instructor.reviews / 1000).toFixed(0)}K`, label: 'Reviews', color: 'text-primary' },
              { id: 'istat-students', icon: Users, value: `${(instructor.students / 1000).toFixed(0)}K`, label: 'Students', color: 'text-success' },
              { id: 'istat-courses', icon: BookOpen, value: instructor.courses, label: 'Courses', color: 'text-secondary' },
            ].map((stat) => (
              <div key={stat.id} className="flex items-center gap-1.5">
                <stat.icon size={15} className={stat.color} />
                <span className="text-sm font-semibold text-foreground font-tabular">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative ${!bioExpanded ? 'max-h-28 overflow-hidden' : ''}`}>
        <p className="text-sm text-foreground leading-relaxed">{instructor.bio}</p>
        {!bioExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        onClick={() => setBioExpanded(!bioExpanded)}
        className="mt-2 text-primary text-sm font-semibold hover:underline"
      >
        {bioExpanded ? 'Show less' : 'Read full bio'}
      </button>

      <div className="flex items-center gap-2 mt-4">
        <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-muted-foreground">
          <TimerIcon size={14} />
        </button>
        <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-muted-foreground">
          <LinkIcon size={14} />
        </button>
      </div>
    </motion.div>
  );
}