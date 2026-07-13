import { useMemo, useState } from 'react'
import { Plus, CalendarDays, MapPin, Users } from 'lucide-react'
import { useCollection } from '@/store/DataContext'
import { formatDate } from '@/lib/utils'

import PageHeader from '@/components/common/PageHeader'
import Toolbar, { FilterChips } from '@/components/common/Toolbar'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import { Card } from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import EventFormModal from './EventFormModal'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

export default function EventsPage() {
  const { items, loading, create, update, remove } = useCollection('events')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items
      .filter((e) => {
        const okFilter = filter === 'all' || e.status === filter
        const okSearch = !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
        return okFilter && okSearch
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [items, search, filter])

  const columns = [
    {
      key: 'title',
      header: 'Event',
      render: (r) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gray text-brand-green">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">{r.title}</p>
            <p className="flex items-center gap-1 truncate text-xs text-ink-soft">
              <MapPin className="h-3 w-3" /> {r.location}
            </p>
          </div>
        </div>
      ),
    },
    { key: 'date', header: 'Date', render: (r) => formatDate(r.date) },
    {
      key: 'registrations',
      header: 'Registrations',
      render: (r) => {
        const pct = r.capacity ? Math.min(100, Math.round((r.registrations / r.capacity) * 100)) : 0
        return (
          <div className="w-40">
            <div className="mb-1 flex items-center justify-between text-xs text-ink-soft">
              <span className="inline-flex items-center gap-1 font-medium text-ink">
                <Users className="h-3 w-3" /> {r.registrations}
              </span>
              <span>/ {r.capacity}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      },
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
      <PageHeader title="Events" subtitle={`${items.length} events & workshops`}>
        <Button icon={Plus} onClick={() => setEditing('new')}>
          Add event
        </Button>
      </PageHeader>

      <Card>
        <div className="border-b border-line p-4">
          <Toolbar search={search} onSearch={setSearch} searchPlaceholder="Search events…">
            <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
          </Toolbar>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          empty={<EmptyState icon={CalendarDays} title="No events found" />}
        />
      </Card>

      <EventFormModal
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
        title="Delete event?"
        message={`“${deleting?.title}” will be removed from the events page.`}
      />
    </div>
  )
}
