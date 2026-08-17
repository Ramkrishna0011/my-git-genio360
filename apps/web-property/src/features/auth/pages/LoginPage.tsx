import { Link } from '@tanstack/react-router';
import { AuthShell } from '../components/AuthShell';
import { EmailField } from '../components/EmailField';
import { PasswordField } from '../components/PasswordField';
import { ErrorBanner } from '../components/ErrorBanner';
import { useLoginForm } from '../hooks/useLoginForm';
import { authService } from '../services/auth.service';
import { tokenStore } from '../../../lib/auth/tokenStore';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { clearSession } from '../store/auth.slice';

export function LoginPage() {
  const session = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { form, onSubmit, isSubmitting, error } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = form;

  const signOut = async () => {
    try {
      await authService.logout();
    } finally {
      tokenStore.clear();
      dispatch(clearSession());
    }
  };

  if (session) {
    return (
      <AuthShell>
        <div style={{ textAlign: 'center' }}>
          <h1>Signed in</h1>
          <p className="sub">
            Signed in as <strong>{session.email}</strong> — role <strong>{session.role}</strong> ({session.level}).
          </p>
          <button type="button" className="btn-primary" onClick={signOut}>
            Sign out
          </button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <h1>Welcome Back</h1>
      <p className="sub">Manage your community with ease and efficiency.</p>
      <ErrorBanner message={error} />
      <form onSubmit={onSubmit} noValidate>
        <EmailField id="email" label="Email Address" registration={register('email')} error={errors.email?.message} />
        <PasswordField
          id="password"
          label="Password"
          registration={register('password')}
          error={errors.password?.message}
        />
        <div className="auth-row">
          <label className="remember">
            <input type="checkbox" {...register('remember')} /> Remember Me
          </label>
          <Link className="forgot" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Log In'}
        </button>
      </form>
    </AuthShell>
  );
}
