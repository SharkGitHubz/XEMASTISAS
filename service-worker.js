const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',  // Home page
    '/XEMASTISAS/',  // Add this if this is the starting URL
    '/index.html',  // Add any other important pages you want cached
    '/style.css',  // Add your CSS file(s)
    '/xematiazoicon.png',  // Add any important images/icons
    '/xematiazoicon192.png',  // Add your other image sizes
    '/script.js',  // Add your JS file(s)
    '/manifest.json',  // Make sure manifest is cached
    // Add any other assets you want cached
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
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
