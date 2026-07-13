import { useEffect, useMemo, useState } from 'react'
import { Plus, Building2 } from 'lucide-react'
import { useCollection } from '@/store/DataContext'

import PageHeader from '@/components/common/PageHeader'
import Toolbar, { FilterChips } from '@/components/common/Toolbar'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import { Card } from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Field'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

const SECTORS = ['Manufacturing', 'Chemical', 'Infrastructure', 'Real Estate', 'Energy', 'Government']
const FILTERS = ['All', ...SECTORS]
const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]
const BLANK = { name: '', sector: 'Manufacturing', projects: 0, since: new Date().getFullYear(), status: 'active' }

function ClientModal({ open, onClose, onSubmit, initial }) {
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
      setError('Client name is required')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        ...form,
        projects: Number(form.projects) || 0,
        since: Number(form.since) || new Date().getFullYear(),
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      title={isEdit ? 'Edit client' : 'New client'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="client-form" type="submit" loading={saving}>
            {isEdit ? 'Save changes' : 'Add client'}
          </Button>
        </>
      }
    >
      <form id="client-form" onSubmit={submit} className="space-y-4">
        <Input label="Client name" required value={form.name} onChange={set('name')} error={error} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Sector" value={form.sector} onChange={set('sector')} options={SECTORS} />
          <Select label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Projects" type="number" min="0" value={form.projects} onChange={set('projects')} />
          <Input label="Client since" type="number" value={form.since} onChange={set('since')} />
        </div>
      </form>
    </Modal>
  )
}

export default function ClientsPage() {
  const { items, loading, create, update, remove } = useCollection('clients')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((c) => {
      const okFilter = filter === 'All' || c.sector === filter
      const okSearch = !q || c.name.toLowerCase().includes(q)
      return okFilter && okSearch
    })
  }, [items, search, filter])

  const columns = [
    {
      key: 'name',
      header: 'Client',
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.name} size="sm" />
          <div>
            <p className="font-semibold text-ink">{r.name}</p>
            <p className="text-xs text-ink-soft">Since {r.since}</p>
          </div>
        </div>
      ),
    },
    { key: 'sector', header: 'Sector', render: (r) => <Badge tone="outline">{r.sector}</Badge> },
    {
      key: 'projects',
      header: 'Projects',
      align: 'right',
      render: (r) => <span className="font-semibold text-ink">{r.projects}</span>,
    },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => <RowActions onEdit={() => setEditing(r)} onDelete={() => setDeleting(r)} />,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Clients" subtitle={`${items.length} organisations`}>
        <Button icon={Plus} onClick={() => setEditing('new')}>
          Add client
        </Button>
      </PageHeader>

      <Card>
        <div className="border-b border-line p-4">
          <Toolbar search={search} onSearch={setSearch} searchPlaceholder="Search clients…">
            <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
          </Toolbar>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          empty={<EmptyState icon={Building2} title="No clients found" />}
        />
      </Card>

      <ClientModal
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
        title="Delete client?"
        message={`“${deleting?.name}” will be removed.`}
      />
    </div>
  )
}
