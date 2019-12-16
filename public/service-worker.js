const FILES_TO_CACHE = [
  "/",
  "/favicon.ico",
  "/index.html",
  "/manifest.webmanifest",
  "/db.js",
  "/style.css",
  "/index.js",
  "icons/android-icon-36x36.png",
  "icons/android-icon-48x48.png",
  "icons/android-icon-72x72.png",
  "icons/android-icon-96x96.png",
  "icons/android-icon-144x144.png",
  "icons/android-icon-192x192.png"
]

const CACHE_NAME = "app-cache-v1";

// install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

});

self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(event.request);
          });
      }).catch(err => {
        console.log(err)
      })
    );
    return;
  }
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request);
      });
    })
  );
});

// self.addEventListener("fetch", event => {
//   if (event.request.url.includes("/api/")) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(cache => {
//         return fetch(event.request)
//           .then(response => {
//             // If the response was good, clone it and store it in the cache.
//             cache.put(event.request.url, response);

//             return response.clone();
//           })
//           .catch(err => {
//             // Network request failed, try to get it from the cache.
//               return cache.match(event.request);
//           });
//       }).catch(err => {
//         console.log(err)
//       })
//     );

//     return;
//   }

//   event.respondWith(
//     caches.open(CACHE_NAME).then(cache => {
//       return cache.match(event.request).then(response => {
//         return response || fetch(event.request);
//       });
//     })
//   );
// });
