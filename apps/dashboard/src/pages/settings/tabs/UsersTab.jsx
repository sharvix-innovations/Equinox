import { useEffect, useMemo, useState } from 'react'
import { UserPlus, Users } from 'lucide-react'
import { useAuth } from '@/store/AuthContext'
import { useCollection } from '@/store/DataContext'

import { Card } from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Field'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import SearchInput from '@/components/common/SearchInput'

const ROLES = [
  { value: 'Administrator', label: 'Administrator' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
]
const ROLE_TONE = { Administrator: 'green', Editor: 'blue', Viewer: 'neutral' }

const BLANK = { name: '', email: '', role: 'Editor', status: 'invited' }

function UserModal({ open, onClose, onSubmit, initial }) {
  const isEdit = Boolean(initial)
  const [form, setForm] = useState(BLANK)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...BLANK, ...initial } : BLANK)
      setErrors({})
    }
  }, [open, initial])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    setErrors(next)
    if (Object.keys(next).length) return
    setSaving(true)
    try {
      await onSubmit(form)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      title={isEdit ? 'Edit user' : 'Invite user'}
      description={isEdit ? initial?.email : 'Send an invite to a new team member.'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="user-form" type="submit" loading={saving}>
            {isEdit ? 'Save changes' : 'Send invite'}
          </Button>
        </>
      }
    >
      <form id="user-form" onSubmit={submit} className="space-y-4">
        <Input label="Full name" required value={form.name} onChange={set('name')} error={errors.name} />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          placeholder="name@equinoxenvi.com"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Role" value={form.role} onChange={set('role')} options={ROLES} />
          <Select
            label="Status"
            value={form.status}
            onChange={set('status')}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'invited', label: 'Invited' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>
      </form>
    </Modal>
  )
}

export default function UsersTab() {
  const { user: me } = useAuth()
  const { items: users, loading, create, update, remove } = useCollection('users')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null) // record | 'new' | null
  const [deleting, setDeleting] = useState(null)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter(
      (u) => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    )
  }, [users, search])

  const handleSubmit = (payload) =>
    editing === 'new' ? create(payload) : update(editing.id, payload)

  const handleDelete = () => remove(deleting.id)

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.name} size="sm" />
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 truncate font-semibold text-ink">
              {r.name}
              {r.email === me?.email && (
                <span className="rounded bg-brand-sky/20 px-1.5 py-0.5 text-[10px] font-bold text-brand-green">
                  You
                </span>
              )}
            </p>
            <p className="truncate text-xs text-ink-soft">{r.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Role', render: (r) => <Badge tone={ROLE_TONE[r.role]}>{r.role}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => (
        <RowActions
          onEdit={() => setEditing(r)}
          onDelete={r.email === me?.email ? undefined : () => setDeleting(r)}
        />
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            {users.length} user{users.length === 1 ? '' : 's'}
          </p>
          <p className="text-xs text-ink-soft">People who can access this admin console.</p>
        </div>
        <div className="flex items-center gap-2">
          <SearchInput value={search} onChange={setSearch} placeholder="Search users…" className="w-48 sm:w-56" />
          <Button icon={UserPlus} onClick={() => setEditing('new')}>
            Invite user
          </Button>
        </div>
      </div>

      <Card>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          empty={<EmptyState icon={Users} title="No users found" />}
        />
      </Card>

      <UserModal
        open={editing != null}
        initial={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
      />
      <ConfirmDialog
        open={deleting != null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Remove user?"
        message={`“${deleting?.name}” will lose access to the console.`}
        confirmLabel="Remove"
      />
    </div>
  )
}
