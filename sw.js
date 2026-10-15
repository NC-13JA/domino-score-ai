// Temporary cleanup worker: remove the previous offline cache, then unregister.
// Score data is stored separately in localStorage and is intentionally preserved.
self.addEventListener("install", event => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("domino-score-ai-")).map(key => caches.delete(key)));
    await self.registration.unregister();
    await self.clients.claim();
  })());
});
