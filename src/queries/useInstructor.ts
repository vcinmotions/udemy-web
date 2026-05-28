import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/public.api';

export const useInstructors = () => {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: publicApi.getAllInstructor,
  });
};

export const useInstructor = (id: string) => {
  return useQuery({
    queryKey: ['instructor', id],
    queryFn: () =>
      publicApi.getInstructorById(id),
    enabled: !!id,
  });
};