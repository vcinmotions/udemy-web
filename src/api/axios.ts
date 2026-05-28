import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry
    ) {
      original._retry = true;

      try {
        const refreshToken =
          localStorage.getItem('refreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // use plain axios here
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            refreshToken,
          }
        );

        const newAccessToken =
          response.data.data.accessToken;

        const newRefreshToken =
          response.data.data.refreshToken;

        // save new tokens
        localStorage.setItem(
          'accessToken',
          newAccessToken
        );

        localStorage.setItem(
          'refreshToken',
          newRefreshToken
        );

        // update request token
        original.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // retry failed request
        return api(original);
      } catch (err) {
        // clear auth
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('auth-storage');

        // just reject
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);