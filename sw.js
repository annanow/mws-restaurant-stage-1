let CACHE_NAME =  "restaurant-reviews-cache";
let urlsToCache = [
  "./",
  "index.html",
  "restaurant.html",
  "css/styles.css",
  "data/restaurants.json",
  "js/dbhelper.js",
  "js/main.js",
  "js/restaurant_info.js",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    .then(self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
    .then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== CACHE_NAME) {
        console.log("[ServiceWorker] removing cached files ", cache);
        return cashes.delete(cache);
      }
    })))
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
      })
    );
  }
});
