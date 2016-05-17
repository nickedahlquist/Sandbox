(function () {
  'use strict';

  angular.module('fm').directive('fmHoldings', ['fmChartDefaults', 'fmUtilityFunctions', function (fmChartDefaults, fmUtilityFunctions) {

    return {
      restrict: 'E',
      templateUrl: 'views/fm-holdings-view.html',
      scope: {
        holdings: '='
      },
      link: function (scope, element, attrs) {
        var utils = fmUtilityFunctions;
        var colors = fmChartDefaults.getColors();

        function getColorStops(baseColorIn) {
          var baseColor = (baseColorIn !== undefined) ? baseColorIn : '#2ABBAE';

          return {
            colorStop1: utils.blendColor(baseColor, 70),
            colorStop2: utils.blendColor(baseColor, -5)
          };
        };

        scope.holdings = _.sortBy(scope.holdings, function (val) { return val.HoldingValue; }).reverse();
        
        for (var key in scope.holdings) {
          var maxValue = (scope.holdings[0].HoldingValue * 100).toFixed();
          var relativeValue = (scope.holdings[key].HoldingValue * 100).toFixed()
          var barWidth = ((relativeValue / maxValue) * 100).toFixed();
          scope.holdings[key].barGradient = getColorStops(colors[key]);
          scope.holdings[key].barWidth = barWidth + '%';
        }  
      }
    }

  }]);

})();