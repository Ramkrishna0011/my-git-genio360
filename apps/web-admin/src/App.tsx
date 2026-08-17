import { useState } from 'react';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

/**
 * Admin console (HQ / Distributor / Installer). Login is the default view; "Forgot password?"
 * swaps to the reset-request screen. A reset link (…?token=…) opens the set-new-password screen.
 * (Integrates GEN-155 login + GEN-156 forgot-password + GEN-163 reset.)
 */
type View = 'login' | 'forgot' | 'reset';

function initialView(): View {
  const hasToken = new URLSearchParams(window.location.search).has('token');
  return hasToken || window.location.hash.startsWith('#reset') ? 'reset' : 'login';
}

export function App() {
  const [view, setView] = useState<View>(initialView);

  if (view === 'reset') return <ResetPassword onBack={() => setView('login')} />;
  if (view === 'forgot') return <ForgotPassword onBack={() => setView('login')} />;
  return <Login onForgot={() => setView('forgot')} />;
}
