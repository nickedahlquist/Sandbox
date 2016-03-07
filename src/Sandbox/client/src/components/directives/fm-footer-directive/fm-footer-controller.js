(function () {
  'use strict';

  angular.module('fm').controller('FmFooterController', ['$scope', '$navlinksService', function ($scope, $navlinksService) {

    $scope.navbarlinks = $navlinksService;

  }]);

})();
