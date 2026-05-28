import { api } from "./axios";

export const categoryApi = {
  // COURSES
  getAllCategory: async () => {
    const res = await api.get('/categories');
    return res.data.data.categories;
  },

  createCategory: async (payload: any) => {
    const res = await api.post('/categories', payload);
    return res.data.data.category;
  },

  createSubCategory: async (payload: any) => {
    const res = await api.post('/categories/subcategory', payload);
    return res.data.data.subcategory;
  },

  deleteCategory: async (id: string) => {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  },
};