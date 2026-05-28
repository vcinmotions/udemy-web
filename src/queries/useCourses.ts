'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllCourses } from '@/api/course.api';

export interface CoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  badge?: string;
  free?: boolean;
}

export const useCourses = (params?: CoursesParams) => {
  return useQuery({
    queryKey: ['courses', params],

    queryFn: () => getAllCourses(params),
  });
};