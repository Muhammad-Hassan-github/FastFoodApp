const CACHE_NAME = 'fast-food-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/icon/icon-192.png',
  '/icon/icon-512.png',
  '/itemimages/burger.jpg',
  '/itemimages/shawarma.jpg',
  '/itemimages/zinger.jpg',
  '/itemimages/fries.jpg',
  // add your CSS file(s) here if you have any
];

// Install event - cache everything listed above
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - clean up old caches if any
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event - respond with cached resources or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
