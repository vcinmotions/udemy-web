'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials?.length) % testimonials?.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials?.length);

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Real outcomes</p>
          <h2 className="text-hero-md text-foreground">Students Who Transformed Their Careers</h2>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials?.map((t: any, i: any) => (
            <motion.div
              key={t?.id}
              className="bg-white rounded-2xl border border-border p-7 shadow-card hover:shadow-card-hover transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Quote size={28} className="text-primary/30 mb-4" />
              <p className="text-sm text-foreground leading-relaxed mb-6">{t?.content}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <AppImage
                    src={t?.avatar}
                    alt={`${t?.name} profile photo`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t?.role} at {t?.company}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5]?.map((s) => (
                    <Star key={`tstar-${t?.id}-${s}`} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`testimonial-slide-${current}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-border p-6 shadow-card"
            >
              <Quote size={24} className="text-primary/30 mb-3" />
              <p className="text-sm text-foreground leading-relaxed mb-5">
                {testimonials?.[current]?.content}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <AppImage
                    src={testimonials?.[current]?.avatar}
                    alt={`${testimonials?.[current]?.name} profile photo`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonials?.[current]?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials?.[current]?.role} at {testimonials?.[current]?.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-9 h-9 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials?.map((_: any, i: any) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-5' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}