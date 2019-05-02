this.addEventListener('install',event=>{
  event.waitUntil(
    caches.open('mycache').then(cache=>{
      cache.addAll([
         // 'index.html'
      ]);
    })
  )
})

this.addEventListener('fetch', event=>{
  // console.log(event.request.url);
  event.respondWith(
    caches.open('mycache').then(cache=>{
      return cache.match(event.request).then(res=>{
        return res || fetch(event.request).then(res=>{
          cache.put(event.request, res.clone());
          return res;
        });
      });
    })
  );
})
