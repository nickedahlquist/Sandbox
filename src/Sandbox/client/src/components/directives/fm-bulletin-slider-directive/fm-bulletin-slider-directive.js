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

          var swiper;

          function initSwiper() {

            var options = {
              speed: 4000,
              effect: 'slide',
              spaceBetween: 100,
              centeredSlides: true,
              autoplay: 40,
              loop: true,
              autoplayDisableOnInteraction: false
            };

            swiper = new Swiper('.swiper-container', options);
          }

          $timeout(initSwiper, 0);
        }
      }
    }]);



})();