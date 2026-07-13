import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import Spinner from '../ui/Spinner'

/** Gate that redirects unauthenticated users to the login screen. */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, ready } = useAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner label="Loading console…" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
