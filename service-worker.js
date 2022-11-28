const cacheName = 'ginkobusPWA-v1';
    const appShellFiles = [ 
            "icons/favicon.ico"
    ];
self.addEventListener('install', (e) => {
  console.log('[Service worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Workeer] Caching all : app shell and content');
    await cache.addAll(appShellFiles);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
