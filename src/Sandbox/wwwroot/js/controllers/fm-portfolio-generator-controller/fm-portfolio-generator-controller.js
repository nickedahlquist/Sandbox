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
        vm.steps.currentStep = step;
      }
    };

    vm.formData = {};

    vm.states = {
      userDetails: {
        init: function () {
          vm.steps.changeCurrentStep(1);

          var userInputs = $('.user-input input');

          userInputs.on('keydown', function (event) {
            var permittedKeys = [8, 16, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

            if (_.contains(permittedKeys, event.keyCode)) {
              return;
            } else {
              event.preventDefault();
            }
          });
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
