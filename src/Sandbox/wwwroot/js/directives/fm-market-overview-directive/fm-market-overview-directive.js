(function () {
  'use strict';

  angular.module('fm').directive('fmMarketOverview', ['$timeout', function ($timeout) {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-market-overview-view.html',
      scope: {
        funds: "="
      },
      link: function (scope, element, attrs) {

        scope.up = [];
        scope.down = [];
        scope.yields = scope.funds;

        for (var key in scope.yields) {
          
          if (scope.yields.hasOwnProperty(key)) {

            if (scope.yields[key].yield[0] === '+') {
              scope.up.push(scope.yields[key]);
            }

            if (scope.yields[key].yield[0] === '-') {
              scope.down.push(scope.yields[key]);
            }
          }
        }

        /*var chevron = $('.fm-fund-accordion-chevron');
        chevron.on('click', function () {
          var icon = $(this).find('span');
          
          if (icon.hasClass('glyphicon-chevron-down')) {
            icon.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
          }
          else if (icon.hasClass('glyphicon-chevron-up')) {
            icon.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
          }

        });*/


      }
    }

  }]);

})();
//# sourceMappingURL=fm-market-overview-directive.js.map
