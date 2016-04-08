(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('news.post', {
        url: '/news/:id',
        controller: 'FmSingleNewsPostCtrl',
        controllerAs: 'fmNews',
        templateUrl: 'views/fm-single-newspost-view.html',
        resolve: {
          $title: function () {
            return 'Nyhetspost';
          }
        }
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
