(function() {
    'use strict';

    angular.module('fm').directive('fmHeroImage', [function () {

      return {
        restrict: 'E',
        templateUrl: '../../../views/fm-hero-view.html',
        link: function (scope, elem, attrs) {
          scope.title = 'Fräsig Rubrik';
          scope.subtitle = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
        }
      }

    }]);

})();