Agora vou criar o conteúdo completo dos arquivos para você colocar na pasta `pequenos-artistas`:

---

### index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pequenos Artistas</title>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#FF8C00">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Bem-vindo ao Pequenos Artistas!</h1>
  <p>Aprenda arte de forma divertida com pinturas e atividades interativas.</p>

  <script src="app.js"></script>
  <script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso!'))
      .catch(err => console.log('Erro ao registrar Service Worker:', err));
  }
  </script>
</body>
</html>
```

### manifest.json
```json
{
  "id": "/arteeducar-pwa",
  "name": "Pequenos Artistas",
  "short_name": "Artistas",
  "description": "Aprenda arte de forma divertida com jogos, pinturas e atividades interativas para crianças.",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#FFD700",
  "theme_color": "#FF8C00",
  "orientation": "portrait",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "categories": ["education", "kids", "art"],
  "lang": "pt-BR"
}
```

### service-worker.js
```javascript
const CACHE_NAME = 'pequenos-artistas-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
```

### styles.css (básico)
```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #FFF8DC;
  color: #333;
  margin: 0;
  padding: 2rem;
}
h1 {
  color: #FF8C00;
}
```

### app.js (vazio por enquanto)
```javascript
// Arquivo JS do Pequenos Artistas
console.log('App iniciado');
```

### icons/
- Coloque os arquivos de ícones PNG nesta pasta:
  - icon-192x192.png
  - icon-512x512.png
  - maskable-icon-512x512.png

