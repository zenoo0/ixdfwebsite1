const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parts = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m: m - 1, d };
};

/** "8 Oct 2026" */
export function fmtDate(iso) {
  const { y, m, d } = parts(iso);
  return `${d} ${MON[m]} ${y}`;
}

/** "21–23 NOV" for the big date on event cards */
export function shortRange(e) {
  const a = parts(e.start);
  const b = parts(e.end);
  const days = a.d === b.d && a.m === b.m ? `${a.d}` : `${a.d}–${b.d}`;
  return `${days} ${MON[a.m]}`.toUpperCase();
}

export const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');

export const upcoming = (events) =>
  events.filter((e) => !e.past).sort((a, b) => a.start.localeCompare(b.start));
