'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Star, Clock, Users, BarChart3 } from 'lucide-react';

import { courseSlug } from '@/data/mockData';
import { Course } from '@/types/course.types';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'horizontal';
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-bold text-amber-600">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={`star-${star}`}
            size={11}
            className={star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count.toLocaleString()})</span>
      )}
    </div>
  );
}

export { StarRating };

export default function CourseCard({ course, variant = 'default' }: CourseCardProps) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  if (variant === 'horizontal') {
    return (
      <Link href={`/courses/${courseSlug(course.title)}`} className="block group">
        <div className="flex gap-4 p-3 rounded-xl border border-border bg-card hover:shadow-card transition-all duration-200 hover:border-primary/30">
          <div className="w-28 h-20 rounded-lg overflow-hidden shrink-0">
            <AppImage
              src={course.image}
              alt={`${course.title} course thumbnail`}
              width={112}
              height={80}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {course.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">{course.instructor.name}</p>
            <StarRating rating={course.rating} count={course.reviewCount} />
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-foreground">₹{course.price}</span>
              <span className="text-xs price-strike">₹{course.originalPrice}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${courseSlug(course.title)}`} className="block group">
      <div className="course-card h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <AppImage
            src={course.image}
            alt={`${course.title} course thumbnail showing ${course.category} content`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.badge && (
            <div className="absolute top-2 left-2">
              <span className={course.badge === 'Bestseller' ? 'badge-bestseller' : course.badge === 'New' ? 'badge-new' : 'badge-hot'}>
                {course.badge}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{course.subtitle}</p>
          <p className="text-xs text-muted-foreground mt-1">{course.instructor.name}</p>

          <div className="mt-2">
            <StarRating rating={course.rating} count={course.reviewCount} />
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {course.totalHours}h
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 size={11} />
              {course.level}
            </span>
            <span className="flex items-center gap-1">
              <Users size={11} />
              {(course.studentCount / 1000).toFixed(0)}K
            </span>
          </div>

          <div className="mt-auto pt-3 flex items-center gap-2">
            <span className="text-base font-bold text-foreground font-tabular">₹{course.price}</span>
            <span className="text-sm price-strike font-tabular">₹{course.originalPrice}</span>
            <span className="ml-auto text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded">
              -{discount}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}