var CACHE = 'static-v1';

var urlsToCache = [
    '/images',
    '/images/icon-72x72.png',
    '/images/icon-96x98.png',
    '/images/icon-128x128.png',
    '/images/icon-152x152.png',
    '/images/icon-192x192.png',
    '/images/icon-384x384.png',
    '/images/icon-512x512.png',
    '/index.html'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

const offlineFallbackPage = "index.html";

// If any fetch fails, it will show the offline page.
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;
    
    event.respondWith(
        fetch(event.request).catch(function (error) {
        // The following validates that the request was for a navigation to a new document
        if (
            event.request.destination !== "document" ||
            event.request.mode !== "navigate"
        ) {
            return;
        }
  
        console.error("[PWA Builder] Network request Failed. Serving offline page " + error);
        return caches.open(CACHE).then(function (cache) {
          return cache.match(offlineFallbackPage);
        });
      })
    );
  });
  
  // This is an event that can be fired from your page to tell the SW to update the offline page
  self.addEventListener("refreshOffline", function () {
    const offlinePageRequest = new Request(offlineFallbackPage);
  
    return fetch(offlineFallbackPage).then(function (response) {
      return caches.open(CACHE).then(function (cache) {
        console.log("[PWA Builder] Offline page updated from refreshOffline event: " + response.url);
        return cache.put(offlinePageRequest, response);
      });
    });
  });