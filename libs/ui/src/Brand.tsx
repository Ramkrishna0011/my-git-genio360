export interface BrandProps {
  small?: boolean;
}

/** The Genio360 SUITE wordmark. Shared by both consoles. */
export function Brand({ small = false }: BrandProps) {
  return (
    <div className={small ? 'gx-brand gx-brand--sm' : 'gx-brand'}>
      <span className="gx-brand__word">Genio</span>
      <span className="gx-brand__360">360</span>
      <span className="gx-brand__divider" />
      <span className="gx-brand__suite">SUITE</span>
    </div>
  );
}
