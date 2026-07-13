import { useMemo, useState } from 'react'
import { Inbox } from 'lucide-react'
import { useCollection } from '@/store/DataContext'
import { timeAgo } from '@/lib/utils'

import PageHeader from '@/components/common/PageHeader'
import Toolbar, { FilterChips } from '@/components/common/Toolbar'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import { Card } from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import Avatar from '@/components/ui/Avatar'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import EnquiryDetailModal from './EnquiryDetailModal'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
]

export default function EnquiriesPage() {
  const { items, loading, update, remove } = useCollection('enquiries')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null) // enquiry being viewed
  const [deleting, setDeleting] = useState(null)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return [...items]
      .filter((e) => {
        const okFilter = filter === 'all' || e.status === filter
        const okSearch =
          !q ||
          e.name.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q)
        return okFilter && okSearch
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [items, search, filter])

  const counts = useMemo(
    () => ({
      new: items.filter((e) => e.status === 'new').length,
      open: items.filter((e) => e.status !== 'resolved').length,
    }),
    [items],
  )

  // Keep the open detail modal in sync with the live record.
  const activeRecord = active ? items.find((e) => e.id === active.id) : null

  const columns = [
    {
      key: 'name',
      header: 'From',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar name={r.name} size="sm" />
            {r.status === 'new' && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-brand-blue ring-2 ring-surface" />
            )}
          </div>
          <div className="min-w-0">
            <p className={`truncate ${r.status === 'new' ? 'font-bold' : 'font-semibold'} text-ink`}>
              {r.name}
            </p>
            <p className="truncate text-xs text-ink-soft">{r.company}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (r) => (
        <div className="min-w-0">
          <p className="truncate text-ink">{r.subject}</p>
          <p className="truncate text-xs text-ink-soft">{r.service}</p>
        </div>
      ),
    },
    { key: 'priority', header: 'Priority', render: (r) => <StatusBadge status={r.priority} /> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'createdAt',
      header: 'Received',
      align: 'right',
      render: (r) => <span className="text-xs text-ink-soft">{timeAgo(r.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => (
        <RowActions onView={() => setActive(r)} onDelete={() => setDeleting(r)} />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Enquiries" subtitle="Contact-form submissions from the website">
        <Badge tone="blue" dot>
          {counts.new} new
        </Badge>
        <Badge tone="amber" dot>
          {counts.open} open
        </Badge>
      </PageHeader>

      <Card>
        <div className="border-b border-line p-4">
          <Toolbar search={search} onSearch={setSearch} searchPlaceholder="Search enquiries…">
            <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
          </Toolbar>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          onRowClick={(r) => setActive(r)}
          empty={<EmptyState icon={Inbox} title="No enquiries" message="You're all caught up." />}
        />
      </Card>

      <EnquiryDetailModal
        enquiry={activeRecord}
        open={active != null}
        onClose={() => setActive(null)}
        onUpdate={(patch) => update(active.id, patch)}
        onDelete={() => {
          setDeleting(activeRecord)
          setActive(null)
        }}
      />

      <ConfirmDialog
        open={deleting != null}
        onClose={() => setDeleting(null)}
        onConfirm={() => remove(deleting.id)}
        title="Delete enquiry?"
        message={`The enquiry from “${deleting?.name}” will be permanently deleted.`}
      />
    </div>
  )
}
