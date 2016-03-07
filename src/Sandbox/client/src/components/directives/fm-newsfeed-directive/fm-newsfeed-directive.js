(function() {
    'use strict';

    angular.module('fm').directive('fmNewsfeed', [function () {

      return {
        restrict: 'E',
        templateUrl: '../../../views/fm-newsfeed-view.html'
      }

    }]);

})();