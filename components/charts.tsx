// Small, dependency-free SVG charts for progress visualisation.
// Presentational only — pass already-computed data (accuracy 0..100).

function toPoints(data: number[], w: number, h: number, pad: number) {
  if (data.length === 1) {
    const y = h - pad - (data[0] / 100) * (h - 2 * pad);
    return [
      [pad, y],
      [w - pad, y],
    ];
  }
  return data.map((v, i) => {
    const x = pad + (i * (w - 2 * pad)) / (data.length - 1);
    const y = h - pad - (v / 100) * (h - 2 * pad);
    return [x, y];
  });
}

/** Compact trend line for cards. */
export function Sparkline({
  data,
  color,
  width = 120,
  height = 34,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (!data || data.length === 0) return null;
  const pad = 4;
  const pts = toPoints(data, width, height, pad);
  const line = pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
      <polygon points={area} fill={color} fillOpacity={0.13} />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r={2.6} fill={color} />
    </svg>
  );
}

/** Larger accuracy-over-time line chart with a faint grid. Scales uniformly. */
export function AccuracyChart({ data, color }: { data: number[]; color: string }) {
  const W = 560;
  const H = 180;
  const padL = 4;
  const padR = 10;
  const padT = 14;
  const padB = 10;
  if (!data || data.length === 0) return null;

  const x = (i: number) =>
    data.length === 1 ? W - padR : padL + (i * (W - padL - padR)) / (data.length - 1);
  const y = (v: number) => H - padB - (v / 100) * (H - padT - padB);

  const linePts = data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const areaPts = `${x(0).toFixed(1)},${H - padB} ${linePts} ${x(data.length - 1).toFixed(1)},${H - padB}`;
  const last = [x(data.length - 1), y(data[data.length - 1])];
  const gridLines = [25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Accuracy over recent sessions"
    >
      {gridLines.map((g) => (
        <g key={g}>
          <line
            x1={padL}
            y1={y(g)}
            x2={W - padR}
            y2={y(g)}
            stroke="currentColor"
            className="text-slate-200"
            strokeWidth={1}
          />
          <text x={padL} y={y(g) - 4} className="fill-slate-400" fontSize={9}>
            {g}%
          </text>
        </g>
      ))}
      <polygon points={areaPts} fill={color} fillOpacity={0.12} />
      <polyline
        points={linePts}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={last[0].toFixed(1)}
        cy={last[1].toFixed(1)}
        r={3.6}
        fill={color}
        stroke="white"
        strokeWidth={2}
      />
    </svg>
  );
}
