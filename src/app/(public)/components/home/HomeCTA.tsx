'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeCTA() {
  return (
    <section className="py-16">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl hero-gradient p-12 lg:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-72 h-72 blob-purple pointer-events-none opacity-60" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 mb-6">
              <Zap size={14} className="text-secondary" />
              <span className="text-white/90 text-xs font-medium">Limited time: 87% off all courses</span>
            </div>
            <h2 className="text-hero-md text-white mb-4">
              Start Learning Today
            </h2>
            <p className="text-white/75 text-base mb-8">
              Courses from ₹9.99. Lifetime access. Certificate of completion included.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
                Explore All Courses
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                View Course Preview
              </Link>
            </div>
            <p className="text-white/50 text-xs mt-6">
              30-day money-back guarantee · No subscription required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}