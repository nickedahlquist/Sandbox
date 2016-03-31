(function() {
    'use strict';

    angular.module('fm').directive('fmBulletinSlider', ['fmDataService', '$timeout', function (fmDataService, $timeout) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-bulletin-slider-view.html',
        link: function (scope, element, attrs) {

          scope.up = [];
          scope.down = [];
          fmDataService.then(function (data) {
            scope.yields = data.funds;

            for (var key in scope.yields) {
              if (scope.yields.hasOwnProperty(key)) {

                if (scope.yields[key].yield[0] === '+') {
                  scope.up.push(scope.yields[key]);
                } else {
                  scope.down.push(scope.yields[key]);
                }
              }
            }

          });

          function initSlider() {
            var owl = $('.owl-carousel'),
                options = {
                  items: 1,
                  loop: true,
                  margin: 10,
                  autoplay: true,
                  autoplayTimeout: 3000,
                  autoplayHoverPause: true
                };

            owl.owlCarousel(options);
           }

          $timeout(initSlider, 0);

        }
      }
    }]);



})();
//# sourceMappingURL=fm-bulletin-slider-directive.js.map
