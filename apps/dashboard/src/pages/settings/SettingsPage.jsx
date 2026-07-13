import { useState } from 'react'
import { Building2, Users, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

import PageHeader from '@/components/common/PageHeader'
import ProfileTab from './tabs/ProfileTab'
import UsersTab from './tabs/UsersTab'
import SecurityTab from './tabs/SecurityTab'

const TABS = [
  { key: 'profile', label: 'Company Profile', icon: Building2, Component: ProfileTab },
  { key: 'users', label: 'Users', icon: Users, Component: UsersTab },
  { key: 'security', label: 'Security', icon: ShieldCheck, Component: SecurityTab },
]

export default function SettingsPage() {
  const [active, setActive] = useState('profile')
  const Active = TABS.find((t) => t.key === active)?.Component ?? ProfileTab

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your company profile, users and preferences." />

      {/* Tab nav */}
      <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-2xl border border-line bg-surface p-1.5">
        {TABS.map((t) => {
          const isActive = t.key === active
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={cn(
                'focusable flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all',
                isActive
                  ? 'bg-brand-gradient text-white shadow-glow-green'
                  : 'text-ink-soft hover:bg-brand-gray hover:text-ink',
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      <Active />
    </div>
  )
}
