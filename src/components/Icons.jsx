const base = { viewBox: '0 0 24 24', 'aria-hidden': true };
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Arrow = ({ className = 'arrow' }) => (
  <svg {...base} {...line} className={className} strokeWidth="2.2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Pin = () => (
  <svg {...base}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const Cal = () => (
  <svg {...base}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
);
export const Globe = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.3 3 14.7 0 18M12 3c-3 3.3-3 14.7 0 18" /></svg>
);
export const Spark = () => (
  <svg {...base} fill="currentColor" width="18" height="18"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" /></svg>
);

export const SOCIAL = [
  { name: 'Facebook', href: 'https://facebook.com', d: 'M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z' },
  { name: 'Instagram', href: 'https://instagram.com', ig: true },
  { name: 'LinkedIn', href: 'https://linkedin.com', d: 'M6.9 8.6H3.6V20h3.3V8.6zM5.2 3.4a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM20.4 13.6c0-3-1.6-5.2-4.4-5.2-1.4 0-2.4.7-2.9 1.4V8.6H9.9V20h3.3v-6.1c0-1.6.6-2.7 2-2.7 1.4 0 1.8 1.1 1.8 2.7V20h3.4v-6.4z' },
  { name: 'X', href: 'https://x.com', d: 'M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.7 3zm-1.1 16.2h1.7L7.5 4.7H5.7l10.9 14.5z' },
  { name: 'YouTube', href: 'https://youtube.com', d: 'M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z' }
];

export const SocialIcon = ({ s }) => (
  <svg {...base}>
    {s.ig ? (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.3" cy="6.7" r="1.2" />
      </>
    ) : (
      <path d={s.d} />
    )}
  </svg>
);
