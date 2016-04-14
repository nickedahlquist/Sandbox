(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/portfolio', '/portfolio/user_details');

    $stateProvider
      .state('portfolio', {
        url: '/portfolio',
        controller: 'FmPortfolioGeneratorCtrl',
        controllerAs: 'fmPortfolio',
        templateUrl: 'views/fm-portfolio-generator-view.html',
        resolve: {
          $title: function () {
            return 'Portfölj';
          }
        },
        sortOrder: 4
      })

     .state('portfolio.userdetails', {
       url: '/user_details',
       templateUrl: 'views/fm-portfolio-generator-userdetails-view.html'
     })

     .state('portfolio.fundpackage', {
       url: '/select_fundpackage',
       templateUrl: 'views/fm-portfolio-generator-fundpackage-view.html'
     })

     .state('portfolio.configure', {
       url: '/configure_fundpackage',
       templateUrl: 'views/fm-portfolio-generator-configure-view.html'
     })

     .state('portfolio.confirm', {
       url: '/confirm',
       templateUrl: 'views/fm-portfolio-generator-confirm-view.html'
     });

  }]);

  // Register controller.
  angular.module('fm').controller('FmPortfolioGeneratorCtrl', ['$state', '$timeout', FmPortfolioGeneratorCtrl]);

  // Define controller-function.
  function FmPortfolioGeneratorCtrl($state, $timeout) {

    /* jshint validthis: true */
    var vm = this;

    vm.steps = {
      totalSteps: [{ stepTitle: 'Ange uppgifter' }, { stepTitle: 'Välj fondpaket' }, { stepTitle: 'Välj vad du vill göra' }, { stepTitle: 'Skapa portfölj' }],
      currentStep: 1,
      changeCurrentStep: function (step) {
        vm.steps.currentStep = (step <= vm.steps.totalSteps.length && step > 0) ? step : vm.steps.currentStep;
      }
    };

    vm.formData = {};

    vm.setChart = function (id) {
      var chart = $(id);

      switch (id) {
        case '#chart-1':
          chartOptions.series[0].data = [{ name: null, y: 18.00 }, { name: null, y: 42.00 }, { name: null, y: 15.00 }, { name: null, y: 25.00 }];
          break;
        case '#chart-2':
          chartOptions.series[0].data = [{ name: null, y: 10.00 }, { name: null, y: 25.00 }, { name: null, y: 40.00 }, { name: null, y: 25.00 }];
          break;
        case '#chart-3':
          chartOptions.series[0].data = [{ name: null, y: 56.00 }, { name: null, y: 17.00 }, { name: null, y: 21.00 }, { name: null, y: 6.00 }];
          break;
      }

      $timeout(function () {
        if (!chart.attr('data-highcharts-chart')) {
          chart.addClass('animated bounceIn');
          chart.highcharts(chartOptions);
        }
        else {
          if(chart.hasClass('animated bounceIn')) {
            chart.removeClass('animated bounceIn');
          }
        }

      }, 200);
    }

    vm.preventNonNumbers = function ($event) {
      var permittedKeys = [8, ,13, 16, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106];

      if (_.contains(permittedKeys, $event.keyCode)) {
        return;
      }
      $event.preventDefault();
    }

    // state 3
    vm.payments = 0;

    vm.payOnce = false;

    vm.togglePayMethod = function () {
      vm.payOnce = !vm.payOnce; 
    };

    vm.states = {
      userDetails: {
        init: function () {
          vm.steps.changeCurrentStep(1);
        }
      },
      fundPackage: {
        init: function () {
          vm.steps.changeCurrentStep(2);
        }
      },
      configure: {
        init: function () {
          vm.steps.changeCurrentStep(3);
        }
      },
      confirm: {
        init: function () {
          vm.steps.changeCurrentStep(4);
        }
      },
      go: function (state) {
        $state.go(state);
      }
    };

    vm.userData = {
      age: {
        value: undefined,
        errorMessage: undefined
      },
      income: {
        value: undefined,
        errorMessage: undefined
      }
    };

    vm.validateAge = function () {

      var age = parseInt(vm.userData.age.value);
      vm.userData.age.errorMessage = undefined;

      if (age < 18) {
        vm.userData.age.errorMessage = 'Du måste vara minst 18 år gammal';
      }

      if (!age) {
        vm.userData.age.errorMessage = 'Vänligen ange ålder';
      }
    };

    vm.validateIncome = function () {

      var income = parseInt(vm.userData.income.value);
      vm.userData.income.errorMessage = undefined;

      if (!income) {
        vm.userData.income.errorMessage = 'Vänligen ange inkomst';
      }
    };

    vm.disclaimer = {
      title: '',
      text: 'Fondpaketen utgör inte investeringsrådgivning och tar således inte hänsyn till din riskprofil, din ekonomi eller din förväntan på avkastning. Vi kan därav inte ta ansvar för att de fonder du väljer passar dig och din investeringsprofil.'
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
        type: 'pie',
        margin: 0
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
          slicedOffset: 0,
          size: '100%',
          allowPointSelect: true,
          borderWidth: 0,
          cursor: 'pointer',
          innerSize: '30%',
          dataLabels: {
            enabled: false,
          }
        },
        series: {
          animation: false
        }
      },
      series: [{
        name: 'Funds',
        colorByPoint: true,
        data: []
      }]
    };

  }

})();