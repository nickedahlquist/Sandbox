(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Hem', {
        url: '/Hem',
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
  angular.module('fm').controller('FmHomeCtrl', ['fmNewsService', FmHomeCtrl]);

  // Define controller-function.
  function FmHomeCtrl(fmNewsService) {

    /* jshint validthis: true */
    var vm = this;

    vm.title = 'Hem';
    vm.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

    /*fmNewsService.getNews(7).then(function (data) {
      vm.theNews = data;
      console.log(vm.theNews);
    });*/


  }

})();
