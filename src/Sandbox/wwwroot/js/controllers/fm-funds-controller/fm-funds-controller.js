(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('funds', {
        url: '/funds',
        controller: 'FmFundsCtrl',
        controllerAs: 'fmFunds',
        templateUrl: 'views/fm-funds-view.html',
        resolve: {
          $title: function () {
            return 'Fonder';
          },
          allData: function (fmDataService) {
            return fmDataService;
          }
        },
        sortOrder: 3
     });

  }]);

  // Register controller.
  angular.module('fm').controller('FmFundsCtrl', ['allData', 'fmUtilityFunctions', FmFundsCtrl]);

  // Define controller-function.
  function FmFundsCtrl(allData, fmUtilityFunctions) {

    /* jshint validthis: true */
    var vm = this;

    vm.cardMode = true;
    vm.fundData = allData.funds;

    vm.getNumber = fmUtilityFunctions.intToArray;

    vm.toggleCardMode = function () {
      vm.cardMode = !vm.cardMode;
    };
  }

})();
//# sourceMappingURL=fm-funds-controller.js.map
