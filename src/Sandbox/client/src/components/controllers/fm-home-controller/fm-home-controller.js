(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'FmHomeCtrl',
        controllerAs: 'fmHome',
        templateUrl: 'views/fm-home-view.html',
        resolve: {
          $title: function () {
            return 'Hem';
          },
        },
        sortOrder: 1
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmHomeCtrl', ['fmAuthServiceFactory', FmHomeCtrl]);

  // Define controller-function.
  function FmHomeCtrl(fmAuthServiceFactory) {

    /* jshint validthis: true */
    var vm = this;

  }

})();
