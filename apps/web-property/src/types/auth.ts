export type PropertyManagerRole = 'PROPERTY_MANAGER';

export interface SessionUser {
  email: string;
  role: PropertyManagerRole;
  level: string;
}

export interface LoginResponse {
  accessToken: string;
  user: SessionUser;
}
