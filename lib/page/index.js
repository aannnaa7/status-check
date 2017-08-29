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
<<<<<<< HEAD:public/index.html

        <link rel="stylesheet" href="https://i.icomoon.io/public/temp/9021035906/UntitledProject/style-svg.css">
        <script defer src="https://i.icomoon.io/public/temp/9021035906/UntitledProject/svgxuse.js"></script>
=======
        <script defer src="scripts/app.js"></script>
        <script> var PUSH_KEY = '${process.env.PUSH_PUBLIC}'; </script>
>>>>>>> bbe0a1951f3e3cab18f488aec40d5231fbe4279e:lib/page/index.js
    </head>
    <body>
        <header>
            <nav class="navigation" id="navigation">
                <a class="navigation__item navigation__item_active" href="#!/home/in">In office</a>
                <a class="navigation__item" href="#!/home/out">Out of office</a>
            </nav>
        </header>
<<<<<<< HEAD:public/index.html
        <button disabled class="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
        Enable Push Messaging
      </button>
        <main id="main"></main>
        
        <script src="scripts/app.js"></script>
        <script src="scripts/route.js"></script>
        <!-- <script src="scripts/main.js"></script> -->
    </body>
</html>
=======
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
>>>>>>> bbe0a1951f3e3cab18f488aec40d5231fbe4279e:lib/page/index.js
