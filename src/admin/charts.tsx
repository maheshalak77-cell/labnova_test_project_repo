export function BarChart({
  data,
  height = 220,
  color = "var(--action)",
  formatValue = (v: number) => String(v),
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
}) {
  if (!data.length) return <div className="chart-empty">No data yet.</div>;
  const max = Math.max(1, ...data.map((d) => d.value));
  const barWidth = 100 / data.length;

  return (
    <div className="bar-chart" style={{ height }}>
      <div className="bar-chart__bars">
        {data.map((d) => {
          const pct = (d.value / max) * 100;
          return (
            <div
              className="bar-chart__col"
              key={d.label}
              style={{ width: `${barWidth}%` }}
            >
              <span className="bar-chart__value">
                {d.value > 0 ? formatValue(d.value) : ""}
              </span>
              <div className="bar-chart__track">
                <div
                  className="bar-chart__bar"
                  style={{
                    height: `${Math.max(pct, d.value > 0 ? 4 : 0)}%`,
                    background: color,
                  }}
                />
              </div>
              <span className="bar-chart__label" title={d.label}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SLICE_COLORS = [
  "#0B62CE",
  "#06A9F4",
  "#0A2342",
  "#7c96b8",
  "#b8c4d6",
  "#3d6ba8",
];
export function DonutChart({
  data,
  size = 180,
}: {
  data: { label: string; value: number }[];
  size?: number;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (!total) return <div className="chart-empty">No data yet.</div>;

  const radius = size / 2;
  const stroke = radius * 0.34;
  const innerRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * innerRadius;
  let offsetAccum = 0;

  return (
    <div className="donut-chart">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${radius} ${radius})`}>
          {data.map((d, i) => {
            const fraction = d.value / total;
            const dash = fraction * circumference;
            const circle = (
              <circle
                key={d.label}
                cx={radius}
                cy={radius}
                r={innerRadius}
                fill="none"
                stroke={SLICE_COLORS[i % SLICE_COLORS.length]}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offsetAccum}
                strokeLinecap="butt"
              />
            );
            offsetAccum += dash;
            return circle;
          })}
        </g>
      </svg>
      <ul className="donut-legend">
        {data.map((d, i) => (
          <li key={d.label}>
            <i style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }} />
            {d.label}
            <b>{d.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
