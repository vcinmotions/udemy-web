import { api } from './axios';

export const publicApi = {
  // ALL INSTRUCTORS
  getAllInstructor: async () => {
    const res = await api.get('/public/instructors');

    return res.data.data.instructors;
  },

  // SINGLE INSTRUCTOR
  getInstructorById: async (id: string) => {
    const res = await api.get(
      `/public/instructor/${id}`
    );

    return res.data.data.instructor;
  },
};