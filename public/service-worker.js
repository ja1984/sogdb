const CACHE_NAME = 'sogdb';

self.addEventListener('fetch', (event) => {
  console.log('THIS IS SW YEAH', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((cresponse) => {
          // Check if we received a valid response
          if (!cresponse || cresponse.status !== 200) {
            return cresponse;
          }

          if (!event.request.url.includes('https://raw.githubusercontent.com/ja1984/sogdb') && !event.request.url.includes('fonts.gstatic.com')) {
            return cresponse;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          const responseToCache = cresponse.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return cresponse;
        });
      }),
  );
});
