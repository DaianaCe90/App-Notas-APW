const CACHE_NAME = 'cache-1';

self.addEventListener('install', evento => {
    console.log( evento );

    const cache = caches.open(CACHE_NAME).then( cache => {
        return cache.addAll([
            'app.js',
            'index.html',
            'tacho.png',
            'styles.css',
        ])
    })
    evento.waitUntil( cache );

})
self.addEventListener( 'fetch', evento => {

    const respuestaCache = caches.match(evento.request).then( res =>{
        if(res) {
            return res;
        } else {
            return fetch( evento.request).then (respuesta => {

                caches.open( CACHE_NAME ).then( cache => {
                    cache.put(evento.request, respuesta)
                })
                return respuesta.clone()
            })
        }
    })
    evento.respondWith(respuestaCache);
}) 