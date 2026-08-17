import { axiosClient } from '../../../lib/axios/axiosClient';
import type { LoginResponse } from '../../../types/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

/** All Core auth HTTP calls, isolated from hooks/components (Service/Data Layer). */
export const authService = {
  login: (payload: LoginPayload) =>
    axiosClient.post<LoginResponse>('/core/auth/login', payload).then((res) => res.data),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    axiosClient.post<void>('/core/auth/forgot-password', payload).then((res) => res.data),

  resetPassword: (payload: ResetPasswordPayload) =>
    axiosClient.post<void>('/core/auth/reset-password', payload).then((res) => res.data),

  logout: () => axiosClient.post<void>('/core/auth/logout', {}).then((res) => res.data),
};
