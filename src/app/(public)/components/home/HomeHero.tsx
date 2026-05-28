'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Play, Star, Users, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const heroStats = [
  { id: 'stat-courses', value: '100K+', label: 'Courses', icon: BookOpen },
  { id: 'stat-students', value: '58M+', label: 'Students', icon: Users },
  { id: 'stat-instructors', value: '74K+', label: 'Instructors', icon: Star },
  { id: 'stat-certs', value: '12M+', label: 'Certificates', icon: Award },
];

const trendingSearches = [
  'React', 'Python', 'AWS', 'Machine Learning', 'Figma', 'Node.js',
];

export default function HomeHero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section key="home-hero" className="hero-gradient relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 blob-purple pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 blob-purple pointer-events-none opacity-50" />
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-20 lg:py-10 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
              <span className="text-white/90 text-xs font-medium">
                New courses added every week
              </span>
            </div>

            <h1 className="text-hero-xl text-white mb-5">
              Learn Without Limits.
              <br />
              <span className="text-secondary">Build What Matters.</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
              Join 58 million learners worldwide. Get unlimited access to 100,000+ courses taught by
              real-world experts in tech, design, business, and more.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-card font-medium"
                />
              </div>
              <Link
                href="/courses"
                className="btn-primary px-8 py-4 rounded-xl whitespace-nowrap"
              >
                Search
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-white/60 text-xs">Trending:</span>
              {trendingSearches?.map((term) => (
                <Link
                  key={`trending-${term}`}
                  href="/courses"
                  className="text-xs text-white/80 hover:text-white border border-white/20 hover:border-white/50 rounded-full px-3 py-1 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <Link href="/courses" className="btn-primary">
              Browse Courses
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Play size={16} className="fill-white" />
              Watch Preview
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {heroStats?.map((stat) => (
              <div
                key={stat?.id}
                className="bg-white/8 border border-white/15 rounded-xl p-4 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-extrabold text-white font-tabular">{stat?.value}</p>
                <p className="text-xs text-white/65 mt-1">{stat?.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}