import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Stadium/pill bar chart with hatched full-height tracks behind each bar
 * (Donezo style). data: [{ label, value 0..100, tooltip? }]
 */
export default function PillBarChart({ data = [], height = 210, className = '' }) {
  const hatchId = useId().replace(/:/g, '')
  const [hover, setHover] = useState(null)

  const W = 560
  const H = height
  const PAD = { top: 34, bottom: 28 }
  const ih = H - PAD.top - PAD.bottom
  const slot = W / data.length
  const bw = Math.min(slot * 0.5, 44)

  return (
    <div className={cn('w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img">
        <defs>
          <pattern id={hatchId} width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="7" height="7" fill="#eef3ee" />
            <line x1="0" y1="0" x2="0" y2="7" stroke="#d6e3d8" strokeWidth="3" />
          </pattern>
          <linearGradient id={`${hatchId}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4fb85f" />
            <stop offset="100%" stopColor="#2E9E43" />
          </linearGradient>
        </defs>

        {data.map((d, i) => {
          const cx = slot * i + slot / 2
          const x = cx - bw / 2
          const barH = Math.max((d.value / 100) * ih, bw)
          const y = PAD.top + ih - barH
          const active = hover === i
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
            >
              {/* track */}
              <rect x={x} y={PAD.top} width={bw} height={ih} rx={bw / 2} fill={`url(#${hatchId})`} />
              {/* value pill */}
              <rect
                x={x}
                y={y}
                width={bw}
                height={barH}
                rx={bw / 2}
                fill={`url(#${hatchId}-fill)`}
                opacity={hover == null || active ? 1 : 0.75}
                className="transition-opacity"
              />
              {/* tooltip bubble */}
              {(active || d.tooltip) && (
                <g>
                  <rect x={cx - 22} y={y - 26} width="44" height="20" rx="6" fill="#0F3320" />
                  <text x={cx} y={y - 12} textAnchor="middle" className="fill-white text-[11px] font-bold">
                    {d.tooltip ?? `${Math.round(d.value)}%`}
                  </text>
                </g>
              )}
              {/* label */}
              <text x={cx} y={H - 8} textAnchor="middle" className="fill-ink-soft text-[11px] font-medium">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
