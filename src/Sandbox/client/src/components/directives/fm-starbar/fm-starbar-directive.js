(function () {
  'use strict';

  angular.module('fm').directive('fmStarBar', ['fmUtilityFunctions', function (fmUtilityFunctions) {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-starbar-view.html',
      scope: {
        stars: "="
      },
      link: function (scope, element, attrs) {
        var utils = fmUtilityFunctions;
        scope.getNumber = utils.intToArray;
      }
    }

  }]);

})();