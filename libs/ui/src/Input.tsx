import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  error?: string;
}

/** Labelled text field with optional leading icon, trailing slot and error state. */
export function Input({ label, icon, trailing, error, id, name, className, ...rest }: InputProps) {
  const inputId = id ?? name;
  const controlCls = ['gx-field__control', error ? 'is-error' : ''].filter(Boolean).join(' ');
  return (
    <label className="gx-field" htmlFor={inputId}>
      {label && <span className="gx-field__label">{label}</span>}
      <span className={controlCls}>
        {icon && <span className="gx-field__icon">{icon}</span>}
        <input id={inputId} name={name} className={['gx-input', className].filter(Boolean).join(' ')} {...rest} />
        {trailing && <span className="gx-field__trailing">{trailing}</span>}
      </span>
      {error && <span className="gx-field__error">{error}</span>}
    </label>
  );
}
