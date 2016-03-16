(function() {
    'use strict';

    angular.module('fm').directive('fmHeroImage', [function () {

      return {
        restrict: 'E',
        templateUrl: '../../../views/fm-hero-view.html',
        link: function (scope, elem, attrs) {
          scope.title = 'Framtiden i fokus';
          scope.subtitle = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
        }
      }

    }]);

})();