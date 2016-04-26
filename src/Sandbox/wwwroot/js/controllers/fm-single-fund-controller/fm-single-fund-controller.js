(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('fund', {
        url: '/fund-overwiew/fund/{id}',
        controller: 'FmSingleFundCtrl',
        controllerAs: 'fmSingleFund',
        templateUrl: 'views/fm-single-fund-view.html',
        resolve: {
          $title: function () { 
            return 'Fond';
          },
          singleFundData: function (fmFundDataService, $stateParams) {
            return fmFundDataService.getFundById($stateParams.id);
          }
        }
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmSingleFundCtrl', ['singleFundData', 'fmFundDataService', 'fmUtilityFunctions', '$title', FmSingleFundCtrl]);

  // Define controller-function.
  function FmSingleFundCtrl(singleFundData, fmFundDataService, fmUtilityFunctions, $title) {

    /* jshint validthis: true */
    var vm = this;
    vm.fund = singleFundData.value[0];
    //console.log(vm.fund);


  }

})();
//# sourceMappingURL=fm-single-fund-controller.js.map
