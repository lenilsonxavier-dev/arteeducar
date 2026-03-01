self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

const CACHE_NAME = "arteeducar-cache-v1";
const URLS_TO_CACHE = [
  "/pequenos_artistas_pwa/",
  "/pequenos_artistas_pwa/index.html",
  "/pequenos_artistas_pwa/manifest.json",
  "/pequenos_artistas_pwa/icons/icon-192.png",
  "/pequenos_artistas_pwa/icons/icon-512.png"
];

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => caches.match("/pequenos_artistas_pwa/index.html"))
  );
});
