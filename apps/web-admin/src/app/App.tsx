import { RouterProvider } from '@tanstack/react-router';
import { AppProviders } from './providers/AppProviders';
import { router } from './router/router';

/**
 * Admin console (HQ / Distributor / Installer) root. Routing, global client state (Redux)
 * and server-state caching (TanStack Query) are composed here; feature pages are
 * lazy-loaded per route for code splitting.
 * (Integrates GEN-155 login + GEN-156 forgot-password + GEN-163 reset.)
 */
export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
