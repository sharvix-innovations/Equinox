import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Lock, User, Eye, EyeOff, ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/store/AuthContext'
import { authService } from '@/services/auth.service'
import Button from '@/components/ui/Button'

/* Background image for the "Welcome" side. Swap this URL for your own, or
   drop a file in `public/` and use e.g. '/login-bg.jpg'. */
const WELCOME_BG =
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80'

/* Image-backed panel  the "Welcome" side (nature photo + brand-green overlay). */
function WelcomePanel() {
  return (
    <div className="relative hidden overflow-hidden bg-brand-navy lg:block">
      {/* background photo */}
      <img
        src={WELCOME_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />

      {/* brand green gradient overlay for legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(46,158,67,0.72)_0%,rgba(61,169,78,0.55)_38%,rgba(15,51,32,0.9)_100%)]" />

      {/* soft flowing accent blobs on top of the image */}
      <div className="absolute -left-24 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,233,207,0.35)_0%,rgba(244,233,207,0)_62%)] blur-2xl animate-float-slow" />
      <div className="absolute -right-16 -top-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(155,226,166,0.4)_0%,rgba(155,226,166,0)_60%)] blur-2xl animate-float" />

      {/* dotted texture */}
      <div className="absolute inset-0 bg-dotgrid opacity-[0.1]" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-12 text-white">
        <div className="flex items-center justify-end gap-6 text-sm text-white/80">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium transition-colors hover:text-white"
          >
            Visit website <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <h1 className="font-display text-6xl font-bold leading-none tracking-tight drop-shadow-sm xl:text-7xl">
            Welcome.
          </h1>
          <p className="mt-5 text-lg text-white/85">
            Your sustainability command centre.
          </p>
          <p className="mt-2 max-w-sm text-sm text-white/65">
            Manage products, services, events, enquiries and clients  everything that
            powers the Equinox website, in one place.
          </p>
        </motion.div>

        <p className="text-sm text-white/55">
          Equinox Environments · Engineering a cleaner future since 1997
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const { login, isAuthenticated, ready } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({
    email: authService.demoCredentials.email,
    password: authService.demoCredentials.password,
  })
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (ready && isAuthenticated) return <Navigate to={from} replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy p-0 sm:p-5 lg:p-6">
      <div className="grid min-h-screen overflow-hidden bg-surface sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[2rem] sm:shadow-2xl lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[minmax(0,26rem)_1fr]">
        {/* ── Form side ─────────────────────────────────────────── */}
        <div className="relative flex flex-col px-6 py-8 sm:px-10 lg:px-12">
          {/* brand */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
              <Leaf className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold text-ink">Equinox</p>
              <p className="text-[11px] font-medium text-ink-soft">Admin Console</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10"
          >
            {/* avatar */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-glow ring-8 ring-brand-sky/10">
              <User className="h-8 w-8" />
            </div>

            <div className="mb-7 text-center">
              <h2 className="text-2xl font-bold text-ink">Sign in</h2>
              <p className="mt-1 text-sm text-ink-soft">Welcome back  please enter your details.</p>
            </div>

            <form onSubmit={submit} className="space-y-3.5">
              {/* email */}
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-soft" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email address"
                  className="focusable h-12 w-full rounded-full border border-line bg-brand-gray/70 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft/70"
                />
              </div>

              {/* password */}
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-soft" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Password"
                  className="focusable h-12 w-full rounded-full border border-line bg-brand-gray/70 pl-11 pr-11 text-sm text-ink placeholder:text-ink-soft/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-soft hover:text-ink"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>

              {error && (
                <p className="rounded-xl bg-danger/10 px-3.5 py-2 text-sm font-medium text-danger">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="focusable mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-navy text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-brand-green active:scale-[.99] disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  'Login'
                )}
              </button>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex cursor-pointer select-none items-center gap-2 text-ink-soft">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-3.5 w-3.5 accent-brand-blue"
                  />
                  Remember me
                </label>
                <button type="button" className="font-medium text-brand-green hover:underline">
                  Forgot password?
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* ── Welcome side ──────────────────────────────────────── */}
        <WelcomePanel />
      </div>
    </div>
  )
}
