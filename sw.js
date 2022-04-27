const staticCacheName = 'static-v1.0.0';
const dynamicCacheName = 'dynamic-v1.0.0';
const assets = [
    '/'
]

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener ('fetch', evt => {
   //consele.log(' fetch event', evt);
    evt.respondwith(
      caches.natch(evt.request).then (cacheRes => {
        return cachekes || fetch(evt.request).then (fetchRes => {
          return caches.open(dynantcCacheName). then (cache => {
           cache. put (evt.request.url, fetchRes.clone ());
           // check cached ILens size
           limitcachestze(dynantccacheName, 100);
           return fetchRes;
          })
          });
        }).catch(() =>{
        return caches.match('/fallback.htnl');
        })
      );
  });