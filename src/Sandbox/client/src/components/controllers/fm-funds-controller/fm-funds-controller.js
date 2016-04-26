(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('fund-overwiew', {
        url: '/fund-overwiew',
        controller: 'FmFundsCtrl',
        controllerAs: 'fmFunds',
        templateUrl: 'views/fm-funds-view.html',
        resolve: {
          $title: function () {
            return 'Fonder';
          },
          allData: function (fmDataService) {
            return fmDataService;
          },
          fundData: function (fmFundDataService) {
            //return fmFundDataService.getFunds();
            return fmFundDataService.getResultsPage(1);
          }
        },
        sortOrder: 3
     });

  }]);

  // Register controller.
  angular.module('fm').controller('FmFundsCtrl', ['allData', 'fundData', 'fmFundDataService', 'fmUtilityFunctions', FmFundsCtrl]);

  // Define controller-function.
  function FmFundsCtrl(allData, fundData, fmFundDataService, fmUtilityFunctions) {

    /* jshint validthis: true */
    var vm = this;

    vm.cardMode = true;
    vm.fundData = allData.funds;
    vm.realFundData = fundData.value;

    var nextItems = fundData["@odata.nextLink"];

    vm.funds = [];
    vm.totalFunds = 1000;
    vm.fundsPerPage = 5;

    vm.pagination = {
      current: 1
    };

    vm.pageChanged = function (newPage) {

      fmFundDataService.getResultsPage(newPage).then(function (data) {
          vm.realFundData = data.value;
          return;
        });
    };

    vm.loadMore = _.debounce(function () {
        fmFundDataService.getNextLinks(nextItems).then(function (data) {
          vm.realFundData = vm.realFundData.concat(data.value);
          nextItems = data["@odata.nextLink"];
          return;
        });
    }, 500, true);

    //vm.loadMore = function () {

    //  fmFundDataService.getNextLinks(nextItems).then(function (data) {
    //    vm.realFundData = vm.realFundData.concat(data.value);
    //    nextItems = data["@odata.nextLink"];
    //    console.log(data);
    //    return;
    //  });

    //};

    vm.getNumber = fmUtilityFunctions.intToArray;

    vm.toggleCardMode = function () {
      vm.cardMode = !vm.cardMode;
    };

  }

})();