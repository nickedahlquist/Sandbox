(function() {
    'use strict';

    angular.module('fm').directive('fmNewsfeed', [function () {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-newsfeed-view.html',
        scope: {
          news: "="
        },
        link: function (scope, element, attrs) {

        }
      }

    }]);

})();
//# sourceMappingURL=fm-newsfeed-directive.js.map
