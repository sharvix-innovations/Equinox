import { useScrollProgress } from '@/hooks/useScrollProgress'

// Thin gradient bar pinned to the top of the viewport.
export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full origin-left bg-brand-gradient transition-transform duration-75"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
