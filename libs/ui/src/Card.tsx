import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

/** Surface container used across both consoles (auth, dashboards, panels). */
export function Card({ title, children, className, ...rest }: CardProps) {
  return (
    <div className={['gx-card', className].filter(Boolean).join(' ')} {...rest}>
      {title && <h2 className="gx-card__title">{title}</h2>}
      {children}
    </div>
  );
}
