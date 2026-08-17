import { useSearch } from '@tanstack/react-router';
import { AuthShell } from '../components/AuthShell';
import { PasswordField } from '../components/PasswordField';
import { ErrorBanner } from '../components/ErrorBanner';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';

export function ResetPasswordPage() {
  const { token } = useSearch({ from: '/reset-password' });
  const { form, onSubmit, isSubmitting, error, done } = useResetPasswordForm(token);
  const {
    register,
    formState: { errors },
  } = form;

  if (done) {
    return (
      <AuthShell>
        <div style={{ textAlign: 'center' }}>
          <h1>Password Updated</h1>
          <p className="sub">Your password has been changed. You can now sign in with your new password.</p>
          <a className="btn-primary" href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Back to Login
          </a>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1 style={{ textAlign: 'center' }}>Set a New Password</h1>
      <p className="sub">Choose a new password for your account.</p>
      <ErrorBanner message={error} />
      <form onSubmit={onSubmit} noValidate>
        <PasswordField
          id="newPassword"
          label="New Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          registration={register('newPassword')}
          error={errors.newPassword?.message}
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <div className="auth-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Reset Password'}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
