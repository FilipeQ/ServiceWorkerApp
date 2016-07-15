const CACHE_VERSION = 'v3';
const PATTERN = new RegExp("css|js|html");
let paths = [
    '/',
    '/stylesheets/style.css',
    '/javascripts/init.js',
    '/offline.html'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(paths);
            })
    )
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (CACHE_VERSION.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(function (response) {
                if(response){
                    /*
                    Inicio - Remover caso prefira atualizar o service work pela versão
                    * */
                    const requestURL = new URL(e.request.url);
                    if (PATTERN.test(requestURL)) {
                        console.log("update: "+e.request.url);
                        fetchAndSaveCache(e);
                    }
                    /*
                     Fim - Remover caso prefira atualizar o service work pela versão
                     * */
                    return response;
                }

                return fetchAndSaveCache(e)
                    .then(function (response) {
                        return response;
                    })
                    .catch(function (erro) {
                        return caches.match('/offline.html');
                    })
            })
    )
});

function fetchAndSaveCache(e) {
    let fetchRequest = e.request.clone();

    return fetch(fetchRequest)
        .then(function (response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_VERSION)
                .then(function(cache) {
                    cache.put(e.request, responseToCache);
                });
            return response;
        })

}