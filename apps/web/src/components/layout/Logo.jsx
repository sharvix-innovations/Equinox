import { Link } from 'react-router-dom'

// Brand logo  uses /public/logo.png (globe + Equinox wordmark).
// `onDark` wraps it in a white pill so it stays legible on dark surfaces.
export default function Logo({ className = '', onDark = false }) {
  return (
    <Link
      to="/"
      aria-label="Equinox Environments  Home"
      className={`inline-flex items-center ${className}`}
    >
      {onDark ? (
        <span className="inline-flex rounded-2xl bg-white px-3.5 py-2.5 shadow-soft">
          <img src="/logo.png" alt="Equinox Environments India Pvt Ltd" className="h-9 w-auto" />
        </span>
      ) : (
        <img
          src="/logo.png"
          alt="Equinox Environments India Pvt Ltd"
          className="h-9 w-auto sm:h-10 lg:h-12"
        />
      )}
    </Link>
  )
}
