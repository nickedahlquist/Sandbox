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
    var vm = this;
    var defaultLineOptions = fmChartDefaults.getLineOptions();
    var defaultPieOptions = fmChartDefaults.getPieOptions();
    var utils = fmUtilityFunctions;

    var chartCache = undefined;
    vm.chartComplete = false;
    vm.fund = singleFundData.value[0];
    vm.getNumber = fmUtilityFunctions.intToArray;

    fmFundDataService.getFunds().then(function (data) {
      vm.fundList = data.value;
    });

    vm.addSeries = function (isin, name) {
      
      //if (chartCache === undefined) {

        fmFundDataService.getNavHistory(isin).then(function (data) {
          var navHistory = _.sortBy(data, function (val) { return val.RateDate; });
          var seriesData = [];
          var intitialValue = navHistory[0].Rate;

          for (var i = 0; i < navHistory.length; i++) {
            seriesData.push([
              (new Date(navHistory[i].RateDate).getTime()),
              100 * (navHistory[i].Rate - intitialValue) / intitialValue
            ]);
          }

          var newSeries = {
            name: name,
            data: seriesData
          };

          chartCache = newSeries;

          if (vm.chartConfig.series.length > 2) {
            vm.chartConfig.series.pop();
            vm.chartConfig.series.pop();
          }

          vm.chartConfig.series.push(newSeries);
          vm.chartComplete = true;
        });

        //fmFundDataService.getFundByIsin(vm.fund.Isin).then(function (data) {
        //  var navHistory = data.value[0].NavHistory.reverse();
        //  var series = [];
        //  var intitialValue = navHistory[0].Rate;

        //  for (var i = 0; i < navHistory.length; i++) {
        //    series.push([
        //      (new Date(navHistory[i].RateDate).getTime()),
        //      100 * (navHistory[i].Rate - intitialValue) / intitialValue
        //    ]);
        //  }

        //  chartCache = series;
        //  vm.chartConfig.series[0].data = chartCache;
        //  vm.chartComplete = true;
        //});

      //} else {
      //  vm.chartConfig.series[0] = chartCache;
      //}
    }


    vm.chartConfig = {
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
      func: function(chart) {
        $timeout(function() {
          chart.reflow();
        }, 0);
      },
      useHighStocks: true,
    };



    var pieData = [];

    for (var j = 0; j < vm.fund.CompanyHoldings.length; j++) {


      pieData.push({
        name: vm.fund.CompanyHoldings[j].CompnyName,
        y: vm.fund.CompanyHoldings[j].HoldingValue * 100
      });
    }

    function initSlider() {
      var owl = $('.owl-carousel'),
          options = {
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true
          };

      owl.owlCarousel(options);
      console.log(owl);
    }

    $timeout(initSlider, 0);

    //defaultPieOptions.chart.events = {
    //  load: function () {

    //    var chart = this;
    //    console.log(chart);
    //  }
    //};

    vm.pieChartConfig = {

      options: defaultPieOptions,

      series: [{
        name: 'Holdings',
        colorByPoint: true,
        data: pieData
      }],

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

    //console.log(defaultPieOptions.getHighcharts().colors);


  }
})();
