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
  angular.module('fm').controller('FmSingleFundCtrl', ['singleFundData', 'fmFundDataService', 'fmChartDefaults', '$timeout', 'fmUtilityFunctions', FmSingleFundCtrl]);

  // Define controller-function.
  function FmSingleFundCtrl(singleFundData, fmFundDataService, fmChartDefaults, $timeout, fmUtilityFunctions) {

    /* jshint validthis: true */
    var vm = this,
        defaultLineOptions = fmChartDefaults.getLineChart(),
        defaultPieOptions1 = fmChartDefaults.getPieChart(),
        defaultPieOptions2 = fmChartDefaults.getPieChart(),
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

    fmFundDataService.getFunds().then(function (data) {
      vm.fundList = data.value;
    });

    vm.populateChart = function (idIn, nameIn) {
      fmFundDataService.getFundById(idIn).then(function (data) {
        vm.addSeries(nameIn, data.NavHistory);
      });
    };

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


    vm.navHistoryLineChart = {
      options: defaultLineOptions,
      series: [],
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      subtitle: {
        text: '',
        style: {
          display: 'none'
        }
      },
      loading: false,
      xAxis: {
        title: {
          text: '',
          style: {
            display: 'none'
          }
        }
      },
      func: function (chart) {
        $timeout(function () {
          chart.reflow();
        }, 0);
      },
      useHighStocks: true,
    };


    var sectorSeries = {
        name: 'Sektor',
        colorByPoint: true,
        data: vm.holdings.reduce(function (result, value, key) {
          result.push({
            name: value.CompnyName,
            y: value.HoldingValue * 100
          });
          return result;
        }, [])
      };
    
    defaultPieOptions1.chart.events = {
      load: function () {
        var chart = $('#sector-pie-chart'),
            legend = chart.find('.highcharts-legend').removeAttr('transform').appendTo('#sector-pie-chart-legend');
      },
      redraw: function () {
        var chart = $('#sector-pie-chart-legend'),
            legend = chart.find('.highcharts-legend').removeAttr('transform');
      }
    };

    

    vm.sectorPieChart = {

      options: defaultPieOptions1,

      series: [sectorSeries],

      title: {
        text: '',
        style: {
          display: 'none'
        }
      },

      subtitle: {
        text: '',
        style: {
          display: 'none'
        }
      },

      loading: false,

      xAxis: {
        title: {
          text: '',
          style: {
            display: 'none'
          }
        }
      },

      func: function (chart) {
        $timeout(function () {
          chart.reflow();
        }, 0);

      },

      useHighStocks: false,
    };


    var regionsSeries = {
      name: 'Regions',
      colorByPoint: true,
      data: vm.holdings.reduce(function (result, value, key) {
        result.push({
          name: value.CompnyName,
          y: value.HoldingValue * 100
        });
        return result;
      }, [])
    };
    
    defaultPieOptions2.chart.events = {
      load: function () {
        var chart2 = $('#regions-pie-chart'),
            legend2 = chart2.find('.highcharts-legend').removeAttr('transform').appendTo('#regions-pie-chart-legend');
      },
      redraw: function () {
        var chart2 = $('#regions-pie-chart-legend'),
            legend2 = chart2.find('.highcharts-legend').removeAttr('transform');
      }
    };

    

    vm.regionsPieChart = {

      options: defaultPieOptions2,

      series: [regionsSeries],

      title: {
        text: '',
        style: {
          display: 'none'
        }
      },

      subtitle: {
        text: '',
        style: {
          display: 'none'
        }
      },

      loading: false,

      xAxis: {
        title: {
          text: '',
          style: {
            display: 'none'
          }
        }
      },

      func: function (chart) {
        $timeout(function () {
          chart.reflow();
        }, 0);

      },

      useHighStocks: false,
    };

  }
})();
