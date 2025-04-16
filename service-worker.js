// This is the cache name and files to cache
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/xematiazoicon192.png',
  '/xematiazoicon.png',
  '/manifest.json',
  '/styles.css', // Include if you have external CSS files
  '/script.js' // Include if you have external JS files
];

// Install event - cache the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached file if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch the request from the network
        return fetch(event.request);
      })
  );
});

// Activate event - remove old caches if any
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
