(function() {
    'use strict';

    angular.module('fm').directive('fmNewsfeed', ['fmUtilityFunctions', '$sanitize', function (fmUtilityFunctions, $sanitize) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-newsfeed-view.html',
        scope: {
          news: "="
        },
        link: function (scope, element, attrs) {
          
          for (var key in scope.news) {
            var title = scope.news[key].Title.split(' - ')[0];
            scope.news[key].Title = (title.length > 250) ? fmUtilityFunctions.truncateText(250, title) : title;
            scope.news[key].Excerpt = fmUtilityFunctions.truncateText(250, $sanitize(scope.news[key].NewsText));
            scope.news[key].Tag = (scope.news[key].Socialtags.length > 0) ? scope.news[key].Socialtags[0].SocialTag : undefined;
          }
        }
      }

    }]);

})();
//# sourceMappingURL=fm-newsfeed-directive.js.map
