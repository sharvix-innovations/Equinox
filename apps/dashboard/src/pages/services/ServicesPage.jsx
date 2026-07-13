import { useMemo, useState } from 'react'
import { Plus, Wrench } from 'lucide-react'
import { useCollection } from '@/store/DataContext'

import PageHeader from '@/components/common/PageHeader'
import Toolbar, { FilterChips } from '@/components/common/Toolbar'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import { Card } from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import ServiceFormModal from './ServiceFormModal'

const FILTERS = ['All', 'Clearances', 'Studies & Audits', 'Treatment', 'Monitoring', 'Compliance']

export default function ServicesPage() {
  const { items, loading, create, update, remove } = useCollection('services')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((s) => {
      const okFilter = filter === 'All' || s.group === filter
      const okSearch = !q || s.title.toLowerCase().includes(q)
      return okFilter && okSearch
    })
  }, [items, search, filter])

  const columns = [
    {
      key: 'title',
      header: 'Service',
      render: (r) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gray text-brand-green">
            <Wrench className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{r.title}</p>
            <p className="truncate text-xs text-ink-soft">{r.short}</p>
          </div>
        </div>
      ),
    },
    { key: 'group', header: 'Group', render: (r) => <Badge tone="outline">{r.group}</Badge> },
    {
      key: 'enquiries',
      header: 'Enquiries',
      align: 'right',
      render: (r) => <span className="font-semibold text-ink">{r.enquiries ?? 0}</span>,
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
      <PageHeader title="Services" subtitle={`${items.length} service offerings`}>
        <Button icon={Plus} onClick={() => setEditing('new')}>
          Add service
        </Button>
      </PageHeader>

      <Card>
        <div className="border-b border-line p-4">
          <Toolbar search={search} onSearch={setSearch} searchPlaceholder="Search services…">
            <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
          </Toolbar>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          empty={
            <EmptyState
              icon={Wrench}
              title="No services found"
              message="Adjust your filters or add a new service."
            />
          }
        />
      </Card>

      <ServiceFormModal
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
        title="Delete service?"
        message={`“${deleting?.title}” will be removed from the website.`}
      />
    </div>
  )
}
