import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  block?: boolean;
}

/** Primary action button for the Genio360 consoles. */
export function Button({ variant = 'primary', block = false, className, type = 'button', ...rest }: ButtonProps) {
  const cls = ['gx-btn', `gx-btn--${variant}`, block ? 'gx-btn--block' : '', className]
    .filter(Boolean)
    .join(' ');
  return <button type={type} className={cls} {...rest} />;
}
