import { api } from "./axios";

export const getAllCourses = async (params?: Record<string, any>) => {
  const response = await api.get('/courses', {
    params,
  });

  return response.data;
};

export const getCourseBySlug = async (slug: string) => {
  const { data } = await api.get(`/courses/slug/${slug}`);

  console.log("response", data);

  return data.data.course;
};

export const getCourseById = async (courseId: string) => {
  const { data } = await api.get(`/courses/${courseId}`);

  return data.data.course;
};

export const getMyCourses = async () => {
  const { data } = await api.get('/courses/instructor/my-courses');

  return data.data;
};

export const createCourse = async (payload: any) => {
  const { data } = await api.post('/courses', payload);

  return data.data.course;
};

export const updateCourse = async (
  courseId: string,
  payload: any
) => {
  const { data } = await api.put(
    `/courses/${courseId}`,
    payload
  );

  return data.data.course;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await api.delete(
    `/courses/${courseId}`
  );

  return data;
};

export const togglePublishCourse = async (
  courseId: string
) => {
  const { data } = await api.patch(
    `/courses/${courseId}/publish`
  );

  return data.data.course;
};