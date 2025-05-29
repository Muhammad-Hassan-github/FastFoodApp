const CACHE_NAME = 'app-cache-v4'; // 🔁 Change on every update
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Force activation
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    ).then(() => self.clients.claim())
     .then(() => {
       return self.clients.matchAll().then(clients => {
         clients.forEach(client => client.navigate(client.url)); // 🔁 Force refresh
       });
     })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
