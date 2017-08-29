'use strict';

var NOTIFICATION = (function () {
  var applicationServerPublicKey = null;
  var isSubscribed = null;
  var swRegistration = null;

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function initialise(callback){
    isSubscribed = false;
    applicationServerPublicKey = PUSH_KEY;

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
      .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        
        swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          isSubscribed = !(subscription === null);
          
          if (isSubscribed) {
            callback(true, true, JSON.stringify(subscription));
          } else {
            callback(true, false, null);
          }
        });
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
    } else {
      console.warn('Push messaging is not supported');
      callback(false, false, null);
    }
  }

  function subscribeUser(callback) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      isSubscribed = true;

      callback(true, JSON.stringify(subscription));
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      callback(false, null);
    });

  }

  return {init:initialise, subscribe: subscribeUser};

}());