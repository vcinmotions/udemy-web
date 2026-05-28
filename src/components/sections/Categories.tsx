'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  BarChart3,
  Smartphone,
  Pen,
  Cloud,
  Shield,
  TrendingUp,
  Briefcase,
  Brain,
  Camera,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/api/category.api';
import { Category } from '@/types/category.types';
import { colors } from '@/data/color';

const iconMap: Record<string, React.ElementType> = {
  Code2, BarChart3, Smartphone, Pen, Cloud, Shield, TrendingUp, Briefcase, Brain, Camera,
};

export default function Categories() {

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategory,
  });

  const getRandomColor = (id: string) => {
    let hash = 0;

    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };


  return (
    <section className="py-16 bg-muted/40">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="mb-10 text-center">
          <p className="section-label mb-2">Explore topics</p>
          <h2 className="text-hero-md text-foreground">Browse Top Categories</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            From programming to photography — find the skills that will define your next chapter.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
          {categories.map((cat: any, i: any) => {
            const IconComponent = iconMap[cat.icon] || Code2;
            const color = getRandomColor(cat.id);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href="/category/tally"
                  className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-200 group text-center"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <IconComponent size={22} style={{ color: color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{cat.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cat.courses.length.toLocaleString()} courses
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}