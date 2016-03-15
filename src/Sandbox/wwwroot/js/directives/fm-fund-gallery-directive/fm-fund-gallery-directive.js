(function() {
    'use strict';

    angular.module('fm').directive('fmFundGallery', ['$fmDataService', function ($fmDataService) {

      return {
        restrict: 'E',
        templateUrl: '../../../views/fm-fund-gallery-view.html',
        link: function (scope, elem, attrs) {

          scope.title = 'Fonder';
          
          scope.showCard = true;

          scope.getNumber = function (number) {
            return new Array(number);
          };

          $fmDataService.then(function (data) {
            scope.funds = data.funds;
         });

        }
      }

    }]);

})();
//# sourceMappingURL=fm-fund-gallery-directive.js.map
