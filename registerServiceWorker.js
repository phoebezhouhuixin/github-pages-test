// register the service worker
window.onload = async () => {
  'use strict';


  if ('serviceWorker' in navigator) {
    console.log("1. Registering the service worker");
    console.log("1.1 window.location.pathname: ", window.location.pathname);
    // let registeredWorker = await navigator.serviceWorker.register('./sw.js');
    let registeredWorker = await navigator.serviceWorker.register(`${window.location.pathname}sw.js`);

    console.log("7. Registered worker with scope: ", registeredWorker.scope)
    registeredWorker.addEventListener('updatefound', () => {
      // An updated service worker has appeared in reg.installing
      let newWorker = registeredWorker.installing;

      newWorker.addEventListener('statechange', () => {
        // Has service worker state changed?
        switch (newWorker.state) {
          case 'installed':

            // There is a new service worker available, show the notification
            if (navigator.serviceWorker.controller) {
              console.log("Update detected");
              let notification = document.getElementById('notification');
              notification.className = 'show';
            }
            break;
        }
      });

      document.getElementById('reload').addEventListener('click', function () {
        newWorker.postMessage({ action: 'skipWaiting' });
      });
    })

    let refreshing;
    // The event listener that is fired when the service worker updates
    // Here we reload the page
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });

  }
}