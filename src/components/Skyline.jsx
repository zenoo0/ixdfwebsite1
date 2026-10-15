import { useMemo } from 'react';

/** Tiny seeded PRNG so the skyline is stable between renders */
const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

/** Stylised skyline with three national landmarks, one per label. */
export default function Skyline() {
  const blocks = useMemo(() => {
    const r = rng(42);
    const out = [];
    for (let x = 0; x < 1440; x += 10 + r() * 22) {
      const near = [170, 770, 1190].some((c) => Math.abs(x - c) < 95);
      if (near) continue;
      const bh = 24 + r() * 78;
      out.push({ x, w: 14 + r() * 24, h: bh });
    }
    return out;
  }, []);

  return (
    <div className="skyline" aria-hidden="true">
      <svg viewBox="0 0 1440 190" preserveAspectRatio="xMidYMax slice">
        <g fill="#0d1238">
          {blocks.map((b, i) => <rect key={i} x={b.x} y={190 - b.h} width={b.w} height={b.h} />)}
        </g>
        <g fill="#151b52">
          {/* Mazar-e-Quaid, Karachi */}
          <rect x="118" y="140" width="104" height="50" />
          <path d="M132 140 Q132 92 170 84 Q208 92 208 140Z" />
          <rect x="169" y="68" width="2" height="18" />
          <circle cx="124" cy="138" r="7" /><circle cx="216" cy="138" r="7" />
          {/* Minar-e-Pakistan, Lahore */}
          <path d="M760 190 L763 52 Q770 36 777 52 L780 190Z" />
          <ellipse cx="770" cy="46" rx="11" ry="8" />
          <rect x="738" y="172" width="64" height="18" /><rect x="748" y="156" width="44" height="16" />
          <path d="M700 190 V150 Q720 128 740 150 V190Z" /><path d="M800 190 V150 Q820 128 840 150 V190Z" />
          {/* Faisal Mosque, Islamabad */}
          <path d="M1130 150 L1190 92 L1250 150Z" />
          <rect x="1150" y="150" width="80" height="40" />
          <g>
            {[1108, 1139, 1241, 1272].map((x) => (
              <g key={x}><rect x={x} y="70" width="5" height="120" /><path d={`M${x - 2} 70 L${x + 2.5} 54 L${x + 7} 70Z`} /></g>
            ))}
          </g>
        </g>
      </svg>
      <span className="skyline__l" style={{ left: '11%' }}>KARACHI</span>
      <span className="skyline__l" style={{ left: '51%' }}>LAHORE</span>
      <span className="skyline__l" style={{ left: '82%' }}>ISLAMABAD</span>
    </div>
  );
}
