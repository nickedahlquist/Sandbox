(function () {
    'use strict';

    angular.module('fm').service('$navlinksService', ['$route', function ($route) {

      this.routes = [];

      for (var key in $route.routes) {
        if ($route.routes.hasOwnProperty(key) && $route.routes[key].title !== undefined) {
          this.routes.push({ title: $route.routes[key].title, url: '#' + $route.routes[key].originalPath });
        }
      }

    }]);

})();
//# sourceMappingURL=fm-navlinks-service.js.map
