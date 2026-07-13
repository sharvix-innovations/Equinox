import { useMemo, useState } from 'react'
import { Plus, Package, Star } from 'lucide-react'
import { useCollection } from '@/store/DataContext'
import { formatCurrency } from '@/lib/utils'

import PageHeader from '@/components/common/PageHeader'
import Toolbar, { FilterChips } from '@/components/common/Toolbar'
import RowActions from '@/components/common/RowActions'
import EmptyState from '@/components/common/EmptyState'
import { Card } from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import ProductFormModal from './ProductFormModal'

const FILTERS = ['All', 'Monitoring', 'Treatment', 'Testing', 'Software']

export default function ProductsPage() {
  const { items, loading, create, update, remove } = useCollection('products')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [editing, setEditing] = useState(null) // record | 'new' | null
  const [deleting, setDeleting] = useState(null)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((p) => {
      const matchesFilter = filter === 'All' || p.category === filter
      const matchesSearch = !q || p.name.toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })
  }, [items, search, filter])

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (r) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gray text-brand-green">
            <Package className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-semibold text-ink">{r.name}</span>
              {r.featured && <Star className="h-3.5 w-3.5 fill-warning text-warning" />}
            </div>
            <p className="truncate text-xs text-ink-soft">{r.short}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Category', render: (r) => <Badge tone="outline">{r.category}</Badge> },
    { key: 'price', header: 'Price', align: 'right', render: (r) => formatCurrency(r.price) },
    {
      key: 'stock',
      header: 'Stock',
      align: 'right',
      render: (r) =>
        r.stock === 0 ? (
          <span className="font-medium text-danger">Out</span>
        ) : (
          <span className="text-ink">{r.stock > 900 ? '∞' : r.stock}</span>
        ),
    },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (r) => (
        <RowActions onEdit={() => setEditing(r)} onDelete={() => setDeleting(r)} />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Products" subtitle={`${items.length} products in your catalog`}>
        <Button icon={Plus} onClick={() => setEditing('new')}>
          Add product
        </Button>
      </PageHeader>

      <Card>
        <div className="border-b border-line p-4">
          <Toolbar search={search} onSearch={setSearch} searchPlaceholder="Search products…">
            <FilterChips options={FILTERS} value={filter} onChange={setFilter} />
          </Toolbar>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          empty={
            <EmptyState
              icon={Package}
              title="No products found"
              message="Try a different search or filter, or add a new product."
              action={
                <Button icon={Plus} onClick={() => setEditing('new')}>
                  Add product
                </Button>
              }
            />
          }
        />
      </Card>

      <ProductFormModal
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
        title="Delete product?"
        message={`“${deleting?.name}” will be permanently removed from the catalog.`}
      />
    </div>
  )
}
