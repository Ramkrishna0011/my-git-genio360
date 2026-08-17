import axios from 'axios';
import { tokenStore } from '../auth/tokenStore';

/**
 * Single Axios instance for all Core API calls (proxied through Vite's /api in dev).
 * Isolates HTTP concerns — auth header injection, 401 handling — from feature services
 * and UI components (Service/Data Layer).
 */
export const axiosClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // sends the HttpOnly refresh-token cookie
});

axiosClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
    }
    return Promise.reject(error);
  },
);
