import { NavLink } from 'react-router-dom'
import { Leaf, X, Globe, ArrowUpRight } from 'lucide-react'
import { navSections } from '@/config/nav'
import { useData } from '@/store/DataContext'
import { cn } from '@/lib/utils'

// Live public website the console manages. Swap for your production domain.
const WEBSITE_URL = 'https://www.equinoxenvironments.in/'

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink">Equinox</span>
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  const { data } = useData()
  const counts = {
    openEnquiries: data.enquiries.filter((e) => e.status !== 'resolved').length,
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-brand-navy/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface',
          'transition-transform duration-300',
          'lg:static lg:z-auto lg:translate-x-0 lg:shrink-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 lg:h-[4.5rem]">
          <Brand />
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-gray lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-3 pb-4 pt-3">
          {navSections.map((section, i) => (
            <div key={i}>
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft/60">
                {section.heading ?? 'Menu'}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) => cn('nav-item group', isActive && 'nav-item-active')}
                  >
                    {({ isActive }) => (
                      <>
                        {/* left accent bar */}
                        <span
                          className={cn(
                            'absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-blue transition-opacity',
                            isActive ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        <item.icon
                          className={cn(
                            'h-[18px] w-[18px] shrink-0 transition-colors',
                            isActive ? 'text-brand-blue' : 'text-ink-soft group-hover:text-ink',
                          )}
                        />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && counts[item.badge] > 0 && (
                          <span className="rounded-md bg-brand-sky/20 px-1.5 py-0.5 text-[10px] font-bold text-brand-green">
                            {counts[item.badge]}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Live website link card */}
        <div className="p-3">
          <div className="relative overflow-hidden rounded-2xl bg-navy-radial p-4 text-white">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-green/30 blur-2xl" />
            <div className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-brand-sky/20 blur-2xl" />
            <div className="relative">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                <Globe className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-semibold leading-tight">Visit our website</p>
              <p className="mt-1 text-xs text-white/60">See your content live in production.</p>
              <a
                href={WEBSITE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-brand-gradient py-2 text-center text-xs font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
              >
                Open website
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
