import { useId } from 'react'
import { cn } from '@/lib/utils'

/**
 * Three-quarter radial gauge (open at the bottom) with a hatched remainder,
 * a big centered value, and a legend. segments: [{ label, value, color }]
 */
export default function GaugeChart({ segments = [], centerValue, centerLabel, size = 190, className = '' }) {
  const hatchId = useId().replace(/:/g, '')
  const total = segments.reduce((s, d) => s + d.value, 0) || 1
  const stroke = size * 0.15
  const r = size / 2 - stroke / 2
  const cx = size / 2
  const cy = size / 2
  const C = 2 * Math.PI * r
  const SWEEP = 0.75 // three-quarter circle
  const arc = C * SWEEP
  // Rotate so the 90° gap sits at the bottom-centre.
  const rotate = 135

  let offset = 0
  const drawn = segments.map((s) => {
    const frac = s.value / total
    const seg = { ...s, dash: frac * arc, gap: C - frac * arc, offset: -offset * arc }
    offset += frac
    return seg
  })

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size * 0.82 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          <defs>
            <pattern id={hatchId} width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="7" height="7" fill="#eef3ee" />
              <line x1="0" y1="0" x2="0" y2="7" stroke="#d6e3d8" strokeWidth="3" />
            </pattern>
          </defs>
          <g transform={`rotate(${rotate} ${cx} ${cy})`}>
            {/* hatched track */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={`url(#${hatchId})`}
              strokeWidth={stroke}
              strokeDasharray={`${arc} ${C - arc}`}
              strokeLinecap="round"
            />
            {/* segments */}
            {drawn.map((s, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${s.dash} ${s.gap}`}
                strokeDashoffset={s.offset}
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
          <span className="text-4xl font-bold text-ink">{centerValue}</span>
          <span className="text-xs font-medium text-ink-soft">{centerLabel}</span>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {segments.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
          <span className="h-2.5 w-2.5 rounded-full border border-line bg-brand-gray" />
          Pending
        </span>
      </div>
    </div>
  )
}
