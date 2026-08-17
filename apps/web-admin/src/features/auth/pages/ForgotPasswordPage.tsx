import { Link } from '@tanstack/react-router';
import { AuthShell } from '../components/AuthShell';
import { EmailField } from '../components/EmailField';
import { ErrorBanner } from '../components/ErrorBanner';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';

export function ForgotPasswordPage() {
  const { form, onSubmit, isSubmitting, error, sent, email } = useForgotPasswordForm();
  const {
    register,
    formState: { errors },
  } = form;

  if (sent) {
    return (
      <AuthShell>
        <div style={{ textAlign: 'center' }}>
          <h1>Check Your Email</h1>
          <p className="sub">
            If an account exists for <strong>{email}</strong>, we&rsquo;ve sent a link to reset your password.
          </p>
          <div className="notice-ok">Didn&rsquo;t get it? Check your spam folder, or try again in a few minutes.</div>
          <p className="auth-footer">
            Already know your password?{' '}
            <Link className="link-gold" to="/">
              Login
            </Link>
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 style={{ textAlign: 'center' }}>Forgot Your Password?</h1>
      <p className="sub">Enter your registered email address and we&rsquo;ll send you a link to reset your password.</p>
      <ErrorBanner message={error} />
      <form onSubmit={onSubmit} noValidate>
        <EmailField id="email" label="Email Address" registration={register('email')} error={errors.email?.message} />
        <div className="auth-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send Reset Link'}
          </button>
        </div>
      </form>
      <p className="auth-footer">
        Already know your password?{' '}
        <Link className="link-gold" to="/">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
