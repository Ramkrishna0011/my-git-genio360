import { useEffect, useRef } from 'react';

/**
 * Server/API-level error banner. Moves focus to itself when a message appears so
 * keyboard and screen-reader users are told about the failure without hunting for it
 * (accessibility rule: focus management for forms).
 */
export function ErrorBanner({ message }: { message: string | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) ref.current?.focus();
  }, [message]);

  if (!message) return null;

  return (
    <div ref={ref} className="error-banner" role="alert" tabIndex={-1}>
      {message}
    </div>
  );
}
