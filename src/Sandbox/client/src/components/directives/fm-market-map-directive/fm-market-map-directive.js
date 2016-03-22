(function () {
  'use strict';

  angular.module('fm').directive('fmMarketMap', [function () {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-market-map-view.html',
      link: function (scope, element, attrs) {

        // Cache the DOM
        var map           = $('.fm-market-map'),
            asia          = map.find('.asia'),
            europe        = map.find('.europe'),
            northAmerica  = map.find('.north-america'),
            latinAmerica  = map.find('.latin-america'),
            africa        = map.find('.africa');

        asia.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          europe.addClass('fm-market-up');
        });

        europe.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          northAmerica.addClass('fm-market-down');
        });

        northAmerica.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          latinAmerica.addClass('fm-market-up');
        });

        latinAmerica.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          africa.addClass('fm-market-up');
        });

        setTimeout(function () {
          asia.addClass('fm-market-down');
        }, 2000);


      }
    }

  }]);

})();