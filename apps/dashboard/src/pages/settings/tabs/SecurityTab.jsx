import { useState } from 'react'
import { KeyRound, ShieldCheck, Monitor, Smartphone, LogOut, Save } from 'lucide-react'
import { useToast } from '@/store/ToastContext'

import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Field'
import Button from '@/components/ui/Button'
import Toggle from '@/components/ui/Toggle'
import Badge from '@/components/ui/Badge'

const SESSIONS = [
  { id: 's1', device: 'Windows · Chrome', where: 'Pune, IN', current: true, icon: Monitor },
  { id: 's2', device: 'iPhone · Safari', where: 'Mumbai, IN', current: false, icon: Smartphone },
]

export default function SecurityTab() {
  const toast = useToast()
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [twoFA, setTwoFA] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setPw((p) => ({ ...p, [k]: e.target.value }))

  const changePassword = async (e) => {
    e.preventDefault()
    setError('')
    if (pw.next.length < 6) return setError('New password must be at least 6 characters.')
    if (pw.next !== pw.confirm) return setError('New passwords do not match.')
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    setPw({ current: '', next: '', confirm: '' })
    toast.success('Password updated')
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Change password */}
      <form onSubmit={changePassword}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-brand-green" /> Change password
            </CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Current password" type="password" value={pw.current} onChange={set('current')} />
            <Input label="New password" type="password" value={pw.next} onChange={set('next')} />
            <Input label="Confirm new password" type="password" value={pw.confirm} onChange={set('confirm')} />
            {error && (
              <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">{error}</p>
            )}
            <Button type="submit" icon={Save} loading={saving}>
              Update password
            </Button>
          </CardBody>
        </Card>
      </form>

      <div className="space-y-6">
        {/* Two-factor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-green" /> Two-factor authentication
            </CardTitle>
          </CardHeader>
          <CardBody className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">
              Require a one-time code at sign-in for extra security.
            </p>
            <Toggle
              checked={twoFA}
              onChange={(v) => {
                setTwoFA(v)
                toast.success(v ? 'Two-factor enabled' : 'Two-factor disabled')
              }}
            />
          </CardBody>
        </Card>

        {/* Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Active sessions</CardTitle>
            <Button variant="ghost" size="sm" icon={LogOut} onClick={() => toast.success('Signed out of other sessions')}>
              Sign out all
            </Button>
          </CardHeader>
          <CardBody className="divide-y divide-line py-0">
            {SESSIONS.map((s) => (
              <div key={s.id} className="flex items-center gap-3 py-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gray text-ink-soft">
                  <s.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{s.device}</p>
                  <p className="text-xs text-ink-soft">{s.where}</p>
                </div>
                {s.current && <Badge tone="green" dot>Current</Badge>}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
