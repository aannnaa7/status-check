var ROUTING = {
    HASH_DELIMITER: '#!',
    routes: [],
    activeRoute: 0,
    params: [],
    defaultUrl: '',

    addRoute: function(url, controller){
        url = this.HASH_DELIMITER + url;
        this.routes.push({url:url, controller:controller});
    },

    setDefault: function(url){
        this.defaultUrl = url;
    },

    getActiveRoute: function(){
        var that = this;
        that.params = [];
        var path = location.hash;
        var routes = that.routes;
        for(index = 0; index < routes.length; index++){
            var currentPath = routes[index].url;
            if(currentPath == path){
                break;
            }
        }

        if(index == routes.length){
            pathSplit = path.split("/");

            for(index = 0; index < routes.length; index++){
                var currentPath = routes[index].url;
                var currentPathSplit = currentPath.split("/");


                if(pathSplit.length == currentPathSplit.length && currentPath.indexOf(":") != -1){
                    for(i=0; i<currentPathSplit.length; i++){
                        cur = currentPathSplit[i];
                        if(cur[0]==":"){
                            cur = cur.substring(1);
                            that.params[cur] = pathSplit[i];
                        }
                    }
                    break;
                }
            }
        }

        if(index == routes.length) location.hash = that.defaultUrl;

        return index;
    },

    clearMain: function(){
        main.innerHTML = "";
    },

    activateRoute: function(index) {
        this.activeRoute = index;
        controller = this.routes[index].controller;
        if(controller == "home") APP.statusController.init(this.params);
    },

    executeDirectives: function() {
        var oldItem = document.getElementsByClassName('navigation__item_active')[0];
        if(oldItem)
        oldItem.classList.remove('navigation__item_active');

        document.querySelector("a[href='"+location.hash+"']").classList.add("navigation__item_active");
    },

    initializeHashChangeListener: function(){
        that = this;
        window.addEventListener('hashchange', function () {
            that.run();
        });
    },

    run: function() {
        // set up hash change listener
        this.initializeHashChangeListener();
        // iterate over routes and get which is active
        var activeRoute = this.getActiveRoute();

        // clean the element which will hold the route template
        this.clearMain();

        // initialize the route controller with params extracted from URL
        this.activateRoute(activeRoute);

        // execute other directives like when-route-active
        this.executeDirectives();
    },

    onHashChanged: function(){
        // iterate over routes and get which is active
        var activeRoute = this.getActiveRoute();

        // clean the element which will hold the route template
        this.clearMain();

        // initialize the route controller with params extracted from URL
        this.activateRoute(activeRoute);

        // execute other directives like when-route-active
        this.executeDirectives();
    }
}

ROUTING.addRoute('/home/:status','home');
ROUTING.addRoute('/home/:status','home');
ROUTING.setDefault('#!/home/in');
ROUTING.run();