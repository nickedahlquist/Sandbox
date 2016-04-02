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
  }

})();

//# sourceMappingURL=fm-portfolio-generator-controller.js.map
