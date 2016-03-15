(function () {
    'use strict';

    angular.module('fm').controller('FmHomeController', ['$scope', '$rootScope', '$fmDataService', function ($scope, $rootScope, $fmDataService) {

      $scope.home = {
        title: 'Hem',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      };

      $scope.getNumber = function (number) {
        return new Array(number);
      };

      $fmDataService.then(function (data) {
        $scope.funds = data.funds;
      });


    }]);

})();
