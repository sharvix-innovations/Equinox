import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface-2 px-6 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-3 text-xl font-semibold text-ink">Page not found</h1>
        <p className="mt-1 text-sm text-ink-soft">
          The page you’re looking for doesn’t exist in the console.
        </p>
        <Button as={Link} to="/" className="mt-6">
          Back to overview
        </Button>
      </div>
    </div>
  )
}
