(function() {
    'use strict';

    angular.module('fm').directive('fmNavbar', ['$rootScope', '$navlinksService', 'fmAuthtokenFactory', function ($rootScope, $navlinksService, fmAuthtokenFactory) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-navbar-view.html',
        link: function (scope, elem, attrs) {

          scope.navbarlinks = $navlinksService.links;

          scope.isAuthenticated = function () {
            return fmAuthtokenFactory.isAuthenticated();
          }

          scope.logOut = function () {
            fmAuthtokenFactory.removeToken();
          }
        }
      }

    }]);

})();