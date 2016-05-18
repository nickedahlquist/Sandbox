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
  angular.module('fm').controller('FmSingleFundCtrl', ['singleFundData', 'fmFundDataService', 'fmChartDefaults', '$timeout', '$interval', 'fmUtilityFunctions', FmSingleFundCtrl]);

  // Define controller-function.
  function FmSingleFundCtrl(singleFundData, fmFundDataService, fmChartDefaults, $timeout, $interval, fmUtilityFunctions) {

    /* jshint validthis: true */
    var vm = this,
        navHistoryChart = fmChartDefaults.getLineChart(),
        regionsChart    = fmChartDefaults.getPieChart({ legendParent: '#regions-pie-chart-legend' }),
        sectorChart     = fmChartDefaults.getPieChart({ legendParent: '#sector-pie-chart-legend' }),
        volatilityGuage = fmChartDefaults.getGuage({ title: 'Volatilitet' }),
        utils = fmUtilityFunctions;

    vm.chartComplete = false;
    vm.name = singleFundData.FundInfo[0].Name;
    vm.isin = singleFundData.Isin;
    vm.description = singleFundData.FundInfo[0].Description;
    vm.volatility = singleFundData.FundInfo[0].Volatility;
    vm.risk = singleFundData.FundInfo[0].Risk;
    vm.type = singleFundData.FundInfo[0].Type;
    vm.navHistory = singleFundData.NavHistory;
    vm.holdings = singleFundData.CompanyHoldings;
    vm.sectors = singleFundData.Sectors;
    vm.regions = singleFundData.Regions;

    vm.getNumber = fmUtilityFunctions.intToArray;

    console.log(singleFundData);

    fmFundDataService.getFunds().then(function (data) {
      vm.fundList = data.value;
    });

    vm.populateChart = function (idIn, nameIn) {
      fmFundDataService.getFundById(idIn).then(function (data) {
        vm.addSeries(nameIn, data.NavHistory);
      });
    };

    /* Nav history chart */
    vm.addSeries = function (nameIn, navHistoryIn) {
      var navHistory = _.sortBy(navHistoryIn, function (val) { return val.RateDate; });
      var seriesData = [];
      var intitialValue = navHistory[0].Rate;

      for (var i = 0; i < navHistory.length; i++) {
        seriesData.push([
          (new Date(navHistory[i].RateDate).getTime()),
          100 * (navHistory[i].Rate - intitialValue) / intitialValue
        ]);
      }

      var newSeries = {
        name: nameIn,
        data: seriesData
      };

      vm.navHistoryLineChart.series.push(newSeries);
      vm.chartComplete = true;
    }
    vm.navHistoryLineChart = navHistoryChart;

    /* Sector chart */
    sectorChart.series.push({
        name: 'Sektor',
        colorByPoint: true,
        data: vm.sectors.reduce(function (result, value, key) {
          result.push({
            name: value.Sector,
            y: value.Value
          });
          return result;
        }, [])
      });
    vm.sectorPieChart = sectorChart;

    /* Regions chart */
    regionsChart.series.push({
      name: 'Regions',
      colorByPoint: true,
      data: vm.regions.reduce(function (result, value, key) {
        result.push({
          name: value.Region,
          y: value.Value
        });
        return result;
      }, [])
    });
    vm.regionsPieChart = regionsChart;

    $timeout(function () {

      vm.volatilityGuage.series[0].data = [vm.volatility];


    }, 1000);


    vm.volatilityGuage = volatilityGuage;

  }
})();
