(function() {
    'use strict';

    angular.module('fm').directive('fmFundGallery', ['fmDataService', 'fmUtilityFunctions', function (fmDataService, fmUtilityFunctions) {

      return {
        restrict: 'E',
        templateUrl: 'views/fm-fund-gallery-view.html',
        link: function (scope, element, attribute) {

          var buttonbar = $('.fm-fund-button-bar'),
              button = buttonbar.find('.fm-button');

          button.on('click', function () {
            button.each(function () {
              if ($(this).hasClass('button-active')) {
                $(this).removeClass('button-active');
              }
            });
            $(this).addClass('button-active');
          });

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
//# sourceMappingURL=fm-fund-gallery-directive.js.map
