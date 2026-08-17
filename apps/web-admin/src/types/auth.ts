export type AdminRole = 'HQ' | 'DISTRIBUTOR' | 'INSTALLER';

export interface SessionUser {
  email: string;
  role: AdminRole;
  level: string;
}

export interface LoginResponse {
  accessToken: string;
  user: SessionUser;
}
