import { useState } from 'react';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

/**
 * Property Manager console. Login is the default view; "Forgot password?" swaps to the
 * reset-request screen. A reset link (…?token=…) opens the set-new-password screen.
 * (Integrates GEN-157 login + GEN-158 forgot-password + GEN-163 reset.)
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
