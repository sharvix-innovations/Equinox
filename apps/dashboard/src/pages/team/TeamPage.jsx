import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users } from 'lucide-react'
import { useCollection } from '@/store/DataContext'
import { stagger, fadeInUp } from '@/lib/motion'

import PageHeader from '@/components/common/PageHeader'
import { FilterChips } from '@/components/common/Toolbar'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Field'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Skeleton } from '@/components/ui/Spinner'

const GROUPS = ['Management', 'Experts']
const FILTERS = ['All', ...GROUPS]
const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]
const BLANK = { name: '', role: '', group: 'Experts', exp: '', spec: '', status: 'active' }

function MemberModal({ open, onClose, onSubmit, initial }) {
  const isEdit = Boolean(initial)
  const [form, setForm] = useState(BLANK)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...BLANK, ...initial } : BLANK)
      setError('')
    }
  }, [open, initial])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Name is required')
      return
    }
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
      title={isEdit ? 'Edit member' : 'New team member'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="member-form" type="submit" loading={saving}>
            {isEdit ? 'Save changes' : 'Add member'}
          </Button>
        </>
      }
    >
      <form id="member-form" onSubmit={submit} className="space-y-4">
        <Input label="Full name" required value={form.name} onChange={set('name')} error={error} />
        <Input label="Role / title" value={form.role} onChange={set('role')} placeholder="e.g. Technical Director" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Group" value={form.group} onChange={set('group')} options={GROUPS} />
          <Select label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Experience" value={form.exp} onChange={set('exp')} placeholder="e.g. 20+ years" />
          <Input label="Specialisation" value={form.spec} onChange={set('spec')} placeholder="e.g. EIA & Policy" />
        </div>
      </form>
    </Modal>
  )
}

export default function TeamPage() {
  const { items, loading, create, update, remove } = useCollection('team')
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const shown = useMemo(
    () => (filter === 'All' ? items : items.filter((m) => m.group === filter)),
    [items, filter],
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Team" subtitle={`${items.length} members  management & experts`}>
        <Button icon={Plus} onClick={() => setEditing('new')}>
          Add member
        </Button>
      </PageHeader>

      <FilterChips options={FILTERS} value={filter} onChange={setFilter} />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <div className="panel">
          <EmptyState icon={Users} title="No team members" />
        </div>
      ) : (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {shown.map((m) => (
            <motion.div key={m.id} variants={fadeInUp} className="panel p-5">
              <div className="flex items-start justify-between">
                <Avatar name={m.name} size="lg" />
                <RowActions onEdit={() => setEditing(m)} onDelete={() => setDeleting(m)} />
              </div>
              <h3 className="mt-3 font-semibold text-ink">{m.name}</h3>
              <p className="text-sm text-brand-green">{m.role}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <Badge tone="outline">{m.group}</Badge>
                {m.exp && <Badge tone="neutral">{m.exp}</Badge>}
                <StatusBadge status={m.status} />
              </div>
              {m.spec && <p className="mt-3 text-xs text-ink-soft">{m.spec}</p>}
            </motion.div>
          ))}
        </motion.div>
      )}

      <MemberModal
        open={editing != null}
        initial={editing === 'new' ? null : editing}
        onClose={() => setEditing(null)}
        onSubmit={(payload) =>
          editing === 'new' ? create(payload) : update(editing.id, payload)
        }
      />
      <ConfirmDialog
        open={deleting != null}
        onClose={() => setDeleting(null)}
        onConfirm={() => remove(deleting.id)}
        title="Remove member?"
        message={`“${deleting?.name}” will be removed from the team page.`}
      />
    </div>
  )
}
