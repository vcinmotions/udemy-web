import { api } from './axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const loginUser = async (payload: any) => {
  const { data } = await api.post('/auth/login', payload);

  return data;
};

export const signupUser = async (payload: any) => {
  const { data } = await api.post('/auth/signup', payload);

  return data;
};

export const forgotPassword = async (payload: any) => {
  const { data } = await api.post('/auth/forgot-password', payload);

  return data;
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'SUPERADMIN';
  avatar?: string;
  headline?: string;
  bio?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ─── Auth API Calls ───────────────────────────────────────────────────────────
export const authApi = {
  registerStudent: async (data: { name: string; email: string; password: string }) => {
    const res = await api.post<{ data: AuthResponse }>('/auth/register/student', data);
    return res.data.data;
  },

  registerInstructor: async (data: { name: string; email: string; password: string; headline?: string; bio?: string }) => {
    const res = await api.post<{ data: AuthResponse }>('/auth/register/instructor', data);
    return res.data.data;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await api.post<{ data: AuthResponse }>('/auth/login', data);
    return res.data.data;
  },

  logout: async (refreshToken: string) => {
    await api.post('/auth/logout', { refreshToken });
  },

  getMe: async () => {
    const res = await api.get<{ data: { user: User } }>('/auth/me');
    return res.data.data.user;
  },
};
