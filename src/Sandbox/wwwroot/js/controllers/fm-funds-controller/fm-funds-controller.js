(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Fonder', {
        url: '/Fonder',
        controller: 'FmFundsCtrl',
        controllerAs: 'fmFunds',
        templateUrl: 'views/fm-funds-view.html',
        resolve: {
          allData: function (fmDataService) {
            return fmDataService;
          }
        },
        sortOrder: 3
     });

  }]);

  // Register controller.
  angular.module('fm').controller('FmFundsCtrl', ['allData', FmFundsCtrl]);

  // Define controller-function.
  function FmFundsCtrl(allData) {

    /* jshint validthis: true */
    var vm = this;

    vm.fundData = allData.funds;
  }

})();

//# sourceMappingURL=fm-funds-controller.js.map
