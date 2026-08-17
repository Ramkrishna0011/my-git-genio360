import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface PasswordFieldProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}

export function PasswordField({
  id,
  label,
  registration,
  error,
  autoComplete = 'current-password',
  placeholder = 'Enter Password',
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="field">
        <span className="field-icon">
          <Lock size={18} strokeWidth={1.8} />
        </span>
        <input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...registration}
        />
        <button
          type="button"
          className="eye-btn"
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow((s) => !s)}
        >
          {show ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </>
  );
}
