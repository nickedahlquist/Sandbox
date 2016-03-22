(function () {
    'use strict';

    angular.module('fm').factory('fmUtilityFunctions', [function () {
      return {
        intToArray: function (number) {
          return new Array(number);
        }
      }
    }]);

})();
