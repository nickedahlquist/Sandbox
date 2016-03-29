(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Marknaden', {
        url: '/Marknaden',
        controller: 'FmMarketCtrl',
        controllerAs: 'fmMarket',
        templateUrl: 'views/fm-market-view.html',
        sortOrder: 2
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmMarketCtrl', [FmMarketCtrl]);

  // Define controller-function.
  function FmMarketCtrl() {

    /* jshint validthis: true */
    var vm = this;

    vm.title = 'Hej';
    vm.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  }

})();

//# sourceMappingURL=fm-market-controller.js.map
