import { api } from "./axios";

export const instructorApi = {
  // COURSES
  getMyCourses: async () => {
    const res = await api.get('/courses/instructor/my-courses');
    return res.data.data.courses;
  },

  getCourseById: async (id: string) => {
    const res = await api.get(`/courses/instructor/course/${id}`);
    console.log(res);
    return res.data.data.course;
  },

  createCourse: async (payload: any) => {
    const res = await api.post('/courses/', payload);
    return res.data.data.course;
  },

  updateCourse: async (
    id: string,
    payload: any
  ) => {
    const res = await api.put(
      `/courses/${id}`,
      payload
    );

    return res.data.data.course;
  },

  deleteCourse: async (id: string) => {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  },

  togglePublish: async (id: string) => {
    const res = await api.patch(
      `/courses/${id}/publish`
    );

    return res.data.data.course;
  },

    // instructor.api.ts

    getCategories: async () => {
    const res = await api.get('/categories');
    return res.data.data.categories;
    },

    getSubcategories: async (categoryId: string) => {
    const res = await api.get(
        `/categories/${categoryId}/subcategories`
    );

    return res.data.data.subcategories;
    },

   // ─────────────────────────────────────────
  // CURRICULUM
  // ─────────────────────────────────────────

  createSection: async (
    courseId: string,
    payload: any
  ) => {
    const res = await api.post(
      `/courses/${courseId}/sections`,
      payload
    );

    return res.data.data.section;
  },

  updateSection: async (
    courseId: string,
    sectionId: string,
    payload: any
  ) => {
    const res = await api.put(
      `/courses/${courseId}/sections/${sectionId}`,
      payload
    );

    return res.data.data.section;
  },

  deleteSection: async (
    courseId: string,
    sectionId: string
  ) => {
    const res = await api.delete(
      `/courses/${courseId}/sections/${sectionId}`
    );

    return res.data;
  },

  createLesson: async (
    courseId: string,
    sectionId: string,
    payload: any
  ) => {
    const res = await api.post(
      `/courses/${courseId}/sections/${sectionId}/lessons`,
      payload
    );

    return res.data.data.lesson;
  },

  updateLesson: async (
    courseId: string,
    sectionId: string,
    lessonId: string,
    payload: any
  ) => {
    const res = await api.put(
      `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
      payload
    );

    return res.data.data.lesson;
  },

  deleteLesson: async (
    courseId: string,
    sectionId: string,
    lessonId: string
  ) => {
    const res = await api.delete(
      `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`
    );

    return res.data;
  },


  // PROFILE
  getProfile: async () => {
    const res = await api.get('/auth/me');
    return res.data.data.user;
  },

  updateProfile: async (payload: any) => {
    const res = await api.put(
      '/users/profile',
      payload
    );

    return res.data.data.user;
  },

  // ANALYTICS
  getAnalytics: async () => {
    const res = await api.get(
      '/instructor/analytics'
    );

    return res.data.data;
  },
};