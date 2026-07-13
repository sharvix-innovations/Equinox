/**
 * ============================================================
 * Mock API client.
 *
 * Simulates a REST backend over the in-memory seed (src/mocks/db.js)
 * with artificial latency and immutable responses. Every resource
 * service (products, events, …) goes through this one module.
 *
 * TO GO LIVE: replace the bodies below with real `fetch` calls to
 * your API (e.g. `fetch(`${BASE_URL}/${resource}`)`). The public
 * signatures  list/get/create/update/remove  are already the shape
 * a REST client would expose, so callers won't change.
 * ============================================================
 */
import { seed } from '@/mocks/db'
import { clone, uid } from '@/lib/utils'

// Working copy  mutations happen here, not on the pristine seed.
let store = clone(seed)

const LATENCY = 320 // ms  feels like a real network without being annoying
const delay = (ms = LATENCY) => new Promise((res) => setTimeout(res, ms))

function ensure(resource) {
  if (!store[resource]) store[resource] = []
  return store[resource]
}

export const apiClient = {
  /** GET /:resource */
  async list(resource) {
    await delay()
    return clone(ensure(resource))
  },

  /** GET /:resource/:id */
  async get(resource, id) {
    await delay(180)
    const found = ensure(resource).find((r) => r.id === id)
    if (!found) throw new Error(`${resource} ${id} not found`)
    return clone(found)
  },

  /** POST /:resource */
  async create(resource, payload) {
    await delay()
    const record = {
      id: uid(resource.slice(0, 3)),
      createdAt: new Date().toISOString(),
      ...payload,
    }
    ensure(resource).unshift(record)
    return clone(record)
  },

  /** PATCH /:resource/:id */
  async update(resource, id, patch) {
    await delay()
    const list = ensure(resource)
    const idx = list.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error(`${resource} ${id} not found`)
    list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() }
    return clone(list[idx])
  },

  /** DELETE /:resource/:id */
  async remove(resource, id) {
    await delay()
    const list = ensure(resource)
    const idx = list.findIndex((r) => r.id === id)
    if (idx === -1) throw new Error(`${resource} ${id} not found`)
    const [removed] = list.splice(idx, 1)
    return clone(removed)
  },

  /** Escape hatch for non-CRUD reads (analytics, etc.). */
  async raw(fn, ms = LATENCY) {
    await delay(ms)
    return fn(store)
  },

  /** Reset the working copy back to the pristine seed (used by demos/tests). */
  reset() {
    store = clone(seed)
  },
}
