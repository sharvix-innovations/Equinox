import { useMemo } from 'react'
import { cn } from '@/lib/utils'

// Brand-derived categorical palette (green-forward, distinguishable).
const PALETTE = ['#2E9E43', '#6FCF79', '#3B82C4', '#E0A020', '#0F3320', '#9AD4A2']

/**
 * Donut/pie with a centered total and a legend. data: [{ label, value }]
 */
export default function DonutChart({ data = [], size = 180, centerLabel = 'Total', className = '' }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const R = size / 2
  const stroke = size * 0.16
  const r = R - stroke / 2
  const C = 2 * Math.PI * r

  const segments = useMemo(() => {
    let offset = 0
    return data.map((d, i) => {
      const frac = d.value / total
      const seg = {
        ...d,
        color: PALETTE[i % PALETTE.length],
        dash: frac * C,
        gap: C - frac * C,
        offset: -offset * C,
        pct: Math.round(frac * 100),
      }
      offset += frac
      return seg
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, total])

  return (
    <div className={cn('flex flex-col items-center gap-5 sm:flex-row', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={R} cy={R} r={r} fill="none" stroke="rgb(224 235 226)" strokeWidth={stroke} />
          <g transform={`rotate(-90 ${R} ${R})`}>
            {segments.map((s, i) => (
              <circle
                key={i}
                cx={R}
                cy={R}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${s.dash} ${s.gap}`}
                strokeDashoffset={s.offset}
                strokeLinecap="butt"
              />
            ))}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-ink">{total}</span>
          <span className="text-[11px] font-medium text-ink-soft">{centerLabel}</span>
        </div>
      </div>

      <ul className="w-full space-y-2">
        {segments.map((s, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            <span className="flex-1 truncate text-ink-soft">{s.label}</span>
            <span className="font-semibold text-ink">{s.value}</span>
            <span className="w-9 text-right text-xs text-ink-soft">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
