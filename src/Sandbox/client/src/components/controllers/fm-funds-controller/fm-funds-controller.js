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
            return fmFundDataService.getFunds();
            //return fmFundDataService.getResultsPage(1);
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
    vm.busy = false;

    var nextItems = fundData["@odata.nextLink"];

    /*
    vm.funds = [];
    vm.totalFunds = fundData["@odata.count"] - 10;
    vm.fundsPerPage = 10;
    vm.clickable = true;

    vm.pagination = {
      current: 1
    };*/

    /*vm.pageChanged = function (newPage) {

      fmFundDataService.getResultsPage(newPage).then(function (data) {
          vm.realFundData = data.value;
          return;
        });
    };*/

    /*
    vm.pageChanged = _.debounce(function (newPage) {
      fmFundDataService.getResultsPage(newPage).then(function (data) {
        vm.realFundData = data.value;
        vm.pagination.current = newPage;
        console.log(vm.pagination.current);
        return;
      });
    }, 500, true);*/

    //vm.loadMore = _.debounce(function () {
    //    fmFundDataService.getNextLinks(nextItems).then(function (data) {
    //      vm.realFundData = vm.realFundData.concat(data.value);
    //      nextItems = data["@odata.nextLink"];
    //      return;
    //    });
    //}, 500, true);

    vm.loadMore = function () {

      if (vm.busy) {
        return;
      }

      vm.busy = true;

      return fmFundDataService.getNextLinks(nextItems).then(function (data) {
        vm.realFundData = vm.realFundData.concat(data.value);
        nextItems = data["@odata.nextLink"];
        vm.busy = false;
        return;
      });

    };

    vm.getNumber = fmUtilityFunctions.intToArray;

    vm.toggleCardMode = function () {
      vm.cardMode = !vm.cardMode;
    };

  }

})();