import { apiClient } from './apiClient'

/**
 * Factory that turns a resource name into a small CRUD service.
 * Keeps every resource service consistent and one-line to define.
 */
export function createResourceService(resource) {
  return {
    list: () => apiClient.list(resource),
    get: (id) => apiClient.get(resource, id),
    create: (payload) => apiClient.create(resource, payload),
    update: (id, patch) => apiClient.update(resource, id, patch),
    remove: (id) => apiClient.remove(resource, id),
  }
}

export const productsService = createResourceService('products')
export const servicesService = createResourceService('services')
export const eventsService = createResourceService('events')
export const galleryService = createResourceService('gallery')
export const clientsService = createResourceService('clients')
export const teamService = createResourceService('team')
export const enquiriesService = createResourceService('enquiries')
export const usersService = createResourceService('users')
