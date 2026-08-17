import { redirect } from '@tanstack/react-router';
import { store } from '../../store/store';

/**
 * RBAC route guard for role-protected routes: attach as a route's `beforeLoad`. Redirects
 * to login when no session is present. The Core API remains the ultimate source of truth
 * for authorization — this only prevents rendering a protected route client-side.
 */
export function requireAuth() {
  if (!store.getState().auth.user) {
    throw redirect({ to: '/' });
  }
}
