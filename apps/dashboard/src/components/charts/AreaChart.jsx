import { useId, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Responsive area/line chart drawn with plain SVG (no chart lib).
 * data: [{ label, value }]
 */
export default function AreaChart({ data = [], height = 220, className = '', valueSuffix = '' }) {
  const gradId = useId().replace(/:/g, '')
  const [hover, setHover] = useState(null)

  const W = 640
  const H = height
  const PAD = { top: 16, right: 16, bottom: 28, left: 36 }
  const iw = W - PAD.left - PAD.right
  const ih = H - PAD.top - PAD.bottom

  const { max, min, points, areaPath, linePath, ticks } = useMemo(() => {
    const vals = data.map((d) => d.value)
    const max = Math.max(...vals, 0)
    const min = Math.min(...vals, 0)
    const range = max - min || 1
    const x = (i) => PAD.left + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw)
    const y = (v) => PAD.top + ih - ((v - min) / range) * ih
    const points = data.map((d, i) => ({ ...d, x: x(i), y: y(d.value) }))
    const linePath = points.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ')
    const areaPath = `${linePath} L${points.at(-1)?.x},${PAD.top + ih} L${points[0]?.x},${PAD.top + ih} Z`
    const ticks = Array.from({ length: 4 }, (_, i) => {
      const v = min + (range / 3) * i
      return { v, y: y(v) }
    })
    return { max, min, points, areaPath, linePath, ticks }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, height])

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3DA94E" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3DA94E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* gridlines + y labels */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={t.y}
              y2={t.y}
              stroke="rgb(224 235 226)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <text x={PAD.left - 8} y={t.y + 3} textAnchor="end" className="fill-ink-soft text-[10px]">
              {Math.round(t.v)}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="#2E9E43"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* x labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={H - 8} textAnchor="middle" className="fill-ink-soft text-[10px]">
            {p.label}
          </text>
        ))}

        {/* hover markers */}
        {points.map((p, i) => (
          <g key={`h-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === i ? 5 : 3.5}
              fill="#fff"
              stroke="#2E9E43"
              strokeWidth="2.5"
              className="transition-all"
            />
            <rect
              x={p.x - iw / (data.length * 2)}
              y={PAD.top}
              width={iw / data.length}
              height={ih}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          </g>
        ))}
      </svg>

      {hover != null && points[hover] && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg bg-brand-navy px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg"
          style={{
            left: `${(points[hover].x / W) * 100}%`,
            top: `${(points[hover].y / H) * 100}%`,
          }}
        >
          {points[hover].label}: {points[hover].value}
          {valueSuffix}
        </div>
      )}
    </div>
  )
}
