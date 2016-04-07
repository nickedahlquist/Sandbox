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

    var userInputs = $('.user-input input');

    userInputs.on('keydown', function (event) {
      var permittedKeys = [8, 16, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

      if (_.contains(permittedKeys, event.keyCode)) {
        return;
      } else {
        event.preventDefault();
      }
    });

    
    vm.nextStep = function () {
      //vm.steps.currentStep = (vm.steps.currentStep >= vm.steps.totalSteps.length) ? 1 : vm.steps.currentStep + 1;
      if (vm.steps.currentStep < vm.steps.totalSteps.length) {
        vm.steps.currentStep += 1;
      }
    };

    vm.previousStep = function () {
      if (vm.steps.currentStep <= vm.steps.totalSteps.length && vm.steps.currentStep > 1) {
        vm.steps.currentStep -= 1;
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

    vm.userModel = {
      age: undefined,
      income: undefined
    };

    vm.validateAge = function () {

      var age = parseInt(vm.userData.age.value);
      vm.userData.age.errorMessage = undefined;
      
      if (age < 18) {
        vm.userData.age.errorMessage = 'Du måste vara minst 18 år gammal';
      } else {
        vm.userModel.age = age;
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
