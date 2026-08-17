import { Mail } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface EmailFieldProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export function EmailField({ id, label, registration, error }: EmailFieldProps) {
  return (
    <>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="field">
        <span className="field-icon">
          <Mail size={18} strokeWidth={1.8} />
        </span>
        <input
          id={id}
          type="email"
          autoComplete="username"
          placeholder="Enter Email Address"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...registration}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </>
  );
}
