// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { getCourseById } from '@/api/course.api';

// export const useCourse = (courseId: string) => {
//   return useQuery({
//     queryKey: ['course', courseId],

//     queryFn: () => getCourseById(courseId),

//     enabled: !!courseId,
//   });
// };

'use client';

import { useQuery } from '@tanstack/react-query';
import { getCourseBySlug } from '@/api/course.api';

// export const useCourse = (slug: string) => {
//   return useQuery({
//     queryKey: ['course', slug],

//     queryFn: async () => {
//       const data = await getCourseBySlug(slug);
//       return data.course;
//     },

//     enabled: !!slug,
//   });
// };

export const useCourse = (slug: string) => {
  return useQuery({
    queryKey: ['course', slug],

    queryFn: async () => {
      return await getCourseBySlug(slug);
    },

    enabled: !!slug,
  });
};