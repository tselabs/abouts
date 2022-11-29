import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { useMarkdown } from './utils/markdown-sw'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

declare let self: ServiceWorkerGlobalScope

async function updateMarkdown(
  cache: Cache,
  req: Request,
  url: string
): Promise<void> {
  try {
    const article = await renderMarkdown(url)
    await cache.put(
      req,
      new Response(JSON.stringify({ err: false, r: article }))
    )
  } catch {}
}

async function renderMarkdown(url: string): Promise<[string, any]> {
  const cache = await caches.open('article-cache')
  try {
    const res = await fetch(url)
    await cache.put(url, res.clone())
    const [md, file] = await useMarkdown(await res.text())
    return [md, file.data]
  } catch {
    const res = await cache.match(url)
    if (res == null) {
      throw new Error('not found article raw')
    }
    const [md, file] = await useMarkdown(await res.text())
    return [md, file.data]
  }
}

registerRoute(
  (opts) => {
    return opts.url.pathname.startsWith('/__sw/render')
  },
  async (r) => {
    try {
      const cache = await caches.open('article-render-cache')
      const resp = await cache.match(r.request)
      if (resp != null) {
        void updateMarkdown(cache, r.request, r.url.pathname.slice(12))
        return resp
      }
      const re = await renderMarkdown(r.url.pathname.slice(12))
      const res = new Response(JSON.stringify({ err: false, r: re }))
      await cache.put(r.request, res.clone())
      return res
    } catch (e: any) {
      return new Response(JSON.stringify({ err: true, r: e }))
    }
  },
  'GET'
)

registerRoute(
  /^.*(\.woff|\.otf|\.ttf|\.woff2)$/,
  new CacheFirst({
    cacheName: 'font-cache-v2',
    plugins: [
      new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 31536e3 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
)

registerRoute(
  (opts) => {
    return (
      !opts.url.pathname.startsWith('/__sw/render') &&
      /^.*(\.md|\.markdown)$/i.test(opts.url.pathname)
    )
  },
  new StaleWhileRevalidate({
    cacheName: 'article-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 300, maxAgeSeconds: 31536e3 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
)

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    event.waitUntil(self.skipWaiting())
  }
})

precacheAndRoute(self.__WB_MANIFEST)

export {}
