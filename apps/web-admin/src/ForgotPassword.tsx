import { useState } from 'react';
import type { FormEvent } from 'react';

export interface ForgotPasswordProps {
  onBack?: () => void;
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const MailIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);

const Wordmark = () => (
  <div className="brand">
    <span>Genio</span><span className="brand-360">360</span>
    <span className="brand-divider" /><span className="brand-suite">SUITE</span>
  </div>
);

/**
 * Forgot-password (request a reset link). Matched to the Figma design and wired to the Core
 * auth API (POST /api/core/auth/forgot-password) via the Vite /api proxy. No account
 * enumeration — the backend returns the same generic response either way.
 */
export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Enter your email address.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/core/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.status === 400) {
        setError('Enter a valid email address.');
        return;
      }
      setSent(true);
    } catch {
      setError('Cannot reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-inner">
        <Wordmark />
        <div className="auth-card">
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <h1>Check Your Email</h1>
              <p className="sub">If an account exists for <strong>{email}</strong>, we&rsquo;ve sent a link to reset your password.</p>
              <div className="notice-ok">Didn&rsquo;t get it? Check your spam folder, or try again in a few minutes.</div>
              <p className="auth-footer">Already know your password? <a className="link-gold" href="#login" onClick={(e) => { e.preventDefault(); onBack?.(); }}>Login</a></p>
            </div>
          ) : (
            <>
              <h1 style={{ textAlign: 'center' }}>Forgot Your Password?</h1>
              <p className="sub">Enter your registered email address and we&rsquo;ll send you a link to reset your password.</p>
              {error && <div className="error-banner">{error}</div>}
              <form onSubmit={onSubmit} noValidate>
                <label className="field-label" htmlFor="email">Email Address</label>
                <div className="field">
                  <span className="field-icon"><MailIcon /></span>
                  <input id="email" name="email" type="email" autoComplete="username" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="auth-actions">
                  <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Sending…' : 'Send Reset Link'}</button>
                </div>
              </form>
              <p className="auth-footer">Already know your password? <a className="link-gold" href="#login" onClick={(e) => { e.preventDefault(); onBack?.(); }}>Login</a></p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
