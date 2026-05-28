import { api } from './axios';

export const studentApi = {
  enrollCourse: async (id: string) => {
    const res = await api.post(
      `/enrollments/enrollmentsByPass/${id}`
    );

    return res.data.data.enrollment;
  },

  getMyCourse: async () => {
    const res = await api.get(
      '/enrollments/my'
    );

    return res.data.data.enrollments;
  },

  getLearningCourse: async (
    slug: string
    ) => {
    const res = await api.get(
        `/enrollments/learn/${slug}`
    );

    console.log(res);
    return res.data.data.enrollment;
    },

  updateProgress: async (courseId: string, progress: number) => {
    const res = await api.patch(
      `/enrollments/${courseId}/progress`,
      { progress }
    );

    return res.data.data.enrollment;
  },
};
