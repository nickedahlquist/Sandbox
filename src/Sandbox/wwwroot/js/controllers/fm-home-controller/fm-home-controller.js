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
  angular.module('fm').controller('FmHomeCtrl', [FmHomeCtrl]);

  // Define controller-function.
  function FmHomeCtrl() {

    /* jshint validthis: true */
    var vm = this;

  }

})();

//# sourceMappingURL=fm-home-controller.js.map
