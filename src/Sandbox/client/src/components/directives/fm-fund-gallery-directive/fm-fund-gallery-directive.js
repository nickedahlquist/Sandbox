(function() {
    'use strict';

    angular.module('fm').directive('fmFundGallery', ['fmDataService', 'fmUtilityFunctions', function (fmDataService, fmUtilityFunctions) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-fund-gallery-view.html',
        link: function (scope, element, attribute) {

          scope.title = 'Fonder';
          
          scope.showCard = true;

          scope.getNumber = fmUtilityFunctions.intToArray;

          fmDataService.then(function (data) {
            scope.funds = data.funds;
            scope.newsitems = data.newsitems;
         });

        }
      }

    }]);

})();