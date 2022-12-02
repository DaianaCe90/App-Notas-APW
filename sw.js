const CACHE_NAME = 'cache-1';
self.addEventListener('install', evento => {
    console.log( evento );

    const respCache = caches.open(CACHE_NAME).then( cache => {
        return cache.addAll([
            'app.js',
            'index.html',
            'icons',
        ])
    })
    evento.waitUntil( respCache );

})
self.addEventListener( 'fetch', evento => {
    console.log ( evento.request );
    const respuesta = fetch ( evento.request ).then ( resNet => {
        return respNet;
    }).catch( error => {
        console.log(error);
        return caches.match( evento.request );
    })

    evento.respondWith(respuesta);
})