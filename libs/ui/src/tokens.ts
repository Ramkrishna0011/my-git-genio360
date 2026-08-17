/**
 * Genio360 design tokens — the single source of truth for colour, spacing,
 * radius and type. Mirrored as CSS variables in theme.css for styling; exposed
 * here for any TS/JS that needs the raw values.
 */
export const colors = {
  navy: '#0b2440',
  navy700: '#16324f',
  gold: '#b6975b',
  gold600: '#9c7f45',
  ink: '#1c2733',
  grey: '#5b6572',
  line: '#d8dee6',
  bg: '#f6f8fa',
  danger: '#c0392b',
  white: '#ffffff',
} as const;

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const;

export const radius = { sm: 6, md: 10, pill: 999 } as const;

export const font = {
  heading: "'Zilla Slab', Georgia, serif",
  body: "'Inter', 'Segoe UI', Arial, sans-serif",
} as const;
