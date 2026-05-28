'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { Course } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function LearningSection({ course }: { course: Course }) {
  return (
    <div className="border border-border rounded-2xl p-6 bg-muted/30">
      <h2 className="text-xl font-bold text-foreground mb-5">What You Will Learn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {course.whatYouWillLearn.map((item, i) => (
          <motion.div
            key={`learn-${i}`}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <CheckCircle size={17} className="text-success shrink-0 mt-0.5" />
            <span className="text-sm text-foreground leading-snug">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}