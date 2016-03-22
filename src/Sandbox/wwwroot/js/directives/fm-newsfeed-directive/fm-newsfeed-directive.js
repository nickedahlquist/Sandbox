(function() {
    'use strict';

    angular.module('fm').directive('fmNewsfeed', ['fmDataService', function (fmDataService) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-newsfeed-view.html',
        link: function (scope, elem, attrs) {

         fmDataService.then(function (data) {
           scope.news = data.newsitems;
         });

        }
      }

    }]);

})();
//# sourceMappingURL=fm-newsfeed-directive.js.map
