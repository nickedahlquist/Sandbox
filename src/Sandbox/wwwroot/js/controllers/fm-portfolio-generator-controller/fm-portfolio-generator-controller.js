(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Portfölj', {
        url: '/Portfölj',
        controller: 'FmPortfolioGeneratorCtrl',
        controllerAs: 'fmPortfolio',
        templateUrl: 'views/fm-portfolio-generator-view.html',
        resolve: {
          $title: function () {
            return 'Portfölj';
          }
        },
        sortOrder: 4
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmPortfolioGeneratorCtrl', [FmPortfolioGeneratorCtrl]);

  // Define controller-function.
  function FmPortfolioGeneratorCtrl() {

    /* jshint validthis: true */
    var vm = this;

    vm.steps = {
      totalSteps: [
        {
          stepTitle: 'Ange uppgifter'
        },
        {
          stepTitle: 'Välj fondpaket'
        },
        {
          stepTitle: 'Välj vad du vill göra'
        },
        {
          stepTitle: 'Skapa portfölj'
        }],
      currentStep: 1,
    };

    
    /*vm.Step1 = function (selectedfund) {

    };*/

    vm.incrementStep = function () {
      vm.steps.currentStep = (vm.steps.currentStep >= vm.steps.totalSteps.length) ? 1 : vm.steps.currentStep + 1;
    };



































    // Theme
    Highcharts.theme = {
      colors: ['#DF574B', '#2ABBAE', '#22968b', '#7fd6ce']
    };
    // Theme:end
    Highcharts.setOptions(Highcharts.theme);

    var chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: null
      },
      tooltip: {
        pointFormat: null
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          borderWidth: 0,
          cursor: 'pointer',
          innerSize: '30%',
          dataLabels: {
            enabled: false,
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: null,
          y: 18.00
        }, {
          name: null,
          y: 42.00
        }, {
          name: null,
          y: 15.00
        }, {
          name: null,
          y: 25.00
        }]
      }]
    };

    var chart = $('#chart');

    chart.highcharts(chartOptions);
  }

})();

//# sourceMappingURL=fm-portfolio-generator-controller.js.map
