import type { ReactNode } from 'react';

function Wordmark() {
  return (
    <div className="brand">
      <span>Genio</span>
      <span className="brand-360">360</span>
      <span className="brand-divider" />
      <span className="brand-suite">SUITE</span>
    </div>
  );
}

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page">
      <div className="auth-inner">
        <Wordmark />
        <div className="auth-card">{children}</div>
      </div>
    </main>
  );
}
