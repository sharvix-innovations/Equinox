import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  productsService,
  servicesService,
  eventsService,
  galleryService,
  clientsService,
  teamService,
  enquiriesService,
  usersService,
} from '@/services/resource.service'
import { useToast } from './ToastContext'

const DataContext = createContext(null)

// Maps a resource key to its service + a friendly singular label for toasts.
const RESOURCES = {
  products: { service: productsService, label: 'Product' },
  services: { service: servicesService, label: 'Service' },
  events: { service: eventsService, label: 'Event' },
  gallery: { service: galleryService, label: 'Image' },
  clients: { service: clientsService, label: 'Client' },
  team: { service: teamService, label: 'Member' },
  enquiries: { service: enquiriesService, label: 'Enquiry' },
  users: { service: usersService, label: 'User' },
}

const EMPTY = Object.fromEntries(Object.keys(RESOURCES).map((k) => [k, []]))

export function DataProvider({ children }) {
  const toast = useToast()
  const [data, setData] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load every collection in parallel on mount.
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const keys = Object.keys(RESOURCES)
        const results = await Promise.all(keys.map((k) => RESOURCES[k].service.list()))
        if (!alive) return
        const next = {}
        keys.forEach((k, i) => (next[k] = results[i]))
        setData(next)
      } catch (err) {
        if (alive) setError(err)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const create = useCallback(
    async (resource, payload) => {
      const { service, label } = RESOURCES[resource]
      try {
        const record = await service.create(payload)
        setData((d) => ({ ...d, [resource]: [record, ...d[resource]] }))
        toast.success(`${label} created`)
        return record
      } catch (err) {
        toast.error(err.message || `Could not create ${label.toLowerCase()}`)
        throw err
      }
    },
    [toast],
  )

  const update = useCallback(
    async (resource, id, patch) => {
      const { service, label } = RESOURCES[resource]
      try {
        const record = await service.update(id, patch)
        setData((d) => ({
          ...d,
          [resource]: d[resource].map((r) => (r.id === id ? record : r)),
        }))
        toast.success(`${label} updated`)
        return record
      } catch (err) {
        toast.error(err.message || `Could not update ${label.toLowerCase()}`)
        throw err
      }
    },
    [toast],
  )

  const remove = useCallback(
    async (resource, id) => {
      const { service, label } = RESOURCES[resource]
      // Optimistic removal with rollback on failure.
      const prev = data[resource]
      setData((d) => ({ ...d, [resource]: d[resource].filter((r) => r.id !== id) }))
      try {
        await service.remove(id)
        toast.success(`${label} deleted`)
      } catch (err) {
        setData((d) => ({ ...d, [resource]: prev }))
        toast.error(err.message || `Could not delete ${label.toLowerCase()}`)
        throw err
      }
    },
    [data, toast],
  )

  const value = useMemo(
    () => ({ data, loading, error, create, update, remove }),
    [data, loading, error, create, update, remove],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within <DataProvider>')
  return ctx
}

/** Convenience hook scoped to a single resource collection. */
export function useCollection(resource) {
  const { data, loading, create, update, remove } = useData()
  return {
    items: data[resource] ?? [],
    loading,
    create: (payload) => create(resource, payload),
    update: (id, patch) => update(resource, id, patch),
    remove: (id) => remove(resource, id),
  }
}
