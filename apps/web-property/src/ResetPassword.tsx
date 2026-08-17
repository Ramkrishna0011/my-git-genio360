import { useState } from 'react';
import type { FormEvent } from 'react';

export interface ResetPasswordProps {
  onBack?: () => void;
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const LockIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>);
const EyeIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>);
const EyeOffIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...stroke}><path d="M3 3l18 18" /><path d="M10.6 10.6a3 3 0 0 0 4.2 4.2" /><path d="M9.4 5.2A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.2 6.2A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 2.6-.4" /></svg>);

const Wordmark = () => (
  <div className="brand">
    <span>Genio</span><span className="brand-360">360</span>
    <span className="brand-divider" /><span className="brand-suite">SUITE</span>
  </div>
);

/** Read the one-time reset token from the emailed link (?token=…). */
function tokenFromUrl(): string {
  return new URLSearchParams(window.location.search).get('token') ?? '';
}

/**
 * Reset-password (set a new password from an emailed link). Matched to the Figma auth design
 * and wired to the Core auth API (POST /api/core/auth/reset-password) via the Vite /api proxy.
 */
export function ResetPassword({ onBack }: ResetPasswordProps) {
  const [token] = useState(tokenFromUrl);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token) { setError('This reset link is invalid or has expired.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/core/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      if (res.ok) { setDone(true); return; }
      setError(res.status === 400 ? 'This reset link is invalid or has expired.' : 'Could not reset your password. Please try again.');
    } catch {
      setError('Cannot reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (id: string, label: string, value: string, set: (v: string) => void, withToggle = false) => (
    <>
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="field">
        <span className="field-icon"><LockIcon /></span>
        <input id={id} name={id} type={showPw ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 8 characters" value={value} onChange={(e) => set(e.target.value)} />
        {withToggle && <button type="button" className="eye-btn" aria-label={showPw ? 'Hide password' : 'Show password'} onClick={() => setShowPw((s) => !s)}>{showPw ? <EyeOffIcon /> : <EyeIcon />}</button>}
      </div>
    </>
  );

  return (
    <main className="auth-page">
      <div className="auth-inner">
        <Wordmark />
        <div className="auth-card">
          {done ? (
            <div style={{ textAlign: 'center' }}>
              <h1>Password Updated</h1>
              <p className="sub">Your password has been changed. You can now sign in with your new password.</p>
              <button type="button" className="btn-primary" onClick={onBack}>Back to Login</button>
            </div>
          ) : (
            <>
              <h1 style={{ textAlign: 'center' }}>Set a New Password</h1>
              <p className="sub">Choose a new password for your account.</p>
              {error && <div className="error-banner">{error}</div>}
              <form onSubmit={onSubmit} noValidate>
                {field('newPassword', 'New Password', password, setPassword, true)}
                {field('confirmPassword', 'Confirm Password', confirm, setConfirm)}
                <div className="auth-actions">
                  <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Saving…' : 'Reset Password'}</button>
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
