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

        <link rel="stylesheet" href="https://i.icomoon.io/public/temp/9021035906/UntitledProject/style-svg.css">
        <script defer src="https://i.icomoon.io/public/temp/9021035906/UntitledProject/svgxuse.js"></script>
    </head>
    <body>
        <header>
            <nav class="navigation" id="navigation">
                <a class="navigation__item navigation__item_active" href="#!/home/in">In office</a>
                <a class="navigation__item" href="#!/home/out">Out of office</a>
            </nav>
        </header>
        <button disabled class="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
        Enable Push Messaging
      </button>
        <main id="main"></main>
        <script> var PUSH_KEY = '${process.env.PUSH_PUBLIC}'; </script>
        <script src="scripts/app.js"></script>
        <script src="scripts/route.js"></script>
    </body>
</html>
