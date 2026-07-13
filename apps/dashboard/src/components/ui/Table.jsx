import { cn } from '@/lib/utils'
import { Skeleton } from './Spinner'
import EmptyState from '../common/EmptyState'

/**
 * Config-driven table. `columns` is an array of:
 *   { key, header, render?(row), className?, align?, headerClassName? }
 * Rows are keyed by `row.id`.
 */
export default function DataTable({
  columns,
  rows,
  loading = false,
  rowKey = (r) => r.id,
  onRowClick,
  empty,
  skeletonRows = 6,
}) {
  const align = (a) =>
    a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left'

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-soft',
                  align(col.align),
                  col.headerClassName,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={i} className="border-b border-line/60">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5">
                    <Skeleton className="h-4 w-full max-w-[8rem]" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-14">
                {empty ?? <EmptyState title="Nothing here yet" />}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-line/60 transition-colors last:border-0',
                  onRowClick && 'cursor-pointer hover:bg-brand-gray/60',
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3.5 text-ink',
                      align(col.align),
                      col.className,
                    )}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
