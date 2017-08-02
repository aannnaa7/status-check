var HASH_DELIMITER = '#!';

/**
 * takes a list of nodes that have data-path attributes
 * and builds an array of objects that has path and whenActive properties
 *
 * @param {*} nodes
 */
function populateRoutesFromDom(nodes) {
    var routes = Array.prototype.slice.apply(nodes);
    routes = routes.map(function (route) {
        return {
            path: route.dataset.routePath,
            whenActive: route.dataset.routeWhenActive,
            searchCriteria: route.dataset.routeSearchCriteria,
            element: route,
            default: !!route.dataset.routeDefault
        }
    });
    return routes;
}

/**
 * filters out the route that matches with the current hash
 * and sets the whenActive class
 * passes on control to loadStatus function
 *
 * @param {*} routes
 * @param {*} currentHash
 */
function activeteRoute(routes, currentHash) {
    var path = currentHash.replace(HASH_DELIMITER, '');

    if (path) {
        routes.forEach(function (route) {
            if (route.path.indexOf(path) !== -1) {
                route.element.classList.add(route.whenActive);
                loadStatus(route.searchCriteria);
            } else {
                route.element.classList.remove(route.whenActive);
            }
        });
    } else {
        var defaultRoute = routes.filter(function(route) {
            return route.default;
        })[0];

        activeteRoute(routes, HASH_DELIMITER + defaultRoute.path);
    }
}

/**
 * call the api to retrieve staff that matches the searchCriteria
 *
 * @param {string} searchCriteria
 */
function loadStatus(searchCriteria) {
    console.log('loading status: ', searchCriteria);
}

function makeGetRequest(url) {
    //
}

window.addEventListener('DOMContentLoaded', () => {

    var routeItems = document.querySelectorAll('[data-route-path]'),
        routes;

    routes = populateRoutesFromDom(routeItems);

    activeteRoute(routes, location.hash);

    window.addEventListener('hashchange', function () {
        activeteRoute(routes, location.hash);
    });

});