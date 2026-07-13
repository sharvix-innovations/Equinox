import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, Mail, ArrowUpRight, MapPin, Search, ChevronDown, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { navLinks, company } from '@/data/site'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Transparent over the dark hero/page-banner at the top; solid-white on scroll.
  // The Thank You page has a light top (no dark hero), so force the solid navbar there.
  const solid = scrolled || location.pathname === '/thank-you'

  const isActive = (l) => {
    if (l.children || l.base) return location.pathname.startsWith(l.base || '')
    if (l.href === '/') return location.pathname === '/'
    return location.pathname.startsWith(l.href)
  }

  const linkCls = (active) =>
    `relative rounded-full px-3.5 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
      active ? 'text-brand-green' : solid ? 'text-ink hover:text-brand-green' : 'text-white/90 hover:text-white'
    }`

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? 'bg-surface/95 shadow-soft backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-10 ${
            solid ? 'py-3' : 'py-5'
          }`}
        >
          {/* Logo */}
          {solid ? (
            <Logo />
          ) : (
            <Link to="/" className="inline-flex rounded-2xl bg-white/95 px-3 py-2 shadow-soft backdrop-blur">
              <img src="/logo.png" alt={company.name} className="h-9 w-auto sm:h-10" />
            </Link>
          )}

          {/* Desktop nav */}
          <nav className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((l) => {
                const active = isActive(l)
                if (l.children) {
                  return (
                    <li key={l.label} className="group relative">
                      <button className={`inline-flex items-center gap-1 ${linkCls(active)}`}>
                        {l.label} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <ul className="w-56 rounded-2xl border border-line bg-surface p-2 shadow-card">
                          {l.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                to={c.href}
                                className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                                  location.pathname === c.href ? 'bg-brand-green/10 text-brand-green' : 'text-ink hover:bg-surface-2 hover:text-brand-green'
                                }`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )
                }
                return (
                  <li key={l.href}>
                    <Link to={l.href} className={linkCls(active)}>
                      {l.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-green"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search"
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                solid ? 'text-ink hover:text-brand-green' : 'text-white hover:text-brand-green'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>

            <span className={`hidden h-6 w-px sm:block ${solid ? 'bg-line' : 'bg-white/30'}`} />

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`hidden h-10 w-10 place-items-center rounded-full transition-colors sm:grid xl:hidden ${
                solid ? 'text-ink hover:text-brand-green' : 'text-white hover:text-brand-green'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Make A Call pill */}
            <a
              href={`tel:${company.phone}`}
              className="group flex items-center gap-3 rounded-full bg-brand-green py-1.5 pl-1.5 pr-5 text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20">
                <Phone className="h-5 w-5" />
              </span>
              <span className="hidden leading-tight lg:block">
                <span className="block text-[11px] font-medium opacity-90">Make A Call:</span>
                <span className="block font-display text-sm font-bold">{company.phone}</span>
              </span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`grid h-10 w-10 place-items-center rounded-full transition-colors sm:hidden ${
                solid ? 'text-ink' : 'text-white'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center bg-brand-navy/80 backdrop-blur-md"
            onClick={() => setSearch(false)}
          >
            <motion.form
              initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => e.preventDefault()}
              className="mt-32 w-[90%] max-w-2xl"
            >
              <label className="mb-3 block text-center text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Search Equinox</label>
              <div className="flex items-center gap-3 border-b-2 border-white/40 pb-3">
                <Search className="h-6 w-6 text-white/70" />
                <input autoFocus type="text" placeholder="Type to search services, products, projects…" className="w-full bg-transparent text-xl text-white placeholder-white/50 outline-none" />
                <button type="button" onClick={() => setSearch(false)} aria-label="Close search"><X className="h-6 w-6 text-white/70 hover:text-white" /></button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Off-canvas drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-brand-navy/70 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[61] flex w-[88%] max-w-sm flex-col overflow-y-auto bg-gradient-to-b from-surface to-surface-2 shadow-2xl"
            >
              <div className="pointer-events-none absolute -right-16 top-16 h-64 w-64 rounded-full bg-brand-green/15 blur-[110px]" />
              <div className="relative flex items-center justify-between border-b border-line px-6 py-5">
                <Logo />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink shadow-soft"><X className="h-5 w-5" /></button>
              </div>

              <ul className="relative px-4 py-5">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    {l.children ? (
                      <div className="rounded-2xl px-4 py-2">
                        <span className="font-display text-lg font-bold text-ink">{l.label}</span>
                        <div className="mt-1 space-y-1 border-l-2 border-line pl-4">
                          {l.children.map((c) => (
                            <Link key={c.href} to={c.href} onClick={() => setOpen(false)} className="block py-1.5 text-sm font-semibold text-ink-soft hover:text-brand-green">
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={l.href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${isActive(l) ? 'bg-brand-green/10' : 'hover:bg-surface'}`}
                      >
                        <span className={`font-display text-lg font-bold ${isActive(l) ? 'text-brand-green' : 'text-ink'}`}>{l.label}</span>
                        <ArrowUpRight className={`h-5 w-5 transition-all ${isActive(l) ? 'text-brand-green opacity-100' : 'text-ink-soft opacity-0 group-hover:opacity-100'}`} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto space-y-5 border-t border-line px-6 pb-8 pt-6">
                <Link to="/contact" onClick={() => setOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 font-display font-semibold text-white shadow-glow transition-transform active:scale-95">
                  Get a Quote <ArrowUpRight className="h-4 w-4" />
                </Link>
                <div className="grid gap-2.5 text-sm text-ink-soft">
                  <a href={`tel:${company.phone}`} className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-brand-green" /> {company.phone}</a>
                  <a href={`mailto:${company.email}`} className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brand-green" /> {company.email}</a>
                  <p className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> Hinjawadi Phase 2, Pune</p>
                </div>
                <div className="flex items-center gap-2.5">
                  {[Facebook, Linkedin, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand-green hover:bg-brand-green hover:text-white"><Icon className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
