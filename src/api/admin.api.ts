import { api } from "./axios";

export const adminApi = {
  // COURSES
  getPendingCourses: async () => {
    const res = await api.get('/admin/courses/pending');
    console.log(res);
    return res.data.data.courses;
  },

  getOrders: async () => {
    const res = await api.get('/payments/admin/orders');
    console.log(res);
    return res.data.data;
  },

  approveCourse: async (id: string) => {
    const res = await api.patch(`/admin/courses/approve/${id}`);
    console.log("approve", res);
    return res.data.data.course;
  },

  rejectCourse: async (id: string) => {
    const res = await api.patch(`/admin/courses/reject/${id}`);
    return res.data.data.course;
  },
};