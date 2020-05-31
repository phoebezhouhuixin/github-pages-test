let cacheName = 'sw2'; // Q: What if you change the html, 
// but the service worker has already cached the files,
// thus the webpage loads fromm the cache, and the changes to the html do not show?
// A: Change the cache name 
// in order for the service worker to detect that the files are new, 
// and hence cache the files again when the user refreshes the page. 





let filesToCache = [
  "./", // "./js", "./css", "./scss", "./images",
  "./index.html", "./plants.html", "./animals.html", "./insects.html",
  "./trails.html", "./contact.html", "./about.html",
  "./idb.js", "./db.js", "./diarydb.js",

  "images/about.jpg",
  "images/croc.jpg",
  "images/crocsmall.jpg",
  "images/damselfly.jpg",
  "images/damselflysmall.jpg",
  "images/events.jpg",
  "images/fishpoison.jpg",
  "images/fishpoisonsmall.jpg",
  "images/fishtailpalm.jpg",
  "images/fishtailpalmsmall.jpg",
  "images/img_1.jpg",
  "images/img_2.jpg",
  "images/img_3.jpg",
  "images/mudskipper.jpg",
  "images/mudskippersmall.jpg",
  "images/seaalmond.jpg",
  "images/seaalmondsmall.jpg",
  "images/simpohair.jpg",
  "images/simpohairsmall.jpg",
  "images/treeclimbingcrab.jpg",
  "images/treeclimbingcrabsmall.jpg",
  "images/weaverant.jpg",
  "images/weaverantsmall.jpg"
]

/* 
start the service worker, when the user access
the website online. This will add the all the files 
listed in filesToCache to the browser cache.

*/
self.addEventListener('install', function (e) {
  console.log("2. Inside sw.js, on install")
  console.log("3. cacheName", cacheName);
  console.log("4. caches.open(cacheName): ", caches.open(cacheName));
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("5. Adding files to cache");
      //console.log("6. cache.addAll(filesToCache:", cache.addAll(filesToCache));
      return cache.addAll(filesToCache);
    })
  )}
)

/*
If offline or if the file exists in the cache, then it will fetch the files from cache
*/
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request, { cacheName: cacheName }).then(function (response) {
      console.log("Fetching " + e.request.url);
      return response || fetch(e.request)
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});