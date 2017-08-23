module.exports = () => {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>SFL - Employee status check</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="manifest.json" rel="manifest">
        <link href="styles/style.css" rel="stylesheet">
        <script defer src="scripts/app.js"></script>
        <script> var PUSH_KEY = '${process.env.PUSH_PUBLIC}'; </script>
    </head>
    <body>
        <header>
            <nav class="navigation">
                <a class="navigation__item" href="#!/in" data-route-path="/in" data-route-when-active="navigation__item_active" data-route-search-criteria="in" data-route-default="true">In office</a>
                <a class="navigation__item" href="#!/out" data-route-path="/out" data-route-when-active="navigation__item_active" data-route-search-criteria="out">Out of office</a>
            </nav>
        </header>
        <main>
            <article class="employee">
                <div class="employee__wrapper">
                    <img class="employee__avatar" src="assets/staff/tatev.jpg" srcset="assets/staff/tatev@2x.jpg 2x, assets/staff/tatev@3x.jpg 3x" alt="Tatevik Mayilyan's avatar">
                    <h2 class="employee__name">Tatevik Mayilyan</h2>
                    <p class="employee__date">2017-03-16 22:34:56</p>
                    <button class="employee__subscribe">
                        <img class="employee__subscribe-icon" src="assets/notification-on.png" srcset="assets/notification-on@2x.png 2x, assets/notification-on@3x.png 3x">
                    </button>
                </div>
            </article>
            <article class="employee">
                <div class="employee__wrapper">
                    <img class="employee__avatar" src="assets/staff/vardges.png" srcset="assets/staff/vardges@2x.png 2x, assets/staff/vardges@3x.png 3x" alt="Vardges Stepanyan's avatar">
                    <h2 class="employee__name">Vardges Stepanyan</h2>
                    <p class="employee__date">2017-03-16 22:34:56</p>
                    <button class="employee__subscribe">
                        <img class="employee__subscribe-icon" src="assets/notification-off.png" srcset="assets/notification-off@2x.png 2x, assets/notification-off@3x.png 3x">
                    </button>
                </div>
            </article>
        </main>
        <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('./sw.js')
                    .then(function (registration) {
                        const subscribeOptions = {
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(PUSH_KEY)
                        };
                        return registration.pushManager.subscribe(subscribeOptions);
                    })
                    .then(function(pushSubscription) {
                        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
                        return pushSubscription;
                    })
                    .catch(function (err) {
                        console.error('Unable to register service worker.', err);
                    })
            }
            function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                  .replace(/\-/g, '+')
                  .replace(/_/g, '/')
                ;
                const rawData = window.atob(base64);
                return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
              }
        </script>
    </body>
</html>
    `;
};