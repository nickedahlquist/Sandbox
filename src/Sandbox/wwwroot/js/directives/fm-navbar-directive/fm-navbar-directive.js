(function() {
    'use strict';

    angular.module('fm').directive('fmNavbar', ['$rootScope', '$navlinksService', 'FmAuthtokenFactory', function ($rootScope, $navlinksService, FmAuthtokenFactory) {

      return {
        restrict: 'E',
        templateUrl: '../../../views/fm-navbar-view.html',
        link: function (scope, elem, attrs) {

          scope.navbarlinks = $navlinksService.links;

          scope.isAuthenticated = function () {
            return FmAuthtokenFactory.isAuthenticated();
          }

          scope.logOut = function () {
            FmAuthtokenFactory.removeToken();
          }
        }
      }

    }]);

})();
//# sourceMappingURL=fm-navbar-directive.js.map
