// Mantém instalação e ativação
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

// Cache simples de arquivos essenciais (ícones, manifesto, index)
const CACHE_NAME = "arteeducar-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Retorna do cache se disponível
      if (cachedResponse) {
        return cachedResponse;
      }
      // Se não, faz fetch normalmente
      return fetch(event.request).then(response => {
        // Salva no cache para próximas visitas
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => {
      // Se falhar, pode retornar um fallback simples (opcional)
      return caches.match("/index.html");
    })
  );
});
