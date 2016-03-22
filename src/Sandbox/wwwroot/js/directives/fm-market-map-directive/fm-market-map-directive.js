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

        asia.on('webkitTransitionEnd transitionend', function () {
          europe.addClass('fm-market-up');
        });

        europe.on('webkitTransitionEnd transitionend', function () {
          northAmerica.addClass('fm-market-down');
        });

        northAmerica.on('webkitTransitionEnd transitionend', function () {
          latinAmerica.addClass('fm-market-up');
        });

        latinAmerica.on('webkitTransitionEnd transitionend', function () {
          africa.addClass('fm-market-up');
        });

        setTimeout(function () {
          asia.addClass('fm-market-down');
        }, 2000);


      }
    }

  }]);

})();
//# sourceMappingURL=fm-market-map-directive.js.map
