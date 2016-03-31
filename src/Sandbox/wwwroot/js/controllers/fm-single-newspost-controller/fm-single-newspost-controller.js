(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Nyhetspost', {
        url: '/Nyheter/:id',
        controller: 'FmSingleNewsPostCtrl',
        controllerAs: 'fmNews',
        templateUrl: 'views/fm-single-newspost-view.html',
      });

    // Register controller.
    angular.module('fm').controller('FmSingleNewsPostCtrl', ['newsData', FmSingleNewsPostCtrl]);

    // Define controller-function.
    function FmSingleNewsPostCtrl(newsData) {

      /* jshint validthis: true */
      var vm = this;

    }

  }]);

})();

//# sourceMappingURL=fm-single-newspost-controller.js.map