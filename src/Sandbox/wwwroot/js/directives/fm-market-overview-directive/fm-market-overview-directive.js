(function () {
  'use strict';

  angular.module('fm').directive('fmMarketOverview', ['fmDataService', '$timeout', function (fmDataService, $timeout) {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-market-overview-view.html',
      link: function (scope, element, attribute) {

        scope.title = "Marknadsöversikt";
        scope.subtitle = "Alohamora wand elf parchment, Wingardium Leviosa hippogriff, house dementors betrayal.";
        scope.up = [];
        scope.down = [];
        scope.hasPushed = false;

        fmDataService.then(function (data) {

          scope.yields = data.funds;

          for (var key in scope.yields) {
            if (scope.yields.hasOwnProperty(key)) {

              if (scope.yields[key].yield[0] === '+' && scope.up.lengh < 5) {
                scope.up.push(scope.yields[key]);
              }

              if (scope.yields[key].yield[0] === '-' && scope.down.lengh < 5) {
                scope.down.push(scope.yields[key]);
              }
            }
          }

        });

        var chevron = $('.fm-fund-accordion-chevron');
        chevron.on('click', function () {
          var icon = $(this).find('span');
          
          if (icon.hasClass('glyphicon-chevron-down')) {
            icon.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
          }
          else if (icon.hasClass('glyphicon-chevron-up')) {
            icon.removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
          }

        });
      }
    }

  }]);

})();
//# sourceMappingURL=fm-market-overview-directive.js.map
