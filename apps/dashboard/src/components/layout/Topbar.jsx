import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Mail, Search, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '@/store/AuthContext'
import { useData } from '@/store/DataContext'
import Avatar from '../ui/Avatar'
import Dropdown, { MenuItem, MenuDivider } from '../ui/Dropdown'

function CircleButton({ icon: Icon, label, dot }) {
  return (
    <button
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:bg-brand-gray hover:text-ink"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
      {dot && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />}
    </button>
  )
}

export default function Topbar({ onMenu }) {
  const { user, logout } = useAuth()
  const { data } = useData()
  const navigate = useNavigate()

  const newEnquiries = data.enquiries.filter((e) => e.status === 'new').length

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem]">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-ink-soft hover:bg-brand-gray lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search pill */}
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-soft" />
        <input
          type="search"
          placeholder="Search…"
          className="focusable h-11 w-full rounded-full border border-line bg-brand-gray/60 pl-11 pr-16 text-sm text-ink placeholder:text-ink-soft/70"
        />
        <span className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-line bg-surface px-1.5 py-0.5 text-[11px] font-semibold text-ink-soft sm:flex">
          ⌘ F
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <CircleButton icon={Mail} label="Messages" />
          <Dropdown
            trigger={<div><CircleButton icon={Bell} label="Notifications" dot={newEnquiries > 0} /></div>}
          >
            <div className="px-2.5 py-2">
              <p className="text-sm font-semibold text-ink">Notifications</p>
            </div>
            <MenuDivider />
            <MenuItem icon={Mail} onClick={() => navigate('/enquiries')}>
              {newEnquiries} new enquir{newEnquiries === 1 ? 'y' : 'ies'}
            </MenuItem>
          </Dropdown>
        </div>

        {/* User */}
        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-brand-gray sm:pr-3">
              <Avatar name={user?.name} size="md" />
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-sm font-semibold text-ink">{user?.name}</p>
                <p className="text-[11px] text-ink-soft">{user?.email}</p>
              </div>
            </button>
          }
        >
          <div className="px-2.5 py-2">
            <p className="text-sm font-semibold text-ink">{user?.name}</p>
            <p className="text-xs text-ink-soft">{user?.email}</p>
          </div>
          <MenuDivider />
          <MenuItem icon={Settings} onClick={() => navigate('/settings')}>
            Account settings
          </MenuItem>
          <MenuItem icon={LogOut} danger onClick={handleLogout}>
            Sign out
          </MenuItem>
        </Dropdown>
      </div>
    </header>
  )
}
