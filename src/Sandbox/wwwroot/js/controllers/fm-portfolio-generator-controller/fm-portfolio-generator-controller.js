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
  angular.module('fm').controller('FmPortfolioGeneratorCtrl', ['$state', FmPortfolioGeneratorCtrl]);

  // Define controller-function.
  function FmPortfolioGeneratorCtrl($state) {

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

    vm.preventNonNumbers = function ($event) {
      var permittedKeys = [8, 16, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106];

      if (_.contains(permittedKeys, $event.keyCode)) {
        return;
      }
 
      $event.preventDefault();
    }

    vm.states = {
      userDetails: {
        init: function () {
          vm.steps.changeCurrentStep(1);
        }
      },
      fundPackage: {
        init: function () {
          vm.steps.changeCurrentStep(2);
          initChart();
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

    function initChart() {
      var chart = $('#chart');
      chart.highcharts(chartOptions);
      
    }
 
  }

})();

//# sourceMappingURL=fm-portfolio-generator-controller.js.map
