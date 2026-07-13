import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Vertical bar chart in plain SVG. data: [{ label, value }]
 */
export default function BarChart({ data = [], height = 220, className = '' }) {
  const [hover, setHover] = useState(null)
  const W = 640
  const H = height
  const PAD = { top: 16, right: 12, bottom: 28, left: 32 }
  const iw = W - PAD.left - PAD.right
  const ih = H - PAD.top - PAD.bottom

  const { bars, ticks } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value), 0) || 1
    const slot = iw / data.length
    const bw = Math.min(slot * 0.55, 42)
    const bars = data.map((d, i) => {
      const h = (d.value / max) * ih
      return {
        ...d,
        x: PAD.left + slot * i + (slot - bw) / 2,
        y: PAD.top + ih - h,
        w: bw,
        h,
      }
    })
    const ticks = Array.from({ length: 4 }, (_, i) => {
      const v = (max / 3) * i
      return { v, y: PAD.top + ih - (v / max) * ih }
    })
    return { bars, ticks }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, height])

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6FCF79" />
            <stop offset="100%" stopColor="#3DA94E" />
          </linearGradient>
        </defs>

        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={t.y}
              y2={t.y}
              stroke="rgb(224 235 226)"
              strokeDasharray="3 4"
            />
            <text x={PAD.left - 8} y={t.y + 3} textAnchor="end" className="fill-ink-soft text-[10px]">
              {Math.round(t.v)}
            </text>
          </g>
        ))}

        {bars.map((b, i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={Math.max(b.h, 1)}
              rx="5"
              fill="url(#barGrad)"
              opacity={hover == null || hover === i ? 1 : 0.55}
              className="transition-opacity"
            />
            <text
              x={b.x + b.w / 2}
              y={H - 8}
              textAnchor="middle"
              className="fill-ink-soft text-[10px]"
            >
              {b.label}
            </text>
            {hover === i && (
              <text
                x={b.x + b.w / 2}
                y={b.y - 6}
                textAnchor="middle"
                className="fill-ink text-[11px] font-semibold"
              >
                {b.value}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
