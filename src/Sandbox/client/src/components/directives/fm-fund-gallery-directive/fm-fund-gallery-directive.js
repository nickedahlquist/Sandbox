(function() {
    'use strict';

    angular.module('fm').directive('fmFundGallery', ['fmUtilityFunctions', function (fmUtilityFunctions) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-fund-gallery-view.html',
        scope: {
          funds: '='
        },
        link: function (scope, element, attrs) {
          scope.getNumber = fmUtilityFunctions.intToArray;
        }
      }

    }]);

})();