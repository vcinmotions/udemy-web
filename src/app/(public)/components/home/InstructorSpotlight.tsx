'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Users, BookOpen, ArrowRight } from 'lucide-react';
import { instructors } from '@/data/mockData';
import { motion } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';

export default function InstructorSpotlight() {
  return (
    <section className="py-16">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label mb-2">Learn from the best</p>
            <h2 className="text-hero-md text-foreground">Top Instructors</h2>
          </div>
          <Link href="/courses" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
            View all instructors <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors?.map((inst, i) => (
            <motion.div
              key={inst?.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-border rounded-2xl p-6 text-center hover:shadow-card-hover transition-all duration-200 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                <AppImage
                  src={inst?.avatar}
                  alt={`${inst?.name} instructor profile photo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-sm font-bold text-foreground">{inst?.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{inst?.title}</p>

              <div className="flex items-center justify-center gap-1 mt-3">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-foreground">{inst?.rating}</span>
                <span className="text-xs text-muted-foreground">({(inst?.reviews / 1000)?.toFixed(0)}K)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground font-tabular">
                    {(inst?.students / 1000)?.toFixed(0)}K
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Users size={10} /> Students
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{inst?.courses}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <BookOpen size={10} /> Courses
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}