import { lazy, Suspense } from 'react';
import { createRootRoute, createRoute, Outlet, redirect } from '@tanstack/react-router';

// Route-level code splitting: each auth page ships in its own chunk, loaded on navigation.
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() =>
  import('../../features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
);
const ResetPasswordPage = lazy(() =>
  import('../../features/auth/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })),
);

function RouteFallback() {
  return (
    <div role="status" aria-live="polite" className="route-loading">
      Loading…
    </div>
  );
}

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

interface LoginSearch {
  token?: string;
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  // A reset-password email link lands on the base URL with ?token=… — forward it to the
  // dedicated reset screen instead of rendering the login form.
  beforeLoad: ({ search }) => {
    if (search.token) {
      throw redirect({ to: '/reset-password', search: { token: search.token } });
    }
  },
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <LoginPage />
    </Suspense>
  ),
});

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <ForgotPasswordPage />
    </Suspense>
  ),
});

interface ResetPasswordSearch {
  token?: string;
}

export const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => ({
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  component: () => (
    <Suspense fallback={<RouteFallback />}>
      <ResetPasswordPage />
    </Suspense>
  ),
});

export const routeTree = rootRoute.addChildren([loginRoute, forgotPasswordRoute, resetPasswordRoute]);
