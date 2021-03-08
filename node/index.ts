import {
  ClientsConfig,
  LRUCache,
  method,
  Service,
  ServiceContext,
  Cached,
} from '@vtex/api'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, Cached>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    pushnewsSDKWorker: {
      memoryCache,
    }
  },
}

async function worker(ctx: ServiceContext, next: () => Promise<unknown>) {
  ctx.status = 200
  ctx.set('content-type', 'application/javascript; charset=utf-8')
  ctx.set('cache-control', 'public, max-age=7200')
  ctx.body = `importScripts('https://cdn.pn.vg/push/pushnews-sw-raw.js');`
  await next()
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    pushnewsSDKWorker: method({
      GET: [worker],
    }),
  },
})
