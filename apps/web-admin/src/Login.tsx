import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

export interface LoginProps {
  onForgot?: () => void;
}

interface Session {
  email: string;
  role: string;
  level: string;
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
const LockIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>);
const EyeIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>);
const EyeOffIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><path d="M3 3l18 18" /><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" /><path d="M9.4 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 2.6-.4" /></svg>);

const Wordmark = () => (
  <div className="brand">
    <span>Genio</span><span className="brand-360">360</span>
    <span className="brand-divider" /><span className="brand-suite">SUITE</span>
  </div>
);

/**
 * Admin console login (HQ / Distributor / Installer). Matched to the Figma auth design
 * (cream page, serif headings) and wired to the Core auth API through the Vite /api proxy:
 * POST /api/core/auth/login on sign-in, POST /api/core/auth/logout on sign-out.
 */
export function Login({ onForgot }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Enter your email and password.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/core/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Invalid email or password.' : 'Sign-in failed. Please try again.');
        return;
      }
      const data = await res.json();
      const store = remember ? localStorage : sessionStorage;
      store.setItem('genio.token', data.accessToken);
      store.setItem('genio.user', JSON.stringify(data.user));
      setSession({ email: data.user.email, role: data.user.role, level: data.user.level });
    } catch {
      setError('Cannot reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const signOut = async () => {
    const token = localStorage.getItem('genio.token') ?? sessionStorage.getItem('genio.token');
    try {
      // Revoke the session server-side (closes the refresh cookie), not just client storage.
      await fetch('/api/core/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: '{}',
      });
    } catch {
      /* even if the network call fails, still clear local state below */
    } finally {
      localStorage.removeItem('genio.token');
      localStorage.removeItem('genio.user');
      sessionStorage.removeItem('genio.token');
      sessionStorage.removeItem('genio.user');
      setSession(null);
      setPassword('');
    }
  };

  const shell = (children: ReactNode) => (
    <main className="auth-page">
      <div className="auth-inner">
        <Wordmark />
        <div className="auth-card">{children}</div>
      </div>
    </main>
  );

  if (session) {
    return shell(
      <div style={{ textAlign: 'center' }}>
        <h1>Signed in</h1>
        <p className="sub">Signed in as <strong>{session.email}</strong> — role <strong>{session.role}</strong> ({session.level}).</p>
        <button type="button" className="btn-primary" onClick={signOut}>Sign out</button>
      </div>,
    );
  }

  return shell(
    <>
      <h1>Welcome Back</h1>
      <p className="sub">Manage your community with ease and efficiency.</p>
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={onSubmit} noValidate>
        <label className="field-label" htmlFor="email">Email Address</label>
        <div className="field">
          <span className="field-icon"><MailIcon /></span>
          <input id="email" name="email" type="email" autoComplete="username" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <label className="field-label" htmlFor="password">Password</label>
        <div className="field">
          <span className="field-icon"><LockIcon /></span>
          <input id="password" name="password" type={showPw ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" className="eye-btn" aria-label={showPw ? 'Hide password' : 'Show password'} onClick={() => setShowPw((s) => !s)}>{showPw ? <EyeOffIcon /> : <EyeIcon />}</button>
        </div>
        <div className="auth-row">
          <label className="remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember Me</label>
          <a className="forgot" href="#forgot" onClick={(e) => { e.preventDefault(); onForgot?.(); }}>Forgot Password?</a>
        </div>
        <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Signing in…' : 'Log In'}</button>
      </form>
    </>,
  );
}
